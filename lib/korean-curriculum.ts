export interface KoreanWord {
  id: string;
  level: 1 | 2 | 3 | 4 | 5;
  hangul: string;
  romanization: string;
  translation: string;
  category: 'sobrevivencia' | 'comida' | 'pessoas' | 'lugares' | 'dia-a-dia';
  emoji: string;
  partOfSpeech: 'substantivo' | 'verbo' | 'adjetivo' | 'expressao' | 'adverbio';
}

export interface CurriculumCard {
  id: string;
  level: number;
  type: 'word' | 'short_phrase' | 'combined_phrase';
  hangul: string;
  romanization: string;
  translation: string;
  emoji: string;
  wordSlots: string[];
  grammarTip?: string;
  breakdown?: { korean: string; roman: string; meaning: string }[];
}

export const KOREAN_100_WORDS: KoreanWord[] = [
  // ==========================================
  // NÍVEL 1: ZERO ABSOLUTO (Sobrevivência Imediata) - 20 Palavras
  // ==========================================
  { id: 'w1', level: 1, hangul: '물', romanization: 'mul', translation: 'Água', category: 'sobrevivencia', emoji: '💧', partOfSpeech: 'substantivo' },
  { id: 'w2', level: 1, hangul: '주세요', romanization: 'juseyo', translation: 'Por favor, dê-me', category: 'sobrevivencia', emoji: '🙏', partOfSpeech: 'verbo' },
  { id: 'w3', level: 1, hangul: '네', romanization: 'ne', translation: 'Sim', category: 'sobrevivencia', emoji: '✅', partOfSpeech: 'expressao' },
  { id: 'w4', level: 1, hangul: '아니요', romanization: 'aniyo', translation: 'Não', category: 'sobrevivencia', emoji: '❌', partOfSpeech: 'expressao' },
  { id: 'w5', level: 1, hangul: '감사합니다', romanization: 'gamsahamnida', translation: 'Muito obrigado', category: 'sobrevivencia', emoji: '🙇', partOfSpeech: 'expressao' },
  { id: 'w6', level: 1, hangul: '안녕하세요', romanization: 'annyeonghaseyo', translation: 'Olá / Tudo bem', category: 'sobrevivencia', emoji: '👋', partOfSpeech: 'expressao' },
  { id: 'w7', level: 1, hangul: '밥', romanization: 'bap', translation: 'Arroz / Comida', category: 'comida', emoji: '🍚', partOfSpeech: 'substantivo' },
  { id: 'w8', level: 1, hangul: '커피', romanization: 'keopi', translation: 'Café', category: 'comida', emoji: '☕', partOfSpeech: 'substantivo' },
  { id: 'w9', level: 1, hangul: '이거', romanization: 'igeo', translation: 'Isto', category: 'sobrevivencia', emoji: '👉', partOfSpeech: 'substantivo' },
  { id: 'w10', level: 1, hangul: '저거', romanization: 'jeogeo', translation: 'Aquilo', category: 'sobrevivencia', emoji: '👆', partOfSpeech: 'substantivo' },
  { id: 'w11', level: 1, hangul: '얼마예요', romanization: 'eolmayeyo', translation: 'Quanto custa?', category: 'sobrevivencia', emoji: '🏷️', partOfSpeech: 'expressao' },
  { id: 'w12', level: 1, hangul: '있어요', romanization: 'isseoyo', translation: 'Tem / Existe', category: 'sobrevivencia', emoji: '📦', partOfSpeech: 'verbo' },
  { id: 'w13', level: 1, hangul: '없어요', romanization: 'eopseoyo', translation: 'Não tem', category: 'sobrevivencia', emoji: '🚫', partOfSpeech: 'verbo' },
  { id: 'w14', level: 1, hangul: '좋아요', romanization: 'joayo', translation: 'Gosto / Bom', category: 'dia-a-dia', emoji: '👍', partOfSpeech: 'adjetivo' },
  { id: 'w15', level: 1, hangul: '싫어요', romanization: 'sireoyo', translation: 'Não quero / Não gosto', category: 'dia-a-dia', emoji: '👎', partOfSpeech: 'adjetivo' },
  { id: 'w16', level: 1, hangul: '여기', romanization: 'yeogi', translation: 'Aqui', category: 'lugares', emoji: '📍', partOfSpeech: 'substantivo' },
  { id: 'w17', level: 1, hangul: '저기요', romanization: 'jeogiyo', translation: 'Com licença / Olhe aqui', category: 'sobrevivencia', emoji: '🙋', partOfSpeech: 'expressao' },
  { id: 'w18', level: 1, hangul: '화장실', romanization: 'hwajangsil', translation: 'Banheiro', category: 'lugares', emoji: '🚻', partOfSpeech: 'substantivo' },
  { id: 'w19', level: 1, hangul: '어디예요', romanization: 'eodiyeyo', translation: 'Onde fica?', category: 'lugares', emoji: '🗺️', partOfSpeech: 'expressao' },
  { id: 'w20', level: 1, hangul: '도와주세요', romanization: 'dowajuseyo', translation: 'Por favor, ajude-me', category: 'sobrevivencia', emoji: '🆘', partOfSpeech: 'expressao' },

  // ==========================================
  // NÍVEL 2: CAFÉ, RESTAURANTE & COMPRAS - 20 Palavras
  // ==========================================
  { id: 'w21', level: 2, hangul: '하나', romanization: 'hana', translation: 'Um', category: 'sobrevivencia', emoji: '1️⃣', partOfSpeech: 'substantivo' },
  { id: 'w22', level: 2, hangul: '두 개', romanization: 'du gae', translation: 'Dois itens', category: 'sobrevivencia', emoji: '2️⃣', partOfSpeech: 'substantivo' },
  { id: 'w23', level: 2, hangul: '차', romanization: 'cha', translation: 'Chá', category: 'comida', emoji: '🍵', partOfSpeech: 'substantivo' },
  { id: 'w24', level: 2, hangul: '빵', romanization: 'ppang', translation: 'Pão', category: 'comida', emoji: '🥐', partOfSpeech: 'substantivo' },
  { id: 'w25', level: 2, hangul: '고기', romanization: 'gogi', translation: 'Carne', category: 'comida', emoji: '🥩', partOfSpeech: 'substantivo' },
  { id: 'w26', level: 2, hangul: '맛있어요', romanization: 'masisseoyo', translation: 'É gostoso / delicioso', category: 'comida', emoji: '😋', partOfSpeech: 'adjetivo' },
  { id: 'w27', level: 2, hangul: '메뉴', romanization: 'menyu', translation: 'Cardápio', category: 'comida', emoji: '📜', partOfSpeech: 'substantivo' },
  { id: 'w28', level: 2, hangul: '계산', romanization: 'gyesan', translation: 'Conta / Pagamento', category: 'comida', emoji: '💳', partOfSpeech: 'substantivo' },
  { id: 'w29', level: 2, hangul: '카드', romanization: 'kadeu', translation: 'Cartão', category: 'sobrevivencia', emoji: '💳', partOfSpeech: 'substantivo' },
  { id: 'w30', level: 2, hangul: '현금', romanization: 'hyeongeum', translation: 'Dinheiro vivo', category: 'sobrevivencia', emoji: '💵', partOfSpeech: 'substantivo' },
  { id: 'w31', level: 2, hangul: '영수증', romanization: 'yeongsujeung', translation: 'Recibo / Notinha', category: 'comida', emoji: '🧾', partOfSpeech: 'substantivo' },
  { id: 'w32', level: 2, hangul: '포장', romanization: 'pojang', translation: 'Embalar / Para viagem', category: 'comida', emoji: '🛍️', partOfSpeech: 'substantivo' },
  { id: 'w33', level: 2, hangul: '조금', romanization: 'jogeum', translation: 'Um pouco', category: 'dia-a-dia', emoji: '🤏', partOfSpeech: 'adverbio' },
  { id: 'w34', level: 2, hangul: '많이', romanization: 'mani', translation: 'Muito / Bastante', category: 'dia-a-dia', emoji: '🏔️', partOfSpeech: 'adverbio' },
  { id: 'w35', level: 2, hangul: '더', romanization: 'deo', translation: 'Mais', category: 'dia-a-dia', emoji: '➕', partOfSpeech: 'adverbio' },
  { id: 'w36', level: 2, hangul: '뜨거운', romanization: 'tteugeoun', translation: 'Quente', category: 'comida', emoji: '♨️', partOfSpeech: 'adjetivo' },
  { id: 'w37', level: 2, hangul: '차가운', romanization: 'chagaun', translation: 'Gelado / Frio', category: 'comida', emoji: '🧊', partOfSpeech: 'adjetivo' },
  { id: 'w38', level: 2, hangul: '달콤한', romanization: 'dalkomhan', translation: 'Doce', category: 'comida', emoji: '🍬', partOfSpeech: 'adjetivo' },
  { id: 'w39', level: 2, hangul: '매워요', romanization: 'maewoyo', translation: 'É apimentado', category: 'comida', emoji: '🌶️', partOfSpeech: 'adjetivo' },
  { id: 'w40', level: 2, hangul: '괜찮아요', romanization: 'gwaenchanayo', translation: 'Está tudo bem / Não precisa', category: 'dia-a-dia', emoji: '👌', partOfSpeech: 'expressao' },

  // ==========================================
  // NÍVEL 3: PESSOAS, ENCONTROS & SENTIMENTOS - 20 Palavras
  // ==========================================
  { id: 'w41', level: 3, hangul: '저', romanization: 'jeo', translation: 'Eu (polido)', category: 'pessoas', emoji: '🙋‍♂️', partOfSpeech: 'substantivo' },
  { id: 'w42', level: 3, hangul: '친구', romanization: 'chingu', translation: 'Amigo(a)', category: 'pessoas', emoji: '👫', partOfSpeech: 'substantivo' },
  { id: 'w43', level: 3, hangul: '사람', romanization: 'saram', translation: 'Pessoa', category: 'pessoas', emoji: '👤', partOfSpeech: 'substantivo' },
  { id: 'w44', level: 3, hangul: '한국', romanization: 'hanguk', translation: 'Coreia do Sul', category: 'lugares', emoji: '🇰🇷', partOfSpeech: 'substantivo' },
  { id: 'w45', level: 3, hangul: '브라질', romanization: 'beurajil', translation: 'Brasil', category: 'lugares', emoji: '🇧🇷', partOfSpeech: 'substantivo' },
  { id: 'w46', level: 3, hangul: '이름', romanization: 'ireum', translation: 'Nome', category: 'pessoas', emoji: '📛', partOfSpeech: 'substantivo' },
  { id: 'w47', level: 3, hangul: '만나서', romanization: 'mannaseo', translation: 'Ao encontrar / Te ver', category: 'pessoas', emoji: '🤝', partOfSpeech: 'expressao' },
  { id: 'w48', level: 3, hangul: '반가워요', romanization: 'bangawoyo', translation: 'Prazer em conhecer', category: 'pessoas', emoji: '😊', partOfSpeech: 'expressao' },
  { id: 'w49', level: 3, hangul: '죄송합니다', romanization: 'joesonghamnida', translation: 'Peço desculpas', category: 'dia-a-dia', emoji: '🙇‍♂️', partOfSpeech: 'expressao' },
  { id: 'w50', level: 3, hangul: '잘 가요', romanization: 'jal gayo', translation: 'Tchau (vá em paz)', category: 'pessoas', emoji: '👋', partOfSpeech: 'expressao' },
  { id: 'w51', level: 3, hangul: '잘 있어요', romanization: 'jal isseoyo', translation: 'Tchau (fique em paz)', category: 'pessoas', emoji: '🏠', partOfSpeech: 'expressao' },
  { id: 'w52', level: 3, hangul: '선생님', romanization: 'seonsaengnim', translation: 'Professor(a) / Mestre', category: 'pessoas', emoji: '🧑‍🏫', partOfSpeech: 'substantivo' },
  { id: 'w53', level: 3, hangul: '학생', romanization: 'haksaeng', translation: 'Estudante', category: 'pessoas', emoji: '🎒', partOfSpeech: 'substantivo' },
  { id: 'w54', level: 3, hangul: '가족', romanization: 'gajok', translation: 'Família', category: 'pessoas', emoji: '👨‍👩‍👧', partOfSpeech: 'substantivo' },
  { id: 'w55', level: 3, hangul: '누구', romanization: 'nugu', translation: 'Quem', category: 'pessoas', emoji: '❓', partOfSpeech: 'substantivo' },
  { id: 'w56', level: 3, hangul: '진짜', romanization: 'jinjja', translation: 'Sério? / De verdade', category: 'dia-a-dia', emoji: '😲', partOfSpeech: 'expressao' },
  { id: 'w57', level: 3, hangul: '정말', romanization: 'jeongmal', translation: 'Realmente / Muito', category: 'dia-a-dia', emoji: '💖', partOfSpeech: 'adverbio' },
  { id: 'w58', level: 3, hangul: '대박', romanization: 'daebak', translation: 'Incrível! Sensacional!', category: 'dia-a-dia', emoji: '🌟', partOfSpeech: 'expressao' },
  { id: 'w59', level: 3, hangul: '행복해요', romanization: 'haengbokaeyo', translation: 'Estou feliz', category: 'dia-a-dia', emoji: '😄', partOfSpeech: 'adjetivo' },
  { id: 'w60', level: 3, hangul: '피곤해요', romanization: 'pigonhaeyo', translation: 'Estou cansado(a)', category: 'dia-a-dia', emoji: '🥱', partOfSpeech: 'adjetivo' },

  // ==========================================
  // NÍVEL 4: CIDADE, METRÔ & DESLOCAMENTO - 20 Palavras
  // ==========================================
  { id: 'w61', level: 4, hangul: '지하철', romanization: 'jihacheol', translation: 'Metrô', category: 'lugares', emoji: '🚇', partOfSpeech: 'substantivo' },
  { id: 'w62', level: 4, hangul: '역', romanization: 'yeok', translation: 'Estação', category: 'lugares', emoji: '🚉', partOfSpeech: 'substantivo' },
  { id: 'w63', level: 4, hangul: '버스', romanization: 'beoseu', translation: 'Ônibus', category: 'lugares', emoji: '🚌', partOfSpeech: 'substantivo' },
  { id: 'w64', level: 4, hangul: '택시', romanization: 'taeksi', translation: 'Táxi', category: 'lugares', emoji: '🚕', partOfSpeech: 'substantivo' },
  { id: 'w65', level: 4, hangul: '길', romanization: 'gil', translation: 'Rua / Caminho', category: 'lugares', emoji: '🛣️', partOfSpeech: 'substantivo' },
  { id: 'w66', level: 4, hangul: '가요', romanization: 'gayo', translation: 'Vou / Vai', category: 'lugares', emoji: '🚶', partOfSpeech: 'verbo' },
  { id: 'w67', level: 4, hangul: '와요', romanization: 'wayo', translation: 'Venho / Vem', category: 'lugares', emoji: '🏃', partOfSpeech: 'verbo' },
  { id: 'w68', level: 4, hangul: '집', romanization: 'jip', translation: 'Casa', category: 'lugares', emoji: '🏡', partOfSpeech: 'substantivo' },
  { id: 'w69', level: 4, hangul: '호텔', romanization: 'hotel', translation: 'Hotel', category: 'lugares', emoji: '🏨', partOfSpeech: 'substantivo' },
  { id: 'w70', level: 4, hangul: '공항', romanization: 'gonghang', translation: 'Aeroporto', category: 'lugares', emoji: '✈️', partOfSpeech: 'substantivo' },
  { id: 'w71', level: 4, hangul: '병원', romanization: 'byeongwon', translation: 'Hospital', category: 'lugares', emoji: '🏥', partOfSpeech: 'substantivo' },
  { id: 'w72', level: 4, hangul: '약국', romanization: 'yakguk', translation: 'Farmácia', category: 'lugares', emoji: '💊', partOfSpeech: 'substantivo' },
  { id: 'w73', level: 4, hangul: '편의점', romanization: 'pyeoneuijeom', translation: 'Loja de conveniência', category: 'lugares', emoji: '🏪', partOfSpeech: 'substantivo' },
  { id: 'w74', level: 4, hangul: '식당', romanization: 'sikdang', translation: 'Restaurante', category: 'lugares', emoji: '🍽️', partOfSpeech: 'substantivo' },
  { id: 'w75', level: 4, hangul: '왼쪽', romanization: 'oenjjok', translation: 'Esquerda', category: 'lugares', emoji: '⬅️', partOfSpeech: 'substantivo' },
  { id: 'w76', level: 4, hangul: '오른쪽', romanization: 'oreunjjok', translation: 'Direita', category: 'lugares', emoji: '➡️', partOfSpeech: 'substantivo' },
  { id: 'w77', level: 4, hangul: '직진', romanization: 'jikjin', translation: 'Siga reto', category: 'lugares', emoji: '⬆️', partOfSpeech: 'substantivo' },
  { id: 'w78', level: 4, hangul: '멀어요', romanization: 'meoreoyo', translation: 'É longe', category: 'lugares', emoji: '🔭', partOfSpeech: 'adjetivo' },
  { id: 'w79', level: 4, hangul: '가까워요', romanization: 'gakkawoyo', translation: 'É perto', category: 'lugares', emoji: '📍', partOfSpeech: 'adjetivo' },
  { id: 'w80', level: 4, hangul: '타요', romanization: 'tayo', translation: 'Embarcar / Pegar transporte', category: 'lugares', emoji: '🎟️', partOfSpeech: 'verbo' },

  // ==========================================
  // NÍVEL 5: EXPRESSÕES DIÁRIAS & SOBREVIVÊNCIA AVANÇADA - 20 Palavras
  // ==========================================
  { id: 'w81', level: 5, hangul: '오늘', romanization: 'oneul', translation: 'Hoje', category: 'dia-a-dia', emoji: '📅', partOfSpeech: 'substantivo' },
  { id: 'w82', level: 5, hangul: '내일', romanization: 'naeil', translation: 'Amanhã', category: 'dia-a-dia', emoji: '🌅', partOfSpeech: 'substantivo' },
  { id: 'w83', level: 5, hangul: '지금', romanization: 'jigeum', translation: 'Agora', category: 'dia-a-dia', emoji: '⏰', partOfSpeech: 'substantivo' },
  { id: 'w84', level: 5, hangul: '시간', romanization: 'sigan', translation: 'Hora / Tempo', category: 'dia-a-dia', emoji: '⏳', partOfSpeech: 'substantivo' },
  { id: 'w85', level: 5, hangul: '배고파요', romanization: 'baegopayo', translation: 'Estou com fome', category: 'dia-a-dia', emoji: '🤤', partOfSpeech: 'adjetivo' },
  { id: 'w86', level: 5, hangul: '목말라요', romanization: 'mongmallayo', translation: 'Estou com sede', category: 'dia-a-dia', emoji: '🥤', partOfSpeech: 'adjetivo' },
  { id: 'w87', level: 5, hangul: '보고 싶어요', romanization: 'bogo sipeoyo', translation: 'Estou com saudades / Quero ver', category: 'dia-a-dia', emoji: '💕', partOfSpeech: 'expressao' },
  { id: 'w88', level: 5, hangul: '알겠어요', romanization: 'algesseoyo', translation: 'Entendido / Compreendi', category: 'dia-a-dia', emoji: '💡', partOfSpeech: 'expressao' },
  { id: 'w89', level: 5, hangul: '몰라요', romanization: 'mollayo', translation: 'Não sei', category: 'dia-a-dia', emoji: '🤷', partOfSpeech: 'verbo' },
  { id: 'w90', level: 5, hangul: '잠깐만요', romanization: 'jamkkanmanyo', translation: 'Só um momento / Um minutinho', category: 'dia-a-dia', emoji: '✋', partOfSpeech: 'expressao' },
  { id: 'w91', level: 5, hangul: '빨리', romanization: 'ppalli', translation: 'Rápido', category: 'dia-a-dia', emoji: '⚡', partOfSpeech: 'adverbio' },
  { id: 'w92', level: 5, hangul: '천천히', romanization: 'cheoncheonhi', translation: 'Devagar', category: 'dia-a-dia', emoji: '🐢', partOfSpeech: 'adverbio' },
  { id: 'w93', level: 5, hangul: '어떻게', romanization: 'eotteoke', translation: 'Como?', category: 'dia-a-dia', emoji: '🤔', partOfSpeech: 'adverbio' },
  { id: 'w94', level: 5, hangul: '왜', romanization: 'wae', translation: 'Por quê?', category: 'dia-a-dia', emoji: '💭', partOfSpeech: 'adverbio' },
  { id: 'w95', level: 5, hangul: '언제', romanization: 'eonje', translation: 'Quando?', category: 'dia-a-dia', emoji: '🗓️', partOfSpeech: 'adverbio' },
  { id: 'w96', level: 5, hangul: '파이팅', romanization: 'paiting', translation: 'Força! Ânimo! Bora!', category: 'dia-a-dia', emoji: '✊', partOfSpeech: 'expressao' },
  { id: 'w97', level: 5, hangul: '좋은 아침', romanization: 'joeun achim', translation: 'Bom dia', category: 'dia-a-dia', emoji: '☀️', partOfSpeech: 'expressao' },
  { id: 'w98', level: 5, hangul: '잘 자요', romanization: 'jal jayo', translation: 'Boa noite / Durma bem', category: 'dia-a-dia', emoji: '🌙', partOfSpeech: 'expressao' },
  { id: 'w99', level: 5, hangul: '재미있어요', romanization: 'jaemiisseoyo', translation: 'É muito divertido', category: 'dia-a-dia', emoji: '🥳', partOfSpeech: 'adjetivo' },
  { id: 'w100', level: 5, hangul: '사랑해요', romanization: 'saranghaeyo', translation: 'Eu te amo', category: 'dia-a-dia', emoji: '🫰', partOfSpeech: 'expressao' }
];

