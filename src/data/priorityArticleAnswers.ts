export interface PriorityArticleAnswer {
  question: string;
  answer: string;
  bullets: string[];
  links?: { href: string; label: string }[];
}

export const priorityArticleAnswers: Record<string, PriorityArticleAnswer> = {
  'o-absinto-do-apocalipse': {
    question: 'O que significa Absinto no Apocalipse?',
    answer:
      'Absinto, em Apocalipse 8, é o nome da estrela ligada à terceira trombeta. A passagem aponta para um juízo que torna parte das águas amarga e mortal, podendo ser entendido de forma literal, simbólica ou como um alerta espiritual sobre a amargura do pecado.',
    bullets: [
      'A profecia aparece em Apocalipse 8:10-11, durante a terceira trombeta.',
      'No Antigo Testamento, absinto costuma simbolizar amargura, juízo e afastamento de Deus.',
      'As interpretações variam entre evento cósmico, desastre humano e corrupção espiritual.',
    ],
    links: [
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas cumpridas' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
    ],
  },
  'profecias-biblicas': {
    question: 'O que são profecias bíblicas?',
    answer:
      'Profecias bíblicas são mensagens reveladas por Deus nas Escrituras. Elas podem anunciar juízo, restauração, a vinda do Messias ou acontecimentos ligados ao fim dos tempos.',
    bullets: [
      'Muitas profecias apontam para Jesus Cristo e seu ministério.',
      'Outras tratam de Israel, das nações e do futuro escatológico.',
      'A interpretação deve considerar contexto, gênero literário e cumprimento histórico.',
    ],
    links: [
      { href: '/profecias-messianicas-cumpridas/', label: 'Profecias messiânicas cumpridas' },
      { href: '/o-absinto-do-apocalipse/', label: 'Absinto no Apocalipse' },
    ],
  },
  'parabola-dos-talentos': {
    question: 'Qual é a mensagem da parábola dos talentos?',
    answer:
      'A parábola dos talentos ensina responsabilidade diante de Deus. Os talentos representam oportunidades confiadas pelo Senhor, e a fidelidade é demonstrada no uso diligente daquilo que recebemos.',
    bullets: [
      'A ênfase da parábola está na fidelidade, não apenas na quantidade recebida.',
      'O servo negligente é repreendido por medo, omissão e falta de obediência.',
      'A lição central é servir a Deus com responsabilidade enquanto aguardamos a volta de Cristo.',
    ],
    links: [
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
      { href: '/tocar-nas-partes-intimas-e-pecado/', label: 'Pureza e vida cristã' },
    ],
  },
  'pos-e-pre-tribulacionismo': {
    question: 'Qual é a diferença entre pré e pós-tribulacionismo?',
    answer:
      'O pré-tribulacionismo ensina que a igreja será arrebatada antes da grande tribulação. O pós-tribulacionismo entende que o arrebatamento acontecerá depois desse período, ligado à manifestação final de Cristo.',
    bullets: [
      'As duas posições procuram harmonizar textos sobre arrebatamento, tribulação e volta de Jesus.',
      'A diferença principal está no momento do arrebatamento em relação à tribulação.',
      'O estudo exige cuidado com Apocalipse, Mateus 24, 1 Tessalonicenses 4 e outras passagens.',
    ],
    links: [
      { href: '/o-absinto-do-apocalipse/', label: 'Terceira trombeta do Apocalipse' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'tocar-nas-partes-intimas-e-pecado': {
    question: 'Tocar nas partes íntimas é pecado?',
    answer:
      'A Bíblia não usa essa frase diretamente, mas ensina princípios sobre pureza, domínio próprio, intenção do coração e fuga da imoralidade sexual. A resposta depende do contexto, da motivação e da consciência diante de Deus.',
    bullets: [
      'O ponto central é avaliar desejo, intenção, vício, culpa e afastamento de Deus.',
      'Pureza bíblica envolve corpo, mente, coração e hábitos.',
      'Quando há escravidão, culpa constante ou prática ligada à pornografia, é necessário buscar arrependimento, ajuda e restauração.',
    ],
    links: [
      { href: '/parabola-dos-talentos/', label: 'Responsabilidade diante de Deus' },
      { href: '/profecias-biblicas/', label: 'Estudos bíblicos' },
    ],
  },
};
