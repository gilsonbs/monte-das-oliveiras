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
  'sinais-do-fim': {
    question: 'Quais são os sinais do fim dos tempos?',
    answer:
      'Jesus falou sobre guerras, rumores de guerras, falsos cristos, perseguições, esfriamento do amor e a pregação do evangelho como sinais ligados ao fim dos tempos. Esses sinais devem despertar vigilância, santidade e esperança, não medo descontrolado.',
    bullets: [
      'Mateus 24 é uma das principais passagens sobre sinais, tribulação e vigilância.',
      'A Bíblia alerta contra datas marcadas e interpretações sensacionalistas.',
      'O foco cristão é permanecer fiel enquanto aguarda a volta de Cristo.',
    ],
    links: [
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'a-volta-de-jesus-os-sinais': {
    question: 'Quais sinais apontam para a volta de Jesus?',
    answer:
      'A volta de Jesus é apresentada na Bíblia como certa, visível e ligada à consumação do Reino de Deus. Os sinais servem como alertas espirituais, mas a expectativa cristã deve produzir preparo, fidelidade e perseverança.',
    bullets: [
      'Jesus ensinou seus discípulos a vigiar porque ninguém sabe o dia nem a hora.',
      'Os sinais bíblicos incluem engano religioso, conflitos, perseguição e expansão do evangelho.',
      'A esperança da volta de Cristo deve fortalecer a fé em vez de alimentar ansiedade.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/sermao-profetico-do-monte-das-oliveiras/', label: 'Sermão profético' },
      { href: '/preparacao-para-o-arrebatamento/', label: 'Preparação espiritual' },
    ],
  },
  '5-sinais-que-guerra-em-israel-nao-e-acidente': {
    question: 'A guerra em Israel tem relação com profecias bíblicas?',
    answer:
      'Conflitos envolvendo Israel despertam interesse profético porque a Bíblia dá atenção especial a Jerusalém, às nações e ao cenário do fim dos tempos. Ainda assim, é preciso interpretar os acontecimentos com prudência, sem transformar cada notícia em cumprimento definitivo.',
    bullets: [
      'Israel e Jerusalém aparecem em várias profecias bíblicas sobre juízo, restauração e conflito.',
      'A leitura cristã precisa equilibrar atenção aos sinais e cuidado contra especulação.',
      'O artigo conecta acontecimentos atuais com temas bíblicos sem substituir o estudo das Escrituras.',
    ],
    links: [
      { href: '/profecia-biblica-e-o-conflito-no-oriente-medio/', label: 'Conflito no Oriente Médio' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'dores-do-parto-profecia-israel-jubileu': {
    question: 'O que são as dores de parto na profecia bíblica?',
    answer:
      'Na linguagem bíblica, dores de parto representam um período de aflição que antecede algo decisivo no plano de Deus. Jesus usa essa imagem para falar de sinais que não devem gerar pânico, mas discernimento e perseverança.',
    bullets: [
      'A expressão aparece ligada a sofrimento, expectativa e transição espiritual.',
      'Em Mateus 24, guerras e calamidades são chamadas de princípio das dores.',
      'A resposta cristã aos sinais é vigilância, arrependimento e fidelidade.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
      { href: '/mateus-24/', label: 'Mateus 24' },
    ],
  },
  'acordo-de-paz-oriente-medio': {
    question: 'Um acordo de paz no Oriente Médio pode ter significado profético?',
    answer:
      'A Bíblia fala de alianças, conflitos e falsas seguranças no cenário do fim, por isso acordos de paz no Oriente Médio costumam despertar atenção. Mesmo assim, o discernimento cristão exige cautela antes de associar um evento específico a uma profecia final.',
    bullets: [
      'Daniel 9 é frequentemente citado em discussões sobre aliança, paz e última semana profética.',
      'A paz política pode ser importante, mas não deve ser confundida automaticamente com cumprimento final.',
      'O artigo ajuda a observar o cenário com prudência bíblica e sem alarmismo.',
    ],
    links: [
      { href: '/as-70-semanas-de-daniel/', label: 'As 70 semanas de Daniel' },
      { href: '/profecia-biblica-e-o-conflito-no-oriente-medio/', label: 'Oriente Médio e profecia' },
      { href: '/sinais-do-anticristo/', label: 'Sinais do anticristo' },
    ],
  },
  'terceiro-templo-anticristo-neste-ano': {
    question: 'O terceiro templo tem relação com o anticristo?',
    answer:
      'Muitos estudiosos relacionam o terceiro templo, a abominação da desolação e o anticristo a textos como Daniel, Mateus 24 e 2 Tessalonicenses 2. A Bíblia, porém, chama a igreja ao discernimento, não à marcação precipitada de datas.',
    bullets: [
      'Daniel e Mateus 24 são passagens centrais nas discussões sobre templo e profecia.',
      '2 Tessalonicenses 2 fala de oposição a Deus e engano religioso no tempo do fim.',
      'O tema exige cuidado para distinguir possibilidade profética e afirmação categórica.',
    ],
    links: [
      { href: '/as-70-semanas-de-daniel/', label: 'As 70 semanas de Daniel' },
      { href: '/sinais-do-anticristo/', label: 'Sinais do anticristo' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Tribulação e arrebatamento' },
    ],
  },
  'o-fechamento-da-porta-da-graca-e-o-tempo-de': {
    question: 'O que significa o fechamento da porta da graça?',
    answer:
      'A ideia de fechamento da porta da graça aponta para o fim do tempo de oportunidade e arrependimento antes do juízo. O tema deve ser tratado com seriedade bíblica, lembrando que hoje é tempo de buscar a Deus e permanecer fiel.',
    bullets: [
      'A Bíblia apresenta o juízo final como real e inevitável.',
      'O alerta não deve gerar desespero, mas arrependimento, vigilância e perseverança.',
      'O artigo conecta preparo espiritual, fim dos tempos e responsabilidade diante de Deus.',
    ],
    links: [
      { href: '/o-juizo-final-grande-trono-branco-biblia/', label: 'Juízo final' },
      { href: '/preparacao-para-o-arrebatamento/', label: 'Preparação para o arrebatamento' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Estudo sobre salvação' },
    ],
  },
  'profecia-biblica-e-o-conflito-no-oriente-medio': {
    question: 'Como interpretar conflitos no Oriente Médio à luz da Bíblia?',
    answer:
      'Conflitos no Oriente Médio chamam atenção porque a Bíblia fala de Israel, Jerusalém, nações e juízo. A interpretação cristã precisa unir vigilância, conhecimento bíblico e prudência para não transformar manchetes em conclusões apressadas.',
    bullets: [
      'Profecias bíblicas devem ser interpretadas pelo contexto das Escrituras.',
      'Nem todo conflito atual é automaticamente o cumprimento final de uma profecia.',
      'O artigo ajuda a observar o cenário sem perder o centro: Cristo e sua volta.',
    ],
    links: [
      { href: '/5-sinais-que-guerra-em-israel-nao-e-acidente/', label: 'Guerra em Israel' },
      { href: '/a-importancia-jerusalem/', label: 'A importância de Jerusalém' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'o-juizo-final-grande-trono-branco-biblia': {
    question: 'O que é o juízo final do grande trono branco?',
    answer:
      'O grande trono branco, em Apocalipse 20, representa o juízo final diante de Deus. A passagem mostra que todos responderão por suas obras e que a esperança do cristão está na salvação em Cristo.',
    bullets: [
      'Apocalipse 20 descreve livros abertos e julgamento diante do trono de Deus.',
      'O tema reforça a seriedade do pecado, da eternidade e da justiça divina.',
      'Para o cristão, a segurança não está em mérito próprio, mas na obra de Cristo.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Estudo sobre salvação' },
      { href: '/o-fechamento-da-porta-da-graca-e-o-tempo-de/', label: 'Porta da graça' },
      { href: '/nova-jerusalem/', label: 'Nova Jerusalém' },
    ],
  },
  'as-70-semanas-de-daniel': {
    question: 'O que são as 70 semanas de Daniel?',
    answer:
      'As 70 semanas de Daniel são uma profecia de Daniel 9 ligada ao povo de Israel, à cidade de Jerusalém, ao Messias e aos acontecimentos finais. É uma das passagens mais importantes e debatidas da escatologia bíblica.',
    bullets: [
      'Daniel 9 fala de setenta semanas determinadas sobre o povo e a cidade santa.',
      'Muitos intérpretes relacionam a última semana ao período de tribulação.',
      'A profecia exige leitura cuidadosa do contexto histórico, messiânico e escatológico.',
    ],
    links: [
      { href: '/terceiro-templo-anticristo-neste-ano/', label: 'Terceiro templo e anticristo' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'alerta-virus-nipah-profecia-biblica': {
    question: 'Pestilências são sinais do fim dos tempos?',
    answer:
      'Jesus citou pestes e calamidades entre os sinais que antecedem o fim, mas a Bíblia não autoriza tratar cada doença específica como cumprimento final isolado. O caminho cristão é unir discernimento, prudência e esperança em Deus.',
    bullets: [
      'Lucas 21 menciona pestes, terremotos e sinais como parte do cenário de alerta.',
      'A interpretação bíblica deve evitar pânico e especulação sobre datas.',
      'Crises sanitárias lembram a fragilidade humana e a necessidade de buscar a Deus.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/apocalipse-sinais-pandemias/', label: 'Pandemias e Apocalipse' },
      { href: '/preparacao-espiritual/', label: 'Preparação espiritual' },
    ],
  },
  'daniel-mastral-e-trump-profecias-escatologia': {
    question: 'Como avaliar teorias proféticas sobre líderes atuais?',
    answer:
      'Teorias proféticas sobre líderes atuais precisam ser avaliadas com sobriedade, Bíblia aberta e cuidado contra sensacionalismo. A escatologia cristã aponta para vigilância e fidelidade, não para dependência de nomes ou especulações populares.',
    bullets: [
      'A Bíblia alerta sobre engano, poder político e oposição a Deus no fim dos tempos.',
      'Nenhuma teoria deve ocupar o lugar da leitura cuidadosa das Escrituras.',
      'O artigo ajuda a separar cenário profético, opinião pública e discernimento cristão.',
    ],
    links: [
      { href: '/sinais-do-anticristo/', label: 'Sinais do anticristo' },
      { href: '/lideres-mundiais-e-o-cenario-do-fim-dos-tempos/', label: 'Líderes mundiais' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'ira-ameaca-israel-conflito-geopolitico': {
    question: 'A ameaça do Irã contra Israel tem leitura profética?',
    answer:
      'A tensão entre Irã, Israel e outras nações costuma ser analisada por cristãos à luz de profecias sobre guerras, alianças e o fim dos tempos. A leitura bíblica, porém, deve ser prudente e não transformar todo movimento geopolítico em cumprimento definitivo.',
    bullets: [
      'Israel ocupa lugar importante em várias discussões proféticas.',
      'Conflitos geopolíticos devem ser observados sem abandonar o contexto bíblico.',
      'O artigo relaciona cenário internacional, discernimento cristão e esperança escatológica.',
    ],
    links: [
      { href: '/profecia-biblica-e-o-conflito-no-oriente-medio/', label: 'Conflito no Oriente Médio' },
      { href: '/guerra-ira-x-israel/', label: 'Irã x Israel' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
    ],
  },
  'eua-x-ira-alerta-profetico-trump': {
    question: 'Crises entre EUA, Irã e Israel podem ser alerta profético?',
    answer:
      'Crises envolvendo grandes potências podem servir como alerta para observar o cenário mundial com discernimento, mas não devem ser usadas para marcar datas ou afirmar cumprimentos sem base clara. A Bíblia chama os cristãos a vigiar e permanecer firmes.',
    bullets: [
      'Guerras e rumores de guerras aparecem no ensino de Jesus sobre os últimos dias.',
      'A prudência bíblica evita transformar análise política em certeza profética.',
      'O artigo conecta geopolítica, profecia e responsabilidade espiritual.',
    ],
    links: [
      { href: '/ira-ameaca-israel-conflito-geopolitico/', label: 'Irã e Israel' },
      { href: '/lideres-mundiais-e-o-cenario-do-fim-dos-tempos/', label: 'Líderes mundiais' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'lideres-mundiais-e-o-cenario-do-fim-dos-tempos': {
    question: 'Qual o papel dos líderes mundiais no cenário do fim dos tempos?',
    answer:
      'A Bíblia mostra que poderes políticos, alianças e sistemas humanos podem se levantar contra Deus no cenário final. Por isso, observar líderes mundiais pode ajudar no discernimento, desde que a análise não substitua a centralidade de Cristo.',
    bullets: [
      'Daniel e Apocalipse falam de reinos, governantes e sistemas de poder.',
      'O cristão deve evitar medo excessivo e manter fidelidade ao Reino de Deus.',
      'O artigo organiza sinais políticos e espirituais dentro de uma leitura bíblica.',
    ],
    links: [
      { href: '/governo-unico/', label: 'Governo único' },
      { href: '/sinais-do-anticristo/', label: 'Sinais do anticristo' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'estudos-biblicos-profeticos': {
    question: 'Por que estudar profecias bíblicas?',
    answer:
      'Estudar profecias bíblicas ajuda o cristão a compreender a soberania de Deus, a fidelidade das Escrituras e a esperança da volta de Cristo. O objetivo não é curiosidade sensacionalista, mas preparo espiritual e confiança no plano de Deus.',
    bullets: [
      'Profecias cumpridas fortalecem a confiança na Palavra de Deus.',
      'Profecias futuras chamam a igreja à vigilância, santidade e perseverança.',
      'O estudo profético precisa estar ligado ao evangelho e à vida cristã prática.',
    ],
    links: [
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
      { href: '/profecias-messianicas-cumpridas/', label: 'Profecias messiânicas' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
    ],
  },
  'tensao-pre-guerra-o-reordenamento-geo': {
    question: 'O reordenamento geopolítico tem relação com profecia bíblica?',
    answer:
      'Mudanças entre nações, alianças e blocos de poder podem ser observadas à luz dos temas proféticos de Daniel e Apocalipse. Ainda assim, a Bíblia exige discernimento para não confundir tendências históricas com afirmações definitivas sobre o fim.',
    bullets: [
      'Daniel apresenta impérios e reinos dentro do plano soberano de Deus.',
      'Apocalipse usa imagens de poder, domínio e oposição a Deus.',
      'O artigo ajuda a pensar geopolítica com prudência espiritual.',
    ],
    links: [
      { href: '/governo-unico/', label: 'Governo único' },
      { href: '/sete-cabecas-e-dez-chifres-o-que-nos-reserva/', label: 'Sete cabeças e dez chifres' },
      { href: '/lideres-mundiais-e-o-cenario-do-fim-dos-tempos/', label: 'Líderes mundiais' },
    ],
  },
  'sete-cabecas-e-dez-chifres-o-que-nos-reserva': {
    question: 'O que significam as sete cabeças e dez chifres em Apocalipse?',
    answer:
      'As sete cabeças e dez chifres em Apocalipse estão ligados a imagens de poder, reinos e oposição a Deus. A interpretação varia entre escolas escatológicas, mas o ponto central é que todo poder contrário a Cristo será julgado por Deus.',
    bullets: [
      'Apocalipse usa linguagem simbólica para revelar realidades espirituais e históricas.',
      'Daniel ajuda a entender a relação entre chifres, reinos e poderes humanos.',
      'A mensagem final é a vitória de Cristo sobre sistemas que se levantam contra Deus.',
    ],
    links: [
      { href: '/as-70-semanas-de-daniel/', label: 'As 70 semanas de Daniel' },
      { href: '/a-marca-da-besta/', label: 'A marca da besta' },
      { href: '/sinais-do-anticristo/', label: 'Sinais do anticristo' },
    ],
  },
  'sermao-profetico-do-monte-das-oliveiras': {
    question: 'O que é o sermão profético do Monte das Oliveiras?',
    answer:
      'O sermão profético do Monte das Oliveiras é o ensino de Jesus, em Mateus 24 e textos paralelos, sobre a destruição do templo, sinais, tribulação, vigilância e sua volta. É uma das bases mais importantes da escatologia cristã.',
    bullets: [
      'Jesus respondeu às perguntas dos discípulos sobre o templo, sua vinda e o fim.',
      'O sermão inclui alertas contra engano, perseguição e esfriamento espiritual.',
      'A aplicação principal é vigiar, perseverar e não ser enganado.',
    ],
    links: [
      { href: '/mateus-24/', label: 'Mateus 24' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'preparacao-para-o-arrebatamento': {
    question: 'Como se preparar para o arrebatamento?',
    answer:
      'A preparação para o arrebatamento envolve fé em Cristo, arrependimento, vigilância, santidade e perseverança. A Bíblia não chama o cristão a viver obcecado por datas, mas pronto para encontrar o Senhor.',
    bullets: [
      'Jesus ensinou que seus discípulos devem vigiar porque não sabem o dia nem a hora.',
      'Preparação espiritual inclui vida de oração, obediência e fidelidade diária.',
      'A esperança do arrebatamento deve produzir consolo, não medo paralisante.',
    ],
    links: [
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
      { href: '/pronto-para-o-arrebatamento/', label: 'Pronto para o arrebatamento' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
};
