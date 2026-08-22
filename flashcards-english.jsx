const { useState, useMemo, useEffect } = React;

const UNITS = [
  { id: 1, title: "Jobs" },
  { id: 2, title: "Shopping" },
  { id: 3, title: "Getting Around" },
  { id: 4, title: "Food" },
  { id: 5, title: "Sport & Leisure" },
  { id: 6, title: "Family & Friends" },
  { id: 7, title: "Your Place" },
  { id: 8, title: "Always Learning" },
  { id: 9, title: "Mind & Body" },
  { id: 10, title: "Places to Stay" },
  { id: 11, title: "Science & Nature" },
  { id: 12, title: "On the Phone" },
  { id: 13, title: "Film & Music" },
  { id: 14, title: "Trips & Things" },
  { id: 15, title: "Money" },
  { id: 16, title: "Events" },
];

const CARDS = [
  // UNIT 1 — Jobs
  { id: 1, unit: 1, cat: "Vocabulário", front: "deal with customers", back: "lidar com clientes", ex: "I deal with customers every day at my job.", note: "Também: deal with a problem (lidar com um problema)." },
  { id: 2, unit: 1, cat: "Vocabulário", front: "earn a good salary", back: "ganhar um bom salário", ex: "She earns a good salary as a nurse.", note: "'earn' = ganhar por trabalho, não 'win' (ganhar um prêmio)." },
  { id: 3, unit: 1, cat: "Vocabulário", front: "apply for a job", back: "candidatar-se a um emprego", ex: "I applied for a job last week.", note: "'apply for' + vaga; 'apply to' + empresa." },
  { id: 4, unit: 1, cat: "Vocabulário", front: "work part-time", back: "trabalhar meio período", ex: "He works part-time at a supermarket.", note: "Oposto: work full-time." },
  { id: 5, unit: 1, cat: "Gramática", front: "Present Simple — quando usar?", back: "Para rotinas e hábitos.", ex: "I usually start work at nine.", note: "Sinais: usually, always, every day." },
  { id: 6, unit: 1, cat: "Gramática", front: "Present Continuous — quando usar?", back: "Para ações temporárias, acontecendo agora.", ex: "I'm working from home this week.", note: "Sinais: now, at the moment, this week." },
  { id: 7, unit: 1, cat: "Gramática", front: "Zero Conditional — como formar?", back: "If + Present Simple, + Present Simple. Verdades gerais.", ex: "If I have a problem, I ask my manager.", note: "Sempre verdadeiro, não é hipótese." },

  // UNIT 2 — Shopping
  { id: 8, unit: 2, cat: "Vocabulário", front: "go shopping online", back: "fazer compras online", ex: "I often go shopping online.", note: "'go + -ing' também: go swimming, go running." },
  { id: 9, unit: 2, cat: "Vocabulário", front: "return an item", back: "devolver um produto", ex: "I need to return this shirt. It's too small.", note: "'item' = item/produto comprado." },
  { id: 10, unit: 2, cat: "Vocabulário", front: "try something on", back: "experimentar uma roupa", ex: "Can I try this jacket on?", note: "Verbo separável: try it on." },
  { id: 11, unit: 2, cat: "Vocabulário", front: "get a refund", back: "receber o dinheiro de volta", ex: "I got a refund for the broken phone.", note: "Diferente de 'exchange' (trocar por outro item)." },
  { id: 12, unit: 2, cat: "Gramática", front: "Past Simple — quando usar?", back: "Para ações finalizadas em um momento específico do passado.", ex: "I bought a new bag yesterday.", note: "Sinais: yesterday, last week, in 2020." },
  { id: 13, unit: 2, cat: "Gramática", front: "Comparativos — adjetivos curtos", back: "adjetivo + -er + than", ex: "This shop is cheaper than that one.", note: "Adjetivos de 1-2 sílabas." },
  { id: 14, unit: 2, cat: "Gramática", front: "Comparativos — adjetivos longos", back: "more + adjetivo + than", ex: "This website is more expensive than the other one.", note: "Adjetivos de 3+ sílabas." },

  // UNIT 3 — Getting Around
  { id: 15, unit: 3, cat: "Vocabulário", front: "miss the bus", back: "perder o ônibus", ex: "I missed the bus this morning.", note: "Também: miss a flight/train." },
  { id: 16, unit: 3, cat: "Vocabulário", front: "be stuck in traffic", back: "ficar preso no trânsito", ex: "We were stuck in traffic for an hour.", note: "'stuck' = preso, sem conseguir se mover." },
  { id: 17, unit: 3, cat: "Vocabulário", front: "take a taxi", back: "pegar um táxi", ex: "I took a taxi to the airport.", note: "Também: take the bus/train/metro." },
  { id: 18, unit: 3, cat: "Vocabulário", front: "ask for directions", back: "pedir informações de endereço", ex: "I asked for directions to the station.", note: "'directions' aqui é plural." },
  { id: 19, unit: 3, cat: "Gramática", front: "Past Simple x Past Continuous", back: "Continuous = ação em andamento; Simple = ação que a interrompe.", ex: "I was walking home when it started to rain.", note: "'when' liga as duas ações." },
  { id: 20, unit: 3, cat: "Gramática", front: "Quantifiers — substantivos contáveis", back: "How many + substantivo no plural", ex: "How many bags do you have?", note: "'bags' é contável (uma bolsa, duas bolsas)." },
  { id: 21, unit: 3, cat: "Gramática", front: "Quantifiers — substantivos incontáveis", back: "How much + substantivo no singular", ex: "How much luggage do you have?", note: "'luggage' é incontável (não existe 'a luggage')." },

  // UNIT 4 — Food
  { id: 22, unit: 4, cat: "Vocabulário", front: "order a dish", back: "pedir um prato", ex: "I ordered a pasta dish.", note: "'order' = pedir (comida, serviço)." },
  { id: 23, unit: 4, cat: "Vocabulário", front: "book a table", back: "reservar uma mesa", ex: "We booked a table for two.", note: "'book' = reservar (também: book a room, book a flight)." },
  { id: 24, unit: 4, cat: "Vocabulário", front: "taste delicious", back: "ter um sabor delicioso", ex: "This soup tastes delicious.", note: "'taste' + adjetivo, sem 'like': it tastes good." },
  { id: 25, unit: 4, cat: "Vocabulário", front: "be on a diet", back: "estar de dieta", ex: "I'm on a diet, so I don't eat sugar.", note: "'on a diet' é a expressão fixa." },
  { id: 26, unit: 4, cat: "Gramática", front: "Present Perfect Simple — quando usar?", back: "Para experiências sem tempo específico.", ex: "I've never tried sushi.", note: "Estrutura: have/has + particípio." },
  { id: 27, unit: 4, cat: "Gramática", front: "Present Perfect com 'for' e 'since'", back: "'for' = duração; 'since' = ponto de partida.", ex: "I've lived here for two years.", note: "for + período; since + momento específico (since 2020)." },
  { id: 28, unit: 4, cat: "Gramática", front: "Too / Not enough", back: "'too' = demais; 'not enough' = insuficiente.", ex: "This coffee is too hot. I don't have enough time.", note: "'too' antes do adjetivo; 'enough' depois." },

  // UNIT 5 — Sport & Leisure
  { id: 29, unit: 5, cat: "Vocabulário", front: "go for a run", back: "sair para correr", ex: "I go for a run every morning.", note: "Também: go for a walk/swim." },
  { id: 30, unit: 5, cat: "Vocabulário", front: "join a gym", back: "se matricular numa academia", ex: "I joined a new gym last month.", note: "'join' = entrar/se inscrever em algo." },
  { id: 31, unit: 5, cat: "Vocabulário", front: "win a match", back: "ganhar uma partida", ex: "Our team won the match.", note: "Oposto: lose a match." },
  { id: 32, unit: 5, cat: "Vocabulário", front: "take a break", back: "fazer uma pausa", ex: "Let's take a break for ten minutes.", note: "'take a break' é expressão fixa." },
  { id: 33, unit: 5, cat: "Gramática", front: "Present Continuous para planos futuros", back: "Usado para planos já combinados.", ex: "I'm meeting my friends tomorrow.", note: "Precisa de um tempo futuro claro: tomorrow, next week." },
  { id: 34, unit: 5, cat: "Gramática", front: "Superlativos — adjetivos curtos", back: "the + adjetivo + -est", ex: "This is the fastest runner in the team.", note: "Adjetivos de 1-2 sílabas." },
  { id: 35, unit: 5, cat: "Gramática", front: "Superlativos — adjetivos longos", back: "the most + adjetivo", ex: "That was the most exciting game of the year.", note: "Adjetivos de 3+ sílabas." },

  // UNIT 6 — Family & Friends
  { id: 36, unit: 6, cat: "Vocabulário", front: "get along with someone", back: "dar-se bem com alguém", ex: "I get along with my sister.", note: "Também: get on with (mais britânico)." },
  { id: 37, unit: 6, cat: "Vocabulário", front: "keep in touch", back: "manter contato", ex: "We keep in touch by video call.", note: "Oposto: lose touch (perder o contato)." },
  { id: 38, unit: 6, cat: "Vocabulário", front: "look like someone", back: "parecer-se com alguém", ex: "She looks like her mother.", note: "Físico. Para personalidade: take after someone." },
  { id: 39, unit: 6, cat: "Vocabulário", front: "post a photo", back: "postar uma foto", ex: "He posted a photo on social media.", note: "Também: post a comment, post a video." },
  { id: 40, unit: 6, cat: "Gramática", front: "Question formation — Wh- questions", back: "Wh-word + auxiliar + sujeito + verbo", ex: "Where do you live?", note: "Palavras: what, where, when, why, who, how." },
  { id: 41, unit: 6, cat: "Gramática", front: "Question formation — perguntas sim/não", back: "Auxiliar + sujeito + verbo", ex: "Do you have brothers or sisters?", note: "Resposta curta: Yes, I do. / No, I don't." },
  { id: 42, unit: 6, cat: "Gramática", front: "Mostrando semelhança com 'so' e 'too'", back: "'so' + auxiliar + sujeito (antes do verbo); 'too' no fim da frase.", ex: "I like coffee, and so does she.", note: "'too': She likes coffee too." },

  // UNIT 7 — Your Place
  { id: 43, unit: 7, cat: "Vocabulário", front: "live in the city centre", back: "morar no centro da cidade", ex: "I live in the city centre.", note: "Britânico: centre; americano: center." },
  { id: 44, unit: 7, cat: "Vocabulário", front: "share a flat", back: "dividir um apartamento", ex: "I share a flat with two friends.", note: "'flat' (britânico) = 'apartment' (americano)." },
  { id: 45, unit: 7, cat: "Vocabulário", front: "stay with someone", back: "ficar hospedado na casa de alguém", ex: "I stayed with my cousin last summer.", note: "Diferente de 'live with' (morar junto de forma permanente)." },
  { id: 46, unit: 7, cat: "Vocabulário", front: "move house", back: "mudar de casa", ex: "We're moving house next month.", note: "'move' sozinho já significa 'se mudar'." },
  { id: 47, unit: 7, cat: "Gramática", front: "Have to / don't have to", back: "'have to' = obrigação; 'don't have to' = não é necessário.", ex: "I have to clean my room. I don't have to work today.", note: "Diferente de 'mustn't' (proibido)." },
  { id: 48, unit: 7, cat: "Gramática", front: "Can / can't — permissão e habilidade", back: "'can' = pode/consegue; 'can't' = não pode/não consegue.", ex: "You can park here. You can't smoke inside.", note: "Também usado para habilidade: I can swim." },
  { id: 49, unit: 7, cat: "Gramática", front: "Will / won't — decisões no momento", back: "Usado para decisões espontâneas.", ex: "I'll help you with that.", note: "Diferente de planos já combinados (present continuous)." },

  // UNIT 8 — Always Learning
  { id: 50, unit: 8, cat: "Vocabulário", front: "take a course", back: "fazer um curso", ex: "I'm taking an online course.", note: "'take' aqui = fazer/cursar." },
  { id: 51, unit: 8, cat: "Vocabulário", front: "pass an exam", back: "passar numa prova", ex: "She passed her English exam.", note: "Oposto: fail an exam (reprovar)." },
  { id: 52, unit: 8, cat: "Vocabulário", front: "hand in homework", back: "entregar a lição de casa", ex: "I need to hand in my homework.", note: "'hand in' = entregar (trabalho, prova)." },
  { id: 53, unit: 8, cat: "Vocabulário", front: "drop out of school", back: "abandonar a escola", ex: "He dropped out of school at sixteen.", note: "'drop out of' + escola/curso." },
  { id: 54, unit: 8, cat: "Gramática", front: "First Conditional — como formar?", back: "If + Present Simple, will + infinitivo. Possibilidade real no futuro.", ex: "If I study hard, I will pass the exam.", note: "Diferente do zero conditional (verdade geral)." },
  { id: 55, unit: 8, cat: "Gramática", front: "Had to — obrigação no passado", back: "Passado de 'have to'.", ex: "I had to study all weekend.", note: "'must' não tem forma no passado; usa-se 'had to'." },
  { id: 56, unit: 8, cat: "Gramática", front: "Could — habilidade no passado", back: "Passado de 'can' para habilidade geral.", ex: "I could read when I was five.", note: "Para uma habilidade específica em um momento: 'was able to'." },

  // UNIT 9 — Mind & Body
  { id: 57, unit: 9, cat: "Vocabulário", front: "feel dizzy", back: "sentir tontura", ex: "I feel dizzy today.", note: "'feel' + adjetivo de sensação." },
  { id: 58, unit: 9, cat: "Vocabulário", front: "have a headache", back: "estar com dor de cabeça", ex: "I have a headache.", note: "Também: have a stomachache, have a fever." },
  { id: 59, unit: 9, cat: "Vocabulário", front: "see a doctor", back: "consultar um médico", ex: "You should see a doctor.", note: "'see' aqui = consultar." },
  { id: 60, unit: 9, cat: "Vocabulário", front: "break a bone", back: "quebrar um osso", ex: "He broke his arm playing football.", note: "'break' no passado = broke." },
  { id: 61, unit: 9, cat: "Gramática", front: "Dando conselhos com 'should'", back: "should + infinitivo sem 'to'", ex: "You should drink more water.", note: "Negativo: You shouldn't skip meals." },
  { id: 62, unit: 9, cat: "Gramática", front: "Dando conselhos com 'had better'", back: "had better + infinitivo sem 'to' — conselho mais forte.", ex: "You'd better rest today.", note: "Contração comum: you'd better." },
  { id: 63, unit: 9, cat: "Gramática", front: "Imperativos", back: "Verbo no infinitivo sem sujeito, para instruções.", ex: "Take this medicine twice a day.", note: "Negativo: Don't take it on an empty stomach." },

  // UNIT 10 — Places to Stay
  { id: 64, unit: 10, cat: "Vocabulário", front: "check into a hotel", back: "fazer check-in num hotel", ex: "We checked into the hotel at noon.", note: "Oposto: check out (fazer check-out)." },
  { id: 65, unit: 10, cat: "Vocabulário", front: "book a room", back: "reservar um quarto", ex: "I booked a room for three nights.", note: "'book' = reservar." },
  { id: 66, unit: 10, cat: "Vocabulário", front: "go camping", back: "acampar", ex: "We went camping last summer.", note: "'go + -ing' para atividades." },
  { id: 67, unit: 10, cat: "Vocabulário", front: "have a problem with the room", back: "ter um problema com o quarto", ex: "We had a problem with the room.", note: "Útil para reclamar em hotéis." },
  { id: 68, unit: 10, cat: "Gramática", front: "Used to — o que significa?", back: "Hábito ou estado do passado que não existe mais.", ex: "I used to travel a lot before the pandemic.", note: "Não confundir com 'be used to' (estar acostumado)." },
  { id: 69, unit: 10, cat: "Gramática", front: "Time clauses — when / before / after", back: "Conectam duas ações no tempo.", ex: "I'll call you when I arrive.", note: "Depois de 'when', usa-se present simple (não 'will')." },
  { id: 70, unit: 10, cat: "Gramática", front: "Time clauses — as soon as", back: "'assim que' — ação imediata.", ex: "I'll text you as soon as I land.", note: "Mesma regra: present simple depois de 'as soon as'." },

  // UNIT 11 — Science & Nature
  { id: 71, unit: 11, cat: "Vocabulário", front: "make a discovery", back: "fazer uma descoberta", ex: "Scientists made an important discovery.", note: "'make' + discovery (não 'do')." },
  { id: 72, unit: 11, cat: "Vocabulário", front: "protect the environment", back: "proteger o meio ambiente", ex: "We should protect the environment.", note: "'environment' = meio ambiente." },
  { id: 73, unit: 11, cat: "Vocabulário", front: "an endangered species", back: "uma espécie ameaçada", ex: "The tiger is an endangered species.", note: "'species' é igual no singular e no plural." },
  { id: 74, unit: 11, cat: "Vocabulário", front: "conduct an experiment", back: "realizar um experimento", ex: "They conducted an experiment in the lab.", note: "'conduct' aqui = realizar/fazer." },
  { id: 75, unit: 11, cat: "Gramática", front: "Past Perfect Simple — quando usar?", back: "Para uma ação que aconteceu antes de outra no passado.", ex: "The scientist had already left when we arrived.", note: "had + particípio." },
  { id: 76, unit: 11, cat: "Gramática", front: "Voz Passiva — presente", back: "am/is/are + particípio", ex: "The results are published every year.", note: "Usada quando a ação importa mais que quem faz." },
  { id: 77, unit: 11, cat: "Gramática", front: "Voz Passiva — passado", back: "was/were + particípio", ex: "The experiment was done in 2020.", note: "'by + agente' é opcional." },

  // UNIT 12 — On the Phone
  { id: 78, unit: 12, cat: "Vocabulário", front: "leave a message", back: "deixar um recado", ex: "I left a message on his phone.", note: "'leave' aqui = deixar." },
  { id: 79, unit: 12, cat: "Vocabulário", front: "hang up", back: "desligar o telefone", ex: "She hung up before I finished.", note: "Oposto informal: pick up (atender)." },
  { id: 80, unit: 12, cat: "Vocabulário", front: "answer the phone", back: "atender o telefone", ex: "Can you answer the phone, please?", note: "'answer' aqui = atender (não confundir com 'attend')." },
  { id: 81, unit: 12, cat: "Vocabulário", front: "report a crime", back: "denunciar um crime", ex: "I reported the crime to the police.", note: "'report' = relatar/denunciar." },
  { id: 82, unit: 12, cat: "Gramática", front: "Yet / already — diferença", back: "'yet' em negativas/perguntas; 'already' em afirmativas.", ex: "I haven't finished yet. I've already called her.", note: "'yet' geralmente no final da frase." },
  { id: 83, unit: 12, cat: "Gramática", front: "Just / still — diferença", back: "'just' = há pouco tempo; 'still' = ainda (continua acontecendo).", ex: "I've just arrived. I'm still waiting.", note: "'just' com present perfect; 'still' com qualquer tempo verbal." },
  { id: 84, unit: 12, cat: "Gramática", front: "Discurso indireto (reported speech)", back: "Ao relatar o que alguém disse, o verbo geralmente volta um tempo.", ex: "She said that she was busy.", note: "'is' vira 'was'; 'will' vira 'would'." },

  // UNIT 13 — Film & Music
  { id: 85, unit: 13, cat: "Vocabulário", front: "watch a series", back: "assistir a uma série", ex: "I'm watching a new series.", note: "'series' é igual no singular e plural." },
  { id: 86, unit: 13, cat: "Vocabulário", front: "play an instrument", back: "tocar um instrumento", ex: "He plays the guitar.", note: "Use 'the' antes do instrumento: play the piano." },
  { id: 87, unit: 13, cat: "Vocabulário", front: "release an album", back: "lançar um álbum", ex: "The band released a new album.", note: "'release' = lançar (música, filme)." },
  { id: 88, unit: 13, cat: "Vocabulário", front: "be a fan of someone", back: "ser fã de alguém", ex: "I'm a big fan of that singer.", note: "'fan of' + pessoa/coisa." },
  { id: 89, unit: 13, cat: "Gramática", front: "Be supposed to — o que significa?", back: "Expectativa ou combinado, algo que deveria acontecer.", ex: "The movie is supposed to start at eight.", note: "Também usado para regras: You're supposed to arrive early." },
  { id: 90, unit: 13, cat: "Gramática", front: "Present Perfect Continuous", back: "have/has been + verbo-ing, ação contínua até agora.", ex: "I've been watching this show for hours.", note: "Foco na duração da ação, não no resultado." },

  // UNIT 14 — Trips & Things
  { id: 91, unit: 14, cat: "Vocabulário", front: "pack a bag", back: "fazer a mala", ex: "I need to pack my bag for the trip.", note: "'pack' = arrumar/fazer a mala." },
  { id: 92, unit: 14, cat: "Vocabulário", front: "recycle plastic", back: "reciclar plástico", ex: "We recycle plastic at home.", note: "Também: recycle paper, glass, metal." },
  { id: 93, unit: 14, cat: "Vocabulário", front: "throw something away", back: "jogar algo fora", ex: "Don't throw that away, recycle it.", note: "Verbo separável: throw it away." },
  { id: 94, unit: 14, cat: "Vocabulário", front: "borrow something", back: "pegar algo emprestado", ex: "Can I borrow your umbrella?", note: "Diferente de 'lend' (emprestar para alguém)." },
  { id: 95, unit: 14, cat: "Gramática", front: "Orações relativas — pessoas", back: "who/that + verbo, para identificar uma pessoa.", ex: "That's the man who fixed my car.", note: "'that' também pode substituir 'who' de forma informal." },
  { id: 96, unit: 14, cat: "Gramática", front: "Orações relativas — coisas", back: "which/that + verbo, para identificar uma coisa.", ex: "This is the bag that I bought yesterday.", note: "Sem vírgula antes — é uma oração definidora." },
  { id: 97, unit: 14, cat: "Gramática", front: "Falando sobre regras — must/mustn't", back: "'must' = obrigatório; 'mustn't' = proibido.", ex: "You must wear a seatbelt. You mustn't smoke here.", note: "Diferente de 'don't have to' (não é necessário)." },

  // UNIT 15 — Money
  { id: 98, unit: 15, cat: "Vocabulário", front: "save money", back: "economizar dinheiro", ex: "I'm trying to save money this year.", note: "Oposto: spend money (gastar dinheiro)." },
  { id: 99, unit: 15, cat: "Vocabulário", front: "pay in cash", back: "pagar em dinheiro", ex: "I paid in cash at the market.", note: "Oposto: pay by card." },
  { id: 100, unit: 15, cat: "Vocabulário", front: "lend someone money", back: "emprestar dinheiro a alguém", ex: "I lent him some money.", note: "'lend' (eu empresto) x 'borrow' (eu pego emprestado)." },
  { id: 101, unit: 15, cat: "Vocabulário", front: "donate to charity", back: "doar para caridade", ex: "We donate to charity every year.", note: "'charity' = instituição de caridade." },
  { id: 102, unit: 15, cat: "Gramática", front: "Second Conditional — como formar?", back: "If + Past Simple, would + infinitivo. Situação hipotética.", ex: "If I had more money, I would travel more.", note: "Situação improvável ou imaginária." },
  { id: 103, unit: 15, cat: "Gramática", front: "Second Conditional com 'were'", back: "Com o verbo 'be', usa-se 'were' para todas as pessoas.", ex: "If I were rich, I would buy a house.", note: "Mais formal: If I were you, I would..." },

  // UNIT 16 — Events
  { id: 104, unit: 16, cat: "Vocabulário", front: "throw a party", back: "dar uma festa", ex: "We're throwing a party this weekend.", note: "'throw a party' é a expressão comum, não 'make a party'." },
  { id: 105, unit: 16, cat: "Vocabulário", front: "celebrate a birthday", back: "comemorar um aniversário", ex: "We celebrated her birthday yesterday.", note: "'celebrate' + evento." },
  { id: 106, unit: 16, cat: "Vocabulário", front: "attend an event", back: "comparecer a um evento", ex: "I attended a wedding last month.", note: "'attend' = comparecer (não confundir com 'atender')." },
  { id: 107, unit: 16, cat: "Vocabulário", front: "take place", back: "acontecer (um evento)", ex: "The concert took place in the park.", note: "'take place' = happen." },
  { id: 108, unit: 16, cat: "Gramática", front: "Artigos — a/an x the", back: "'a/an' primeira menção; 'the' quando já é conhecido.", ex: "I went to a party. The party was great.", note: "'the' também para coisas únicas: the moon." },
  { id: 109, unit: 16, cat: "Gramática", front: "Padrões verbais — verbo + -ing", back: "Alguns verbos são seguidos de verbo + -ing.", ex: "I enjoy dancing at parties.", note: "Outros: like, love, hate + -ing." },
  { id: 110, unit: 16, cat: "Gramática", front: "Padrões verbais — infinitivo com 'to'", back: "Alguns verbos são seguidos de 'to' + infinitivo.", ex: "I decided to go to the party.", note: "Outros: want, plan, hope + to + infinitivo." },

  // Extra vocabulary — Unit 1 Jobs
  { id: 111, unit: 1, cat: "Vocabulário", front: "work for myself", back: "trabalhar por conta própria", ex: "I've always wanted to work for myself instead of having a boss.", note: "'Work for' + pronome reflexivo = ser autônomo." },
  { id: 112, unit: 1, cat: "Vocabulário", front: "run my own company", back: "ter/dirigir minha própria empresa", ex: "She left her job last year to run her own company.", note: "'Run a company' = administrar um negócio." },
  { id: 113, unit: 1, cat: "Vocabulário", front: "give a presentation", back: "dar uma apresentação", ex: "I have to give a presentation to the whole team on Friday.", note: "Colocação fixa: 'give', não 'do' ou 'make'." },
  { id: 114, unit: 1, cat: "Vocabulário", front: "have an argument", back: "ter uma discussão", ex: "We had an argument about the schedule, but we sorted it out.", note: "Diferente de 'have a conversation' (neutro)." },

  // Extra vocabulary — Unit 2 Shopping
  { id: 115, unit: 2, cat: "Vocabulário", front: "in good/bad condition", back: "em bom/mau estado", ex: "I bought it second-hand, but it's in really good condition.", note: "Usado pra descrever o estado de algo comprado." },
  { id: 116, unit: 2, cat: "Vocabulário", front: "keep me warm", back: "me manter aquecido", ex: "This coat keeps me warm even in winter.", note: "'Keep' + pessoa + adjetivo = manter em um estado." },
  { id: 117, unit: 2, cat: "Vocabulário", front: "these shoes don't fit", back: "esses sapatos não servem", ex: "I tried them on, but they didn't fit — too small.", note: "'Fit' = servir em tamanho, diferente de 'suit'." },
  { id: 118, unit: 2, cat: "Vocabulário", front: "these earrings suit you", back: "esses brincos combinam com você", ex: "Those earrings really suit you!", note: "'Suit' = ficar bem em alguém (aparência)." },

  // Extra vocabulary — Unit 3 Getting Around
  { id: 119, unit: 3, cat: "Vocabulário", front: "catch a train", back: "pegar um trem", ex: "I need to catch the 8am train or I'll be late.", note: "'Catch' = pegar transporte com horário marcado." },
  { id: 120, unit: 3, cat: "Vocabulário", front: "get on/off the bus", back: "entrar/descer do ônibus", ex: "I got off the bus one stop too early.", note: "'Get on' = entrar, 'get off' = descer." },
  { id: 121, unit: 3, cat: "Vocabulário", front: "get lost", back: "se perder", ex: "We got lost trying to find the hotel.", note: "Não confundir com o imperativo informal 'Get lost!'." },
  { id: 122, unit: 3, cat: "Vocabulário", front: "walk instead of driving", back: "andar a pé em vez de dirigir", ex: "I try to walk instead of driving when the weather's good.", note: "'Instead of' + verbo -ing." },

  // Extra vocabulary — Unit 4 Food
  { id: 123, unit: 4, cat: "Vocabulário", front: "go out for dinner", back: "sair para jantar", ex: "We went out for dinner to celebrate.", note: "'Go out for' + refeição." },
  { id: 124, unit: 4, cat: "Vocabulário", front: "eat out", back: "comer fora", ex: "We eat out about once a week.", note: "Oposto de 'eat in' / 'cook at home'." },
  { id: 125, unit: 4, cat: "Vocabulário", front: "be starving", back: "estar faminto", ex: "I'm starving — let's eat now.", note: "Informal, mais forte que 'be hungry'." },
  { id: 126, unit: 4, cat: "Vocabulário", front: "skip a meal", back: "pular uma refeição", ex: "I sometimes skip breakfast when I'm in a hurry.", note: "'Skip' = pular/não fazer algo de rotina." },

  // Extra vocabulary — Unit 5 Sport & Leisure
  { id: 127, unit: 5, cat: "Vocabulário", front: "support a team", back: "torcer para um time", ex: "Which team do you support?", note: "'Support' = torcer, ser fã de um time." },
  { id: 128, unit: 5, cat: "Vocabulário", front: "compete in a race", back: "competir numa corrida", ex: "I've never competed in a race, but I'd like to try.", note: "'Compete in' + evento esportivo." },
  { id: 129, unit: 5, cat: "Vocabulário", front: "go for a swim", back: "ir nadar", ex: "It's hot — let's go for a swim.", note: "Mesmo padrão de 'go for a run/walk'." },
  { id: 130, unit: 5, cat: "Vocabulário", front: "be good at something", back: "ser bom em algo", ex: "I'm not very good at football, but I love watching it.", note: "'Be good at' + substantivo ou verbo -ing." },

  // Extra vocabulary — Unit 6 Family & Friends
  { id: 131, unit: 6, cat: "Vocabulário", front: "go viral", back: "viralizar", ex: "The video went viral overnight.", note: "Usado pra conteúdo online que se espalha rápido." },
  { id: 132, unit: 6, cat: "Vocabulário", front: "share a post", back: "compartilhar uma postagem", ex: "Please share the post if you can.", note: "'Share' = compartilhar em rede social." },
  { id: 133, unit: 6, cat: "Vocabulário", front: "be reliable", back: "ser confiável", ex: "My brother's very reliable — he always keeps his promises.", note: "Usado pra descrever personalidade." },
  { id: 134, unit: 6, cat: "Vocabulário", front: "take after someone", back: "puxar a alguém (personalidade/aparência)", ex: "I take after my mother — we're both very patient.", note: "Diferente de 'look like' (só aparência física)." },

  // Extra vocabulary — Unit 7 Your Place
  { id: 135, unit: 7, cat: "Vocabulário", front: "a historic building", back: "um prédio histórico", ex: "The city centre has a lot of historic buildings.", note: "'Historic' = de valor histórico." },
  { id: 136, unit: 7, cat: "Vocabulário", front: "take public transport", back: "pegar transporte público", ex: "I usually take public transport to work.", note: "'Take' + meio de transporte." },
  { id: 137, unit: 7, cat: "Vocabulário", front: "a quiet neighbourhood", back: "um bairro tranquilo", ex: "I'd like to live in a quieter neighbourhood.", note: "'Neighbourhood' (BrE) = 'neighborhood' (AmE)." },
  { id: 138, unit: 7, cat: "Vocabulário", front: "the cost of living", back: "o custo de vida", ex: "The cost of living here is quite high.", note: "Expressão fixa em contextos econômicos." },

  // Extra vocabulary — Unit 8 Always Learning
  { id: 139, unit: 8, cat: "Vocabulário", front: "do a degree", back: "cursar uma graduação", ex: "She's doing a degree in Law at university.", note: "'Do a degree in' + área de estudo." },
  { id: 140, unit: 8, cat: "Vocabulário", front: "leave school", back: "sair da escola / concluir os estudos", ex: "He left school at sixteen and started working.", note: "'Leave school' = terminar o ensino obrigatório." },
  { id: 141, unit: 8, cat: "Vocabulário", front: "take a year off", back: "tirar um ano sabático", ex: "I took a year off before starting university.", note: "Pausa nos estudos ou no trabalho." },
  { id: 142, unit: 8, cat: "Vocabulário", front: "get good grades", back: "tirar boas notas", ex: "She always gets good grades in science.", note: "'Get' + adjetivo + 'grades'." },

  // Extra vocabulary — Unit 9 Mind & Body
  { id: 143, unit: 9, cat: "Vocabulário", front: "catch the flu", back: "pegar gripe", ex: "I caught the flu last week and I'm still tired.", note: "'Catch' = pegar uma doença contagiosa." },
  { id: 144, unit: 9, cat: "Vocabulário", front: "take pills", back: "tomar remédio (comprimidos)", ex: "My grandparents have to take pills every day.", note: "'Take' + medicamento." },
  { id: 145, unit: 9, cat: "Vocabulário", front: "feel weak", back: "sentir-se fraco", ex: "I still feel weak after being sick.", note: "'Feel' + adjetivo de sensação física." },
  { id: 146, unit: 9, cat: "Vocabulário", front: "suffer from something", back: "sofrer de algo (doença/condição)", ex: "He suffers from allergies every spring.", note: "'Suffer from' + condição de saúde crônica." },

  // Extra vocabulary — Unit 10 Places to Stay
  { id: 147, unit: 10, cat: "Vocabulário", front: "put up a tent", back: "armar a barraca", ex: "It took us an hour to put up the tent.", note: "'Put up' = montar/armar." },
  { id: 148, unit: 10, cat: "Vocabulário", front: "share a room", back: "dividir um quarto", ex: "We shared a room to save money.", note: "'Share' + espaço." },
  { id: 149, unit: 10, cat: "Vocabulário", front: "a reduced rate", back: "uma tarifa com desconto", ex: "We got a reduced rate because we booked early.", note: "'Reduced rate' = preço reduzido." },
  { id: 150, unit: 10, cat: "Vocabulário", front: "out of order", back: "fora de funcionamento", ex: "The lift was out of order, so we used the stairs.", note: "Usado pra elevadores, máquinas, banheiros etc." },

  // Extra vocabulary — Unit 11 Science & Nature
  { id: 151, unit: 11, cat: "Vocabulário", front: "carry out an experiment", back: "realizar um experimento", ex: "Scientists carried out the experiment over five years.", note: "'Carry out' = realizar/conduzir (formal)." },
  { id: 152, unit: 11, cat: "Vocabulário", front: "predict the future", back: "prever o futuro", ex: "It's hard to predict what will happen next.", note: "'Predict' + substantivo." },
  { id: 153, unit: 11, cat: "Vocabulário", front: "reduce pollution", back: "reduzir a poluição", ex: "We need to reduce pollution in big cities.", note: "'Reduce' = diminuir." },
  { id: 154, unit: 11, cat: "Vocabulário", front: "go extinct", back: "ser extinto", ex: "Many species could go extinct in the next 50 years.", note: "'Go extinct' = deixar de existir." },

  // Extra vocabulary — Unit 12 On the Phone
  { id: 155, unit: 12, cat: "Vocabulário", front: "pick up the phone", back: "atender o telefone", ex: "He never picks up when I call him.", note: "'Pick up' = atender a chamada." },
  { id: 156, unit: 12, cat: "Vocabulário", front: "a bad signal", back: "um sinal ruim", ex: "Sorry, it's a really bad signal here.", note: "'Signal' = sinal de celular." },
  { id: 157, unit: 12, cat: "Vocabulário", front: "go straight to voicemail", back: "cair direto na caixa postal", ex: "I called twice, but it went straight to voicemail.", note: "Expressão fixa pra ligações não atendidas." },
  { id: 158, unit: 12, cat: "Vocabulário", front: "break into a house", back: "arrombar/invadir uma casa", ex: "Someone broke into our house last week.", note: "'Break into' = entrar à força." },

  // Extra vocabulary — Unit 13 Film & Music
  { id: 159, unit: 13, cat: "Vocabulário", front: "take up an instrument", back: "começar a praticar um instrumento", ex: "I took up the guitar during the pandemic.", note: "'Take up' = começar a fazer algo novo." },
  { id: 160, unit: 13, cat: "Vocabulário", front: "give up an activity", back: "desistir de / abandonar uma atividade", ex: "He gave up piano after a year.", note: "'Give up' = parar de fazer algo." },
  { id: 161, unit: 13, cat: "Vocabulário", front: "join a choir", back: "entrar num coral", ex: "She joined a choir at school and loved it.", note: "'Join' = entrar/se inscrever em um grupo." },
  { id: 162, unit: 13, cat: "Vocabulário", front: "read music", back: "ler partitura", ex: "I can play by ear, but I can't read music.", note: "'Read music' = ler notação musical." },

  // Extra vocabulary — Unit 14 Trips & Things
  { id: 163, unit: 14, cat: "Vocabulário", front: "lend someone something", back: "emprestar algo a alguém", ex: "Can you lend me your charger?", note: "'Lend' (eu empresto) x 'borrow' (eu pego emprestado)." },
  { id: 164, unit: 14, cat: "Vocabulário", front: "separate the rubbish", back: "separar o lixo", ex: "We separate the rubbish for recycling every week.", note: "'Separate' + substantivo." },
  { id: 165, unit: 14, cat: "Vocabulário", front: "a folding chair", back: "uma cadeira dobrável", ex: "We took a folding chair for the beach.", note: "Substantivo composto comum em viagens." },
  { id: 166, unit: 14, cat: "Vocabulário", front: "not allowed to", back: "não ter permissão para", ex: "You're not allowed to make noise after 10pm here.", note: "'Not allowed to' = proibido." },

  // Extra vocabulary — Unit 15 Money
  { id: 167, unit: 15, cat: "Vocabulário", front: "the exchange rate", back: "a taxa de câmbio", ex: "The exchange rate is terrible at the moment.", note: "Usado ao trocar moeda/viajar." },
  { id: 168, unit: 15, cat: "Vocabulário", front: "job security", back: "estabilidade no emprego", ex: "There's no real job security in that industry anymore.", note: "'Job security' = garantia de manter o emprego." },
  { id: 169, unit: 15, cat: "Vocabulário", front: "owe someone money", back: "dever dinheiro a alguém", ex: "I still owe him money from last month.", note: "'Owe' = dever (dinheiro ou favor)." },
  { id: 170, unit: 15, cat: "Vocabulário", front: "transfer money", back: "transferir dinheiro", ex: "I transferred the money to her account this morning.", note: "'Transfer' = transferir (banco)." },

  // Extra vocabulary — Unit 16 Events
  { id: 171, unit: 16, cat: "Vocabulário", front: "clear the dance floor", back: "esvaziar a pista de dança", ex: "The second DJ was so bad he cleared the dance floor.", note: "Usado quando a música afasta as pessoas da pista." },
  { id: 172, unit: 16, cat: "Vocabulário", front: "a special atmosphere", back: "uma atmosfera especial", ex: "The venue used to be a factory — it has a very special atmosphere.", note: "'Atmosphere' = clima/ambiente de um lugar." },
  { id: 173, unit: 16, cat: "Vocabulário", front: "get arrested", back: "ser preso", ex: "He got arrested for driving without a licence.", note: "'Get' + particípio = construção passiva informal." },
  { id: 174, unit: 16, cat: "Vocabulário", front: "win an election", back: "vencer uma eleição", ex: "She won the election by a small margin.", note: "'Win an election' = vencer eleição." },
];

