import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('No GEMINI_API_KEY found');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const PHRASES = [
  { id: 'phrase_1', text: '좋은 아침이에요', speed: 'normal' },
  { id: 'phrase_1_slow', text: '좋은... 아침... 이에요.', speed: 'slow' },
  { id: 'phrase_2', text: '물', speed: 'normal' },
  { id: 'phrase_3', text: '물 주세요', speed: 'normal' },
  { id: 'phrase_3_slow', text: '물... 주세요.', speed: 'slow' },
  { id: 'phrase_4', text: '좋은 아침이에요. 물 주세요.', speed: 'normal' },
  { id: 'phrase_4_slow', text: '좋은 아침이에요... 물 주세요.', speed: 'slow' },
  { id: 'phrase_5', text: '감사합니다', speed: 'normal' },
  { id: 'phrase_6', text: '커피 한 잔 주세요', speed: 'normal' },
  { id: 'phrase_6_slow', text: '커피... 한 잔... 주세요.', speed: 'slow' },
  { id: 'phrase_7', text: '안녕하세요', speed: 'normal' },
  { id: 'phrase_8', text: '만나서 반가워요', speed: 'normal' },
  { id: 'phrase_9', text: '이거 얼마예요?', speed: 'normal' },
  { id: 'phrase_10', text: '맛있게 드세요', speed: 'normal' }
];

const outputDir = path.resolve(process.cwd(), 'public/audio');

async function generateAudio(phrase) {
  const filePath = path.join(outputDir, `${phrase.id}.wav`);
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
    console.log(`✓ Skipping ${phrase.id} (already exists)`);
    return true;
  }

  console.log(`Generating audio for ${phrase.id}: "${phrase.text}"...`);

  try {
    const isSlow = phrase.speed === 'slow';
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Pronounce this Korean phrase naturally like a warm, native speaker in Seoul${isSlow ? ' slowly and clearly for a language learner' : ''}: ${phrase.text}`,
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Kore',
            },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const buffer = Buffer.from(base64Audio, 'base64');
      fs.writeFileSync(filePath, buffer);
      console.log(`✓ Saved ${filePath} (${buffer.length} bytes)`);
      return true;
    }
  } catch (err) {
    console.error(`Error generating ${phrase.id}:`, err?.message || err);
    return false;
  }
  return false;
}

async function main() {
  for (const phrase of PHRASES) {
    const success = await generateAudio(phrase);
    if (success) {
      // 21s delay to respect 3 RPM free tier
      await new Promise((r) => setTimeout(r, 21000));
    } else {
      await new Promise((r) => setTimeout(r, 22000));
    }
  }
  console.log('Finished audio generation loop!');
}

main();
