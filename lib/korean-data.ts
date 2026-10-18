export interface DialogTurn {
  id: string;
  speaker: 'native' | 'user';
  speakerName: string;
  speakerAvatar: string;
  korean: string;
  romanization: string;
  translation: string;
  phoneticBreakdown: {
    part: string;
    roman: string;
    meaning: string;
    tip?: string;
  }[];
  pronunciationTip?: string;
  keyVocabulary?: {
    word: string;
    meaning: string;
    hanjaOrNotes?: string;
  }[];
}

export interface Scenario {
  id: string;
  title: string;
  koreanTitle: string;
  category: 'dia-a-dia' | 'viagem' | 'social' | 'compras';
  level: 'Iniciante' | 'Básico';
  badgeEmoji: string;
  description: string;
  location: string;
  dialogue: DialogTurn[];
}

export interface HangulCharacter {
  char: string;
  name: string;
  romanization: string;
  audioText: string;
  type: 'consonant' | 'vowel' | 'double_consonant' | 'batchim';
  brazilianSoundHint: string;
  exampleWord: string;
  exampleMeaning: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'cafe-hongdae',
    title: 'Pedindo Café em Hongdae',
    koreanTitle: '홍대 카페에서 주문하기',
    category: 'dia-a-dia',
    level: 'Iniciante',
    badgeEmoji: '☕',
    description: 'Aprenda a pedir o famoso "Iced Americano" (Ah-Ah), escolher o tamanho e pagar com cartão em Seul.',
    location: 'Café em Hongdae, Seul',
    dialogue: [
      {
        id: 'cafe-1',
        speaker: 'native',
        speakerName: 'Atendente Minji (민지)',
        speakerAvatar: '👩🏻‍💼',
        korean: '어서오세요! 주문하시겠어요?',
        romanization: 'Eoseo-oseyo! Jumun-hasigesseoyo?',
        translation: 'Bem-vindo(a)! Deseja fazer o pedido?',
        phoneticBreakdown: [
          { part: '어서오세요', roman: 'eoseo-oseyo', meaning: 'Bem-vindo(a)' },
          { part: '주문하시겠어요?', roman: 'jumun-hasigesseoyo?', meaning: 'Deseja pedir?' }
        ],
        pronunciationTip: 'O som "eo" (어) abre a boca como se fosse falar "ó", mas sem arredondar os lábios.'
      },
      {
        id: 'cafe-2',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '안녕하세요! 아이스 아메리카노 한 잔 주세요.',
        romanization: 'Annyeonghaseyo! Aiseu amerikano han jan juseyo.',
        translation: 'Olá! Um café americano gelado, por favor.',
        phoneticBreakdown: [
          { part: '안녕하세요', roman: 'annyeonghaseyo', meaning: 'Olá / Bom dia' },
          { part: '아이스 아메리카노', roman: 'aiseu amerikano', meaning: 'Iced Americano' },
          { part: '한 잔', roman: 'han jan', meaning: 'Um copo / uma xícara' },
          { part: '주세요', roman: 'juseyo', meaning: 'Por favor, dê-me' }
        ],
        pronunciationTip: 'Termine "juseyo" (주세요) com entonação suave e educada, sem pressa no "yo".',
        keyVocabulary: [
          { word: '한 잔', meaning: 'Um copo (contador de bebidas)' },
          { word: '주세요', meaning: 'Por favor / dê-me' }
        ]
      },
      {
        id: 'cafe-3',
        speaker: 'native',
        speakerName: 'Atendente Minji (민지)',
        speakerAvatar: '👩🏻‍💼',
        korean: '네, 드시고 가세요, 아니면 포장이세요?',
        romanization: 'Ne, deushigo gaseyo, animyeon pojang-iseyo?',
        translation: 'Sim, vai tomar aqui ou é para viagem?',
        phoneticBreakdown: [
          { part: '드시고 가세요', roman: 'deushigo gaseyo', meaning: 'Consumir aqui' },
          { part: '아니면', roman: 'animyeon', meaning: 'Ou / caso contrário' },
          { part: '포장이세요?', roman: 'pojang-iseyo?', meaning: 'É para viagem (embalar)?' }
        ],
        pronunciationTip: '"Pojang" (포장) significa embalar/levar. O "P" (ㅍ) tem uma leve expiração de ar.'
      },
      {
        id: 'cafe-4',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '포장해 주세요. 카드로 계산할게요.',
        romanization: 'Pojang-hae juseyo. Kadeu-ro gyesan-halgeyo.',
        translation: 'Para viagem, por favor. Vou pagar com cartão.',
        phoneticBreakdown: [
          { part: '포장해 주세요', roman: 'pojang-hae juseyo', meaning: 'Por favor, embale para viagem' },
          { part: '카드로', roman: 'kadeu-ro', meaning: 'Com cartão' },
          { part: '계산할게요', roman: 'gyesan-halgeyo', meaning: 'Vou pagar / fazer o cálculo' }
        ],
        pronunciationTip: 'Em "gyesan-halgeyo", o "h" (ㅎ) soa suave como o som de "r" em inglês ou "h" aspirado.',
        keyVocabulary: [
          { word: '카드', meaning: 'Cartão de crédito/débito' },
          { word: '계산', meaning: 'Conta / Pagamento' }
        ]
      },
      {
        id: 'cafe-5',
        speaker: 'native',
        speakerName: 'Atendente Minji (민지)',
        speakerAvatar: '👩🏻‍💼',
        korean: '감사합니다! 영수증 필요하세요?',
        romanization: 'Gamsahamnida! Yeongsujeung piryohaseyo?',
        translation: 'Muito obrigado! Precisa de recibo (notinha)?',
        phoneticBreakdown: [
          { part: '감사합니다', roman: 'gamsahamnida', meaning: 'Muito obrigado' },
          { part: '영수증', roman: 'yeongsujeung', meaning: 'Recibo / Notinha fiscal' },
          { part: '필요하세요?', roman: 'piryohaseyo?', meaning: 'Você precisa?' }
        ],
        pronunciationTip: 'Em "gamsahamnida", o ㅂ antes de ㄴ soa como "m" (gam-sa-ham-ni-da) devido à assimilação nasal.'
      },
      {
        id: 'cafe-6',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '아니요, 괜찮아요. 감사합니다!',
        romanization: 'Aniyo, gwaenchanayo. Gamsahamnida!',
        translation: 'Não, tudo bem (não precisa). Muito obrigado!',
        phoneticBreakdown: [
          { part: '아니요', roman: 'aniyo', meaning: 'Não' },
          { part: '괜찮아요', roman: 'gwaenchanayo', meaning: 'Tudo bem / Sem problemas' },
          { part: '감사합니다', roman: 'gamsahamnida', meaning: 'Muito obrigado' }
        ],
        pronunciationTip: '"Gwaenchanayo" (괜찮아요): o batchim ㄶ é assimilado e você ouve apenas "gwaen-cha-na-yo".',
        keyVocabulary: [
          { word: '괜찮아요', meaning: 'Está tudo bem / Não precisa' }
        ]
      }
    ]
  },
  {
    id: 'convenience-cu',
    title: 'Na Loja de Conveniência (CU / GS25)',
    koreanTitle: '편의점에서 간식 사기',
    category: 'compras',
    level: 'Iniciante',
    badgeEmoji: '🏪',
    description: 'Compre lanchinhos coreanos, peça para esquentar o Onigiri (Samgak Kimbap) e peça sacola.',
    location: 'Loja de Conveniência GS25 em Myeongdong',
    dialogue: [
      {
        id: 'cu-1',
        speaker: 'native',
        speakerName: 'Funcionário Junho (준호)',
        speakerAvatar: '👨🏻‍🦱',
        korean: '안녕하세요, 봉투 필요하세요?',
        romanization: 'Annyeonghaseyo, bongtu piryohaseyo?',
        translation: 'Olá, precisa de sacola?',
        phoneticBreakdown: [
          { part: '봉투', roman: 'bongtu', meaning: 'Sacola plástica' },
          { part: '필요하세요?', roman: 'piryohaseyo?', meaning: 'Precisa?' }
        ],
        pronunciationTip: 'Bongtu (봉투) tem o som nasal "ng" seguido pelo "t" nítido.'
      },
      {
        id: 'cu-2',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '네, 작은 봉투 하나 주세요.',
        romanization: 'Ne, jageun bongtu hana juseyo.',
        translation: 'Sim, uma sacola pequena, por favor.',
        phoneticBreakdown: [
          { part: '네', roman: 'ne', meaning: 'Sim' },
          { part: '작은', roman: 'jageun', meaning: 'Pequena' },
          { part: '봉투 하나', roman: 'bongtu hana', meaning: 'Uma sacola' },
          { part: '주세요', roman: 'juseyo', meaning: 'Por favor dê-me' }
        ],
        pronunciationTip: 'Hana (하나) é o número 1 no sistema nativo coreano.'
      },
      {
        id: 'cu-3',
        speaker: 'native',
        speakerName: 'Funcionário Junho (준호)',
        speakerAvatar: '👨🏻‍🦱',
        korean: '삼각김밥 데워 드릴까요?',
        romanization: 'Samgak-gimbap dewo deurilkkayo?',
        translation: 'Quer que eu esquente o Kimbap triangular?',
        phoneticBreakdown: [
          { part: '삼각김밥', roman: 'samgak-gimbap', meaning: 'Kimbap triangular' },
          { part: '데워 드릴까요?', roman: 'dewo deurilkkayo?', meaning: 'Posso esquentar para você?' }
        ],
        pronunciationTip: 'Dewo (데워) vem do verbo aquecer. Pergunta muito comum em lojas coreanas.'
      },
      {
        id: 'cu-4',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '네, 조금만 데워 주세요.',
        romanization: 'Ne, jogeum-man dewo juseyo.',
        translation: 'Sim, esquente só um pouquinho, por favor.',
        phoneticBreakdown: [
          { part: '조금만', roman: 'jogeum-man', meaning: 'Só um pouco / um pouquinho' },
          { part: '데워 주세요', roman: 'dewo juseyo', meaning: 'Por favor, esquente' }
        ],
        pronunciationTip: 'O "man" (만) significa "apenas / somente". Pronuncie "jogeum" suave.'
      }
    ]
  },
  {
    id: 'subway-station',
    title: 'No Metrô de Seul (Subway)',
    koreanTitle: '서울 지하철에서 길 묻기',
    category: 'viagem',
    level: 'Iniciante',
    badgeEmoji: '🚇',
    description: 'Descubra qual linha pegar para ir até Gangnam e aprenda a perguntar direções.',
    location: 'Estação de Metrô Cidade Universitária',
    dialogue: [
      {
        id: 'sub-1',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '저기요, 실례합니다. 강남역 어디예요?',
        romanization: 'Jeogiyo, sillyehamnida. Gangnam-yeok eodiyeyo?',
        translation: 'Com licença, por favor. Onde fica a estação de Gangnam?',
        phoneticBreakdown: [
          { part: '저기요', roman: 'jeogiyo', meaning: 'Com licença (chamar atenção)' },
          { part: '실례합니다', roman: 'sillyehamnida', meaning: 'Desculpe o incômodo' },
          { part: '강남역', roman: 'gangnam-yeok', meaning: 'Estação de Gangnam' },
          { part: '어디예요?', roman: 'eodiyeyo?', meaning: 'Onde é?' }
        ],
        pronunciationTip: '"Jeogiyo" é a melhor expressão para chamar a atenção educadamente em público.'
      },
      {
        id: 'sub-2',
        speaker: 'native',
        speakerName: 'Passageiro Jisoo (지수)',
        speakerAvatar: '🧑🏻',
        korean: '2호선 타시면 돼요. 저쪽으로 가세요.',
        romanization: 'I-ho-seon tasimyeon dwaeyo. Jeojjogeuro gaseyo.',
        translation: 'Basta pegar a Linha 2 (Verde). Vá por aquele lado.',
        phoneticBreakdown: [
          { part: '2호선', roman: 'i-ho-seon', meaning: 'Linha 2' },
          { part: '타시면 돼요', roman: 'tasimyeon dwaeyo', meaning: 'Se você pegar, dá certo' },
          { part: '저쪽으로', roman: 'jeojjogeuro', meaning: 'Naquela direção' },
          { part: '가세요', roman: 'gaseyo', meaning: 'Por favor, vá' }
        ],
        pronunciationTip: 'Linhas de metrô usam números sino-coreanos: 1 (il), 2 (i), 3 (sam), etc.'
      },
      {
        id: 'sub-3',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '정말 친절하시네요. 정말 감사합니다!',
        romanization: 'Jeongmal chinjeolhasineyo. Jeongmal gamsahamnida!',
        translation: 'Você é muito gentil. Muito obrigado mesmo!',
        phoneticBreakdown: [
          { part: '정말', roman: 'jeongmal', meaning: 'Realmente / muito' },
          { part: '친절하시네요', roman: 'chinjeolhasineyo', meaning: 'Você é tão gentil' },
          { part: '감사합니다', roman: 'gamsahamnida', meaning: 'Obrigado' }
        ],
        pronunciationTip: '"Jeongmal" (정말) enfatiza sinceridade e gratidão calorosa.'
      }
    ]
  },
  {
    id: 'first-meeting',
    title: 'Apresentação & Fazendo Amigos',
    koreanTitle: '자기소개와 친구 사귀기',
    category: 'social',
    level: 'Iniciante',
    badgeEmoji: '🤝',
    description: 'Diga seu nome, de onde você vem (Brasil) e estabeleça uma primeira conexão amigável.',
    location: 'Encontro cultural em Gangnam',
    dialogue: [
      {
        id: 'meet-1',
        speaker: 'native',
        speakerName: 'Amigo coreano Hyun (현)',
        speakerAvatar: '🙋🏻‍♂️',
        korean: '안녕하세요! 저는 김태현이에요. 이름이 뭐예요?',
        romanization: 'Annyeonghaseyo! Jeoneun Kim Taehyun-ieyo. Ireumi mwoyeyo?',
        translation: 'Olá! Eu sou o Kim Taehyun. Qual é o seu nome?',
        phoneticBreakdown: [
          { part: '저는', roman: 'jeoneun', meaning: 'Eu (humilde)' },
          { part: '이름이', roman: 'ireumi', meaning: 'Nome' },
          { part: '뭐예요?', roman: 'mwoyeyo?', meaning: 'O que é / qual é?' }
        ],
        pronunciationTip: 'Ireumi (이름이): o "m" da sílaba 름 se liga ao 이 ("i-reu-mi").'
      },
      {
        id: 'meet-2',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '만나서 반가워요. 저는 브라질 사람이에요.',
        romanization: 'Mannaseo bangawoyo. Jeoneun Beurajil saram-ieyo.',
        translation: 'Prazer em conhecê-lo. Eu sou brasileiro(a).',
        phoneticBreakdown: [
          { part: '만나서 반가워요', roman: 'mannaseo bangawoyo', meaning: 'Prazer em conhecer' },
          { part: '저는', roman: 'jeoneun', meaning: 'Eu' },
          { part: '브라질 사람', roman: 'beurajil saram', meaning: 'Pessoa do Brasil' },
          { part: '이에요', roman: 'ieyo', meaning: 'Sou' }
        ],
        pronunciationTip: '"Beurajil" (브라질) é como os coreanos pronunciam Brasil. O "ㄹ" final é uma líquida leve.',
        keyVocabulary: [
          { word: '브라질', meaning: 'Brasil' },
          { word: '사람', meaning: 'Pessoa / nacionalidade' }
        ]
      },
      {
        id: 'meet-3',
        speaker: 'native',
        speakerName: 'Amigo coreano Hyun (현)',
        speakerAvatar: '🙋🏻‍♂️',
        korean: '와, 브라질이요? 한국어 정말 잘하시네요!',
        romanization: 'Wa, Beurajiriyo? Hangugeo jeongmal jalhasineyo!',
        translation: 'Nossa, Brasil? Você fala coreano muito bem!',
        phoneticBreakdown: [
          { part: '와', roman: 'wa', meaning: 'Uau / nossa' },
          { part: '한국어', roman: 'hangugeo', meaning: 'Língua coreana' },
          { part: '잘하시네요!', roman: 'jalhasineyo!', meaning: 'Você faz muito bem!' }
        ],
        pronunciationTip: 'Elogio clássico na Coreia! Sempre responda com modéstia simpática.'
      },
      {
        id: 'meet-4',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '아니에요, 아직 배우고 있어요. 앞으로 잘 부탁드려요!',
        romanization: 'Anieyo, ajik baeugo isseoyo. Apeuro jal butakdeuryeoyo!',
        translation: 'Não é tanto assim, ainda estou aprendendo. Conto com você daqui pra frente!',
        phoneticBreakdown: [
          { part: '아니에요', roman: 'anieyo', meaning: 'Não é isso / imagina' },
          { part: '아직', roman: 'ajik', meaning: 'Ainda' },
          { part: '배우고 있어요', roman: 'baeugo isseoyo', meaning: 'Estou aprendendo' },
          { part: '잘 부탁드려요', roman: 'jal butakdeuryeoyo', meaning: 'Por favor, cuide bem de mim' }
        ],
        pronunciationTip: '"Jal butakdeuryeoyo" é uma das frases mais importantes e calorosas da cultura coreana!'
      }
    ]
  },
  {
    id: 'k-restaurant',
    title: 'No Restaurante de K-Barbecue',
    koreanTitle: '고깃집에서 삼겹살 주문하기',
    category: 'dia-a-dia',
    level: 'Iniciante',
    badgeEmoji: '🥩',
    description: 'Chame o garçom com "Yeogiyo!", peça porções de carne e água gelada com acompanhamentos.',
    location: 'Restaurante tradicional em Itaewon',
    dialogue: [
      {
        id: 'kbbq-1',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '여기요! 삼겹살 2인분 주세요.',
        romanization: 'Yeogiyo! Samgyeopsal i-inbun juseyo.',
        translation: 'Aqui, por favor! Duas porções de Samgyeopsal, por favor.',
        phoneticBreakdown: [
          { part: '여기요!', roman: 'yeogiyo!', meaning: 'Aqui! (para chamar o garçom)' },
          { part: '삼겹살', roman: 'samgyeopsal', meaning: 'Panceta de porco (barriga)' },
          { part: '2인분', roman: 'i-inbun', meaning: '2 porções de pessoa' },
          { part: '주세요', roman: 'juseyo', meaning: 'Por favor' }
        ],
        pronunciationTip: '"Yeogiyo!" (com tom firme e claro) é a forma correta e esperada para chamar os garçons na Coreia.'
      },
      {
        id: 'kbbq-2',
        speaker: 'native',
        speakerName: 'Dona do Restaurante Imo (이모)',
        speakerAvatar: '👩🏻‍🍳',
        korean: '네~ 물이랑 반찬 먼저 갖다 드릴게요!',
        romanization: 'Ne~ Murirang banchan meonjeo gatda deurilgeyo!',
        translation: 'Sim~ Vou trazer a água e os acompanhamentos primeiro!',
        phoneticBreakdown: [
          { part: '물이랑', roman: 'murirang', meaning: 'Água e...' },
          { part: '반찬', roman: 'banchan', meaning: 'Acompanhamentos (kimchi, etc)' },
          { part: '먼저', roman: 'meonjeo', meaning: 'Primeiro' }
        ],
        pronunciationTip: 'Os "banchan" (반찬) são gratuitos e recarregáveis em restaurantes coreanos!'
      },
      {
        id: 'kbbq-3',
        speaker: 'user',
        speakerName: 'Você (나)',
        speakerAvatar: '🧑🏽',
        korean: '이모님, 김치 더 주실 수 있나요?',
        romanization: 'Imo-nim, gimchi deo jusil su innayo?',
        translation: 'Tia (Imo), poderia nos dar mais kimchi?',
        phoneticBreakdown: [
          { part: '이모님', roman: 'imo-nim', meaning: 'Tia carinhosa (dona de restaurante)' },
          { part: '김치 더', roman: 'gimchi deo', meaning: 'Mais kimchi' },
          { part: '주실 수 있나요?', roman: 'jusil su innayo?', meaning: 'Pode nos dar?' }
        ],
        pronunciationTip: 'Chamar a dona de "Imo-nim" (이모님) gera um sorriso imediato de simpatia.'
      }
    ]
  }
];

