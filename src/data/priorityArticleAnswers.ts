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
    question: 'Quais profecias bíblicas já se cumpriram?',
    answer:
      'A Bíblia registra profecias que se cumpriram na história de Israel, nas nações vizinhas e na vida de Jesus Cristo. Entre os exemplos estão anúncios feitos por Miquéias, Naum, Joel e Zacarias.',
    bullets: [
      'Miquéias anunciou juízo sobre Jerusalém e apontou para Belém como cidade ligada ao Messias.',
      'Naum profetizou a queda de Nínive, mostrando o juízo de Deus sobre a violência da Assíria.',
      'Joel e Zacarias trazem profecias relacionadas ao derramamento do Espírito e à chegada do Rei humilde.',
    ],
    links: [
      { href: '/profecias-messianicas-cumpridas/', label: 'Profecias messiânicas cumpridas' },
      { href: '/o-absinto-do-apocalipse/', label: 'Absinto no Apocalipse' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Profecias do fim dos tempos' },
    ],
  },
  'profecias-messianicas-cumpridas': {
    question: 'Quais profecias messiânicas Jesus cumpriu?',
    answer:
      'Jesus cumpriu profecias do Antigo Testamento sobre o nascimento, ministério, sofrimento, morte e missão do Messias. Entre os textos mais citados estão Miquéias 5:2, Isaías 53, Salmo 22, Zacarias 9:9 e Zacarias 11:12-13.',
    bullets: [
      'Miquéias anunciou Belém como o lugar ligado ao nascimento do Messias.',
      'Isaías 53 apresenta o Servo Sofredor que leva as transgressões do povo.',
      'Salmo 22 e Zacarias apontam para detalhes da rejeição, sofrimento, traição e entrada humilde do Rei.',
    ],
    links: [
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas cumpridas' },
      { href: '/a-profecia-do-nazareno/', label: 'A profecia do Nazareno' },
      { href: '/onde-jesus-nasceu/', label: 'Onde Jesus nasceu?' },
    ],
  },
  'nao-haviam-mulheres-entre-os-12-apostolos': {
    question: 'Por que não havia mulheres entre os 12 apóstolos?',
    answer:
      'Jesus escolheu 12 homens como apóstolos por causa do simbolismo das 12 tribos de Israel e do contexto cultural e jurídico do primeiro século. Isso não significa que ele desvalorizava as mulheres; os Evangelhos mostram mulheres como discípulas, mantenedoras do ministério e primeiras testemunhas da ressurreição.',
    bullets: [
      'O número 12 apontava para a restauração de Israel e para a fundação do novo povo de Deus.',
      'Mulheres como Maria Madalena, Joana e Susana tiveram papel essencial no ministério de Jesus.',
      'A ausência entre os Doze não apaga o valor, a fé e o serviço das mulheres no Novo Testamento.',
    ],
    links: [
      { href: '/a-mulher-samaritana/', label: 'A mulher samaritana' },
      { href: '/a-fe-de-paulo/', label: 'A fé de Paulo' },
      { href: '/mapa-das-viagens-missionarias-de-paulo/', label: 'Viagens missionárias de Paulo' },
    ],
  },
  'mapa-das-viagens-missionarias-de-paulo': {
    question: 'Quais foram as viagens missionárias de Paulo?',
    answer:
      'O livro de Atos registra três grandes viagens missionárias de Paulo e sua viagem a Roma como prisioneiro. Essas rotas partiram principalmente de Antioquia, alcançaram regiões como Chipre, Galácia, Macedônia, Acaia e Ásia Menor, e ajudaram a formar igrejas importantes do Novo Testamento.',
    bullets: [
      'A primeira viagem aparece em Atos 13-14 e passa por Chipre, Antioquia da Pisídia, Icônio, Listra e Derbe.',
      'A segunda e a terceira viagens expandem a missão para Macedônia, Grécia, Corinto e Éfeso.',
      'A viagem a Roma, em Atos 27-28, mostra Paulo pregando mesmo preso e enfrentando naufrágio.',
    ],
    links: [
      { href: '/a-fe-de-paulo/', label: 'A fé de Paulo' },
      { href: '/apoiar-missionarios/', label: 'Como apoiar missionários' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
    ],
  },
  'o-monte-das-oliveiras-esta-se-abrindo': {
    question: 'O Monte das Oliveiras está se abrindo agora?',
    answer:
      'Até o momento, não há evidência confiável de que o Monte das Oliveiras esteja se dividindo como em Zacarias 14. Rachaduras visíveis podem ter causas comuns, como desgaste do solo ou infraestrutura, mas a profecia bíblica aponta para um evento futuro ligado à volta do Messias.',
    bullets: [
      'Zacarias 14 afirma que o monte será fendido quando o Senhor puser os pés sobre ele.',
      'Atos 1 liga o Monte das Oliveiras à ascensão de Jesus e à promessa de sua volta.',
      'O artigo diferencia sinais geológicos, rumores de internet e esperança profética bíblica.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'parabola-dos-talentos': {
    question: 'O que significa a parábola dos talentos em Mateus 25?',
    answer:
      'A parábola dos talentos, em Mateus 25:14-30, ensina que Deus confia dons, recursos e oportunidades aos seus servos. A fidelidade aparece quando usamos o que recebemos para servir ao Reino, em vez de esconder por medo ou negligência.',
    bullets: [
      'Os dois primeiros servos foram elogiados porque trabalharam com aquilo que receberam.',
      'O servo que enterrou o talento foi repreendido por medo, omissão e infidelidade.',
      'A lição central é viver com responsabilidade, propósito e prontidão enquanto aguardamos a volta de Cristo.',
    ],
    links: [
      { href: '/vida-crista-com-proposito/', label: 'Vida cristã com propósito' },
      { href: '/apoiar-missionarios/', label: 'Servindo ao Reino' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'pos-e-pre-tribulacionismo': {
    question: 'Qual é a diferença entre pré e pós-tribulacionismo?',
    answer:
      'O pré-tribulacionismo ensina que a igreja será arrebatada antes da grande tribulação. O pós-tribulacionismo entende que o arrebatamento acontecerá ao final desse período, junto à manifestação visível de Cristo.',
    bullets: [
      'A diferença central é o momento do arrebatamento em relação aos anos de tribulação.',
      'Há ainda visões intermediárias, como mesotribulacionismo e pré-ira, que tentam harmonizar os textos proféticos.',
      'Os textos mais discutidos incluem Mateus 24, 1 Tessalonicenses 4, Daniel 9 e Apocalipse.',
    ],
    links: [
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/o-absinto-do-apocalipse/', label: 'Terceira trombeta do Apocalipse' },
    ],
  },
  'tocar-nas-partes-intimas-e-pecado': {
    question: 'Tocar nas partes íntimas é pecado?',
    answer:
      'A Bíblia não usa essa frase diretamente, mas ensina princípios sobre pureza, domínio próprio, intenção do coração e fuga da imoralidade sexual. Mais do que o ato isolado, o ponto principal é discernir desejo, intenção, consciência e dependência diante de Deus.',
    bullets: [
      'Pureza bíblica envolve corpo, mente, coração, hábitos e aquilo que alimenta os desejos.',
      'Pornografia, fantasia cultivada e perda de domínio próprio tornam a prática espiritualmente perigosa.',
      'Quando há culpa constante, vício ou escravidão, o caminho cristão envolve arrependimento, ajuda e restauração.',
    ],
    links: [
      { href: '/e-pecado-se-masturbar/', label: 'Masturbação e vida cristã' },
      { href: '/pornografia-e-pecado/', label: 'Pornografia é pecado?' },
      { href: '/parabola-dos-talentos/', label: 'Responsabilidade diante de Deus' },
    ],
  },
};
