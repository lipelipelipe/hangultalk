import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

// In-memory audio buffer cache for instant 0ms response
const memoryCache = new Map<string, Buffer>();

const CACHE_DIR = path.resolve(process.cwd(), 'public', 'audio', 'cache');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get('text');
    const slow = searchParams.get('slow') === 'true';

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
    }

    const cleanText = text.trim();
    const cacheKey = `${cleanText}_${slow}`;

    // 1. Check in-memory cache (Ultra fast 0ms response)
    if (memoryCache.has(cacheKey)) {
      const buffer = memoryCache.get(cacheKey)!;
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': buffer.length.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // 2. Check disk cache
    const hash = crypto.createHash('md5').update(cacheKey).digest('hex');
    const cachedFilePath = path.join(CACHE_DIR, `${hash}.mp3`);

    if (fs.existsSync(cachedFilePath)) {
      try {
        const fileBuffer = fs.readFileSync(cachedFilePath);
        if (fileBuffer.length > 500) {
          memoryCache.set(cacheKey, fileBuffer);
          return new NextResponse(new Uint8Array(fileBuffer), {
            headers: {
              'Content-Type': 'audio/mpeg',
              'Content-Length': fileBuffer.length.toString(),
              'Accept-Ranges': 'bytes',
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
        }
      } catch {}
    }

    // 3. Try synthesizing with Python Edge-TTS if available locally
    let audioBuffer: Buffer | null = null;
    try {
      if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
      }

      const scriptPath = path.resolve(process.cwd(), 'scripts', 'tts_synthesizer.py');
      if (fs.existsSync(scriptPath)) {
        const escapedText = cleanText.replace(/"/g, '\\"');
        const cmd = `python "${scriptPath}" "${escapedText}" "${cachedFilePath}" ${slow ? 'true' : 'false'}`;
        await execPromise(cmd, { timeout: 6000 });

        if (fs.existsSync(cachedFilePath)) {
          const fileBuffer = fs.readFileSync(cachedFilePath);
          if (fileBuffer.length > 500) {
            audioBuffer = fileBuffer;
          }
        }
      }
    } catch {
      // Python unavailable (e.g. Vercel serverless / mobile web) - fallback to direct Google TTS
    }

    // 4. Universal Fallback: Google Translate Korean TTS (Always works, 0 dependencies, iOS compatible)
    if (!audioBuffer) {
      try {
        const gttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=ko&client=tw-ob`;
        const res = await fetch(gttsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
            'Accept': 'audio/mpeg, audio/*;q=0.9',
          },
        });

        if (res.ok) {
          const arrayBuf = await res.arrayBuffer();
          audioBuffer = Buffer.from(arrayBuf);

          // Save to disk cache if possible
          try {
            if (!fs.existsSync(CACHE_DIR)) {
              fs.mkdirSync(CACHE_DIR, { recursive: true });
            }
            fs.writeFileSync(cachedFilePath, audioBuffer);
          } catch {}
        }
      } catch (err) {
        console.error('Google TTS fetch error:', err);
      }
    }

    if (audioBuffer && audioBuffer.length > 0) {
      memoryCache.set(cacheKey, audioBuffer);
      return new NextResponse(new Uint8Array(audioBuffer), {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.length.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return NextResponse.json({ error: 'Failed to synthesize audio' }, { status: 500 });
  } catch (err: unknown) {
    console.error('TTS Route Error:', err);
    return NextResponse.json({ error: 'TTS Internal error' }, { status: 500 });
  }
}