export const HANGUL_ALPHABET: HangulCharacter[] = [
  // Consoantes Básicas
  { char: 'ㄱ', name: 'Giyeok (기역)', romanization: 'g / k', audioText: '기역', type: 'consonant', brazilianSoundHint: 'Como "g" em gato no início de palavra, ou "k" suave', exampleWord: '가방 (gabang)', exampleMeaning: 'Mochila / Bolsa' },
  { char: 'ㄴ', name: 'Nieun (니은)', romanization: 'n', audioText: '니은', type: 'consonant', brazilianSoundHint: 'Igual ao "n" em navio', exampleWord: '나무 (namu)', exampleMeaning: 'Árvore' },
  { char: 'ㄷ', name: 'Digeut (디귿)', romanization: 'd / t', audioText: '디귿', type: 'consonant', brazilianSoundHint: 'Como "d" suave em dado ou "t"', exampleWord: '다리 (dari)', exampleMeaning: 'Perna / Ponte' },
  { char: 'ㄹ', name: 'Rieul (리을)', romanization: 'r / l', audioText: '리을', type: 'consonant', brazilianSoundHint: 'Como o "r" de arara entre vogais; como "l" no final de sílaba', exampleWord: '라면 (ramyeon)', exampleMeaning: 'Miojo coreano' },
  { char: 'ㅁ', name: 'Mieum (미음)', romanization: 'm', audioText: '미음', type: 'consonant', brazilianSoundHint: 'Igual ao "m" em mãe', exampleWord: '모자 (moja)', exampleMeaning: 'Chapéu / Boné' },
  { char: 'ㅂ', name: 'Bieup (비읍)', romanization: 'b / p', audioText: '비읍', type: 'consonant', brazilianSoundHint: 'Como "b" leve em bola ou "p"', exampleWord: '바다 (bada)', exampleMeaning: 'Mar / Oceano' },
  { char: 'ㅅ', name: 'Siot (시옷)', romanization: 's', audioText: '시옷', type: 'consonant', brazilianSoundHint: 'Como "s" em sapo. Antes de "i", soa como "sh" (ch)', exampleWord: '사과 (sagwa)', exampleMeaning: 'Maçã' },
  { char: 'ㅇ', name: 'Ieung (이응)', romanization: 'mudo / ng', audioText: '이응', type: 'consonant', brazilianSoundHint: 'Silencioso no início da sílaba; som de "ng" (como no inglês song) no final', exampleWord: '아이 (ai)', exampleMeaning: 'Criança' },
  { char: 'ㅈ', name: 'Jieut (지읒)', romanization: 'j / ch', audioText: '지읒', type: 'consonant', brazilianSoundHint: 'Como o "dj" em jeans ou "tch"', exampleWord: '지도 (jido)', exampleMeaning: 'Mapa' },
  { char: 'ㅊ', name: 'Chieut (치읓)', romanization: 'ch (aspirado)', audioText: '치읓', type: 'consonant', brazilianSoundHint: 'Como "tch" em tchau, soltando ar perceptível', exampleWord: '친구 (chingu)', exampleMeaning: 'Amigo(a)' },
  { char: 'ㅋ', name: 'Kieuk (키읔)', romanization: 'k (aspirado)', audioText: '키읔', type: 'consonant', brazilianSoundHint: 'Como "k" forte soltando uma rajada de ar', exampleWord: '커피 (keopi)', exampleMeaning: 'Café' },
  { char: 'ㅌ', name: 'Tieut (티읕)', romanization: 't (aspirado)', audioText: '티읕', type: 'consonant', brazilianSoundHint: 'Como "t" forte soltando uma rajada de ar', exampleWord: '토마토 (tomato)', exampleMeaning: 'Tomate' },
  { char: 'ㅍ', name: 'Pieup (피읖)', romanization: 'p (aspirado)', audioText: '피읖', type: 'consonant', brazilianSoundHint: 'Como "p" soltando ar (soprado)', exampleWord: '포도 (podo)', exampleMeaning: 'Uva' },
  { char: 'ㅎ', name: 'Hieut (히읗)', romanization: 'h', audioText: '히읗', type: 'consonant', brazilianSoundHint: 'Como o "r" carioca ou o "h" do inglês (house)', exampleWord: '하늘 (haneul)', exampleMeaning: 'Céu' },

  // Consoantes Duplas (Tensas)
  { char: 'ㄲ', name: 'Ssang-giyeok', romanization: 'kk', audioText: '쌍기역', type: 'double_consonant', brazilianSoundHint: 'Som tenso e seco, sem soltar ar nenhum', exampleWord: '꽃 (kkot)', exampleMeaning: 'Flor' },
  { char: 'ㄸ', name: 'Ssang-digeut', romanization: 'tt', audioText: '쌍디귿', type: 'double_consonant', brazilianSoundHint: 'Som de "t" firme e travado na garganta', exampleWord: '떡 (tteok)', exampleMeaning: 'Massa de arroz' },
  { char: 'ㅃ', name: 'Ssang-bieup', romanization: 'pp', audioText: '쌍비읍', type: 'double_consonant', brazilianSoundHint: 'Som de "p" firme e explosivo sem ar', exampleWord: '빵 (ppang)', exampleMeaning: 'Pão' },
  { char: 'ㅆ', name: 'Ssang-siot', romanization: 'ss', audioText: '쌍시옷', type: 'double_consonant', brazilianSoundHint: 'Som de "ss" bem sibilante e tenso', exampleWord: '쌀 (ssal)', exampleMeaning: 'Arroz cru' },
  { char: 'ㅉ', name: 'Ssang-jieut', romanization: 'jj', audioText: '쌍지읒', type: 'double_consonant', brazilianSoundHint: 'Som de "tch" bem seco e tenso', exampleWord: '찌개 (jjigae)', exampleMeaning: 'Ensopado coreano' },

  // Vogais Básicas
  { char: 'ㅏ', name: 'A', romanization: 'a', audioText: '아', type: 'vowel', brazilianSoundHint: 'Como o "a" aberto em casa', exampleWord: '아버지 (abeoji)', exampleMeaning: 'Pai' },
  { char: 'ㅑ', name: 'Ya', romanization: 'ya', audioText: '야', type: 'vowel', brazilianSoundHint: 'Como o "ia" em iate', exampleWord: '야구 (yagu)', exampleMeaning: 'Beisebol' },
  { char: 'ㅓ', name: 'Eo', romanization: 'eo', audioText: '어', type: 'vowel', brazilianSoundHint: 'Abra a boca como para falar "a", mas tente dizer "ó" sem arredondar lábios', exampleWord: '어머니 (eomeoni)', exampleMeaning: 'Mãe' },
  { char: 'ㅕ', name: 'Yeo', romanization: 'yeo', audioText: '여', type: 'vowel', brazilianSoundHint: 'Como "i" seguido do som do "eo"', exampleWord: '여자 (yeoja)', exampleMeaning: 'Mulher' },
  { char: 'ㅗ', name: 'O', romanization: 'o', audioText: '오', type: 'vowel', brazilianSoundHint: 'Como o "o" bem fechado e lábios arredondados (bico)', exampleWord: '오이 (oi)', exampleMeaning: 'Pepino' },
  { char: 'ㅛ', name: 'Yo', romanization: 'yo', audioText: '요', type: 'vowel', brazilianSoundHint: 'Como "io" com biquinho', exampleWord: '요리 (yori)', exampleMeaning: 'Culinária / Cozinhar' },
  { char: 'ㅜ', name: 'U', romanization: 'u', audioText: '우', type: 'vowel', brazilianSoundHint: 'Como o "u" em uva com lábios redondos', exampleWord: '우유 (uyu)', exampleMeaning: 'Leite' },
  { char: 'ㅠ', name: 'Yu', romanization: 'yu', audioText: '유', type: 'vowel', brazilianSoundHint: 'Como "iu" em iúça', exampleWord: '유리 (yuri)', exampleMeaning: 'Vidro' },
  { char: 'ㅡ', name: 'Eu', romanization: 'eu', audioText: '으', type: 'vowel', brazilianSoundHint: 'Sorria mostrando os dentes e tente dizer "u" sem mexer a boca!', exampleWord: '음식 (eumsik)', exampleMeaning: 'Comida' },
  { char: 'ㅣ', name: 'I', romanization: 'i', audioText: '이', type: 'vowel', brazilianSoundHint: 'Como o "i" em ilha', exampleWord: '이름 (ireum)', exampleMeaning: 'Nome' },
  { char: 'ㅐ', name: 'Ae', romanization: 'ae', audioText: '애', type: 'vowel', brazilianSoundHint: 'Como o "é" aberto em festa', exampleWord: '새 (sae)', exampleMeaning: 'Pássaro' },
  { char: 'ㅔ', name: 'E', romanization: 'e', audioText: 'e', type: 'vowel', brazilianSoundHint: 'Como o "ê" fechado em você', exampleWord: '세계 (segye)', exampleMeaning: 'Mundo' }
];