// 10 personalized "talk about yourself" sentences per unit, reusing the same
// chunks from CARDS. **bold** marks the target chunk; [brackets] mark the
// part meant to be swapped for the learner's own details.
const PHRASES = {
  1: [
    "I **deal with customers** who [need help with their orders].",
    "I usually **earn a good salary**, but I'd like to earn more.",
    "Right now I am not working, because I recently **applied for a job** at [a company].",
    "I **work part-time** at [a school], so I have free time in the mornings.",
    "I **deal with customers** every day, and I always try to stay patient.",
    "This month I am working on a new project at [my job].",
    "I don't usually **work part-time** — I work full-time, from Monday to Friday.",
    "If I **earn a good salary** next year, I'll travel more.",
    "I **applied for a job** last month and I'm waiting for an answer.",
    "Normally I start work early, but this week I am working from home.",
  ],
  2: [
    "I often **go shopping online** instead of going to a mall.",
    "Last month I **returned an item** because it didn't fit.",
    "I always **try something on** before I buy it.",
    "Once I **got a refund** for a broken phone.",
    "Yesterday I **went shopping online** and bought [a jacket].",
    "This shop is cheaper than the one near my house.",
    "That website is more expensive than the one I usually use.",
    "I **tried something on** last weekend and it looked terrible!",
    "I never **return an item** unless it's really necessary.",
    "I **got a refund** once, but it took three weeks.",
  ],
  3: [
    "I **missed the bus** this morning because I woke up late.",
    "I was **stuck in traffic** for [an hour] yesterday.",
    "I usually **take a taxi** when I'm in a hurry.",
    "Once I had to **ask for directions** because I got lost.",
    "I was walking to work when it started to rain.",
    "How many buses do I take to get to work? Just one.",
    "I don't have much luggage when I travel.",
    "I **missed the bus** last week and had to **take a taxi** instead.",
    "I was **stuck in traffic** when my phone rang.",
    "I **asked for directions** in English once, and it actually worked!",
  ],
  4: [
    "I always **order a dish** I've never tried before.",
    "Last weekend I **booked a table** for [four people].",
    "My favourite [soup] always **tastes delicious**.",
    "Right now I **am on a diet**, so I avoid sugar.",
    "I've never tried [sushi] — I'd like to one day.",
    "I've lived in [my city] for [X years].",
    "This coffee is too hot for me to drink now.",
    "I don't have enough time to cook every day.",
    "I **ordered a dish** last night that **tasted delicious**.",
    "I **booked a table** at my favourite restaurant for my birthday.",
  ],
  5: [
    "I **go for a run** [three times a week].",
    "I **joined a gym** near my house last year.",
    "My favourite team **won a match** last weekend.",
    "I always **take a break** in the middle of the afternoon.",
    "I'm meeting [a friend] tomorrow to play [football].",
    "I'm the fastest runner in my family — well, almost!",
    "That was the most exciting match I've watched this year.",
    "I **go for a run** in the morning before work.",
    "I **took a break** from studying English for a while, but I'm back now.",
    "I've never **joined a gym**, but I'm thinking about it.",
  ],
  6: [
    "I **get along with** [my sister] really well.",
    "I try to **keep in touch** with old friends, even far away.",
    "People say I **look like** [my mother].",
    "I sometimes **post a photo** on social media after a trip.",
    "Where do you live? I live in [my city].",
    "Do you have brothers or sisters? Yes, I do / No, I don't.",
    "I like [coffee], and so does [my brother].",
    "I **get along with** my co-workers, but not always with everyone.",
    "I **keep in touch** with my best friend every week.",
    "I don't often **post a photo** — I prefer to keep things private.",
  ],
  7: [
    "I **live in the city centre**, close to everything.",
    "I **share a flat** with [two friends].",
    "Last year I **stayed with** [my cousin] for a few weeks.",
    "I'm planning to **move house** next year.",
    "I **have to** clean my room every weekend.",
    "I **don't have to** work on Sundays.",
    "I **can** cook well, but I **can't** bake.",
    "I'll help you if you ever need anything — just ask.",
    "I **share a flat**, so I'm never really alone.",
    "I'd like to **move house** to a quieter neighbourhood.",
  ],
  8: [
    "I'm currently **taking a course** in [English / cooking].",
    "I **passed an exam** last year that I was really nervous about.",
    "I always **hand in homework** on time — well, almost always.",
    "I never **dropped out of school**, but I know people who did.",
    "If I study hard, I will improve my English fast.",
    "I **had to** study all weekend once, before a big exam.",
    "I **could** read when I was very young.",
    "I'm **taking a course** to improve my speaking skills.",
    "I **handed in homework** late once, and I felt terrible about it.",
    "I **passed an exam** in English for the first time last year.",
  ],
  9: [
    "I sometimes **feel dizzy** when I stand up too fast.",
    "I **have a headache** when I don't sleep enough.",
    "I should **see a doctor** more often, honestly.",
    "I **broke a bone** once, playing [sport].",
    "You should rest if you're not feeling well.",
    "You had better see a doctor if the pain doesn't stop.",
    "Drink more water! That's advice I give myself often.",
    "I **have a headache** almost every [Monday].",
    "I **broke a bone** in my [arm] when I was a child.",
    "I **see a doctor** for a check-up once a year.",
  ],
  10: [
    "Last year I **checked into a hotel** very late at night.",
    "I always **book a room** in advance when I travel.",
    "I **went camping** once and I loved it / hated it.",
    "Once I **had a problem with the room** and had to change hotels.",
    "I **used to** travel a lot more before I started working full-time.",
    "As soon as I arrive somewhere new, I like to explore on foot.",
    "When I travel, I always take photos of the food.",
    "I **booked a room** for my last trip two months in advance.",
    "I **had a problem with the room** once — there was no hot water!",
    "I'd like to **go camping** again this year.",
  ],
  11: [
    "Scientists recently **made a discovery** about [climate change].",
    "I try to **protect the environment** by recycling.",
    "The [jaguar] is **an endangered species** in Brazil.",
    "In school, I once **conducted an experiment** about [plants].",
    "I had already left when the news came out.",
    "Plastic is often used in packaging.",
    "This bridge was built over a hundred years ago.",
    "I **protect the environment** by using less plastic.",
    "I read that a new species was recently discovered near [the Amazon].",
    "I'd love to **conduct an experiment** with my [kids/students] one day.",
  ],
  12: [
    "I always **leave a message** if no one answers.",
    "I don't like to **hang up** without saying goodbye.",
    "I usually **answer the phone** quickly, unless I'm busy.",
    "I've never had to **report a crime**, thankfully.",
    "I haven't finished my work yet.",
    "I've already called [my mother] today.",
    "She said she was tired and needed to rest.",
    "I **left a message** for [a friend] yesterday.",
    "I **answered the phone** during a meeting once — awkward!",
    "I just **hung up** the phone before you asked me that.",
  ],
  13: [
    "I usually **watch a series** before going to bed.",
    "I used to **play an instrument** — [the guitar], actually.",
    "My favourite artist just **released an album**.",
    "I **am a fan of** [a band/actor] since I was a teenager.",
    "I'm supposed to finish this task by [Friday].",
    "I've been learning English for [X months/years].",
    "I **have been watching** a lot of series lately.",
    "I **am a fan of** [an artist] — I've followed their career for years.",
    "I used to **play an instrument** when I was younger.",
    "I'm excited because my favourite band **released an album** last week.",
  ],
  14: [
    "I always **pack a bag** the night before a trip.",
    "I try to **recycle plastic** at home whenever I can.",
    "I rarely **throw something away** without thinking twice.",
    "I sometimes **borrow something** from a friend or neighbour.",
    "That's the friend who lent me his car last year.",
    "This is the app that I use to study English.",
    "In my country, you **must** wear a seatbelt in the car.",
    "You **mustn't** smoke inside most public places here.",
    "I **packed a bag** in five minutes once — I was in a hurry!",
    "I **borrowed something** from a friend last week and forgot to return it.",
  ],
  15: [
    "I try to **save money** every month, even a small amount.",
    "I usually **pay in cash** for small things.",
    "I once **lent someone money** and never got it back.",
    "I sometimes **donate to charity**, especially around the holidays.",
    "If I had more money, I would travel more.",
    "If I were rich, I would help my family first.",
    "I **save money** by cooking at home instead of eating out.",
    "I **pay in cash** more than I use cards, actually.",
    "I'd **donate to charity** more if I earned more.",
    "I **lent someone money** once and it was awkward to ask for it back.",
  ],
  16: [
    "I **threw a party** for my [birthday] last year.",
    "I always **celebrate a birthday** with close friends and family.",
    "I try to **attend an event** at least once a month.",
    "My favourite event **takes place** every [year] in [my city].",
    "I went to a party last weekend. The party was great.",
    "I enjoy dancing at parties.",
    "I decided to attend the event, even though I was tired.",
    "I **threw a party** once that almost nobody came to — embarrassing!",
    "I **attended an event** recently that changed how I see [something].",
    "My birthday **takes place** in [month], so I always celebrate then.",
  ],
};