export interface LevelInfo {
  level: number;
  title: string;
  subtitle: string;
  badgeEmoji: string;
  color: string;
  wordCount: number;
  phraseCombinationsCount: number;
}

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: 'Nível 1 · Zero Absoluto',
    subtitle: 'Sobrevivência Imediata (Água, Pedidos & Cortesia)',
    badgeEmoji: '🌱',
    color: '#00C3FF',
    wordCount: 20,
    phraseCombinationsCount: 160,
  },
  {
    level: 2,
    title: 'Nível 2 · Café & Compras',
    subtitle: 'Pedindo comida, perguntando preços e pagando',
    badgeEmoji: '☕',
    color: '#F59E0B',
    wordCount: 20,
    phraseCombinationsCount: 240,
  },
  {
    level: 3,
    title: 'Nível 3 · Pessoas & Conexões',
    subtitle: 'Apresentação, sentimentos e fazendo amigos',
    badgeEmoji: '🤝',
    color: '#EC4899',
    wordCount: 20,
    phraseCombinationsCount: 220,
  },
  {
    level: 4,
    title: 'Nível 4 · Cidade & Metrô',
    subtitle: 'Direções, transporte e passeando por Seul',
    badgeEmoji: '🚇',
    color: '#8B5CF6',
    wordCount: 20,
    phraseCombinationsCount: 200,
  },
  {
    level: 5,
    title: 'Nível 5 · Dia a Dia & Fluência',
    subtitle: 'Tempo, expressões naturais e reações coreanas',
    badgeEmoji: '🔥',
    color: '#10B981',
    wordCount: 20,
    phraseCombinationsCount: 260,
  },
];