export const DAILY_PHRASES = [
  {
    korean: '안녕하세요!',
    romanization: 'Annyeonghaseyo!',
    translation: 'Olá! / Bom dia!',
    context: 'Cumprimento universal mais usado na Coreia'
  },
  {
    korean: '감사합니다!',
    romanization: 'Gamsahamnida!',
    translation: 'Muito obrigado(a)!',
    context: 'A forma mais respeitosa de agradecer'
  },
  {
    korean: '죄송합니다.',
    romanization: 'Joesonghamnida.',
    translation: 'Peço desculpas / Sinto muito.',
    context: 'Use quando cometer um engano ou esbarrar em alguém'
  },
  {
    korean: '이거 얼마예요?',
    romanization: 'Igeo eolmayeyo?',
    translation: 'Quanto custa isto?',
    context: 'Essencial para compras em qualquer loja'
  },
  {
    korean: '맛있게 드세요!',
    romanization: 'Masitge deuseyo!',
    translation: 'Bom apetite! / Coma deliciosamente!',
    context: 'Dito antes das refeições para os outros'
  },
  {
    korean: '도와주세요!',
    romanization: 'Dowajuseyo!',
    translation: 'Por favor, ajude-me!',
    context: 'Para pedir socorro ou auxílio'
  }
];