// Curated songs for listening practice. We never store or display lyrics
// ourselves — the embedded player relies on YouTube's own official captions
// (with auto-translate) so any text on screen comes straight from the
// platform/rights holder, not from us.
const SONGS = [
  {
    title: "Count on Me",
    artist: "Bruno Mars",
    videoId: "6k8cpUkKK4c",
    note: "Ritmo calmo, vocabulário simples sobre amizade — ótimo para B1.",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    videoId: "2Vv-BfVoq4g",
    note: "Frases curtas, dicção clara, repetição de estruturas simples.",
  },
  {
    title: "Fix You",
    artist: "Coldplay",
    videoId: "k4V3Mo61fJM",
    note: "Mais lento, bom para treinar o ouvido com calma.",
  },
  {
    title: "Photograph",
    artist: "Ed Sheeran",
    videoId: "nSDgHBxUbVQ",
    note: "Vocabulário do dia a dia, ritmo tranquilo.",
  },
  {
    title: "Someone Like You",
    artist: "Adele",
    videoId: "hLQl3WQQoQ0",
    note: "Dicção muito clara, ótimo pra treinar o ouvido em ritmo lento.",
  },
  {
    title: "Let Her Go",
    artist: "Passenger",
    videoId: "RBumgq5yVrA",
    note: "Repetição de frases simples no refrão, fácil de acompanhar.",
  },
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    videoId: "rtOvBOTyX00",
    note: "Balada lenta, boa pra focar em cada palavra.",
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    videoId: "lp-EO5I60KA",
    note: "Andamento médio, vocabulário cotidiano sobre relacionamento.",
  },
  {
    title: "Viva la Vida",
    artist: "Coldplay",
    videoId: "dvgZkm1xWPE",
    note: "Mais animada, boa pra variar o ritmo dos estudos.",
  },
  {
    title: "Just the Way You Are",
    artist: "Bruno Mars",
    videoId: "LjhCEhWiKXk",
    note: "Vocabulário simples de elogios e sentimentos, ritmo pop acessível.",
  },
  {
    title: "Stay With Me",
    artist: "Sam Smith",
    videoId: "pB-5XG-DbAA",
    note: "Curta e lenta, frases repetidas facilitam o acompanhamento.",
  },
  {
    title: "Counting Stars",
    artist: "OneRepublic",
    videoId: "hT_nvWreIhg",
    note: "Ritmo mais acelerado, bom desafio depois das mais lentas.",
  },
];

