export interface SRSCard {
  id: string;
  hangul: string;
  romanization: string;
  translation: string;
  wordSlots: string[]; // for blank boxes representation (e.g. ['좋은', '아침이에요'])
  grammar: {
    title: string;
    explanation: string;
    breakdown: {
      korean: string;
      roman: string;
      role: string;
    }[];
  };
  audioSpeedText?: string;
  difficulty: 'fácil' | 'médio' | 'acumulativo';
}

export const SRS_LESSON_CARDS: SRSCard[] = [
  {
    id: 'srs-1',
    hangul: '좋은 아침이에요',
    romanization: 'joeun achimieyo',
    translation: 'Bom dia',
    wordSlots: ['좋은', '아침이에요'],
    grammar: {
      title: 'Cumprimento Matinal em Coreano',
      explanation: 'Esta é uma expressão calorosa e educada para desejar bom dia a amigos, colegas de trabalho e pessoas conhecidas.',
      breakdown: [
        { korean: '좋은', roman: 'joeun', role: 'Bom / boa (adjetivo que qualifica o substantivo)' },
        { korean: '아침', roman: 'achim', role: 'Manhã / café da manhã' },
        { korean: '이에요', roman: 'ieyo', role: 'Terminação polida e educada do verbo "ser/estar"' }
      ]
    },
    difficulty: 'fácil'
  },
  {
    id: 'srs-2',
    hangul: '물',
    romanization: 'mul',
    translation: 'Água',
    wordSlots: ['물'],
    grammar: {
      title: 'Vocabulário Essencial de Sobrevivência',
      explanation: 'A palavra "물" (mul) é uma das mais importantes na Coreia do Sul. O som final "ㄹ" tem o formato de língua no céu da boca.',
      breakdown: [
        { korean: '물', roman: 'mul', role: 'Água (substantivo puro)' }
      ]
    },
    difficulty: 'fácil'
  },
  {
    id: 'srs-3',
    hangul: '물 주세요',
    romanization: 'mul juseyo',
    translation: 'Água, por favor',
    wordSlots: ['물', '주세요'],
    grammar: {
      title: 'Pedindo Coisas com Educação',
      explanation: 'Adicionar "주세요" (juseyo) após qualquer objeto transforma a frase em um pedido polido ("Dê-me / Por favor").',
      breakdown: [
        { korean: '물', roman: 'mul', role: 'Água' },
        { korean: '주세요', roman: 'juseyo', role: 'Por favor, dê-me (imperativo educado)' }
      ]
    },
    difficulty: 'fácil'
  },
  {
    id: 'srs-4',
    hangul: '좋은 아침이에요. 물 주세요.',
    romanization: 'Joeun achimieyo. Mul juseyo.',
    translation: 'Bom dia. Água, por favor.',
    wordSlots: ['좋은', '아침이에요.', '물', '주세요.'],
    grammar: {
      title: 'Frase Composta Acumulativa',
      explanation: 'Aqui combinamos a saudação matinal que aprendemos com o pedido de água em uma sequência natural do dia a dia.',
      breakdown: [
        { korean: '좋은 아침이에요', roman: 'joeun achimieyo', role: 'Bom dia' },
        { korean: '물 주세요', roman: 'mul juseyo', role: 'Água, por favor' }
      ]
    },
    difficulty: 'acumulativo'
  },
  {
    id: 'srs-5',
    hangul: '감사합니다',
    romanization: 'gamsahamnida',
    translation: 'Muito obrigado',
    wordSlots: ['감사합니다'],
    grammar: {
      title: 'Agradecimento Formal e Respeitoso',
      explanation: 'A forma mais clássica e respeitosa de agradecer na Coreia. Observe a assimilação: a letra ㅂ soa como "m" antes de 니다 ("gam-sa-ham-ni-da").',
      breakdown: [
        { korean: '감사', roman: 'gamsa', role: 'Gratidão (raiz Hanja 感謝)' },
        { korean: '합니다', roman: 'hamnida', role: 'Verbo fazer na terminação formal polida' }
      ]
    },
    difficulty: 'fácil'
  },
  {
    id: 'srs-6',
    hangul: '커피 한 잔 주세요',
    romanization: 'keopi han jan juseyo',
    translation: 'Um café, por favor',
    wordSlots: ['커피', '한 잔', '주세요'],
    grammar: {
      title: 'Contadores e Pedidos em Cafeterias',
      explanation: 'Em coreano, bebidas utilizam o contador "잔" (jan - copo/xícara) precedido pelo número nativo "한" (1).',
      breakdown: [
        { korean: '커피', roman: 'keopi', role: 'Café (empréstimo linguístico)' },
        { korean: '한 잔', roman: 'han jan', role: 'Um copo / uma xícara' },
        { korean: '주세요', roman: 'juseyo', role: 'Por favor, me dê' }
      ]
    },
    difficulty: 'médio'
  }
];
