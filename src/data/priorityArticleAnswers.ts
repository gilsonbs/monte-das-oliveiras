export interface PriorityArticleAnswer {
  question: string;
  answer: string;
  bullets: string[];
  links?: { href: string; label: string }[];
}

export const priorityArticleAnswers: Record<string, PriorityArticleAnswer> = {
  'o-absinto-do-apocalipse': {
    question: 'O que significa a estrela Absinto em Apocalipse?',
    answer:
      'Absinto aparece em Apocalipse 8:10-11 como o nome da estrela ligada à terceira trombeta. A passagem descreve um juízo em que parte das águas se torna amarga e mortal, e costuma ser interpretada como evento literal, símbolo de juízo ou alerta espiritual sobre amargura, corrupção e afastamento de Deus.',
    bullets: [
      'A profecia aparece durante a terceira trombeta, quando uma grande estrela cai sobre rios e fontes de água.',
      'Na Bíblia, absinto aparece associado a amargura, juízo, idolatria e afastamento do Senhor.',
      'As interpretações variam entre evento cósmico, desastre histórico, símbolo espiritual e linguagem apocalíptica.',
    ],
    links: [
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas cumpridas' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim dos tempos' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
    ],
  },
  'profecias-biblicas': {
    question: 'O que são profecias bíblicas e quais já se cumpriram?',
    answer:
      'Profecias bíblicas são mensagens reveladas por Deus por meio dos profetas, apontando para juízo, restauração, o Messias, Israel, as nações e a consumação da história. Muitas se cumpriram na história de Israel e na vida de Jesus Cristo, enquanto outras são estudadas em relação à volta de Cristo e ao fim dos tempos.',
    bullets: [
      'Miquéias apontou Belém como cidade ligada ao Messias, e Isaías 53 descreveu o Servo Sofredor.',
      'Naum anunciou a queda de Nínive, mostrando o juízo de Deus sobre a violência da Assíria.',
      'Joel e Zacarias trazem profecias sobre o Espírito, o Rei humilde, Jerusalém e esperança futura.',
    ],
    links: [
      { href: '/profecias-messianicas-cumpridas/', label: 'Profecias messiânicas cumpridas' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim dos tempos' },
      { href: '/o-absinto-do-apocalipse/', label: 'Absinto no Apocalipse' },
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
      'A parábola dos talentos, em Mateus 25:14-30, ensina que Deus confia dons, recursos, tempo e oportunidades aos seus servos. O ponto central é a fidelidade: quem recebe algo de Deus deve servir com responsabilidade, em vez de esconder o que recebeu por medo, negligência ou falsa segurança.',
    bullets: [
      'Os dois primeiros servos foram elogiados porque trabalharam fielmente com aquilo que receberam.',
      'O servo que enterrou o talento foi repreendido por medo, omissão e falta de responsabilidade.',
      'A lição é viver com prontidão, propósito e serviço enquanto aguardamos a volta de Cristo.',
    ],
    links: [
      { href: '/vida-crista-com-proposito/', label: 'Vida cristã com propósito' },
      { href: '/descubra-seu-proposito-de-vida/', label: 'Descubra seu propósito' },
      { href: '/apoiar-missionarios/', label: 'Servindo ao Reino' },
    ],
  },
  'pos-e-pre-tribulacionismo': {
    question: 'Qual é a diferença entre pré-tribulacionismo e pós-tribulacionismo?',
    answer:
      'O pré-tribulacionismo ensina que a igreja será arrebatada antes da grande tribulação. O pós-tribulacionismo entende que o arrebatamento acontecerá ao final da tribulação, junto à manifestação visível de Cristo. A diferença principal está no momento do arrebatamento em relação ao período de tribulação.',
    bullets: [
      'A diferença central é quando o arrebatamento ocorre em relação à grande tribulação.',
      'Há ainda visões intermediárias, como mesotribulacionismo e pré-ira, que tentam harmonizar os textos proféticos.',
      'Os textos mais discutidos incluem Mateus 24, 1 Tessalonicenses 4, Daniel 9 e Apocalipse.',
    ],
    links: [
      { href: '/o-arrebatamento/', label: 'O arrebatamento' },
      { href: '/a-grande-tribulacao/', label: 'A grande tribulação' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'o-arrebatamento': {
    question: 'O que é o arrebatamento segundo a Bíblia?',
    answer:
      'O arrebatamento é a esperança bíblica de que os salvos serão reunidos com Cristo em sua vinda. Os textos mais usados nesse estudo são 1 Tessalonicenses 4:16-17 e 1 Coríntios 15:51-52, que falam da ressurreição dos mortos em Cristo, da transformação dos vivos e do encontro com o Senhor.',
    bullets: [
      '1 Tessalonicenses 4 apresenta o consolo da igreja: os mortos em Cristo ressuscitarão primeiro.',
      '1 Coríntios 15 fala da transformação dos salvos, em um momento, ao som da última trombeta.',
      'As diferenças entre pré, pós e outras visões tratam principalmente do momento do arrebatamento em relação à tribulação.',
    ],
    links: [
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
      { href: '/preparacao-para-o-arrebatamento/', label: 'Preparação para o arrebatamento' },
    ],
  },
  'a-grande-tribulacao': {
    question: 'O que é a grande tribulação na Bíblia?',
    answer:
      'A grande tribulação é entendida por muitos cristãos como um período de intensa aflição, perseguição, juízo e engano espiritual associado aos últimos tempos. Textos como Mateus 24, Daniel e Apocalipse são usados para estudar esse tema, mas as interpretações variam entre diferentes linhas escatológicas.',
    bullets: [
      'Jesus fala em grande aflição em Mateus 24, ligada a vigilância, perseverança e cuidado contra o engano.',
      'Daniel e Apocalipse são textos centrais para estudar juízo, perseguição, impérios e livramento final.',
      'As visões pré, pós e outras diferem sobre a relação entre igreja, arrebatamento e tribulação.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/o-arrebatamento/', label: 'O arrebatamento' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
    ],
  },
  'anticristo-quem-e-e-como-identifica-lo-um-guia-completo-para-entender-esta-figura-apocaliptica': {
    question: 'Quem é o anticristo segundo a Bíblia?',
    answer:
      'A Bíblia usa a palavra anticristo nas cartas de João para falar de todo espírito que se opõe a Cristo, e também apresenta figuras associadas ao fim dos tempos, como o homem da iniquidade em 2 Tessalonicenses e a besta em Apocalipse. Por isso, o tema deve ser estudado com discernimento, sem marcar nomes ou datas de forma precipitada.',
    bullets: [
      'Em 1 João, anticristo envolve oposição a Cristo e negação da verdade sobre Jesus.',
      '2 Tessalonicenses fala do homem da iniquidade, associado a engano, rebelião e exaltação contra Deus.',
      'Apocalipse apresenta imagens de poder, perseguição e sedução espiritual que exigem perseverança dos santos.',
    ],
    links: [
      { href: '/sinais-do-anticristo/', label: 'Sinais do anticristo' },
      { href: '/a-grande-tribulacao/', label: 'A grande tribulação' },
      { href: '/terceiro-templo-anticristo-neste-ano/', label: 'Terceiro templo e anticristo' },
    ],
  },
  'sinais-do-anticristo': {
    question: 'Quais são os sinais do anticristo segundo a Bíblia?',
    answer:
      'Os sinais associados ao anticristo envolvem oposição a Cristo, engano espiritual, exaltação contra Deus, perseguição aos santos e sedução por poder religioso ou político. A Bíblia chama a igreja ao discernimento, mas não autoriza transformar suspeitas, líderes ou notícias em identificação definitiva.',
    bullets: [
      '1 João fala do espírito do anticristo como oposição à verdade sobre Jesus Cristo.',
      '2 Tessalonicenses destaca engano, rebelião e exaltação contra Deus.',
      'Apocalipse apresenta poder perseguidor, idolatria e sedução que exigem perseverança e fidelidade.',
    ],
    links: [
      { href: '/anticristo-quem-e-e-como-identifica-lo-um-guia-completo-para-entender-esta-figura-apocaliptica/', label: 'Quem é o anticristo?' },
      { href: '/a-grande-tribulacao/', label: 'A grande tribulação' },
      { href: '/escatologia-sinais-dos-tempos/', label: 'Escatologia e sinais dos tempos' },
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
    question: 'Quais são os sinais do fim dos tempos segundo Jesus?',
    answer:
      'Em Mateus 24, Jesus cita sinais como falsos cristos, engano religioso, guerras, rumores de guerras, fome, terremotos, perseguição, esfriamento do amor e a pregação do evangelho a todas as nações. Esses sinais não servem para marcar datas, mas para chamar a igreja à vigilância, santidade, discernimento e perseverança.',
    bullets: [
      'Mateus 24 organiza o tema em sinais, princípio das dores, tribulação, engano espiritual e vigilância.',
      'Guerras, fomes, terremotos e perseguições são sinais de alerta, não um calendário exato para marcar datas.',
      'O centro da esperança cristã não é o medo do fim, mas a volta de Cristo e a fidelidade até o fim.',
    ],
    links: [
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
      { href: '/mateus-24/', label: 'Mateus 24 explicado' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
    ],
  },
  'a-volta-de-jesus-os-sinais': {
    question: 'Quais sinais apontam para a volta de Jesus segundo a Bíblia?',
    answer:
      'A Bíblia apresenta a volta de Jesus como certa, visível e gloriosa. Em Mateus 24, Jesus fala de engano religioso, guerras, perseguição, esfriamento do amor e anúncio do evangelho, mas também afirma que ninguém sabe o dia nem a hora. Por isso, os sinais chamam à vigilância, não à marcação de datas.',
    bullets: [
      'Jesus ensinou que a volta será real e visível, mas o dia e a hora pertencem somente ao Pai.',
      'Os sinais incluem engano religioso, conflitos, perseguição, apostasia, esfriamento do amor e anúncio do evangelho.',
      'A esperança da volta de Cristo fortalece a fé, consola a igreja e chama à santidade.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/mateus-24/', label: 'Mateus 24 explicado' },
      { href: '/sermao-profetico-do-monte-das-oliveiras/', label: 'Sermão profético' },
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
      'Acordos de paz no Oriente Médio chamam atenção porque Daniel 9 e outros textos proféticos falam de alianças, Israel e falsa segurança. Ainda assim, nenhum acordo atual deve ser tratado automaticamente como cumprimento final sem análise bíblica cuidadosa.',
    bullets: [
      'Daniel 9:27 é uma passagem central nas discussões sobre aliança e última semana profética.',
      'Paz política pode ser relevante, mas a Bíblia exige cautela antes de conclusões definitivas.',
      'O melhor caminho é observar o cenário com discernimento, sem medo e sem sensacionalismo.',
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
      'O terceiro templo é associado por muitos intérpretes a temas como a abominação da desolação, o homem da iniquidade e o cenário do anticristo. Mesmo assim, a Bíblia não autoriza marcar datas; ela chama a igreja a discernir os sinais com sobriedade.',
    bullets: [
      'Daniel, Mateus 24 e 2 Tessalonicenses 2 são textos importantes nesse debate.',
      'O tema envolve templo, engano religioso, oposição a Deus e eventos ligados ao fim.',
      'É preciso distinguir expectativa profética, opinião de estudiosos e afirmação categórica.',
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
      'Jesus mencionou pestes e calamidades no contexto dos sinais dos tempos, mas a Bíblia não autoriza afirmar que uma doença específica seja, sozinha, o cumprimento final de uma profecia. O cristão deve unir prudência, responsabilidade e confiança em Deus.',
    bullets: [
      'Lucas 21 cita pestes, terremotos e sinais como parte de um quadro maior de alerta.',
      'Temas de saúde pedem cuidado, informação responsável e rejeição ao pânico.',
      'Crises sanitárias lembram a fragilidade humana e a necessidade de esperança em Deus.',
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
      'Teorias proféticas envolvendo líderes atuais, política e escatologia devem ser avaliadas com sobriedade, Bíblia aberta e cautela. Nenhum nome contemporâneo deve ocupar o centro da esperança cristã, que permanece em Cristo e na fidelidade da Palavra.',
    bullets: [
      'A Bíblia alerta sobre engano, poder político e oposição a Deus nos últimos dias.',
      'Opiniões populares e teorias devem ser testadas pelo contexto das Escrituras.',
      'O discernimento cristão evita idolatrar líderes, demonizar pessoas sem base e alimentar medo.',
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
      'A Bíblia mostra que líderes, impérios e sistemas políticos podem participar de cenários de oposição a Deus, mas não autoriza identificar cada governante atual como personagem profético definitivo. O cristão observa os acontecimentos com discernimento, sem tirar Cristo do centro da esperança.',
    bullets: [
      'Daniel e Apocalipse tratam de reinos, governantes e estruturas de poder humano.',
      'A leitura bíblica evita medo político, idolatria de líderes e teorias sem base sólida.',
      'O foco cristão é fidelidade ao Reino de Deus acima de qualquer poder terreno.',
    ],
    links: [
      { href: '/governo-unico/', label: 'Governo único' },
      { href: '/sinais-do-anticristo/', label: 'Sinais do anticristo' },
      { href: '/a-nova-ordem-mundial-chegando/', label: 'Nova ordem mundial' },
    ],
  },
  'a-nova-ordem-mundial-chegando': {
    question: 'Nova ordem mundial tem relação com profecia bíblica?',
    answer:
      'A ideia de nova ordem mundial pode ser comparada com temas bíblicos sobre impérios, domínio humano e sistemas contrários a Deus. Ainda assim, a leitura cristã precisa ser prudente: nem toda mudança política ou econômica é cumprimento profético final.',
    bullets: [
      'Daniel e Apocalipse mostram poderes humanos tentando ocupar o lugar de Deus.',
      'O cristão deve distinguir vigilância bíblica de especulação conspiratória.',
      'A esperança final não está em governos humanos, mas na soberania de Cristo.',
    ],
    links: [
      { href: '/governo-unico/', label: 'Governo único' },
      { href: '/lideres-mundiais-e-o-cenario-do-fim-dos-tempos/', label: 'Líderes mundiais' },
      { href: '/sete-cabecas-e-dez-chifres-o-que-nos-reserva/', label: 'Sete cabeças e dez chifres' },
    ],
  },
  'perguntas-sobre-armagedom': {
    question: 'O que é Armagedom na Bíblia?',
    answer:
      'Armagedom aparece em Apocalipse ligado ao conflito final entre poderes rebeldes e o juízo de Deus. O ponto principal não é alimentar medo sobre guerras modernas, mas afirmar que Cristo vence e que todo poder contrário ao Reino de Deus será julgado.',
    bullets: [
      'Apocalipse usa linguagem profética para revelar conflito, juízo e vitória final.',
      'O tema deve ser lido junto com perseverança, fidelidade e esperança cristã.',
      'A aplicação prática é vigiar sem transformar cada guerra em certeza profética.',
    ],
    links: [
      { href: '/o-juizo-final-grande-trono-branco-biblia/', label: 'O juízo final' },
      { href: '/a-grande-tribulacao/', label: 'A grande tribulação' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'profecias-sobre-o-brasil': {
    question: 'Existem profecias bíblicas específicas sobre o Brasil?',
    answer:
      'A Bíblia não apresenta profecias específicas citando o Brasil. Por isso, qualquer mensagem sobre profecia para a nação precisa ser avaliada com submissão às Escrituras, discernimento espiritual e cuidado pastoral, sem substituir o evangelho por expectativas nacionais.',
    bullets: [
      'Profecias modernas devem ser testadas pela Palavra, pelo fruto e pela centralidade de Cristo.',
      'O cristão deve evitar sensacionalismo, nacionalismo religioso e promessas sem base bíblica.',
      'A missão da igreja é anunciar arrependimento, salvação e esperança no Reino de Deus.',
    ],
    links: [
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
      { href: '/estudos-biblicos-profeticos/', label: 'Estudos bíblicos proféticos' },
      { href: '/o-que-e-apologetica-crista/', label: 'Apologética cristã' },
    ],
  },
  'fenomenos-sobrenaturais': {
    question: 'Fenômenos sobrenaturais são sinais de Deus?',
    answer:
      'Fenômenos sobrenaturais devem ser avaliados com discernimento bíblico, prudência e oração. A Bíblia reconhece sinais e maravilhas, mas também alerta contra engano espiritual; por isso, nenhum relato deve ficar acima de Cristo, das Escrituras e do fruto de uma vida fiel a Deus.',
    bullets: [
      'Nem todo acontecimento incomum deve ser tratado como sinal profético.',
      'Jesus e os apóstolos alertam contra falsos sinais, engano e fascínio espiritual sem critério.',
      'A resposta cristã é examinar tudo à luz da Palavra e permanecer firme em Cristo.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/mateus-24/', label: 'Mateus 24' },
      { href: '/o-que-e-apologetica-crista/', label: 'Apologética cristã' },
    ],
  },
  'ia-tecnologia': {
    question: 'Inteligência artificial tem relação com profecia bíblica?',
    answer:
      'A inteligência artificial pode levantar perguntas importantes sobre poder, controle, ética e discernimento cristão, mas a Bíblia não cita IA diretamente. Por isso, o cristão deve avaliar a tecnologia com sabedoria bíblica, sem medo automático e sem transformar cada avanço em cumprimento profético definitivo.',
    bullets: [
      'Tecnologia pode servir ao bem ou ao mal, dependendo de valores, usos e sistemas de poder.',
      'Temas como controle, vigilância e idolatria precisam ser avaliados à luz das Escrituras.',
      'A resposta cristã é discernimento, responsabilidade e confiança na soberania de Cristo.',
    ],
    links: [
      { href: '/a-marca-da-besta/', label: 'A marca da besta' },
      { href: '/a-nova-ordem-mundial-chegando/', label: 'Nova ordem mundial' },
      { href: '/o-que-e-apologetica-crista/', label: 'Apologética cristã' },
    ],
  },
  'estudos-biblicos-profeticos': {
    question: 'Como estudar profecias bíblicas com equilíbrio?',
    answer:
      'O estudo das profecias bíblicas deve começar pelo texto das Escrituras, considerar o contexto histórico e apontar para Cristo. O objetivo não é alimentar medo ou curiosidade sensacionalista, mas fortalecer a fé, a vigilância e a esperança na volta de Jesus.',
    bullets: [
      'Compare profecias cumpridas, profecias messiânicas e promessas ainda futuras.',
      'Evite marcar datas ou transformar notícias em cumprimento definitivo sem base bíblica.',
      'Use o tema para crescer em santidade, perseverança e confiança na soberania de Deus.',
    ],
    links: [
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
      { href: '/profecias-messianicas-cumpridas/', label: 'Profecias messiânicas' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'tensao-pre-guerra-o-reordenamento-geo': {
    question: 'Guerras e tensões mundiais são sinais do fim?',
    answer:
      'Guerras, alianças e mudanças entre potências podem lembrar temas proféticos de Daniel, Mateus 24 e Apocalipse, mas não devem ser tratadas automaticamente como cumprimento final. A leitura cristã precisa unir vigilância, prudência e confiança na soberania de Deus.',
    bullets: [
      'Jesus falou de guerras e rumores de guerras sem incentivar pânico ou marcação de datas.',
      'Daniel e Apocalipse mostram que impérios humanos continuam debaixo do governo de Deus.',
      'O cristão observa o mundo com discernimento, oração e esperança, não com medo.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/governo-unico/', label: 'Governo único' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'sete-cabecas-e-dez-chifres-o-que-nos-reserva': {
    question: 'O que significam as sete cabeças e dez chifres em Apocalipse?',
    answer:
      'As sete cabeças e dez chifres em Apocalipse representam imagens simbólicas de poder, reinos e oposição organizada contra Deus. A interpretação exige comparar Apocalipse com Daniel, sem perder o ponto central: Cristo vence todo sistema que se levanta contra o Reino de Deus.',
    bullets: [
      'As cabeças e chifres apontam para autoridade, domínio e estruturas de poder.',
      'Daniel ajuda a entender a relação entre chifres, impérios e poderes humanos.',
      'O foco bíblico não é curiosidade, mas discernimento e fidelidade a Cristo.',
    ],
    links: [
      { href: '/as-70-semanas-de-daniel/', label: 'As 70 semanas de Daniel' },
      { href: '/a-marca-da-besta/', label: 'A marca da besta' },
      { href: '/governo-unico/', label: 'Governo único' },
    ],
  },
  'a-marca-da-besta': {
    question: 'O que é a marca da besta em Apocalipse?',
    answer:
      'A marca da besta, em Apocalipse 13, representa submissão a um sistema contrário a Deus e ligado ao poder da besta. O tema exige discernimento bíblico, porque a passagem fala de adoração, fidelidade e oposição a Cristo, não apenas de tecnologia ou sinais externos.',
    bullets: [
      'Apocalipse associa a marca à lealdade espiritual e à adoração da besta.',
      'O texto contrasta os seguidores da besta com os que pertencem ao Cordeiro.',
      'A aplicação cristã é permanecer fiel a Cristo diante de pressão, engano e idolatria.',
    ],
    links: [
      { href: '/anticristo-quem-e-e-como-identifica-lo-um-guia-completo-para-entender-esta-figura-apocaliptica/', label: 'Quem é o anticristo?' },
      { href: '/a-grande-tribulacao/', label: 'A grande tribulação' },
      { href: '/sete-cabecas-e-dez-chifres-o-que-nos-reserva/', label: 'Sete cabeças e dez chifres' },
    ],
  },
  'marca-da-besta': {
    question: 'O que é a marca da besta em Apocalipse?',
    answer:
      'A marca da besta, em Apocalipse 13, representa submissão a um sistema contrário a Deus e ligado ao poder da besta. O tema exige discernimento bíblico, porque a passagem fala de adoração, fidelidade e oposição a Cristo, não apenas de tecnologia ou sinais externos.',
    bullets: [
      'Apocalipse associa a marca à lealdade espiritual e à adoração da besta.',
      'O texto contrasta os seguidores da besta com os que pertencem ao Cordeiro.',
      'A aplicação cristã é permanecer fiel a Cristo diante de pressão, engano e idolatria.',
    ],
    links: [
      { href: '/anticristo-quem-e-e-como-identifica-lo-um-guia-completo-para-entender-esta-figura-apocaliptica/', label: 'Quem é o anticristo?' },
      { href: '/a-grande-tribulacao/', label: 'A grande tribulação' },
      { href: '/sete-cabecas-e-dez-chifres-o-que-nos-reserva/', label: 'Sete cabeças e dez chifres' },
    ],
  },
  'gogue-e-magogue': {
    question: 'Quem são Gogue e Magogue na profecia bíblica?',
    answer:
      'Gogue e Magogue aparecem em Ezequiel 38-39 e Apocalipse 20 como imagens ligadas à oposição das nações contra o povo de Deus. As interpretações variam, mas o centro da profecia é a soberania divina: Deus julga os poderes que se levantam contra ele e preserva seu povo.',
    bullets: [
      'Ezequiel apresenta uma coalizão inimiga que se levanta contra Israel.',
      'Apocalipse retoma Gogue e Magogue como símbolo de rebelião final contra Deus.',
      'O estudo pede cautela para não transformar cada conflito atual em cumprimento definitivo.',
    ],
    links: [
      { href: '/as-70-semanas-de-daniel/', label: 'As 70 semanas de Daniel' },
      { href: '/a-grande-tribulacao/', label: 'A grande tribulação' },
      { href: '/escatologia-sinais-dos-tempos/', label: 'Escatologia e sinais dos tempos' },
    ],
  },
  'milenio-o-que-a-biblia-diz': {
    question: 'O que é o milênio na Bíblia?',
    answer:
      'O milênio é o período de mil anos mencionado em Apocalipse 20, associado ao reino de Cristo e ao juízo sobre o mal. Cristãos interpretam esse texto de formas diferentes, mas todos concordam que a esperança final está na vitória de Cristo e na consumação do Reino de Deus.',
    bullets: [
      'Pré-milenismo, amilenismo e pós-milenismo são as principais leituras cristãs sobre o tema.',
      'Apocalipse 20 deve ser lido junto com a esperança bíblica de ressurreição, juízo e nova criação.',
      'O foco do texto não é curiosidade cronológica, mas perseverança e confiança no reinado de Cristo.',
    ],
    links: [
      { href: '/a-grande-tribulacao/', label: 'A grande tribulação' },
      { href: '/gogue-e-magogue/', label: 'Gogue e Magogue' },
      { href: '/nova-jerusalem/', label: 'Nova Jerusalém' },
    ],
  },
  'nova-jerusalem': {
    question: 'O que é a Nova Jerusalém em Apocalipse?',
    answer:
      'A Nova Jerusalém é a cidade celestial descrita em Apocalipse 21-22, símbolo da morada final de Deus com seu povo. Ela aponta para a consumação da redenção, quando não haverá mais morte, dor, pecado ou separação entre Deus e os salvos.',
    bullets: [
      'Apocalipse apresenta a Nova Jerusalém como a realidade final da esperança cristã.',
      'A cidade revela comunhão plena com Deus, restauração da criação e vitória definitiva de Cristo.',
      'O foco da passagem é consolo, santidade e perseverança enquanto a igreja aguarda a consumação.',
    ],
    links: [
      { href: '/milenio-o-que-a-biblia-diz/', label: 'O milênio na Bíblia' },
      { href: '/o-juizo-final-grande-trono-branco-biblia/', label: 'O juízo final' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'dias-de-noe': {
    question: 'O que significa “como nos dias de Noé” na Bíblia?',
    answer:
      'Quando Jesus compara sua volta aos dias de Noé, ele destaca a indiferença espiritual de uma geração que vivia normalmente enquanto ignorava o juízo anunciado. O alerta principal é vigilância: a igreja deve viver preparada, fiel e atenta à Palavra de Deus.',
    bullets: [
      'A comparação aparece no ensino de Jesus sobre sua vinda e o fim.',
      'O ponto central não é marcar datas, mas reconhecer descuido espiritual e falta de arrependimento.',
      'A aplicação cristã é vigiar, perseverar e viver em obediência enquanto Cristo não volta.',
    ],
    links: [
      { href: '/mateus-24/', label: 'Mateus 24' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'mateus-24': {
    question: 'Qual é a mensagem principal de Mateus 24?',
    answer:
      'Mateus 24 reúne o ensino de Jesus sobre sinais, tribulação, engano espiritual, vigilância e sua volta. A mensagem central é que os discípulos não devem viver dominados por medo ou especulação, mas preparados, fiéis e atentos à Palavra de Cristo.',
    bullets: [
      'Jesus alerta contra falsos cristos, falsos profetas e interpretações apressadas dos acontecimentos.',
      'O capítulo chama a igreja à perseverança em meio a perseguições, crises e esfriamento espiritual.',
      'A aplicação prática é vigiar, permanecer fiel e esperar a volta de Cristo com esperança.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/dias-de-noe/', label: 'Dias de Noé' },
      { href: '/sermao-profetico-do-monte-das-oliveiras/', label: 'Sermão profético' },
    ],
  },
  '7-sinais-do-fim': {
    question: 'Quais são os sinais do fim dos tempos segundo a Bíblia?',
    answer:
      'A Bíblia fala de sinais como engano espiritual, guerras, perseguição, esfriamento do amor, falsos profetas e expansão do evangelho. Esses sinais chamam a igreja à vigilância e à fidelidade, mas não autorizam marcar datas ou transformar cada notícia em prova definitiva do fim.',
    bullets: [
      'Jesus ensina que sinais devem produzir discernimento, não pânico.',
      'Mateus 24 destaca engano, perseverança, tribulação e proclamação do evangelho.',
      'A resposta cristã é viver preparado, fiel e esperançoso até a volta de Cristo.',
    ],
    links: [
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/mateus-24/', label: 'Mateus 24' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'sermao-profetico-do-monte-das-oliveiras': {
    question: 'O que é o sermão profético do Monte das Oliveiras?',
    answer:
      'O sermão profético do Monte das Oliveiras é o ensino de Jesus sobre sinais, tribulação, engano espiritual, vigilância e sua volta. Registrado em Mateus 24 e textos paralelos, ele é uma das bases mais importantes para estudar escatologia com equilíbrio bíblico.',
    bullets: [
      'Jesus respondeu sobre o templo, sua vinda e o fim, mas também corrigiu expectativas apressadas.',
      'O sermão alerta contra falsos cristos, perseguição, esfriamento espiritual e distração.',
      'A aplicação principal é vigiar, perseverar e esperar Cristo com fidelidade.',
    ],
    links: [
      { href: '/mateus-24/', label: 'Mateus 24' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/7-sinais-do-fim/', label: '7 sinais do fim' },
    ],
  },
  'arrebatamento-o-que-acontece': {
    question: 'O que acontece no arrebatamento segundo a Bíblia?',
    answer:
      'No arrebatamento, os cristãos entendem que Cristo reunirá os seus, vivos e ressuscitados, para estarem com ele. Há diferenças sobre o momento desse evento, mas o centro bíblico é a volta de Jesus, a ressurreição, o consolo da igreja e a esperança eterna.',
    bullets: [
      '1 Tessalonicenses 4 associa o arrebatamento à volta de Cristo e à ressurreição dos mortos em Cristo.',
      'As posições pré, midi e pós-tribulacionistas divergem sobre o momento, não sobre a esperança em Cristo.',
      'A aplicação bíblica é viver em santidade, consolo e vigilância, sem medo ou especulação.',
    ],
    links: [
      { href: '/o-arrebatamento/', label: 'O arrebatamento' },
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
      { href: '/preparacao-para-o-arrebatamento/', label: 'Preparação para o arrebatamento' },
    ],
  },
  'preparacao-para-o-arrebatamento': {
    question: 'Como se preparar para o arrebatamento?',
    answer:
      'A preparação para o arrebatamento começa com fé em Cristo e continua em arrependimento, vigilância, santidade e perseverança. A Bíblia não chama o cristão a viver obcecado por datas, mas a permanecer pronto para encontrar o Senhor.',
    bullets: [
      'Jesus ensinou que seus discípulos devem vigiar porque não sabem o dia nem a hora.',
      'Preparação espiritual envolve oração, obediência, comunhão, serviço e fidelidade diária.',
      'A esperança do arrebatamento deve produzir consolo, santidade e perseverança, não medo paralisante.',
    ],
    links: [
      { href: '/pos-e-pre-tribulacionismo/', label: 'Pré e pós-tribulacionismo' },
      { href: '/pronto-para-o-arrebatamento/', label: 'Pronto para o arrebatamento' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Estudo sobre salvação' },
    ],
  },
  'estudo-biblico-sobre-salvacao': {
    question: 'O que é salvação segundo a Bíblia?',
    answer:
      'Salvação, segundo a Bíblia, é a obra de Deus que resgata o pecador pela graça, mediante a fé em Jesus Cristo. Ela envolve perdão, reconciliação com Deus, nova vida, perseverança e esperança eterna na presença do Senhor.',
    bullets: [
      'A salvação não é conquistada por mérito humano, mas recebida pela graça de Deus em Cristo.',
      'Jesus é apresentado como o único caminho para reconciliação com o Pai.',
      'A fé verdadeira produz arrependimento, transformação, perseverança e fruto espiritual.',
    ],
    links: [
      { href: '/salvacao-significado/', label: 'Significado de salvação' },
      { href: '/o-juizo-final-grande-trono-branco-biblia/', label: 'Juízo final' },
      { href: '/preparacao-para-o-arrebatamento/', label: 'Preparação para o arrebatamento' },
    ],
  },
  'a-mulher-samaritana': {
    question: 'Quais lições aprendemos com a mulher samaritana?',
    answer:
      'A história da mulher samaritana mostra que Jesus rompe barreiras, revela a sede espiritual do coração humano e oferece água viva. O encontro em João 4 ensina sobre graça, adoração verdadeira e testemunho.',
    bullets: [
      'Jesus se aproxima de uma mulher rejeitada e revela compaixão e verdade.',
      'A água viva aponta para a vida espiritual que só Cristo pode dar.',
      'Depois do encontro com Jesus, a mulher se torna testemunha para sua cidade.',
    ],
    links: [
      { href: '/o-amor-de-deus/', label: 'O amor de Deus' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Salvação' },
    ],
  },
  'e-pecado-se-masturbar': {
    question: 'É pecado se masturbar segundo a Bíblia?',
    answer:
      'A Bíblia não cita a palavra masturbação diretamente, mas ensina sobre pureza sexual, domínio próprio, santidade, consciência e desejos do coração. Por isso, a resposta depende do que acompanha a prática: pornografia, fantasia alimentada, vício, culpa, fuga emocional ou afastamento de Deus tornam o assunto espiritualmente sério.',
    bullets: [
      'Quando envolve pornografia, fantasia impura ou compulsão, fere princípios bíblicos de pureza e domínio próprio.',
      'A avaliação cristã não olha só para o ato, mas para intenção, mente, consciência e frutos espirituais.',
      'Quem luta com culpa ou vício precisa buscar graça, arrependimento, limites práticos e ajuda cristã madura.',
    ],
    links: [
      { href: '/pornografia-e-pecado/', label: 'Pornografia é pecado?' },
      { href: '/tocar-nas-partes-intimas-e-pecado/', label: 'Tocar nas partes íntimas é pecado?' },
      { href: '/fumar-e-pecado-entenda-o-debate/', label: 'Como avaliar hábitos e vícios' },
      { href: '/o-pecado-contra-o-espirito-santo/', label: 'Pecado contra o Espírito Santo' },
    ],
  },
  'a-fe-de-paulo': {
    question: 'O que podemos aprender com a fé de Paulo?',
    answer:
      'A fé de Paulo mostra uma vida transformada por Cristo, marcada por missão, sofrimento, coragem e esperança. Sua trajetória ensina que a verdadeira fé persevera mesmo em prisões, perseguições e incertezas.',
    bullets: [
      'Paulo passou de perseguidor da igreja a apóstolo comprometido com o evangelho.',
      'Sua fé aparece nas viagens missionárias, nas cartas e na disposição de sofrer por Cristo.',
      'O exemplo de Paulo une doutrina, missão, oração e perseverança.',
    ],
    links: [
      { href: '/a-vida-do-apostolo-paulo/', label: 'Vida do apóstolo Paulo' },
      { href: '/mapa-das-viagens-missionarias-de-paulo/', label: 'Viagens missionárias de Paulo' },
      { href: '/apoiar-missionarios/', label: 'Apoiar missionários' },
    ],
  },
  'a-vida-do-apostolo-paulo': {
    question: 'Quem foi o apóstolo Paulo?',
    answer:
      'Paulo foi um dos principais líderes da igreja primitiva. Antes perseguidor dos cristãos, ele foi alcançado por Cristo, tornou-se missionário, plantou igrejas e escreveu cartas fundamentais do Novo Testamento sobre graça, fé, santidade e missão.',
    bullets: [
      'Sua conversão em Atos 9 mostra o poder de Cristo para transformar vidas.',
      'Paulo levou o evangelho a judeus e gentios em várias regiões do Império Romano.',
      'Sua história une doutrina, sofrimento, plantação de igrejas e perseverança missionária.',
    ],
    links: [
      { href: '/a-fe-de-paulo/', label: 'A fé de Paulo' },
      { href: '/mapa-das-viagens-missionarias-de-paulo/', label: 'Mapa das viagens de Paulo' },
      { href: '/historia-da-igreja-primitiva-segundo-atos/', label: 'Igreja primitiva' },
    ],
  },
  'historia-da-igreja-primitiva-segundo-atos': {
    question: 'Como começou a igreja primitiva em Atos?',
    answer:
      'A igreja primitiva começou em Jerusalém após a ascensão de Jesus e o derramamento do Espírito Santo em Pentecostes. Atos mostra como o evangelho se espalhou por meio da pregação, oração, comunhão, discipulado e coragem diante da perseguição.',
    bullets: [
      'Pentecostes marca o início público da missão da igreja no poder do Espírito Santo.',
      'A igreja crescia por meio da Palavra, oração, comunhão, serviço e perseverança.',
      'Atos mostra o evangelho indo de Jerusalém para Judeia, Samaria e até os confins da terra.',
    ],
    links: [
      { href: '/a-vida-do-apostolo-paulo/', label: 'Vida de Paulo' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
    ],
  },
  'discipulado-cristao-passo-a-passo': {
    question: 'O que é discipulado cristão?',
    answer:
      'Discipulado cristão é o processo de seguir Jesus, aprender seus ensinamentos e ajudar outras pessoas a amadurecerem na fé. Ele envolve Palavra, relacionamento, exemplo de vida, oração, serviço e compromisso com a missão.',
    bullets: [
      'Jesus mandou fazer discípulos, não apenas reunir ouvintes.',
      'O discipulado combina ensino bíblico, convivência, correção amorosa e prática obediente.',
      'Uma igreja saudável forma pessoas que seguem Cristo e ajudam outros a segui-lo.',
    ],
    links: [
      { href: '/vida-crista-com-proposito/', label: 'Vida cristã com propósito' },
      { href: '/7-passos-como-comecar-a-ler-a-biblia/', label: 'Começar a ler a Bíblia' },
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
    ],
  },
  'estudo-biblico-sobre-oracao': {
    question: 'O que a Bíblia ensina sobre oração?',
    answer:
      'A Bíblia ensina que oração é relacionamento com Deus, expressão de fé, dependência e adoração. Orar não é apenas pedir coisas, mas buscar a vontade do Pai, confessar pecados, agradecer, interceder e crescer em intimidade com o Senhor.',
    bullets: [
      'Jesus ensinou seus discípulos a orar com simplicidade, reverência e confiança.',
      'A oração bíblica inclui adoração, confissão, gratidão, petição e intercessão.',
      'Uma vida de oração amadurece quando é constante, sincera e alinhada à Palavra de Deus.',
    ],
    links: [
      { href: '/descubra-como-orar-como-jesus/', label: 'Como orar como Jesus' },
      { href: '/vida-de-oracao/', label: 'Vida de oração' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
    ],
  },
  '7-passos-como-comecar-a-ler-a-biblia': {
    question: 'Como começar a ler a Bíblia?',
    answer:
      'Para começar a ler a Bíblia, escolha um plano simples, ore antes da leitura e comece por livros que apresentam claramente Jesus e a vida cristã, como Marcos, João, Atos ou Filipenses. O mais importante é constância, entendimento e aplicação, não pressa.',
    bullets: [
      'Comece com pequenas porções diárias e anote dúvidas, promessas e aplicações.',
      'Leia o texto dentro do contexto, evitando frases isoladas sem sentido completo.',
      'Combine leitura bíblica com oração, discipulado e prática obediente do que foi aprendido.',
    ],
    links: [
      { href: '/por-onde-comecar-a-ler-a-biblia/', label: 'Por onde começar' },
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
    ],
  },
  'por-onde-comecar-a-ler-a-biblia': {
    question: 'Por onde começar a ler a Bíblia?',
    answer:
      'Uma boa forma de começar a ler a Bíblia é pelos Evangelhos, especialmente Marcos ou João, porque apresentam a vida, os ensinos, a morte e a ressurreição de Jesus. Depois, Atos e algumas cartas ajudam a entender a igreja, a salvação e a vida cristã.',
    bullets: [
      'Os Evangelhos mostram quem é Jesus e por que ele é o centro da fé cristã.',
      'Atos mostra a expansão da igreja e a missão dos primeiros discípulos.',
      'Salmos e Provérbios ajudam na oração, sabedoria e vida devocional diária.',
    ],
    links: [
      { href: '/7-passos-como-comecar-a-ler-a-biblia/', label: 'Como começar a ler' },
      { href: '/quem-escreveu-a-biblia-conheca-os-40-autores/', label: 'Quem escreveu a Bíblia' },
      { href: '/um-panorama-biblico-com-o-resumo-66-livros/', label: 'Panorama da Bíblia' },
    ],
  },
  'quem-escreveu-a-biblia-conheca-os-40-autores': {
    question: 'Quem escreveu a Bíblia?',
    answer:
      'A Bíblia foi escrita por cerca de 40 autores humanos, em diferentes épocas, lugares e contextos, sob a inspiração de Deus. Entre eles estão profetas, reis, pescadores, médicos, pastores e apóstolos, mas a mensagem central aponta para o plano redentor do Senhor.',
    bullets: [
      'O Antigo Testamento reúne livros da lei, história, poesia e profecia.',
      'O Novo Testamento apresenta os Evangelhos, Atos, cartas apostólicas e Apocalipse.',
      'A unidade bíblica revela Deus conduzindo a história em direção a Cristo e à redenção.',
    ],
    links: [
      { href: '/um-panorama-biblico-com-o-resumo-66-livros/', label: 'Resumo dos 66 livros' },
      { href: '/por-onde-comecar-a-ler-a-biblia/', label: 'Por onde começar' },
      { href: '/o-que-e-apologetica-crista/', label: 'Apologética cristã' },
    ],
  },
  'como-explicar-o-deus-triuno': {
    question: 'Como explicar o Deus triúno?',
    answer:
      'O Deus triúno é a doutrina bíblica de que há um só Deus em três pessoas: Pai, Filho e Espírito Santo. O cristianismo não ensina três deuses, mas um único Deus eterno que se revela em comunhão, amor e redenção.',
    bullets: [
      'O Pai é Deus, o Filho é Deus e o Espírito Santo é Deus, mas não são a mesma pessoa.',
      'A Trindade aparece no batismo de Jesus, na missão da igreja e em bênçãos apostólicas.',
      'A doutrina deve ser explicada com reverência, evitando analogias simplistas que distorcem o mistério.',
    ],
    links: [
      { href: '/significado-dos-nomes-de-deus/', label: 'Nomes de Deus' },
      { href: '/o-que-sao-os-dons-espirituais/', label: 'Dons espirituais' },
      { href: '/o-que-e-apologetica-crista/', label: 'Apologética cristã' },
    ],
  },
  'o-papel-das-aliancas-biblicas': {
    question: 'O que são alianças bíblicas?',
    answer:
      'Alianças bíblicas são compromissos estabelecidos por Deus ao longo da história para revelar seu plano de redenção. Elas ajudam a entender a relação entre criação, promessa, lei, reino, Cristo e a nova aliança no evangelho.',
    bullets: [
      'Alianças com Noé, Abraão, Moisés e Davi apontam para etapas importantes da revelação bíblica.',
      'A nova aliança é cumprida em Cristo e anunciada pelos profetas.',
      'Entender as alianças ajuda a ler a Bíblia como uma história unificada de promessa e cumprimento.',
    ],
    links: [
      { href: '/um-panorama-biblico-com-o-resumo-66-livros/', label: 'Panorama bíblico' },
      { href: '/profecias-messianicas-cumpridas/', label: 'Profecias messiânicas' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Salvação' },
    ],
  },
  'o-que-sao-os-dons-espirituais': {
    question: 'O que são dons espirituais?',
    answer:
      'Dons espirituais são capacidades concedidas pelo Espírito Santo para edificação da igreja e serviço ao Reino de Deus. Eles não existem para autopromoção, mas para servir com amor, ordem, humildade e maturidade espiritual.',
    bullets: [
      'O Novo Testamento fala de dons em textos como Romanos 12, 1 Coríntios 12 e Efésios 4.',
      'Todo dom deve ser exercido com amor, discernimento e submissão à Palavra.',
      'A finalidade dos dons é edificar o corpo de Cristo, servir pessoas e glorificar a Deus.',
    ],
    links: [
      { href: '/historia-da-igreja-primitiva-segundo-atos/', label: 'Igreja primitiva' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
      { href: '/lideranca-biblica-pastores-igrejas/', label: 'Liderança bíblica' },
    ],
  },
  'o-que-e-apologetica-crista': {
    question: 'O que é apologética cristã?',
    answer:
      'Apologética cristã é a defesa racional e bíblica da fé cristã. Ela busca responder dúvidas, objeções e críticas com mansidão, clareza e fidelidade às Escrituras.',
    bullets: [
      'Apologética não é briga, mas explicação responsável da esperança cristã.',
      'Ela trata de temas como existência de Deus, confiabilidade da Bíblia, ressurreição e verdade.',
      'Uma boa defesa da fé une conhecimento, humildade, amor e bom testemunho.',
    ],
    links: [
      { href: '/quem-escreveu-a-biblia-conheca-os-40-autores/', label: 'Quem escreveu a Bíblia' },
      { href: '/arqueologia-biblica-descobertas-recentes/', label: 'Arqueologia bíblica' },
      { href: '/profecias-biblicas/', label: 'Profecias bíblicas' },
    ],
  },
  'guia-dos-ensinamentos-do-reino': {
    question: 'Por que Jesus falava em parábolas?',
    answer:
      'Jesus usava parábolas para revelar verdades do Reino de Deus de forma simples, profunda e memorável. Elas confrontavam o coração, ensinavam os discípulos e, ao mesmo tempo, expunham a dureza de quem não queria ouvir.',
    bullets: [
      'Parábolas usam cenas comuns para ensinar verdades espirituais profundas.',
      'Elas mostram como é o Reino de Deus, quem é o verdadeiro discípulo e como viver pela fé.',
      'Entender parábolas exige atenção ao contexto, ao público e ao ponto central da história.',
    ],
    links: [
      { href: '/parabola-dos-talentos/', label: 'Parábola dos talentos' },
      { href: '/o-bom-samaritano/', label: 'Bom samaritano' },
      { href: '/o-filho-prodigo/', label: 'Filho pródigo' },
    ],
  },
  'louvor-com-instrumentos': {
    question: 'A Bíblia permite louvor com instrumentos?',
    answer:
      'A Bíblia mostra instrumentos sendo usados no louvor a Deus, especialmente nos Salmos e no culto de Israel. O ponto principal, porém, não é apenas o instrumento, mas a adoração sincera, reverente e centrada em Deus.',
    bullets: [
      'Salmos mencionam harpas, címbalos, trombetas e outros instrumentos no louvor.',
      'Instrumentos podem servir à adoração quando usados com ordem, reverência e propósito.',
      'O coração do adorador continua sendo mais importante do que o recurso musical.',
    ],
    links: [
      { href: '/diferenca-entre-louvor-e-adoracao/', label: 'Louvor e adoração' },
      { href: '/funcao-dos-levitas-no-templo/', label: 'Função dos levitas' },
      { href: '/musica-no-ceu/', label: 'Música no céu' },
    ],
  },
  'diferenca-entre-louvor-e-adoracao': {
    question: 'Qual é a diferença entre louvor e adoração?',
    answer:
      'Louvor costuma expressar reconhecimento pelas obras de Deus, enquanto adoração envolve rendição, reverência e entrega a quem Deus é. Na prática bíblica, os dois se relacionam e devem nascer de um coração sincero.',
    bullets: [
      'Louvar é proclamar a grandeza, os feitos e a bondade de Deus.',
      'Adorar é render-se a Deus com reverência, amor, obediência e verdade.',
      'Música pode expressar louvor e adoração, mas adoração envolve toda a vida.',
    ],
    links: [
      { href: '/louvor-com-instrumentos/', label: 'Louvor com instrumentos' },
      { href: '/o-que-e-louvor-racional/', label: 'Louvor racional' },
      { href: '/funcao-dos-levitas-no-templo/', label: 'Levitas no templo' },
    ],
  },
  'o-pecado-contra-o-espirito-santo': {
    question: 'O que é o pecado contra o Espírito Santo?',
    answer:
      'O pecado contra o Espírito Santo é tratado por Jesus como uma rejeição grave e consciente da obra de Deus, atribuída ao mal por um coração endurecido. O tema deve ser lido com cuidado, sem gerar desespero em quem deseja arrependimento.',
    bullets: [
      'O contexto está nos Evangelhos, quando líderes religiosos atribuem a obra de Jesus a Satanás.',
      'Quem se preocupa sinceramente em buscar perdão demonstra sensibilidade espiritual, não dureza final.',
      'A resposta bíblica ao medo é voltar-se para Cristo com arrependimento e fé.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Salvação' },
      { href: '/o-salario-do-pecado-e-a-morte-entenda/', label: 'Salário do pecado' },
      { href: '/e-pecado-se-masturbar/', label: 'Pecado e consciência' },
    ],
  },
  'crente-pode-ver-filme-de-terror': {
    question: 'Crente pode ver filme de terror?',
    answer:
      'A Bíblia não cita filmes de terror, mas oferece princípios sobre pureza, medo, influência, consciência e domínio próprio. O cristão deve avaliar se aquilo alimenta ansiedade, fascínio pelo mal ou enfraquece sua comunhão com Deus.',
    bullets: [
      'Nem toda escolha de entretenimento edifica a mente e o coração.',
      'A consciência, o fruto produzido e a influência espiritual devem ser considerados.',
      'O princípio bíblico é buscar o que aproxima de Deus e não escraviza a mente.',
    ],
    links: [
      { href: '/crente-pode-ver-novela-7-criterios-biblicos/', label: 'Crente pode ver novela?' },
      { href: '/batalha-espiritual-digital/', label: 'Batalha espiritual digital' },
      { href: '/ansiedade-e-fe/', label: 'Ansiedade e fé' },
    ],
  },
  'crente-pode-ver-novela-7-criterios-biblicos': {
    question: 'Crente pode ver novela?',
    answer:
      'A questão não é apenas se crente pode ver novela, mas quais valores, desejos e hábitos esse conteúdo alimenta. A Bíblia chama o cristão a discernir tudo pela consciência, pela santidade e pelo impacto espiritual.',
    bullets: [
      'Conteúdos que normalizam pecado, sensualidade ou vingança podem moldar desejos e pensamentos.',
      'O cristão deve avaliar liberdade, consciência, influência e domínio próprio.',
      'A pergunta mais útil é se aquilo edifica, aproxima de Deus e preserva o coração.',
    ],
    links: [
      { href: '/crente-pode-ver-filme-de-terror/', label: 'Crente pode ver terror?' },
      { href: '/crente-pode-fazer-tatuagem/', label: 'Crente pode fazer tatuagem?' },
      { href: '/tocar-nas-partes-intimas-e-pecado/', label: 'Pureza cristã' },
    ],
  },
  'crente-pode-orar-deitado': {
    question: 'Crente pode orar deitado?',
    answer:
      'Crente pode orar deitado, porque a Bíblia não limita a oração a uma única postura física. O mais importante é a postura do coração: reverência, sinceridade, fé e dependência de Deus.',
    bullets: [
      'Na Bíblia, pessoas oram em pé, ajoelhadas, prostradas e em diferentes situações.',
      'Orar deitado pode ser legítimo, especialmente em descanso, enfermidade ou momentos de intimidade com Deus.',
      'A postura externa não deve substituir reverência, atenção e sinceridade diante do Senhor.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
      { href: '/descubra-como-orar-como-jesus/', label: 'Orar como Jesus' },
      { href: '/orar-sem-cessar/', label: 'Orar sem cessar' },
    ],
  },
  'lideranca-biblica-pastores-igrejas': {
    question: 'O que é liderança bíblica na igreja?',
    answer:
      'Liderança bíblica na igreja é serviço humilde, cuidado espiritual e fidelidade à Palavra de Deus. O líder cristão não é chamado a dominar pessoas, mas a pastorear, ensinar, proteger e servir como exemplo.',
    bullets: [
      'Jesus apresentou liderança como serviço, não como busca de status.',
      'Pastores e líderes devem cuidar do rebanho com amor, verdade e responsabilidade.',
      'A autoridade espiritual precisa estar ligada a caráter, doutrina e exemplo de vida.',
    ],
    links: [
      { href: '/lideranca-crista/', label: 'Liderança cristã' },
      { href: '/davi-lider-cristao/', label: 'Davi como líder' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
    ],
  },
  '7-perigos-do-desigrejado': {
    question: 'Quais são os perigos de viver desigrejado?',
    answer:
      'Viver desigrejado pode enfraquecer a comunhão, o cuidado pastoral, a correção amorosa e o serviço cristão. Ao mesmo tempo, feridas causadas por abusos espirituais precisam ser tratadas com seriedade; a resposta bíblica é buscar uma comunidade saudável, não normalizar isolamento permanente.',
    bullets: [
      'A vida cristã foi pensada para comunhão, mutualidade, ensino e crescimento conjunto.',
      'Isolamento prolongado pode alimentar frieza espiritual, desânimo ou falta de correção.',
      'Quem saiu ferido de uma igreja precisa de restauração, prudência e uma comunidade centrada em Cristo.',
    ],
    links: [
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
      { href: '/historia-da-igreja-primitiva-segundo-atos/', label: 'Igreja primitiva' },
      { href: '/lideranca-biblica-pastores-igrejas/', label: 'Liderança bíblica' },
    ],
  },
  'o-que-significa-tomar-a-sua-cruz': {
    question: 'O que significa tomar a sua cruz?',
    answer:
      'Tomar a sua cruz significa seguir Jesus com renúncia, obediência e disposição de perder o controle da própria vida por amor a Cristo. Não é apenas enfrentar dificuldades, mas submeter desejos, prioridades e identidade ao Senhor.',
    bullets: [
      'Jesus chamou seus discípulos a negar a si mesmos e segui-lo diariamente.',
      'A cruz aponta para entrega, obediência e morte do ego diante de Deus.',
      'Seguir Cristo envolve custo, mas também vida verdadeira e esperança eterna.',
    ],
    links: [
      { href: '/vida-crista-com-proposito/', label: 'Vida cristã com propósito' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
      { href: '/humildade/', label: 'Humildade' },
    ],
  },
  'o-cristao-que-satanas-mais-teme': {
    question: 'Que tipo de cristão o inimigo teme?',
    answer:
      'O cristão espiritualmente firme é aquele que permanece em Cristo, conhece a Palavra, persevera em oração e vive em obediência. A força dele não está em autoconfiança ou discurso de guerra espiritual, mas na graça de Deus e na vitória de Cristo.',
    bullets: [
      'Maturidade espiritual envolve verdade, oração, santidade, humildade e perseverança.',
      'A Bíblia chama o cristão a resistir ao mal e permanecer firme na fé.',
      'O foco não deve ser fascínio pelo inimigo, mas confiança em Cristo e obediência diária.',
    ],
    links: [
      { href: '/batalha-espiritual-digital/', label: 'Batalha espiritual' },
      { href: '/vida-de-oracao/', label: 'Vida de oração' },
      { href: '/crente-cheio-da-uncao/', label: 'Crente cheio da unção' },
    ],
  },
  'devocional-fe-em-meio-as-lutas': {
    question: 'Como manter a fé em meio às lutas?',
    answer:
      'Manter a fé em meio às lutas envolve lembrar das promessas de Deus, orar com sinceridade e perseverar mesmo quando as circunstâncias não mudam rapidamente. A fé bíblica não nega a dor, mas confia no cuidado do Senhor.',
    bullets: [
      'A Bíblia apresenta sofrimento e esperança caminhando juntos na vida cristã.',
      'Promessas de consolo fortalecem o coração em períodos de medo e cansaço.',
      'Comunhão, oração e Palavra ajudam a sustentar a fé durante a prova.',
    ],
    links: [
      { href: '/paz-que-excede-todo-entendimento/', label: 'Paz que excede entendimento' },
      { href: '/jesus-na-tempestade-5-licoes/', label: 'Jesus na tempestade' },
      { href: '/ansiedade-e-fe/', label: 'Ansiedade e fé' },
    ],
  },
  'licoes-de-fe-de-abraao': {
    question: 'Quais lições de fé aprendemos com Abraão?',
    answer:
      'Abraão ensina que fé é confiar em Deus mesmo sem ver todo o caminho. Sua história mostra obediência, espera, promessa, falhas humanas e a fidelidade de Deus conduzindo cada etapa.',
    bullets: [
      'Abraão saiu sem saber exatamente para onde ia, confiando na promessa de Deus.',
      'Sua caminhada mostra que fé também amadurece em períodos de espera.',
      'A promessa feita a Abraão aponta para o plano redentor de Deus na história.',
    ],
    links: [
      { href: '/o-papel-das-aliancas-biblicas/', label: 'Alianças bíblicas' },
      { href: '/desenvolvendo-a-fe-em-tempos-de-ansiedade/', label: 'Fé em tempos difíceis' },
      { href: '/fe-pequena/', label: 'Fé pequena' },
    ],
  },
  'descubra-seu-proposito-de-vida': {
    question: 'Como descobrir seu propósito de vida segundo a Bíblia?',
    answer:
      'Segundo a Bíblia, propósito de vida começa em conhecer Deus, glorificá-lo e viver de modo fiel à vocação recebida. Propósito não é apenas carreira ou sucesso pessoal, mas uma vida orientada por amor, serviço e obediência.',
    bullets: [
      'O propósito cristão nasce da identidade em Cristo, não da comparação com outras pessoas.',
      'Dons, oportunidades e responsabilidades ajudam a discernir caminhos de serviço.',
      'Uma vida com propósito une fé, caráter, trabalho honesto e generosidade.',
    ],
    links: [
      { href: '/vida-crista-com-proposito/', label: 'Vida cristã com propósito' },
      { href: '/parabola-dos-talentos/', label: 'Parábola dos talentos' },
      { href: '/o-ceu-te-deu-um-chamado-nao-desista/', label: 'Chamado de Deus' },
    ],
  },
  'orar-e-jejuar': {
    question: 'Por que orar e jejuar?',
    answer:
      'Orar e jejuar são práticas espirituais que expressam dependência de Deus, busca por direção e consagração. O jejum bíblico não força Deus a agir nem serve como moeda de troca; ele ajuda a humilhar o coração e intensificar a oração.',
    bullets: [
      'Jesus ensinou sobre jejum com sinceridade, sem aparência religiosa.',
      'O jejum deve estar ligado a arrependimento, oração, compaixão e busca por Deus.',
      'A prática precisa de sabedoria e cuidado, especialmente quando há limitações de saúde ou histórico alimentar sensível.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
      { href: '/orar-sem-cessar/', label: 'Orar sem cessar' },
      { href: '/vida-de-oracao/', label: 'Vida de oração' },
    ],
  },
  'orar-sem-cessar': {
    question: 'O que significa orar sem cessar?',
    answer:
      'Orar sem cessar significa cultivar uma vida de comunhão constante com Deus. Não quer dizer repetir palavras o dia inteiro, mas viver em dependência, gratidão, vigilância e diálogo contínuo com o Senhor.',
    bullets: [
      'A oração constante transforma a rotina em espaço de dependência de Deus.',
      'É possível orar em momentos breves, decisões, tentações, alegrias e lutas.',
      'Uma vida de oração cresce com prática, sinceridade e perseverança.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
      { href: '/descubra-como-orar-como-jesus/', label: 'Orar como Jesus' },
      { href: '/crente-pode-orar-deitado/', label: 'Orar deitado' },
    ],
  },
  'pornografia-e-pecado': {
    question: 'Pornografia é pecado?',
    answer:
      'Pornografia é pecado porque distorce a sexualidade criada por Deus, alimenta cobiça, objetifica pessoas e pode escravizar a mente. A resposta cristã une arrependimento, graça, renovação da mente, limites práticos e busca de ajuda quando a pessoa não consegue vencer sozinha.',
    bullets: [
      'Jesus ensinou que a pureza envolve também o olhar, o desejo e o coração.',
      'Pornografia pode gerar compulsão, culpa, isolamento e danos relacionais profundos.',
      'Há caminho de restauração em Cristo, com confissão segura, limites práticos e acompanhamento maduro.',
    ],
    links: [
      { href: '/e-pecado-se-masturbar/', label: 'Masturbação e vida cristã' },
      { href: '/tocar-nas-partes-intimas-e-pecado/', label: 'Pureza cristã' },
      { href: '/crente-pode-ver-novela-7-criterios-biblicos/', label: 'Discernimento no entretenimento' },
    ],
  },
  'fumar-e-pecado-entenda-o-debate': {
    question: 'Fumar é pecado?',
    answer:
      'A Bíblia não menciona cigarro diretamente, mas oferece princípios sobre domínio próprio, cuidado com o corpo, vício e testemunho. A pergunta deve ser avaliada com honestidade diante de Deus, considerando saúde, dependência, consciência e liberdade cristã.',
    bullets: [
      'O corpo do cristão deve ser tratado com responsabilidade diante de Deus.',
      'Dependência, dano à saúde e perda de domínio próprio pesam no discernimento bíblico.',
      'Quem luta para abandonar o vício precisa de graça, apoio prático e perseverança, não apenas condenação.',
    ],
    links: [
      { href: '/crente-pode-ver-filme-de-terror/', label: 'Discernimento cristão' },
      { href: '/vida-crista-com-proposito/', label: 'Vida cristã' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Graça e salvação' },
    ],
  },
  'o-salario-do-pecado-e-a-morte-entenda': {
    question: 'O que significa o salário do pecado é a morte?',
    answer:
      'A expressão “o salário do pecado é a morte”, em Romanos 6:23, ensina que o pecado produz separação, condenação e morte espiritual. Mas o mesmo versículo anuncia que o dom gratuito de Deus é a vida eterna em Cristo Jesus.',
    bullets: [
      'Pecado não é apenas erro moral, mas rebelião contra Deus.',
      'A morte é apresentada como consequência justa do pecado.',
      'O evangelho responde com graça, perdão e vida eterna em Cristo.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Estudo sobre salvação' },
      { href: '/o-pecado-contra-o-espirito-santo/', label: 'Pecado contra o Espírito Santo' },
      { href: '/o-juizo-final-grande-trono-branco-biblia/', label: 'Juízo final' },
    ],
  },
  'crente-divorciado-pode-casar-de-novo': {
    question: 'Crente divorciado pode casar de novo?',
    answer:
      'A possibilidade de um crente divorciado casar de novo exige cuidado pastoral, contexto bíblico e responsabilidade. Textos sobre aliança, adultério, abandono, reconciliação e proteção da parte ferida precisam ser avaliados sem banalizar o casamento nem ignorar situações reais de sofrimento.',
    bullets: [
      'Jesus tratou o casamento com seriedade e apontou para o plano original de Deus.',
      'Algumas tradições cristãs reconhecem exceções bíblicas, como imoralidade sexual e abandono.',
      'Cada caso precisa de aconselhamento pastoral maduro, especialmente quando há abuso, abandono ou tentativa de reconciliação.',
    ],
    links: [
      { href: '/o-amor-de-deus/', label: 'O amor de Deus' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Graça e restauração' },
      { href: '/vida-crista-com-proposito/', label: 'Vida cristã' },
    ],
  },
  'crente-pode-fazer-tatuagem': {
    question: 'Crente pode fazer tatuagem?',
    answer:
      'A pergunta sobre tatuagem deve ser tratada com discernimento bíblico, não apenas com uma resposta automática. O cristão deve considerar motivação, consciência, testemunho, conteúdo da tatuagem, contexto cultural e se a decisão glorifica a Deus.',
    bullets: [
      'Levítico 19:28 precisa ser lido em seu contexto histórico e religioso.',
      'O Novo Testamento enfatiza consciência, santidade, liberdade e edificação.',
      'Nem toda liberdade convém; motivação, maturidade e impacto sobre outras pessoas também importam.',
    ],
    links: [
      { href: '/crente-pode-ver-novela-7-criterios-biblicos/', label: 'Critérios bíblicos' },
      { href: '/fumar-e-pecado-entenda-o-debate/', label: 'Fumar é pecado?' },
      { href: '/vida-crista-com-proposito/', label: 'Vida cristã com propósito' },
    ],
  },
  'humildade': {
    question: 'O que é humildade segundo a Bíblia?',
    answer:
      'Humildade, segundo a Bíblia, é reconhecer a grandeza de Deus, depender da sua graça e servir sem orgulho. Ela não é baixa autoestima, mas uma postura de verdade, mansidão e submissão ao Senhor.',
    bullets: [
      'Jesus é o maior exemplo de humildade, serviço e obediência ao Pai.',
      'A humildade combate orgulho, comparação e desejo de autopromoção.',
      'Deus resiste aos soberbos, mas concede graça aos humildes.',
    ],
    links: [
      { href: '/o-exemplo-de-humildade-de-jesus/', label: 'Humildade de Jesus' },
      { href: '/o-que-significa-tomar-a-sua-cruz/', label: 'Tomar a cruz' },
      { href: '/o-bom-samaritano/', label: 'Serviço ao próximo' },
    ],
  },
  'a-justica-de-deus': {
    question: 'O que é a justiça de Deus?',
    answer:
      'A justiça de Deus revela que ele age com retidão, julga o mal e cumpre suas promessas. Na Bíblia, a justiça divina também aparece na salvação, porque Deus justifica pecadores por meio de Cristo.',
    bullets: [
      'Deus não ignora o pecado nem age com parcialidade.',
      'A cruz mostra ao mesmo tempo a justiça e a misericórdia de Deus.',
      'Quem foi alcançado pela justiça de Deus é chamado a praticar justiça no cotidiano.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Salvação' },
      { href: '/o-salario-do-pecado-e-a-morte-entenda/', label: 'Salário do pecado' },
      { href: '/o-poder-da-misericordia/', label: 'Misericórdia' },
    ],
  },
  'o-reino-de-deus': {
    question: 'O que é o Reino de Deus?',
    answer:
      'O Reino de Deus é o governo soberano de Deus revelado em Cristo e vivido por seus discípulos. Ele já se manifesta na vida transformada pela fé, mas será consumado plenamente na volta de Jesus.',
    bullets: [
      'Jesus anunciou o Reino como centro de sua mensagem.',
      'Viver o Reino envolve arrependimento, justiça, amor, serviço e obediência.',
      'O Reino já começou em Cristo, mas ainda aguarda sua consumação final.',
    ],
    links: [
      { href: '/guia-dos-ensinamentos-do-reino/', label: 'Ensinamentos do Reino' },
      { href: '/parabola-dos-talentos/', label: 'Parábola dos talentos' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'Volta de Jesus' },
    ],
  },
  'o-poder-da-misericordia': {
    question: 'O que a Bíblia ensina sobre misericórdia?',
    answer:
      'A Bíblia ensina que misericórdia é compaixão em ação diante da miséria, culpa ou sofrimento do outro. Deus é rico em misericórdia, e quem foi alcançado por ele deve tratar pessoas com graça, perdão e compaixão.',
    bullets: [
      'A misericórdia de Deus aparece no perdão, no cuidado e na paciência com pecadores.',
      'Jesus ensinou misericórdia por meio de parábolas, curas e acolhimento.',
      'Praticar misericórdia não nega a verdade, mas expressa o caráter de Deus.',
    ],
    links: [
      { href: '/o-bom-samaritano/', label: 'Bom samaritano' },
      { href: '/a-mulher-samaritana/', label: 'Mulher samaritana' },
      { href: '/a-justica-de-deus/', label: 'Justiça de Deus' },
    ],
  },
  'a-cura-de-bartimeu': {
    question: 'Quais lições aprendemos com a cura de Bartimeu?',
    answer:
      'A cura de Bartimeu ensina sobre fé perseverante, clamor por misericórdia e resposta de Jesus ao necessitado. Mesmo repreendido pela multidão, Bartimeu continuou clamando e recebeu de Cristo visão e restauração.',
    bullets: [
      'Bartimeu reconheceu Jesus como Filho de Davi e clamou por misericórdia.',
      'A multidão tentou silenciá-lo, mas sua fé perseverou.',
      'Depois de curado, Bartimeu seguiu Jesus pelo caminho.',
    ],
    links: [
      { href: '/o-poder-da-misericordia/', label: 'Misericórdia' },
      { href: '/fe-pequena/', label: 'Fé' },
      { href: '/amar-ao-proximo/', label: 'Amar ao próximo' },
    ],
  },
  'o-filho-prodigo': {
    question: 'Qual é a mensagem da parábola do filho pródigo?',
    answer:
      'A parábola do filho pródigo revela a graça do Pai, o arrependimento do filho perdido e o perigo do orgulho religioso do irmão mais velho. A mensagem central é que Deus recebe com misericórdia quem volta arrependido.',
    bullets: [
      'O filho mais novo representa afastamento, queda e retorno arrependido.',
      'O pai revela compaixão, perdão e alegria pela restauração.',
      'O irmão mais velho alerta contra religiosidade sem misericórdia.',
    ],
    links: [
      { href: '/o-poder-da-misericordia/', label: 'Misericórdia' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Salvação' },
      { href: '/guia-dos-ensinamentos-do-reino/', label: 'Parábolas de Jesus' },
    ],
  },
  'o-bom-samaritano': {
    question: 'O que ensina a parábola do bom samaritano?',
    answer:
      'A parábola do bom samaritano ensina que amar o próximo exige compaixão prática, não apenas discurso religioso. Jesus mostra que o verdadeiro próximo é aquele que age com misericórdia diante da dor do outro.',
    bullets: [
      'O sacerdote e o levita viram a necessidade, mas passaram de largo.',
      'O samaritano se aproximou, cuidou, pagou o custo e demonstrou amor concreto.',
      'Jesus encerra chamando seus ouvintes a praticarem a mesma misericórdia.',
    ],
    links: [
      { href: '/amar-ao-proximo/', label: 'Amar ao próximo' },
      { href: '/o-poder-da-misericordia/', label: 'Poder da misericórdia' },
      { href: '/guia-dos-ensinamentos-do-reino/', label: 'Parábolas de Jesus' },
    ],
  },
  'o-amor-de-deus': {
    question: 'O que é o amor de Deus?',
    answer:
      'O amor de Deus é sua disposição santa, fiel e graciosa de buscar, perdoar e restaurar pecadores por meio de Cristo. Na Bíblia, esse amor não é apenas sentimento, mas ação redentora revelada na cruz.',
    bullets: [
      'João 3:16 apresenta o amor de Deus ligado à entrega do Filho.',
      'O amor divino une graça, verdade, perdão, santidade e aliança.',
      'Quem recebe o amor de Deus é chamado a amar o próximo com atitudes concretas.',
    ],
    links: [
      { href: '/amar-ao-proximo/', label: 'Amar ao próximo' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Salvação' },
      { href: '/a-mulher-samaritana/', label: 'Mulher samaritana' },
    ],
  },
  'esperanca-crista': {
    question: 'O que é esperança cristã?',
    answer:
      'Esperança cristã é a confiança nas promessas de Deus, mesmo em tempos difíceis. Ela se apoia na ressurreição de Jesus, na presença de Deus hoje e na certeza da vida eterna.',
    bullets: [
      'A esperança bíblica não é otimismo vazio, mas fé no caráter fiel de Deus.',
      'A ressurreição de Cristo garante que sofrimento e morte não têm a palavra final.',
      'Esperança cristã fortalece perseverança, consolo e fidelidade nas lutas.',
    ],
    links: [
      { href: '/devocional-fe-em-meio-as-lutas/', label: 'Fé em meio às lutas' },
      { href: '/paz-que-excede-todo-entendimento/', label: 'Paz que excede entendimento' },
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
    ],
  },
  'salvacao-significado': {
    question: 'Qual é o significado da salvação no cristianismo?',
    answer:
      'No cristianismo, salvação significa ser resgatado do pecado e reconciliado com Deus pela graça, mediante a fé em Jesus Cristo. Ela inclui perdão, nova vida, adoção espiritual e esperança eterna.',
    bullets: [
      'A salvação nasce da graça de Deus, não do mérito humano.',
      'Jesus Cristo é o centro da salvação por sua morte e ressurreição.',
      'Quem é salvo é chamado a viver em arrependimento, fé e transformação.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Estudo sobre salvação' },
      { href: '/o-salario-do-pecado-e-a-morte-entenda/', label: 'Salário do pecado' },
      { href: '/o-amor-de-deus/', label: 'O amor de Deus' },
    ],
  },
  'vida-de-oracao': {
    question: 'O que é uma vida de oração?',
    answer:
      'Uma vida de oração é uma rotina de comunhão sincera com Deus, marcada por dependência, adoração, confissão, gratidão e intercessão. Ela transforma a oração em relacionamento contínuo, não apenas em pedidos urgentes.',
    bullets: [
      'Oração amadurece quando é constante, honesta e guiada pela Palavra.',
      'Jesus é o maior exemplo de intimidade com o Pai em meio à missão.',
      'Uma vida de oração fortalece discernimento, paz, arrependimento e perseverança.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
      { href: '/orar-sem-cessar/', label: 'Orar sem cessar' },
      { href: '/descubra-como-orar-como-jesus/', label: 'Orar como Jesus' },
    ],
  },
  'o-poder-da-oracao': {
    question: 'Qual é o poder da oração?',
    answer:
      'O poder da oração está em Deus, não na força das palavras humanas nem em fórmulas religiosas. Orar é buscar o Pai com fé, alinhar o coração à sua vontade e depender da sua graça, mesmo quando a resposta não vem como esperamos.',
    bullets: [
      'A oração bíblica envolve confiança, submissão, perseverança e arrependimento.',
      'Nem toda oração sem resposta visível está “bloqueada”; Deus responde com sabedoria e tempo perfeito.',
      'Orar transforma quem ora, fortalece a fé e conduz a uma vida mais obediente.',
    ],
    links: [
      { href: '/vida-de-oracao/', label: 'Vida de oração' },
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
      { href: '/orar-e-jejuar/', label: 'Orar e jejuar' },
    ],
  },
  'oracao-quanto-tempo-devo': {
    question: 'Quanto tempo devo orar?',
    answer:
      'A Bíblia não determina um tempo obrigatório de oração para todos. Mais importante do que contar minutos é cultivar constância, sinceridade, reverência e comunhão real com Deus.',
    bullets: [
      'Jesus ensinou a evitar repetições vazias e buscar o Pai com sinceridade.',
      'Há momentos de oração breve e momentos de oração prolongada na vida cristã.',
      'O alvo é crescer em relacionamento com Deus, não cumprir uma métrica religiosa.',
    ],
    links: [
      { href: '/vida-de-oracao/', label: 'Vida de oração' },
      { href: '/orar-sem-cessar/', label: 'Orar sem cessar' },
      { href: '/crente-pode-orar-deitado/', label: 'Crente pode orar deitado?' },
    ],
  },
  'livros-impactantes-da-biblia': {
    question: 'Quais livros da Bíblia mais impactam a vida cristã?',
    answer:
      'Todos os livros da Bíblia são importantes, mas alguns ajudam especialmente quem busca entender criação, queda, redenção, sabedoria, evangelho e vida da igreja. Gênesis, Salmos, João, Romanos e Atos são exemplos muito formativos.',
    bullets: [
      'Gênesis apresenta criação, queda, promessa e início da história da redenção.',
      'João e Romanos explicam com força quem é Jesus e o significado do evangelho.',
      'Salmos, Provérbios e Atos ajudam na oração, sabedoria e missão cristã.',
    ],
    links: [
      { href: '/por-onde-comecar-a-ler-a-biblia/', label: 'Por onde começar a ler' },
      { href: '/quem-escreveu-a-biblia-conheca-os-40-autores/', label: 'Quem escreveu a Bíblia' },
      { href: '/um-panorama-biblico-com-o-resumo-66-livros/', label: 'Resumo dos 66 livros' },
    ],
  },
  'significado-dos-nomes-de-deus': {
    question: 'Qual é o significado dos nomes de Deus?',
    answer:
      'Os nomes de Deus revelam aspectos do seu caráter, sua autoridade e seu relacionamento com o povo. Nomes como Elohim, Yahweh, Adonai e El Shaddai apontam para criação, aliança, senhorio, suficiência e fidelidade.',
    bullets: [
      'Elohim destaca Deus como Criador poderoso.',
      'Yahweh e Adonai revelam aliança, presença, governo e reverência diante do Senhor.',
      'Conhecer os nomes de Deus ajuda a orar, adorar e confiar com mais profundidade bíblica.',
    ],
    links: [
      { href: '/como-explicar-o-deus-triuno/', label: 'Deus triúno' },
      { href: '/o-amor-de-deus/', label: 'O amor de Deus' },
      { href: '/o-papel-das-aliancas-biblicas/', label: 'Alianças bíblicas' },
    ],
  },
  'mandamentos-explicados-a-lei-moral-de-deus': {
    question: 'O que os Dez Mandamentos ensinam hoje?',
    answer:
      'Os Dez Mandamentos revelam a santidade de Deus, o pecado humano e princípios morais que orientam amor a Deus e ao próximo. Para o cristão, eles não salvam, mas ensinam o caráter santo da vida que agrada ao Senhor.',
    bullets: [
      'A lei mostra o padrão moral de Deus e denuncia o pecado.',
      'Jesus resumiu a lei no amor a Deus e ao próximo.',
      'A obediência cristã nasce da graça, não da tentativa de comprar salvação.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Salvação pela graça' },
      { href: '/amar-ao-proximo/', label: 'Amar ao próximo' },
      { href: '/o-que-significa-tomar-a-sua-cruz/', label: 'Tomar a cruz' },
    ],
  },
  'o-significado-do-tabernaculo': {
    question: 'Qual é o significado do tabernáculo?',
    answer:
      'O tabernáculo era o lugar de habitação simbólica de Deus no meio de Israel e apontava para santidade, sacrifício, mediação e comunhão. Do átrio ao Santo dos Santos, seus elementos ajudam a entender o culto no Antigo Testamento e a obra de Cristo.',
    bullets: [
      'O tabernáculo ensinava que Deus é santo e deseja habitar no meio do seu povo.',
      'Altar, lavatório, candelabro, mesa, incenso, véu e arca comunicavam verdades espirituais.',
      'No Novo Testamento, Cristo cumpre de forma superior o acesso a Deus e a mediação perfeita.',
    ],
    links: [
      { href: '/oferta-de-manjares/', label: 'Oferta de manjares' },
      { href: '/o-papel-das-aliancas-biblicas/', label: 'Alianças bíblicas' },
      { href: '/profecias-messianicas-cumpridas/', label: 'Cristo no Antigo Testamento' },
    ],
  },
  'a-confirmacao-da-fe': {
    question: 'O que significa amém?',
    answer:
      'Amém significa confirmação, concordância e confiança. Na Bíblia, a palavra expressa que algo é verdadeiro, firme e digno de fé, especialmente quando o povo responde às promessas, louvores e orações diante de Deus.',
    bullets: [
      'Amém pode significar “assim seja” ou “verdadeiramente”.',
      'A palavra aparece em orações, louvores e declarações solenes.',
      'Dizer amém com fé é concordar com a verdade de Deus, não apenas encerrar uma frase.',
    ],
    links: [
      { href: '/estudo-biblico-sobre-oracao/', label: 'Estudo sobre oração' },
      { href: '/expressao-de-louvor-biblica/', label: 'Aleluia' },
      { href: '/hosana-um-pedido-de-salvacao/', label: 'Hosana' },
    ],
  },
  'expressao-de-louvor-biblica': {
    question: 'O que significa aleluia?',
    answer:
      'Aleluia é uma expressão bíblica de louvor que significa “louvai ao Senhor”. Ela aparece especialmente nos Salmos e comunica adoração, gratidão e exaltação ao Deus vivo.',
    bullets: [
      'Aleluia une convite e resposta de louvor ao Senhor.',
      'Nos Salmos, a expressão aparece ligada à grandeza, bondade e fidelidade de Deus.',
      'Louvar com aleluia deve envolver coração, vida e reverência, não apenas música.',
    ],
    links: [
      { href: '/diferenca-entre-louvor-e-adoracao/', label: 'Louvor e adoração' },
      { href: '/louvor-com-instrumentos/', label: 'Louvor com instrumentos' },
      { href: '/a-confirmacao-da-fe/', label: 'Amém' },
    ],
  },
  'hosana-um-pedido-de-salvacao': {
    question: 'O que significa hosana?',
    answer:
      'Hosana significa originalmente um pedido de salvação, como “salva-nos, por favor”, e também se tornou expressão de louvor. No Novo Testamento, a multidão usa essa palavra na entrada triunfal de Jesus em Jerusalém.',
    bullets: [
      'Hosana tem ligação com clamor por salvação e reconhecimento do Rei.',
      'Na entrada triunfal, a expressão aponta para Jesus como o Filho de Davi.',
      'A palavra une súplica, esperança messiânica e adoração.',
    ],
    links: [
      { href: '/profecias-messianicas-cumpridas/', label: 'Profecias messiânicas' },
      { href: '/a-profecia-do-nazareno/', label: 'Profecia do Nazareno' },
      { href: '/expressao-de-louvor-biblica/', label: 'Aleluia' },
    ],
  },
  'maranata-a-senha-dos-primeiros': {
    question: 'O que significa maranata?',
    answer:
      'Maranata é uma expressão usada pelos primeiros cristãos que pode ser entendida como “vem, Senhor” ou “o Senhor vem”. Ela expressa esperança, vigilância e desejo pela volta de Jesus.',
    bullets: [
      'Maranata aparece ligada à expectativa da vinda de Cristo.',
      'A expressão lembra que a igreja vive entre a promessa e a consumação.',
      'Dizer maranata é confessar esperança e fidelidade enquanto Cristo não volta.',
    ],
    links: [
      { href: '/a-volta-de-jesus-os-sinais/', label: 'A volta de Jesus' },
      { href: '/sinais-do-fim/', label: 'Sinais do fim' },
      { href: '/preparacao-para-o-arrebatamento/', label: 'Preparação espiritual' },
    ],
  },
  'profeta-elias-monte-carmelo-licoes-fe': {
    question: 'Quais lições aprendemos com Elias no Monte Carmelo?',
    answer:
      'Elias no Monte Carmelo ensina sobre coragem, fidelidade a Deus e confronto contra a idolatria. Mas sua história também mostra fragilidade, cansaço e cuidado divino, lembrando que até servos fiéis precisam ser restaurados pelo Senhor.',
    bullets: [
      'Elias confrontou a idolatria em um tempo de confusão espiritual.',
      'O episódio mostra que Deus responde de modo soberano e revela sua glória.',
      'Depois da vitória, Elias também enfrentou medo e exaustão, e Deus cuidou dele com paciência.',
    ],
    links: [
      { href: '/licoes-de-fe-de-abraao/', label: 'Lições de fé' },
      { href: '/o-cristao-que-satanas-mais-teme/', label: 'Firmeza espiritual' },
      { href: '/profetas-fake-news/', label: 'Falsos profetas' },
    ],
  },
  'rascunho-a-fe-de-raabe': {
    question: 'O que aprendemos com a fé de Raabe?',
    answer:
      'A fé de Raabe mostra que Deus alcança pessoas improváveis e transforma histórias marcadas por medo, risco e exclusão. Sua atitude em Jericó revelou confiança no Deus de Israel, e sua história entrou na linhagem do Messias.',
    bullets: [
      'Raabe ouviu sobre os feitos de Deus e respondeu com fé prática.',
      'Sua história une graça, coragem, risco e redenção.',
      'O Novo Testamento apresenta Raabe como exemplo de fé demonstrada por obras.',
    ],
    links: [
      { href: '/profecias-messianicas-cumpridas/', label: 'Linhagem messiânica' },
      { href: '/a-mulher-samaritana/', label: 'Graça para improváveis' },
      { href: '/estudo-biblico-sobre-salvacao/', label: 'Salvação pela graça' },
    ],
  },
  'quem-foi-debora-na-biblia': {
    question: 'Quem foi Débora na Bíblia?',
    answer:
      'Débora foi profetisa e juíza em Israel, usada por Deus para orientar o povo em um período de opressão. Sua história com Baraque, em Juízes 4 e 5, mostra coragem, sabedoria, liderança e confiança na ação do Senhor.',
    bullets: [
      'Débora julgava Israel e transmitia direção de Deus ao povo.',
      'Ela encorajou Baraque a obedecer ao chamado de Deus em uma batalha decisiva contra Sísera.',
      'Sua liderança destaca fé, discernimento e serviço em um tempo de crise nacional.',
    ],
    links: [
      { href: '/nao-haviam-mulheres-entre-os-12-apostolos/', label: 'Mulheres e os apóstolos' },
      { href: '/a-mulher-samaritana/', label: 'Mulher samaritana' },
      { href: '/lideranca-biblica-pastores-igrejas/', label: 'Liderança bíblica' },
    ],
  },
  'davi-lider-cristao': {
    question: 'O que Davi ensina sobre liderança cristã?',
    answer:
      'Davi ensina que liderança cristã envolve coragem, dependência de Deus, arrependimento e coração ensinável. Ele não foi perfeito, mas sua história mostra como Deus trabalha com líderes quebrantados e responsáveis.',
    bullets: [
      'Davi venceu desafios confiando no Senhor, não apenas em força humana.',
      'Suas falhas mostram a importância de arrependimento e correção.',
      'A liderança segundo Deus une coragem, adoração, justiça e humildade.',
    ],
    links: [
      { href: '/lideranca-crista/', label: 'Liderança cristã' },
      { href: '/lideranca-biblica-pastores-igrejas/', label: 'Liderança bíblica' },
      { href: '/humildade/', label: 'Humildade' },
    ],
  },
  'lideranca-crista': {
    question: 'O que é liderança cristã?',
    answer:
      'Liderança cristã é influenciar e servir pessoas de acordo com o caráter de Cristo. Ela não se baseia apenas em cargo, carisma ou autoridade, mas em serviço, verdade, amor, exemplo e responsabilidade diante de Deus.',
    bullets: [
      'Jesus ensinou que o maior deve ser servo de todos.',
      'Liderança cristã exige caráter, maturidade, humildade e fidelidade bíblica.',
      'Um líder saudável forma pessoas, protege o rebanho e aponta para Cristo.',
    ],
    links: [
      { href: '/lideranca-biblica-pastores-igrejas/', label: 'Liderança bíblica' },
      { href: '/davi-lider-cristao/', label: 'Davi como líder' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado' },
    ],
  },
  'vida-crista-com-proposito': {
    question: 'Como viver uma vida cristã com propósito?',
    answer:
      'Viver uma vida cristã com propósito é alinhar fé, trabalho, relacionamentos e recursos ao senhorio de Cristo. O propósito bíblico envolve glorificar a Deus, servir pessoas e viver com integridade.',
    bullets: [
      'Propósito cristão nasce da identidade em Cristo e da missão do Reino.',
      'Trabalho, honestidade e generosidade também fazem parte da espiritualidade diária.',
      'Uma vida com propósito usa dons e oportunidades para servir a Deus e ao próximo.',
    ],
    links: [
      { href: '/descubra-seu-proposito-de-vida/', label: 'Descobrir propósito' },
      { href: '/parabola-dos-talentos/', label: 'Parábola dos talentos' },
      { href: '/discipulado-cristao-passo-a-passo/', label: 'Discipulado cristão' },
    ],
  },
};