/**
 * Builds the complete PhD Short-Term Memory SRS queue for a chosen level.
 * Incorporates:
 * 1. Introduction of core words (Visual Dual Coding with Emoji)
 * 2. Combinations with previous words
 * 3. Everyday composite dialogue sentences
 */
export function getLevelCurriculumCards(levelNumber: number = 1): CurriculumCard[] {
  const words = KOREAN_100_WORDS.filter(w => w.level === levelNumber);
  const cards: CurriculumCard[] = [];

  if (levelNumber === 1) {
    // Zero Absoluto Sequence: Scaffolding from single words to everyday combos
    cards.push(
      {
        id: 'lvl1-c1',
        level: 1,
        type: 'word',
        hangul: '물',
        romanization: 'mul',
        translation: 'Água',
        emoji: '💧',
        wordSlots: ['물'],
        grammarTip: 'Substantivo essencial. A pronúncia final "ㄹ" repousa a língua levemente no céu da boca.',
      },
      {
        id: 'lvl1-c2',
        level: 1,
        type: 'word',
        hangul: '주세요',
        romanization: 'juseyo',
        translation: 'Por favor, dê-me',
        emoji: '🙏',
        wordSlots: ['주세요'],
        grammarTip: 'A terminação mais educada para pedir qualquer objeto na Coreia.',
      },
      {
        id: 'lvl1-c3',
        level: 1,
        type: 'combined_phrase',
        hangul: '물 주세요',
        romanization: 'mul juseyo',
        translation: 'Água, por favor',
        emoji: '💧',
        wordSlots: ['물', '주세요'],
        grammarTip: 'Combinando o substantivo "물" com o pedido "주세요".',
      },
      {
        id: 'lvl1-c4',
        level: 1,
        type: 'word',
        hangul: '커피',
        romanization: 'keopi',
        translation: 'Café',
        emoji: '☕',
        wordSlots: ['커피'],
        grammarTip: 'Palavra de origem internacional. O "ㅋ" tem leve sopro de ar.',
      },
      {
        id: 'lvl1-c5',
        level: 1,
        type: 'combined_phrase',
        hangul: '커피 주세요',
        romanization: 'keopi juseyo',
        translation: 'Café, por favor',
        emoji: '☕',
        wordSlots: ['커피', '주세요'],
        grammarTip: 'Aplicando a regra do "주세요" com a nova palavra.',
      },
      {
        id: 'lvl1-c6',
        level: 1,
        type: 'word',
        hangul: '안녕하세요',
        romanization: 'annyeonghaseyo',
        translation: 'Olá / Tudo bem',
        emoji: '👋',
        wordSlots: ['안녕하세요'],
        grammarTip: 'Saudação universal coreana. Use ao entrar em qualquer loja ou café.',
      },
      {
        id: 'lvl1-c7',
        level: 1,
        type: 'combined_phrase',
        hangul: '안녕하세요! 물 주세요.',
        romanization: 'Annyeonghaseyo! Mul juseyo.',
        translation: 'Olá! Água, por favor.',
        emoji: '👋',
        wordSlots: ['안녕하세요!', '물', '주세요.'],
        grammarTip: 'Frase composta realista de cafeteria: saudação + pedido educado.',
      },
      {
        id: 'lvl1-c8',
        level: 1,
        type: 'word',
        hangul: '감사합니다',
        romanization: 'gamsahamnida',
        translation: 'Muito obrigado',
        emoji: '🙇',
        wordSlots: ['감사합니다'],
        grammarTip: 'O "ㅂ" antes de "ㄴ" soa como "m" (gam-sa-ham-ni-da).',
      },
      {
        id: 'lvl1-c9',
        level: 1,
        type: 'word',
        hangul: '이거 얼마예요?',
        romanization: 'Igeo eolmayeyo?',
        translation: 'Quanto custa isto?',
        emoji: '🏷️',
        wordSlots: ['이거', '얼마예요?'],
        grammarTip: '"이거" (isto) + "얼마예요?" (quanto custa?).',
      },
      {
        id: 'lvl1-c10',
        level: 1,
        type: 'combined_phrase',
        hangul: '저기요, 화장실 어디예요?',
        romanization: 'Jeogiyo, hwajangsil eodiyeyo?',
        translation: 'Com licença, onde fica o banheiro?',
        emoji: '🚻',
        wordSlots: ['저기요,', '화장실', '어디예요?'],
        grammarTip: '"저기요" (para chamar atenção) + "화장실" (banheiro) + "어디예요?" (onde é?).',
      },
      {
        id: 'lvl1-c11',
        level: 1,
        type: 'combined_phrase',
        hangul: '밥 있어요?',
        romanization: 'Bap isseoyo?',
        translation: 'Tem comida / arroz?',
        emoji: '🍚',
        wordSlots: ['밥', '있어요?'],
        grammarTip: '"있어요?" significa "tem?" ou "existe?".',
      },
      {
        id: 'lvl1-c12',
        level: 1,
        type: 'combined_phrase',
        hangul: '네, 좋아요. 감사합니다!',
        romanization: 'Ne, joayo. Gamsahamnida!',
        translation: 'Sim, está ótimo. Muito obrigado!',
        emoji: '👍',
        wordSlots: ['네,', '좋아요.', '감사합니다!'],
        grammarTip: 'Expressão de aprovação cordial muito usada na Coreia.',
      }
    );
  } else if (levelNumber === 2) {
    cards.push(
      {
        id: 'lvl2-c1',
        level: 2,
        type: 'word',
        hangul: '빵',
        romanization: 'ppang',
        translation: 'Pão',
        emoji: '🥐',
        wordSlots: ['빵'],
        grammarTip: 'Consoante dupla ㅃ: som tenso e seco, sem soltar ar.',
      },
      {
        id: 'lvl2-c2',
        level: 2,
        type: 'word',
        hangul: '맛있어요',
        romanization: 'masisseoyo',
        translation: 'É delicioso / muito gostoso',
        emoji: '😋',
        wordSlots: ['맛있어요'],
        grammarTip: 'A frase que os coreanos mais adoram ouvir!',
      },
      {
        id: 'lvl2-c3',
        level: 2,
        type: 'combined_phrase',
        hangul: '이 빵 정말 맛있어요!',
        romanization: 'I ppang jeongmal masisseoyo!',
        translation: 'Este pão é realmente delicioso!',
        emoji: '🥐',
        wordSlots: ['이', '빵', '정말', '맛있어요!'],
        grammarTip: 'Combinando "이" (este) + "빵" + "정말" (muito) + "맛있어요".',
      },
      {
        id: 'lvl2-c4',
        level: 2,
        type: 'combined_phrase',
        hangul: '차가운 커피 하나 주세요',
        romanization: 'Chagaun keopi hana juseyo',
        translation: 'Um café gelado, por favor',
        emoji: '🧊',
        wordSlots: ['차가운', '커피', '하나', '주세요'],
        grammarTip: 'Pedido clássico de Iced Americano (Ah-Ah) em Seul.',
      },
      {
        id: 'lvl2-c5',
        level: 2,
        type: 'combined_phrase',
        hangul: '카드로 계산할게요',
        romanization: 'Kadeu-ro gyesan-halgeyo',
        translation: 'Vou pagar com cartão',
        emoji: '💳',
        wordSlots: ['카드로', '계산할게요'],
        grammarTip: '"로" indica o meio ("com cartão"). Na Coreia, cartão é aceito em 99% dos lugares.',
      },
      {
        id: 'lvl2-c6',
        level: 2,
        type: 'combined_phrase',
        hangul: '포장해 주세요. 영수증은 괜찮아요.',
        romanization: 'Pojang-hae juseyo. Yeongsujeung-eun gwaenchanayo.',
        translation: 'Para viagem, por favor. Não precisa de recibo.',
        emoji: '🛍️',
        wordSlots: ['포장해', '주세요.', '영수증은', '괜찮아요.'],
        grammarTip: 'Sequência que você usará todos os dias em lojas de conveniência.',
      }
    );
  } else if (levelNumber === 3) {
    cards.push(
      {
        id: 'lvl3-c1',
        level: 3,
        type: 'word',
        hangul: '만나서 반가워요',
        romanization: 'mannaseo bangawoyo',
        translation: 'Prazer em conhecer você',
        emoji: '🤝',
        wordSlots: ['만나서', '반가워요'],
        grammarTip: 'Expressão indispensável ao ser apresentado a alguém.',
      },
      {
        id: 'lvl3-c2',
        level: 3,
        type: 'combined_phrase',
        hangul: '저는 브라질 사람이에요',
        romanization: 'Jeoneun Beurajil saram-ieyo',
        translation: 'Eu sou brasileiro(a)',
        emoji: '🇧🇷',
        wordSlots: ['저는', '브라질', '사람이에요'],
        grammarTip: '"저는" (eu) + "브라질 사람" (pessoa do Brasil) + "이에요" (sou).',
      },
      {
        id: 'lvl3-c3',
        level: 3,
        type: 'combined_phrase',
        hangul: '대박! 한국어 정말 잘하시네요!',
        romanization: 'Daebak! Hangugeo jeongmal jalhasineyo!',
        translation: 'Incrível! Você fala coreano muito bem!',
        emoji: '🌟',
        wordSlots: ['대박!', '한국어', '정말', '잘하시네요!'],
        grammarTip: '"대박" é a gíria coreana mais famosa para expressar admiração.',
      },
      {
        id: 'lvl3-c4',
        level: 3,
        type: 'combined_phrase',
        hangul: '오늘 정말 행복해요!',
        romanization: 'Oneul jeongmal haengbokaeyo!',
        translation: 'Hoje estou realmente feliz!',
        emoji: '😄',
        wordSlots: ['오늘', '정말', '행복해요!'],
        grammarTip: 'Combinando "오늘" (hoje) com o sentimento "행복해요".',
      }
    );
  } else if (levelNumber === 4) {
    cards.push(
      {
        id: 'lvl4-c1',
        level: 4,
        type: 'combined_phrase',
        hangul: '지하철역 어디예요?',
        romanization: 'Jihacheol-yeok eodiyeyo?',
        translation: 'Onde fica a estação de metrô?',
        emoji: '🚇',
        wordSlots: ['지하철역', '어디예요?'],
        grammarTip: 'Metrô de Seul é o meio de transporte mais rápido e limpo.',
      },
      {
        id: 'lvl4-c2',
        level: 4,
        type: 'combined_phrase',
        hangul: '오른쪽으로 직진하세요',
        romanization: 'Oreunjjogeuro jikjinhaseyo',
        translation: 'Siga reto pela direita',
        emoji: '➡️',
        wordSlots: ['오른쪽으로', '직진하세요'],
        grammarTip: '"오른쪽" (direita) + "으로" (na direção) + "직진" (reto).',
      },
      {
        id: 'lvl4-c3',
        level: 4,
        type: 'combined_phrase',
        hangul: '여기서 가까워요?',
        romanization: 'Yeogiseo gakkawoyo?',
        translation: 'É perto daqui?',
        emoji: '📍',
        wordSlots: ['여기서', '가까워요?'],
        grammarTip: '"여기서" (a partir daqui) + "가까워요?" (é perto?).',
      },
      {
        id: 'lvl4-c4',
        level: 4,
        type: 'combined_phrase',
        hangul: '호텔까지 택시 타요',
        romanization: 'Hotel-kkaji taeksi tayo',
        translation: 'Vou de táxi até o hotel',
        emoji: '🚕',
        wordSlots: ['호텔까지', '택시', '타요'],
        grammarTip: '"까지" significa "até". "타요" significa pegar transporte.',
      }
    );
  } else {
    // Level 5: Fluência & Expressões Naturais do Dia a Dia
    cards.push(
      {
        id: 'lvl5-c1',
        level: 5,
        type: 'combined_phrase',
        hangul: '지금 너무 배고파요. 밥 먹으러 가요!',
        romanization: 'Jigeum neomu baegopayo. Bap meogeureo gayo!',
        translation: 'Estou com muita fome agora. Vamos comer!',
        emoji: '🤤',
        wordSlots: ['지금', '너무', '배고파요.', '밥', '먹으러', '가요!'],
        grammarTip: 'Frase super espontânea que amigos coreanos dizem todos os dias.',
      },
      {
        id: 'lvl5-c2',
        level: 5,
        type: 'combined_phrase',
        hangul: '잠깐만요, 천천히 말해 주세요.',
        romanization: 'Jamkkanmanyo, cheoncheonhi malhae juseyo.',
        translation: 'Só um momento, fale devagar, por favor.',
        emoji: '✋',
        wordSlots: ['잠깐만요,', '천천히', '말해', '주세요.'],
        grammarTip: 'A salvação para quando um nativo falar rápido demais!',
      },
      {
        id: 'lvl5-c3',
        level: 5,
        type: 'combined_phrase',
        hangul: '오늘 하루도 파이팅!',
        romanization: 'Oneul harudo paiting!',
        translation: 'Força e ânimo no dia de hoje também!',
        emoji: '✊',
        wordSlots: ['오늘', '하루도', '파이팅!'],
        grammarTip: '"파이팅" (Fighting!) é o mantra de encorajamento da Coreia.',
      },
      {
        id: 'lvl5-c4',
        level: 5,
        type: 'combined_phrase',
        hangul: '정말 보고 싶었어요. 사랑해요!',
        romanization: 'Jeongmal bogo sipeosseoyo. Saranghaeyo!',
        translation: 'Estava com muitas saudades. Eu te amo!',
        emoji: '🫰',
        wordSlots: ['정말', '보고', '싶었어요.', '사랑해요!'],
        grammarTip: 'Frase carinhosa clássica dos K-Dramas e do dia a dia.',
      }
    );
  }

  return cards;
}
