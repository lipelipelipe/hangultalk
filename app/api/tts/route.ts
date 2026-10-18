import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const CACHE_DIR = path.resolve(process.cwd(), 'public', 'audio', 'cache');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get('text');
    const slow = searchParams.get('slow') === 'true';

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
    }

    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    // Generate deterministic hash for cache key
    const hash = crypto.createHash('md5').update(`${text}_${slow}`).digest('hex');
    const cachedFilePath = path.join(CACHE_DIR, `${hash}.mp3`);

    // Check if already in cache (instant 0ms response)
    if (fs.existsSync(cachedFilePath) && fs.statSync(cachedFilePath).size > 500) {
      const audioBuffer = fs.readFileSync(cachedFilePath);
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Synthesize using lightweight Python Edge-TTS script
    const scriptPath = path.resolve(process.cwd(), 'scripts', 'tts_synthesizer.py');
    const escapedText = text.replace(/"/g, '\\"');
    const cmd = `python "${scriptPath}" "${escapedText}" "${cachedFilePath}" ${slow ? 'true' : 'false'}`;

    await execPromise(cmd, { timeout: 12000 });

    if (fs.existsSync(cachedFilePath)) {
      const audioBuffer = fs.readFileSync(cachedFilePath);
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
  } catch (err: unknown) {
    console.error('Error generating online TTS:', err);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}