const CATEGORIES = ["Todos", "Vocabulário", "Gramática"];

const CAT_STYLE = {
  "Vocabulário": { ink: "#006437" },
  "Gramática": { ink: "#8A6D14" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Subtle ruled-paper texture, like notebook lines — reused across every
// card face that holds text (front/back of the flip card, quiz prompt,
// phrase rows) so the whole app reads as one consistent "study notebook".
function notebookBg(baseColor, lineColor = "rgba(0,100,55,0.12)") {
  return {
    backgroundColor: baseColor,
    backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 25px, ${lineColor} 26px)`,
  };
}

let cachedVoice = null;
function pickBestVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferredNames = [
    "Google US English",
    "Samantha",
    "Ava",
    "Alex",
    "Microsoft Aria Online (Natural)",
    "Microsoft Jenny Online (Natural)",
    "Microsoft Zira",
  ];
  for (const name of preferredNames) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) {
      cachedVoice = match;
      return match;
    }
  }
  const enUS = voices.find((v) => v.lang === "en-US") || voices.find((v) => v.lang?.startsWith("en"));
  cachedVoice = enUS || null;
  return cachedVoice;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickBestVoice();
  };
}

function speak(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.95;
  const voice = pickBestVoice();
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

// Real human-recorded audio for single words, via the free Dictionary API.
// Falls back to synthetic speech for phrases or words with no recording.
const audioCache = {};
async function playPronunciation(text) {
  const isSingleWord = /^[a-zA-Z'-]+$/.test(text.trim());
  if (isSingleWord) {
    const key = text.trim().toLowerCase();
    try {
      let url = audioCache[key];
      if (url === undefined) {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`);
        if (res.ok) {
          const data = await res.json();
          const found = data?.[0]?.phonetics?.find((p) => p.audio)?.audio || null;
          url = found ? (found.startsWith("http") ? found : `https:${found}`) : null;
        } else {
          url = null;
        }
        audioCache[key] = url;
      }
      if (url) {
        const audio = new Audio(url);
        audio.play();
        return;
      }
    } catch {
      // fall through to synthetic voice
    }
  }
  speak(text);
}

