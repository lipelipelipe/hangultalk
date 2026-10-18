import { NextRequest, NextResponse } from 'next/server';

interface SyllableResult {
  char: string;
  status: 'correct' | 'close' | 'incorrect';
  note?: string;
}

interface EvaluationResponse {
  score: number;
  accuracyLevel: 'perfect' | 'great' | 'needs_practice';
  detectedMatch: string;
  syllableAnalysis: SyllableResult[];
  phoneticAdvice: string;
  encouragement: string;
}

// Korean Hangul Unicode Table for Jamo Decomposition
const INITIAL_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const FINAL_CONSONANTS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function decomposeHangul(char: string) {
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return null;
  const index = code - 0xAC00;
  const initial = INITIAL_CONSONANTS[Math.floor(index / 588)];
  const vowel = VOWELS[Math.floor((index % 588) / 28)];
  const final = FINAL_CONSONANTS[index % 28];
  return { initial, vowel, final };
}

function evaluateSpeechLocally(expected: string, spoken: string): EvaluationResponse {
  const cleanExp = expected.replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, '');
  const cleanSpk = spoken.replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, '');

  if (!cleanSpk) {
    return {
      score: 0,
      accuracyLevel: 'needs_practice',
      detectedMatch: 'Nenhuma voz captada',
      syllableAnalysis: Array.from(cleanExp || expected).map((ch) => ({
        char: ch,
        status: 'incorrect',
        note: 'Sílaba não captada pelo microfone',
      })),
      phoneticAdvice: 'Toque no microfone, aproxime o iPhone e fale com clareza.',
      encouragement: 'Não desanime! Falar em voz alta é o segredo para destravar.',
    };
  }

  const expChars = Array.from(cleanExp);
  const spkChars = Array.from(cleanSpk);
  let totalPoints = 0;
  const syllableAnalysis: SyllableResult[] = [];
  const phoneticNotes: string[] = [];

  for (let i = 0; i < expChars.length; i++) {
    const expChar = expChars[i];
    const spkChar = spkChars[i] || '';

    if (expChar === spkChar) {
      totalPoints += 1;
      syllableAnalysis.push({ char: expChar, status: 'correct' });
    } else if (spkChars.includes(expChar)) {
      totalPoints += 0.75;
      syllableAnalysis.push({ char: expChar, status: 'close', note: 'Detectado na frase' });
    } else {
      // Analyze decomposed Jamo similarities (same vowel or consonant)
      const expJamo = decomposeHangul(expChar);
      const spkJamo = spkChar ? decomposeHangul(spkChar) : null;

      if (expJamo && spkJamo) {
        let partial = 0;
        if (expJamo.initial === spkJamo.initial) partial += 0.35;
        if (expJamo.vowel === spkJamo.vowel) partial += 0.45;
        if (expJamo.final === spkJamo.final) partial += 0.2;

        if (partial >= 0.35) {
          totalPoints += partial;
          syllableAnalysis.push({
            char: expChar,
            status: 'close',
            note: `Você articulou com som próximo (${spkChar})`,
          });
          if (expJamo.vowel !== spkJamo.vowel && !phoneticNotes.length) {
            phoneticNotes.push(`Ajuste a vogal "${expJamo.vowel}": observe o formato dos lábios.`);
          }
          continue;
        }
      }

      syllableAnalysis.push({
        char: expChar,
        status: 'incorrect',
        note: 'Pronúncia não identificada com clareza',
      });
    }
  }

  const calculatedScore = expChars.length > 0 ? Math.round((totalPoints / expChars.length) * 100) : 50;
  const score = Math.max(20, Math.min(100, calculatedScore));

  let accuracyLevel: 'perfect' | 'great' | 'needs_practice' = 'needs_practice';
  let phoneticAdvice = phoneticNotes[0] || 'Pronuncie cada bloco de sílaba de forma ritmada e constante.';
  let encouragement = 'Muito bom esforço! Tente repetir mais uma vez ouvindo o áudio modelo.';

  if (score >= 88) {
    accuracyLevel = 'perfect';
    phoneticAdvice = 'Excelente entonação e clareza fonética! Soa perfeitamente natural para nativos.';
    encouragement = '대단해요! (Incrível!) Pronúncia digna de um nativo!';
  } else if (score >= 65) {
    accuracyLevel = 'great';
    phoneticAdvice = phoneticNotes[0] || 'Boa pronúncia! Mantenha a velocidade suave até o final da frase.';
    encouragement = 'Muito bom! Você já se faria entender perfeitamente na Coreia!';
  }

  return {
    score,
    accuracyLevel,
    detectedMatch: spoken,
    syllableAnalysis,
    phoneticAdvice,
    encouragement,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { expectedKorean, spokenText } = body;

    if (!expectedKorean || typeof expectedKorean !== 'string') {
      return NextResponse.json({ error: 'expectedKorean is required' }, { status: 400 });
    }

    const evaluation = evaluateSpeechLocally(expectedKorean, (spokenText || '').trim());
    return NextResponse.json(evaluation);
  } catch (err: unknown) {
    console.error('Error evaluating speech:', err);
    return NextResponse.json({
      score: 50,
      accuracyLevel: 'needs_practice',
      detectedMatch: '',
      syllableAnalysis: [],
      phoneticAdvice: 'Tente repetir em voz alta.',
      encouragement: 'Continue praticando!',
    });
  }
}
