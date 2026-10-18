import { GoogleGenAI } from '@google/genai';
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

// Fallback algorithm for Hangul syllable matching when Gemini is offline or key is absent
function fallbackEvaluation(expected: string, spoken: string): EvaluationResponse {
  const cleanExp = expected.replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, '');
  const cleanSpk = spoken.replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, '');

  if (!cleanSpk) {
    return {
      score: 10,
      accuracyLevel: 'needs_practice',
      detectedMatch: 'Nenhuma fala detectada claramente',
      syllableAnalysis: Array.from(cleanExp || expected).map(ch => ({
        char: ch,
        status: 'incorrect',
        note: 'Não foi possível ouvir esta sílaba',
      })),
      phoneticAdvice: 'Tente falar um pouco mais perto do microfone com um tom firme e pausado.',
      encouragement: 'Não desanime! Falar em voz alta é o primeiro passo para a fluência.'
    };
  }

  const expChars = Array.from(cleanExp);
  const spkChars = Array.from(cleanSpk);
  let matches = 0;

  const syllableAnalysis: SyllableResult[] = expChars.map((ch, idx) => {
    if (spkChars[idx] === ch) {
      matches += 1;
      return { char: ch, status: 'correct' };
    } else if (spkChars.includes(ch)) {
      matches += 0.5;
      return { char: ch, status: 'close', note: 'Som aproximado detectado' };
    } else {
      return { char: ch, status: 'incorrect', note: 'Ajuste a pronúncia desta sílaba' };
    }
  });

  const rawScore = expChars.length > 0 ? Math.round((matches / expChars.length) * 100) : 50;
  const score = Math.max(25, Math.min(100, rawScore));

  let accuracyLevel: 'perfect' | 'great' | 'needs_practice' = 'needs_practice';
  let phoneticAdvice = 'Preste atenção especial nas consoantes e vogais abertas.';
  let encouragement = 'Muito bom esforço! Tente repetir mais uma vez ouvindo o áudio nativo.';

  if (score >= 88) {
    accuracyLevel = 'perfect';
    phoneticAdvice = 'Excelente entonação e clareza fonética! Sua pronúncia soou natural como a de um nativo.';
    encouragement = '대단해요! (Incrível!) Você acertou em cheio!';
  } else if (score >= 65) {
    accuracyLevel = 'great';
    phoneticAdvice = 'Boa pronúncia geral. Tente suavizar a transição entre as sílabas e respirar no final.';
    encouragement = 'Muito bem! Você já está se comunicando com clareza!';
  }

  return {
    score,
    accuracyLevel,
    detectedMatch: spoken,
    syllableAnalysis,
    phoneticAdvice,
    encouragement
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { expectedKorean, spokenText, romanization, portugueseTranslation } = body;

    if (!expectedKorean || typeof expectedKorean !== 'string') {
      return NextResponse.json({ error: 'expectedKorean is required' }, { status: 400 });
    }

    const spoken = (spokenText || '').trim();

    // If no Gemini key is set, use the robust Hangul phonetic matcher
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(fallbackEvaluation(expectedKorean, spoken));
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemPrompt = `Você é um professor nativo de coreano e especialista em fonética e fonoaudiologia para falantes de português do Brasil (estilo Duolingo e Falou).
Sua missão é analisar o que o aluno falou em coreano através do ditado de voz comparando com a frase alvo esperada, e fornecer feedback amigável, construtivo e pedagógico em português do Brasil.

Frase esperada (Hangul): "${expectedKorean}"
Romanização: "${romanization || ''}"
Tradução: "${portugueseTranslation || ''}"
Texto detectado pelo microfone do aluno: "${spoken}"

Regras de Avaliação:
1. Compare foneticamente o texto falado com o texto esperado. Leve em conta variações normais de reconhecimento de voz.
2. Dê uma nota de precisão de 0 a 100.
   - 90 a 100: Pronúncia excelente/perfeita
   - 70 a 89: Boa pronúncia com pequenos deslizes
   - Abaixo de 70: Precisa de mais repetição e ajuste na posição da boca/língua
3. Avalie cada caractere/sílaba da frase esperada (sem pontuação) com status 'correct', 'close', ou 'incorrect'.
4. Forneça uma dica fonética curta, prática e humana em português (ex: explicar diferença entre som aspirado e brando, vogais eo/o, ou assimilação de batchim).
5. Forneça uma frase curta de incentivo caloroso.

Retorne EXCLUSIVAMENTE um objeto JSON válido (sem tags markdown de código e sem blocos) no seguinte formato:
{
  "score": 92,
  "accuracyLevel": "perfect" | "great" | "needs_practice",
  "detectedMatch": "${spoken}",
  "syllableAnalysis": [
    { "char": "안", "status": "correct" },
    { "char": "녕", "status": "correct" }
  ],
  "phoneticAdvice": "Dica prática de fonética em português",
  "encouragement": "Frase de incentivo"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text || '';
    try {
      const parsed = JSON.parse(responseText.trim());
      return NextResponse.json(parsed);
    } catch {
      // If parsing fails, fall back gracefully
      return NextResponse.json(fallbackEvaluation(expectedKorean, spoken));
    }
  } catch (err: unknown) {
    console.error('Error in evaluate-speech API:', err);
    return NextResponse.json(fallbackEvaluation('한국어', ''));
  }
}