function SpeakButton({ text, color = "#006437", size = 16 }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        playPronunciation(text);
      }}
      aria-label="Ouvir pronúncia"
      title="Ouvir pronúncia"
      style={{
        border: "none",
        background: "transparent",
        color,
        cursor: "pointer",
        fontSize: size,
        lineHeight: 1,
        padding: 4,
        flexShrink: 0,
      }}
    >
      🔊
    </button>
  );
}

function FlashcardCatalog() {
  const [view, setView] = useState("study"); // 'study' | 'summary'
  const [unit, setUnit] = useState(1);
  const [category, setCategory] = useState("Todos");
  const [reviewOnly, setReviewOnly] = useState(false);
  const [order, setOrder] = useState(() => CARDS.map((c) => c.id));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState({}); // id -> 'know' | 'review'
  const [loaded, setLoaded] = useState(false);

  // Load saved progress once on mount.
  // Prefers Claude's window.storage (tied to your account, works here in
  // the chat). If that's not available — e.g. this file is hosted as a
  // normal website — it falls back to the browser's own localStorage,
  // which saves per device/browser instead of per account.
  useEffect(() => {
    (async () => {
      try {
        if (window.storage?.get) {
          const result = await window.storage.get("flashcard-status", false);
          if (result?.value) setStatus(JSON.parse(result.value));
        } else {
          const raw = localStorage.getItem("flashcard-status");
          if (raw) setStatus(JSON.parse(raw));
        }
      } catch {
        // no saved progress yet — start fresh
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Save progress whenever it changes (after the initial load)
  useEffect(() => {
    if (!loaded) return;
    const payload = JSON.stringify(status);
    if (window.storage?.set) {
      window.storage.set("flashcard-status", payload, false).catch(() => {});
    } else {
      try {
        localStorage.setItem("flashcard-status", payload);
      } catch {
        // storage unavailable or full — progress just won't persist
      }
    }
  }, [status, loaded]);

  const deck = useMemo(() => {
    const filtered = CARDS.filter(
      (c) =>
        c.unit === unit &&
        (category === "Todos" || c.cat === category) &&
        (!reviewOnly || status[c.id] === "review")
    );
    const idSet = new Set(filtered.map((c) => c.id));
    const ordered = order.filter((id) => idSet.has(id));
    filtered.forEach((c) => {
      if (!ordered.includes(c.id)) ordered.push(c.id);
    });
    return ordered.map((id) => CARDS.find((c) => c.id === id));
  }, [unit, category, reviewOnly, order, status]);

  const safeIndex = Math.min(index, Math.max(deck.length - 1, 0));
  const card = deck[safeIndex];
  const known = deck.filter((c) => status[c.id] === "know").length;
  const review = deck.filter((c) => status[c.id] === "review").length;
  const unitTitle = UNITS.find((u) => u.id === unit)?.title ?? "";

  function goTo(i) {
    if (deck.length === 0) return;
    const next = ((i % deck.length) + deck.length) % deck.length;
    setIndex(next);
    setFlipped(false);
  }

  function mark(kind) {
    if (!card) return;
    setStatus((s) => ({ ...s, [card.id]: kind }));
    setTimeout(() => goTo(safeIndex + 1), 180);
  }

  function handleShuffle() {
    setOrder(shuffle(CARDS.map((c) => c.id)));
    setIndex(0);
    setFlipped(false);
  }

  function changeUnit(u) {
    setUnit(u);
    setIndex(0);
    setFlipped(false);
  }

  function openUnitFromSummary(u) {
    setUnit(u);
    setCategory("Todos");
    setReviewOnly(false);
    setIndex(0);
    setFlipped(false);
    setView("study");
  }

  function changeCategory(cat) {
    setCategory(cat);
    setIndex(0);
    setFlipped(false);
  }

  function toggleReviewOnly() {
    setReviewOnly((r) => !r);
    setIndex(0);
    setFlipped(false);
  }

  function resetProgress() {
    setStatus({});
    setReviewOnly(false);
    if (window.storage?.set) {
      window.storage.set("flashcard-status", JSON.stringify({}), false).catch(() => {});
    } else {
      try {
        localStorage.removeItem("flashcard-status");
      } catch {
        // nothing to clear
      }
    }
  }

  const catInk = card ? (CAT_STYLE[card.cat]?.ink ?? "#006437") : "#006437";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#006437",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "14px 14px",
        display: "flex",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "'Libre Baskerville', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .typewriter { font-family: 'Special Elite', monospace; }
        .plex { font-family: 'IBM Plex Mono', monospace; }
        .flip-scene { perspective: 1600px; }
        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card.is-flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 6px;
        }
        .flip-back { transform: rotateY(180deg); }
        .cardbtn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .cardbtn:hover { transform: translateY(-2px); }
        .cardbtn:active { transform: translateY(0px) scale(0.98); }
        .tab-btn, .unit-btn { transition: all 0.15s ease; }
        .unit-strip { scrollbar-width: thin; scrollbar-color: #2E7D52 transparent; }
        .unit-strip::-webkit-scrollbar { height: 6px; }
        .unit-strip::-webkit-scrollbar-thumb { background: #2E7D52; border-radius: 3px; }
        @media (prefers-reduced-motion: reduce) {
          .flip-card, .cardbtn, .tab-btn, .unit-btn { transition: none !important; }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 560 }}>
        {/* Header — drawer label */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div
            className="plex"
            style={{ fontSize: 11, letterSpacing: "0.28em", color: "#9FE6BE", marginBottom: 6 }}
          >
            OUTCOMES PRE-INTERMEDIATE
          </div>
          <h1
            className="typewriter"
            style={{ fontSize: 26, color: "#FFFFFF", margin: "0 0 12px", letterSpacing: "0.02em" }}
          >
            {view === "summary"
              ? "Resumo de Progresso"
              : view === "quiz"
              ? `Quiz · ${unitTitle}`
              : view === "phrases"
              ? `Frases · ${unitTitle}`
              : view === "music"
              ? "Música"
              : `Unit ${unit} · ${unitTitle}`}
          </h1>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {[
              { key: "study", label: "ESTUDAR" },
              { key: "quiz", label: "QUIZ" },
              { key: "phrases", label: "FRASES" },
              { key: "music", label: "MÚSICA" },
              { key: "summary", label: "RESUMO" },
            ].map((v) => (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className="plex"
                style={{
                  padding: "5px 12px",
                  fontSize: 10,
                  letterSpacing: "0.04em",
                  borderRadius: 3,
                  border: `1px solid ${view === v.key ? "#FFFFFF" : "#2E7D52"}`,
                  background: view === v.key ? "#FFFFFF" : "transparent",
                  color: view === v.key ? "#006437" : "#9FE6BE",
                  fontWeight: view === v.key ? 700 : 400,
                  cursor: "pointer",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {view === "summary" ? (
          <SummaryScreen units={UNITS} cards={CARDS} status={status} onSelectUnit={openUnitFromSummary} onReset={resetProgress} />
        ) : (
          <>
            {/* Unit selector — drawer front labels */}
            {view !== "music" && (
              <div
                className="unit-strip"
                style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}
              >
                {UNITS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => changeUnit(u.id)}
                    className="unit-btn plex"
                    style={{
                      flex: "0 0 auto",
                      padding: "6px 10px",
                      fontSize: 10.5,
                      letterSpacing: "0.03em",
                      borderRadius: 3,
                      border: `1px solid ${unit === u.id ? "#D4AF37" : "#1F5C3B"}`,
                      background: unit === u.id ? "#D4AF37" : "transparent",
                      color: unit === u.id ? "#006437" : "#9FE6BE",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontWeight: unit === u.id ? 700 : 400,
                    }}
                  >
                    {String(u.id).padStart(2, "0")} {u.title}
                  </button>
                ))}
              </div>
            )}

            {/* Category tabs */}
            {view !== "phrases" && view !== "music" && (
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => changeCategory(cat)}
                    className="tab-btn plex"
                    style={{
                      padding: "6px 14px",
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      borderRadius: 3,
                      border: `1px solid ${category === cat ? "#FFFFFF" : "#2E7D52"}`,
                      background: category === cat ? "#FFFFFF" : "transparent",
                      color: category === cat ? "#006437" : "#CFEFDC",
                      cursor: "pointer",
                    }}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {view !== "phrases" && view !== "music" && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                <button
                  onClick={toggleReviewOnly}
                  className="tab-btn plex"
                  title="Mostrar só as cartas marcadas para revisar"
                  style={{
                    padding: "6px 14px",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    borderRadius: 3,
                    border: `1px solid ${reviewOnly ? "#D4AF37" : "#2E7D52"}`,
                    background: reviewOnly ? "#D4AF37" : "transparent",
                    color: reviewOnly ? "#0B3D24" : "#CFEFDC",
                    fontWeight: reviewOnly ? 700 : 400,
                    cursor: "pointer",
                  }}
                >
                  {reviewOnly ? "★ SÓ REVISÃO" : "☆ SÓ REVISÃO"}
                </button>
              </div>
            )}

            {view === "phrases" ? (
              <PhraseScreen sentences={PHRASES[unit] || []} />
            ) : view === "music" ? (
              <MusicScreen />
            ) : view === "quiz" ? (
              <QuizScreen deck={deck} allCards={CARDS} />
            ) : (
              <>
            {/* Stats bar */}
            <div
              className="plex"
              style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}
            >
              <span>CARTA {deck.length ? safeIndex + 1 : 0} / {deck.length}</span>
              <span style={{ color: "#4ADE80" }}>SABIA: {known}</span>
              <span style={{ color: "#D4AF37" }}>REVISAR: {review}</span>
            </div>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: 3, marginBottom: 18, flexWrap: "wrap" }}>
              {deck.map((c, i) => (
                <div
                  key={c.id}
                  style={{
                    height: 4,
                    flex: 1,
                    minWidth: 4,
                    borderRadius: 2,
                    background:
                      i === safeIndex
                        ? "#FFFFFF"
                        : status[c.id] === "know"
                        ? "#4ADE80"
                        : status[c.id] === "review"
                        ? "#D4AF37"
                        : "#1F5C3B",
                  }}
                />
              ))}
            </div>

            {!card ? (
              <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
                Nenhuma carta nesta categoria.
              </div>
            ) : (
              <>
                {/* The index card */}
                <div
                  className="flip-scene"
                  style={{ height: 320, marginBottom: 18 }}
                  onClick={() => setFlipped((f) => !f)}
                  role="button"
                  tabIndex={0}
                  aria-label={flipped ? "Carta virada, mostrando a resposta. Toque para ver o termo." : "Toque para virar e ver a resposta."}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFlipped((f) => !f);
                    }
                  }}
                >
                  <div className={`flip-card ${flipped ? "is-flipped" : ""}`}>
                    {/* FRONT */}
                    <div
                      className="flip-face"
                      style={{
                        ...notebookBg("#F4FBF6"),
                        border: "1px solid #BFE3CC",
                        boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
                        padding: "26px 30px",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      {category === "Todos" && (
                        <div
                          className="plex"
                          style={{
                            fontSize: 11,
                            color: catInk,
                            border: `1px solid ${catInk}`,
                            alignSelf: "flex-start",
                            padding: "2px 8px",
                            borderRadius: 2,
                            letterSpacing: "0.05em",
                            marginBottom: 4,
                            opacity: 0.85,
                          }}
                        >
                          {card.cat.toUpperCase()}
                        </div>
                      )}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 8 }}>
                        <div style={{ fontSize: card.front.length > 30 ? 20 : 26, color: "#006437", fontWeight: 700, lineHeight: 1.35 }}>
                          {card.front}
                        </div>
                        {card.cat === "Vocabulário" && <SpeakButton text={card.front} />}
                      </div>
                      <div className="plex" style={{ textAlign: "center", fontSize: 10, color: "#6FA98A", letterSpacing: "0.1em" }}>
                        TOQUE PARA VIRAR
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className="flip-face flip-back"
                      style={{
                        ...notebookBg("#EAF6EF"),
                        border: "1px solid #BFE3CC",
                        boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
                        padding: "22px 28px",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        overflowY: "auto",
                      }}
                    >
                      <div className="plex" style={{ fontSize: 10, color: catInk, letterSpacing: "0.08em", marginBottom: 10 }}>
                        RESPOSTA
                      </div>
                      <div style={{ fontSize: 19, color: "#006437", fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>
                        {card.back}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 4,
                          marginBottom: 12,
                          paddingLeft: 10,
                          borderLeft: `2px solid ${catInk}55`,
                        }}
                      >
                        <div style={{ fontSize: 14, color: "#1F4A34", fontStyle: "italic", flex: 1 }}>
                          "{card.ex}"
                        </div>
                        <SpeakButton text={card.ex} size={15} />
                      </div>
                      <div className="plex" style={{ fontSize: 11.5, color: "#3F7A5C", lineHeight: 1.5, marginTop: "auto" }}>
                        ✎ {card.note}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Know / review buttons */}
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <button
                    onClick={() => mark("review")}
                    className="cardbtn plex"
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: "transparent",
                      border: "1px solid #D4AF37",
                      color: "#D4AF37",
                      borderRadius: 4,
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    REVISAR DEPOIS
                  </button>
                  <button
                    onClick={() => mark("know")}
                    className="cardbtn plex"
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: "#FFFFFF",
                      border: "1px solid #FFFFFF",
                      color: "#006437",
                      borderRadius: 4,
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    JÁ SEI ✓
                  </button>
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => goTo(safeIndex - 1)} className="cardbtn plex" style={navBtnStyle}>
                    ← ANTERIOR
                  </button>
                  <button
                    onClick={handleShuffle}
                    className="cardbtn plex"
                    style={{ ...navBtnStyle, flex: "0 0 auto", padding: "10px 14px" }}
                    title="Embaralhar cartas desta unidade"
                  >
                    ⟲
                  </button>
                  <button onClick={() => goTo(safeIndex + 1)} className="cardbtn plex" style={navBtnStyle}>
                    PRÓXIMA →
                  </button>
                </div>
              </>
            )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const navBtnStyle = {
  flex: 1,
  padding: "10px 0",
  background: "transparent",
  border: "1px solid #2E7D52",
  color: "#CFEFDC",
  borderRadius: 4,
  fontSize: 11,
  letterSpacing: "0.05em",
  cursor: "pointer",
};

function renderSentenceParts(sentence) {
  // Splits on **bold** and [bracket] markers so we can style each part
  // differently while keeping the rest as plain text.
  const parts = sentence.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#006437" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <span
          key={i}
          style={{
            fontStyle: "italic",
            color: "#8A6D14",
            borderBottom: "1px dashed #D4AF37",
          }}
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function plainTextForSpeech(sentence) {
  return sentence
    .replace(/\*\*/g, "")
    .replace(/[[\]]/g, "")
    .replace(/\s*\/\s*/g, " or ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function MusicScreen() {
  const [selected, setSelected] = useState(0);
  const song = SONGS[selected];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {SONGS.map((s, i) => (
          <button
            key={s.videoId}
            onClick={() => setSelected(i)}
            className="cardbtn"
            style={{
              textAlign: "left",
              padding: "10px 14px",
              borderRadius: 5,
              cursor: "pointer",
              background: i === selected ? "#FFFFFF" : "#F4FBF6",
              border: `1px solid ${i === selected ? "#006437" : "#BFE3CC"}`,
            }}
          >
            <div style={{ fontWeight: 700, color: "#006437", fontSize: 14 }}>{s.title}</div>
            <div className="plex" style={{ fontSize: 11, color: "#3F7A5C", marginTop: 2 }}>{s.artist}</div>
            <div style={{ fontSize: 12, color: "#1F4A34", marginTop: 4 }}>{s.note}</div>
          </button>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          paddingTop: "56.25%",
          borderRadius: 6,
          overflow: "hidden",
          marginBottom: 14,
          boxShadow: "0 6px 18px rgba(6,40,25,0.28)",
        }}
      >
        <iframe
          key={song.videoId}
          src={`https://www.youtube-nocookie.com/embed/${song.videoId}?cc_load_policy=1`}
          title={`${song.title} — ${song.artist}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div
        style={{
          ...notebookBg("#EAF6EF"),
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "14px 16px",
        }}
      >
        <div className="plex" style={{ fontSize: 10, color: "#3F7A5C", letterSpacing: "0.08em", marginBottom: 8 }}>
          COMO VER A LETRA COM TRADUÇÃO
        </div>
        <div style={{ fontSize: 13, color: "#1F4A34", lineHeight: 1.6 }}>
          1. Toque no ícone <strong>CC</strong> (legenda) na barra do vídeo.
          <br />
          2. Toque na engrenagem ⚙️ → <strong>Legendas</strong> → <strong>Traduzir automaticamente</strong> → escolha <strong>Português</strong>.
          <br />
          3. Toque de novo em ⚙️ → Legendas → English, se quiser ler no idioma original.
        </div>
      </div>
      <div className="plex" style={{ fontSize: 10.5, color: "#6FA98A", marginTop: 10, textAlign: "center", lineHeight: 1.5 }}>
        A legenda vem direto do YouTube — o app não guarda nem mostra letras de música.
      </div>
    </div>
  );
}

function PhraseScreen({ sentences }) {
  if (!sentences.length) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        Ainda não há frases para esta unidade.
      </div>
    );
  }
  return (
    <div>
      <div
        className="plex"
        style={{ fontSize: 11, color: "#BFEAD2", marginBottom: 14, padding: "0 4px", lineHeight: 1.6 }}
      >
        Troque o que está <span style={{ fontStyle: "italic", color: "#D4AF37" }}>sublinhado</span> pela sua realidade e pratique falando em voz alta.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sentences.map((sentence, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              ...notebookBg("#F4FBF6"),
              border: "1px solid #BFE3CC",
              borderRadius: 6,
              padding: "12px 14px",
              boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
            }}
          >
            <span className="plex" style={{ fontSize: 11, color: "#3F7A5C", flexShrink: 0, marginTop: 2 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div style={{ flex: 1, fontSize: 14.5, lineHeight: 1.55, color: "#1F4A34" }}>
              {renderSentenceParts(sentence)}
            </div>
            <SpeakButton text={plainTextForSpeech(sentence)} size={17} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryScreen({ units, cards, status, onSelectUnit, onReset }) {
  const [confirming, setConfirming] = useState(false);
  const totalCards = cards.length;
  const totalKnow = cards.filter((c) => status[c.id] === "know").length;
  const totalReview = cards.filter((c) => status[c.id] === "review").length;
  const totalPct = totalCards ? Math.round((totalKnow / totalCards) * 100) : 0;

  return (
    <div>
      {/* Overall totals */}
      <div
        style={{
          background: "#F4FBF6",
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "16px 18px",
          marginBottom: 16,
          boxShadow: "0 6px 18px rgba(6,40,25,0.28)",
        }}
      >
        <div className="plex" style={{ fontSize: 11, color: "#3F7A5C", letterSpacing: "0.06em", marginBottom: 6 }}>
          PROGRESSO GERAL · {totalPct}% APRENDIDO
        </div>
        <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", background: "#DDEEE3", marginBottom: 8 }}>
          <div style={{ width: totalCards ? `${(totalKnow / totalCards) * 100}%` : "0%", background: "#1F9D55" }} />
          <div style={{ width: totalCards ? `${(totalReview / totalCards) * 100}%` : "0%", background: "#D4AF37" }} />
        </div>
        <div className="plex" style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
          <span style={{ color: "#1F9D55" }}>SABIA: {totalKnow}</span>
          <span style={{ color: "#8A6D14" }}>REVISAR: {totalReview}</span>
          <span style={{ color: "#006437" }}>TOTAL: {totalCards}</span>
        </div>
      </div>

      {/* Per-unit rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {units.map((u) => {
          const cardsInUnit = cards.filter((c) => c.unit === u.id);
          const total = cardsInUnit.length;
          const know = cardsInUnit.filter((c) => status[c.id] === "know").length;
          const rev = cardsInUnit.filter((c) => status[c.id] === "review").length;
          return (
            <button
              key={u.id}
              onClick={() => onSelectUnit(u.id)}
              className="cardbtn"
              style={{
                textAlign: "left",
                background: "#F4FBF6",
                border: "1px solid #BFE3CC",
                borderRadius: 5,
                padding: "10px 14px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: "#006437", fontSize: 14 }}>
                  {String(u.id).padStart(2, "0")} · {u.title}
                </span>
                <span className="plex" style={{ fontSize: 11, color: "#3F7A5C" }}>
                  {know}/{total}
                </span>
              </div>
              <div style={{ display: "flex", height: 5, borderRadius: 3, overflow: "hidden", background: "#DDEEE3" }}>
                <div style={{ width: total ? `${(know / total) * 100}%` : "0%", background: "#1F9D55" }} />
                <div style={{ width: total ? `${(rev / total) * 100}%` : "0%", background: "#D4AF37" }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Reset progress */}
      <div style={{ marginTop: 22, textAlign: "center" }}>
        {confirming ? (
          <div
            style={{
              background: "#FBEAEA",
              border: "1px solid #C0504D",
              borderRadius: 6,
              padding: "14px 16px",
            }}
          >
            <div style={{ fontSize: 13, color: "#8C2F2C", marginBottom: 12 }}>
              Isso vai apagar todas as marcações de "já sei / revisar" das 16 unidades. Não tem como desfazer.
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button
                onClick={() => setConfirming(false)}
                className="cardbtn plex"
                style={{
                  padding: "8px 16px",
                  background: "transparent",
                  border: "1px solid #8C2F2C",
                  color: "#8C2F2C",
                  borderRadius: 4,
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                CANCELAR
              </button>
              <button
                onClick={() => {
                  onReset();
                  setConfirming(false);
                }}
                className="cardbtn plex"
                style={{
                  padding: "8px 16px",
                  background: "#8C2F2C",
                  border: "1px solid #8C2F2C",
                  color: "#FFFFFF",
                  borderRadius: 4,
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                SIM, RESETAR
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="plex"
            style={{
              padding: "6px 14px",
              fontSize: 10.5,
              letterSpacing: "0.04em",
              borderRadius: 3,
              border: "1px solid #8C6F6F",
              background: "transparent",
              color: "#8C6F6F",
              cursor: "pointer",
            }}
          >
            RESETAR PROGRESSO
          </button>
        )}
      </div>
    </div>
  );
}

function buildOptions(card, pool) {
  const notSame = (c) => c.id !== card.id && c.back !== card.back;
  // Prefer distractors from the same unit and category — that's what actually
  // tests whether you know THIS term, not just whether you recognize it's
  // out of place next to unrelated units/topics.
  const sameUnitCat = pool.filter((c) => c.unit === card.unit && c.cat === card.cat && notSame(c));
  const sameCat = pool.filter((c) => c.cat === card.cat && notSame(c));
  const anyCard = pool.filter(notSame);

  const distractors = [];
  const used = new Set();
  for (const tier of [sameUnitCat, sameCat, anyCard]) {
    if (distractors.length >= 3) break;
    for (const c of shuffle(tier)) {
      if (distractors.length >= 3) break;
      if (used.has(c.back)) continue;
      used.add(c.back);
      distractors.push(c.back);
    }
  }
  return shuffle([card.back, ...distractors]);
}

function QuizScreen({ deck, allCards }) {
  const [seed, setSeed] = useState(0);

  const quizItems = useMemo(() => {
    return shuffle(deck).map((card) => ({ card, options: buildOptions(card, allCards) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, allCards, seed]);

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, [quizItems]);

  if (quizItems.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        Nenhuma carta nesta categoria.
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / quizItems.length) * 100);
    return (
      <div
        style={{
          background: "#F4FBF6",
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "28px 20px",
          textAlign: "center",
          boxShadow: "0 6px 18px rgba(6,40,25,0.28)",
        }}
      >
        <div className="plex" style={{ fontSize: 11, color: "#3F7A5C", letterSpacing: "0.08em", marginBottom: 8 }}>
          QUIZ CONCLUÍDO
        </div>
        <div style={{ fontSize: 36, color: "#006437", fontWeight: 700, marginBottom: 6 }}>{pct}%</div>
        <div className="plex" style={{ fontSize: 12, color: "#3F7A5C", marginBottom: 20 }}>
          {score} de {quizItems.length} corretas
        </div>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="cardbtn plex"
          style={{
            padding: "10px 20px",
            background: "#006437",
            border: "1px solid #006437",
            color: "#FFFFFF",
            borderRadius: 4,
            fontSize: 12,
            letterSpacing: "0.05em",
            cursor: "pointer",
          }}
        >
          REFAZER QUIZ ⟲
        </button>
      </div>
    );
  }

  const item = quizItems[qIndex];
  const isLast = qIndex + 1 >= quizItems.length;

  function choose(opt) {
    if (selected) return;
    setSelected(opt);
    if (opt === item.card.back) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
    }
  }

  return (
    <div>
      <div
        className="plex"
        style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}
      >
        <span>PERGUNTA {qIndex + 1} / {quizItems.length}</span>
        <span style={{ color: "#4ADE80" }}>ACERTOS: {score}</span>
      </div>

      <div
        style={{
          ...notebookBg("#F4FBF6"),
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "22px 24px",
          marginBottom: 14,
          boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
        }}
      >
        <div
          className="plex"
          style={{
            fontSize: 10,
            color: "#3F7A5C",
            letterSpacing: "0.08em",
            marginBottom: 10,
          }}
        >
          {item.card.cat.toUpperCase()}
        </div>
        <div style={{ fontSize: 20, color: "#006437", fontWeight: 700, lineHeight: 1.4, textAlign: "center" }}>
          {item.card.front}
        </div>
        {item.card.cat === "Vocabulário" && (
          <div style={{ textAlign: "center", marginTop: 6 }}>
            <SpeakButton text={item.card.front} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {item.options.map((opt, i) => {
          const isCorrectOpt = opt === item.card.back;
          const isChosen = opt === selected;
          let bg = "#FFFFFF";
          let border = "#BFE3CC";
          let color = "#006437";
          if (selected) {
            if (isCorrectOpt) {
              bg = "#DDF3E4";
              border = "#1F9D55";
              color = "#0B3D24";
            } else if (isChosen) {
              bg = "#FBEAEA";
              border = "#C0504D";
              color = "#8C2F2C";
            } else {
              color = "#A9B8AF";
            }
          }
          return (
            <button
              key={i}
              onClick={() => choose(opt)}
              disabled={!!selected}
              className="cardbtn"
              style={{
                textAlign: "left",
                padding: "12px 16px",
                background: bg,
                border: `1px solid ${border}`,
                color,
                borderRadius: 5,
                fontSize: 14,
                cursor: selected ? "default" : "pointer",
              }}
            >
              {opt}
              {selected && isCorrectOpt ? " ✓" : selected && isChosen ? " ✗" : ""}
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          style={{
            ...notebookBg("#EAF6EF"),
            border: "1px solid #BFE3CC",
            borderRadius: 6,
            padding: "14px 16px",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: "#1F4A34", fontStyle: "italic", flex: 1 }}>
              "{item.card.ex}"
            </div>
            <SpeakButton text={item.card.ex} size={14} />
          </div>
          <div className="plex" style={{ fontSize: 11.5, color: "#3F7A5C", lineHeight: 1.5 }}>
            ✎ {item.card.note}
          </div>
        </div>
      )}

      <button
        onClick={next}
        disabled={!selected}
        className="cardbtn plex"
        style={{
          width: "100%",
          padding: "12px 0",
          background: selected ? "#006437" : "transparent",
          border: `1px solid ${selected ? "#006437" : "#2E7D52"}`,
          color: selected ? "#FFFFFF" : "#5C7A6A",
          borderRadius: 4,
          fontSize: 12,
          letterSpacing: "0.06em",
          cursor: selected ? "pointer" : "default",
        }}
      >
        {isLast ? "VER RESULTADO" : "PRÓXIMA →"}
      </button>
    </div>
  );
}


