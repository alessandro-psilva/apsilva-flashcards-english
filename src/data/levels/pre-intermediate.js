// Conteúdo do nível Pre-Intermediate: unidades, cartas e frases guiadas.
// Pra adicionar um nível novo, copie este arquivo pra
// src/data/levels/<nivel>.js, troque o prefixo dos nomes (ex.:
// INTERMEDIATE_UNITS) e registre-o em src/data/levels/index.js.

const PRE_INTERMEDIATE_UNITS = [
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

const PRE_INTERMEDIATE_CARDS = [
  // UNIT 1 — Jobs
  { id: 1, unit: 1, cat: "Vocabulary", front: "deal with customers", back: "lidar com clientes", ex: "I deal with customers every day at my job.", note: "Também: deal with a problem (lidar com um problema).", themes: ["work-career"] },
  { id: 2, unit: 1, cat: "Vocabulary", front: "earn a good salary", back: "ganhar um bom salário", ex: "She earns a good salary as a nurse.", note: "'earn' = ganhar por trabalho, não 'win' (ganhar um prêmio).", themes: ["work-career", "money-finance"], family: [{ form: "noun", word: "earnings" }] },
  { id: 3, unit: 1, cat: "Vocabulary", front: "apply for a job", back: "candidatar-se a um emprego", ex: "I applied for a job last week.", note: "'apply for' + vaga; 'apply to' + empresa.", themes: ["work-career"], family: [{ form: "noun", word: "application" }, { form: "noun (person)", word: "applicant" }] },
  { id: 4, unit: 1, cat: "Vocabulary", front: "work part-time", back: "trabalhar meio período", ex: "He works part-time at a supermarket.", note: "Oposto: work full-time.", themes: ["work-career"] },
  { id: 5, unit: 1, cat: "Grammar", front: "Present Simple — quando usar?", back: "Para rotinas e hábitos.", ex: "I usually start work at nine.", note: "Sinais: usually, always, every day.", prereq: [] },
  { id: 6, unit: 1, cat: "Grammar", front: "Present Continuous — quando usar?", back: "Para ações temporárias, acontecendo agora.", ex: "I'm working from home this week.", note: "Sinais: now, at the moment, this week.", prereq: [5] },
  { id: 7, unit: 1, cat: "Grammar", front: "Zero Conditional — como formar?", back: "If + Present Simple, + Present Simple. Verdades gerais.", ex: "If I have a problem, I ask my manager.", note: "Sempre verdadeiro, não é hipótese.", prereq: [5] },

  // UNIT 2 — Shopping
  { id: 8, unit: 2, cat: "Vocabulary", front: "go shopping online", back: "fazer compras online", ex: "I often go shopping online.", note: "'go + -ing' também: go swimming, go running.", themes: ["shopping-consumer"] },
  { id: 9, unit: 2, cat: "Vocabulary", front: "return an item", back: "devolver um produto", ex: "I need to return this shirt. It's too small.", note: "'item' = item/produto comprado.", themes: ["shopping-consumer"] },
  { id: 10, unit: 2, cat: "Vocabulary", front: "try something on", back: "experimentar uma roupa", ex: "Can I try this jacket on?", note: "Verbo separável: try it on.", themes: ["shopping-consumer"] },
  { id: 11, unit: 2, cat: "Vocabulary", front: "get a refund", back: "receber o dinheiro de volta", ex: "I got a refund for the broken phone.", note: "Diferente de 'exchange' (trocar por outro item).", themes: ["shopping-consumer", "money-finance"] },
  { id: 12, unit: 2, cat: "Grammar", front: "Past Simple — quando usar?", back: "Para ações finalizadas em um momento específico do passado.", ex: "I bought a new bag yesterday.", note: "Sinais: yesterday, last week, in 2020.", prereq: [] },
  { id: 13, unit: 2, cat: "Grammar", front: "Comparativos — adjetivos curtos", back: "adjetivo + -er + than", ex: "This shop is cheaper than that one.", note: "Adjetivos de 1-2 sílabas.", prereq: [] },
  { id: 14, unit: 2, cat: "Grammar", front: "Comparativos — adjetivos longos", back: "more + adjetivo + than", ex: "This website is more expensive than the other one.", note: "Adjetivos de 3+ sílabas.", prereq: [13] },

  // UNIT 3 — Getting Around
  { id: 15, unit: 3, cat: "Vocabulary", front: "miss the bus", back: "perder o ônibus", ex: "I missed the bus this morning.", note: "Também: miss a flight/train.", themes: ["travel-transport"] },
  { id: 16, unit: 3, cat: "Vocabulary", front: "be stuck in traffic", back: "ficar preso no trânsito", ex: "We were stuck in traffic for an hour.", note: "'stuck' = preso, sem conseguir se mover.", themes: ["travel-transport"] },
  { id: 17, unit: 3, cat: "Vocabulary", front: "take a taxi", back: "pegar um táxi", ex: "I took a taxi to the airport.", note: "Também: take the bus/train/metro.", themes: ["travel-transport"] },
  { id: 18, unit: 3, cat: "Vocabulary", front: "ask for directions", back: "pedir informações de endereço", ex: "I asked for directions to the station.", note: "'directions' aqui é plural.", themes: ["travel-transport"] },
  { id: 19, unit: 3, cat: "Grammar", front: "Past Simple x Past Continuous", back: "Continuous = ação em andamento; Simple = ação que a interrompe.", ex: "I was walking home when it started to rain.", note: "'when' liga as duas ações.", prereq: [12] },
  { id: 20, unit: 3, cat: "Grammar", front: "Quantifiers — substantivos contáveis", back: "How many + substantivo no plural", ex: "How many bags do you have?", note: "'bags' é contável (uma bolsa, duas bolsas).", prereq: [] },
  { id: 21, unit: 3, cat: "Grammar", front: "Quantifiers — substantivos incontáveis", back: "How much + substantivo no singular", ex: "How much luggage do you have?", note: "'luggage' é incontável (não existe 'a luggage').", prereq: [20] },

  // UNIT 4 — Food
  { id: 22, unit: 4, cat: "Vocabulary", front: "order a dish", back: "pedir um prato", ex: "I ordered a pasta dish.", note: "'order' = pedir (comida, serviço).", themes: ["food-dining"] },
  { id: 23, unit: 4, cat: "Vocabulary", front: "book a table", back: "reservar uma mesa", ex: "We booked a table for two.", note: "'book' = reservar (também: book a room, book a flight).", themes: ["food-dining"] },
  { id: 24, unit: 4, cat: "Vocabulary", front: "taste delicious", back: "ter um sabor delicioso", ex: "This soup tastes delicious.", note: "'taste' + adjetivo, sem 'like': it tastes good.", themes: ["food-dining"] },
  { id: 25, unit: 4, cat: "Vocabulary", front: "be on a diet", back: "estar de dieta", ex: "I'm on a diet, so I don't eat sugar.", note: "'on a diet' é a expressão fixa.", themes: ["food-dining", "health-body"] },
  { id: 26, unit: 4, cat: "Grammar", front: "Present Perfect Simple — quando usar?", back: "Para experiências sem tempo específico.", ex: "I've never tried sushi.", note: "Estrutura: have/has + particípio.", prereq: [12] },
  { id: 27, unit: 4, cat: "Grammar", front: "Present Perfect com 'for' e 'since'", back: "'for' = duração; 'since' = ponto de partida.", ex: "I've lived here for two years.", note: "for + período; since + momento específico (since 2020).", prereq: [26] },
  { id: 28, unit: 4, cat: "Grammar", front: "Too / Not enough", back: "'too' = demais; 'not enough' = insuficiente.", ex: "This coffee is too hot. I don't have enough time.", note: "'too' antes do adjetivo; 'enough' depois.", prereq: [] },

  // UNIT 5 — Sport & Leisure
  { id: 29, unit: 5, cat: "Vocabulary", front: "go for a run", back: "sair para correr", ex: "I go for a run every morning.", note: "Também: go for a walk/swim.", themes: ["sports-fitness"] },
  { id: 30, unit: 5, cat: "Vocabulary", front: "join a gym", back: "se matricular numa academia", ex: "I joined a new gym last month.", note: "'join' = entrar/se inscrever em algo.", themes: ["sports-fitness"] },
  { id: 31, unit: 5, cat: "Vocabulary", front: "win a match", back: "ganhar uma partida", ex: "Our team won the match.", note: "Oposto: lose a match.", themes: ["sports-fitness"] },
  { id: 32, unit: 5, cat: "Vocabulary", front: "take a break", back: "fazer uma pausa", ex: "Let's take a break for ten minutes.", note: "'take a break' é expressão fixa.", themes: ["sports-fitness"] },
  { id: 33, unit: 5, cat: "Grammar", front: "Present Continuous para planos futuros", back: "Usado para planos já combinados.", ex: "I'm meeting my friends tomorrow.", note: "Precisa de um tempo futuro claro: tomorrow, next week.", prereq: [6] },
  { id: 34, unit: 5, cat: "Grammar", front: "Superlativos — adjetivos curtos", back: "the + adjetivo + -est", ex: "This is the fastest runner in the team.", note: "Adjetivos de 1-2 sílabas.", prereq: [13] },
  { id: 35, unit: 5, cat: "Grammar", front: "Superlativos — adjetivos longos", back: "the most + adjetivo", ex: "That was the most exciting game of the year.", note: "Adjetivos de 3+ sílabas.", prereq: [34] },

  // UNIT 6 — Family & Friends
  { id: 36, unit: 6, cat: "Vocabulary", front: "get along with someone", back: "dar-se bem com alguém", ex: "I get along with my sister.", note: "Também: get on with (mais britânico).", themes: ["family-relationships"] },
  { id: 37, unit: 6, cat: "Vocabulary", front: "keep in touch", back: "manter contato", ex: "We keep in touch by video call.", note: "Oposto: lose touch (perder o contato).", themes: ["family-relationships", "communication-technology"] },
  { id: 38, unit: 6, cat: "Vocabulary", front: "look like someone", back: "parecer-se com alguém", ex: "She looks like her mother.", note: "Físico. Para personalidade: take after someone.", themes: ["family-relationships"] },
  { id: 39, unit: 6, cat: "Vocabulary", front: "post a photo", back: "postar uma foto", ex: "He posted a photo on social media.", note: "Também: post a comment, post a video.", themes: ["communication-technology"] },
  { id: 40, unit: 6, cat: "Grammar", front: "Question formation — Wh- questions", back: "Wh-word + auxiliar + sujeito + verbo", ex: "Where do you live?", note: "Palavras: what, where, when, why, who, how.", prereq: [] },
  { id: 41, unit: 6, cat: "Grammar", front: "Question formation — perguntas sim/não", back: "Auxiliar + sujeito + verbo", ex: "Do you have brothers or sisters?", note: "Resposta curta: Yes, I do. / No, I don't.", prereq: [40] },
  { id: 42, unit: 6, cat: "Grammar", front: "Mostrando semelhança com 'so' e 'too'", back: "'so' + auxiliar + sujeito (antes do verbo); 'too' no fim da frase.", ex: "I like coffee, and so does she.", note: "'too': She likes coffee too.", prereq: [41] },

  // UNIT 7 — Your Place
  { id: 43, unit: 7, cat: "Vocabulary", front: "live in the city centre", back: "morar no centro da cidade", ex: "I live in the city centre.", note: "Britânico: centre; americano: center.", themes: ["home-housing"] },
  { id: 44, unit: 7, cat: "Vocabulary", front: "share a flat", back: "dividir um apartamento", ex: "I share a flat with two friends.", note: "'flat' (britânico) = 'apartment' (americano).", themes: ["home-housing"] },
  { id: 45, unit: 7, cat: "Vocabulary", front: "stay with someone", back: "ficar hospedado na casa de alguém", ex: "I stayed with my cousin last summer.", note: "Diferente de 'live with' (morar junto de forma permanente).", themes: ["home-housing", "travel-transport"] },
  { id: 46, unit: 7, cat: "Vocabulary", front: "move house", back: "mudar de casa", ex: "We're moving house next month.", note: "'move' sozinho já significa 'se mudar'.", themes: ["home-housing"] },
  { id: 47, unit: 7, cat: "Grammar", front: "Have to / don't have to", back: "'have to' = obrigação; 'don't have to' = não é necessário.", ex: "I have to clean my room. I don't have to work today.", note: "Diferente de 'mustn't' (proibido).", prereq: [] },
  { id: 48, unit: 7, cat: "Grammar", front: "Can / can't — permissão e habilidade", back: "'can' = pode/consegue; 'can't' = não pode/não consegue.", ex: "You can park here. You can't smoke inside.", note: "Também usado para habilidade: I can swim.", prereq: [] },
  { id: 49, unit: 7, cat: "Grammar", front: "Will / won't — decisões no momento", back: "Usado para decisões espontâneas.", ex: "I'll help you with that.", note: "Diferente de planos já combinados (present continuous).", prereq: [] },

  // UNIT 8 — Always Learning
  { id: 50, unit: 8, cat: "Vocabulary", front: "take a course", back: "fazer um curso", ex: "I'm taking an online course.", note: "'take' aqui = fazer/cursar.", themes: ["education-learning"] },
  { id: 51, unit: 8, cat: "Vocabulary", front: "pass an exam", back: "passar numa prova", ex: "She passed her English exam.", note: "Oposto: fail an exam (reprovar).", themes: ["education-learning"] },
  { id: 52, unit: 8, cat: "Vocabulary", front: "hand in homework", back: "entregar a lição de casa", ex: "I need to hand in my homework.", note: "'hand in' = entregar (trabalho, prova).", themes: ["education-learning"] },
  { id: 53, unit: 8, cat: "Vocabulary", front: "drop out of school", back: "abandonar a escola", ex: "He dropped out of school at sixteen.", note: "'drop out of' + escola/curso.", themes: ["education-learning"], family: [{ form: "noun", word: "dropout" }] },
  { id: 54, unit: 8, cat: "Grammar", front: "First Conditional — como formar?", back: "If + Present Simple, will + infinitivo. Possibilidade real no futuro.", ex: "If I study hard, I will pass the exam.", note: "Diferente do zero conditional (verdade geral).", prereq: [7, 49] },
  { id: 55, unit: 8, cat: "Grammar", front: "Had to — obrigação no passado", back: "Passado de 'have to'.", ex: "I had to study all weekend.", note: "'must' não tem forma no passado; usa-se 'had to'.", prereq: [47, 12] },
  { id: 56, unit: 8, cat: "Grammar", front: "Could — habilidade no passado", back: "Passado de 'can' para habilidade geral.", ex: "I could read when I was five.", note: "Para uma habilidade específica em um momento: 'was able to'.", prereq: [48, 12] },

  // UNIT 9 — Mind & Body
  { id: 57, unit: 9, cat: "Vocabulary", front: "feel dizzy", back: "sentir tontura", ex: "I feel dizzy today.", note: "'feel' + adjetivo de sensação.", themes: ["health-body"] },
  { id: 58, unit: 9, cat: "Vocabulary", front: "have a headache", back: "estar com dor de cabeça", ex: "I have a headache.", note: "Também: have a stomachache, have a fever.", themes: ["health-body"] },
  { id: 59, unit: 9, cat: "Vocabulary", front: "see a doctor", back: "consultar um médico", ex: "You should see a doctor.", note: "'see' aqui = consultar.", themes: ["health-body"] },
  { id: 60, unit: 9, cat: "Vocabulary", front: "break a bone", back: "quebrar um osso", ex: "He broke his arm playing football.", note: "'break' no passado = broke.", themes: ["health-body"] },
  { id: 61, unit: 9, cat: "Grammar", front: "Dando conselhos com 'should'", back: "should + infinitivo sem 'to'", ex: "You should drink more water.", note: "Negativo: You shouldn't skip meals.", prereq: [] },
  { id: 62, unit: 9, cat: "Grammar", front: "Dando conselhos com 'had better'", back: "had better + infinitivo sem 'to' — conselho mais forte.", ex: "You'd better rest today.", note: "Contração comum: you'd better.", prereq: [61] },
  { id: 63, unit: 9, cat: "Grammar", front: "Imperativos", back: "Verbo no infinitivo sem sujeito, para instruções.", ex: "Take this medicine twice a day.", note: "Negativo: Don't take it on an empty stomach.", prereq: [] },

  // UNIT 10 — Places to Stay
  { id: 64, unit: 10, cat: "Vocabulary", front: "check into a hotel", back: "fazer check-in num hotel", ex: "We checked into the hotel at noon.", note: "Oposto: check out (fazer check-out).", themes: ["travel-transport"] },
  { id: 65, unit: 10, cat: "Vocabulary", front: "book a room", back: "reservar um quarto", ex: "I booked a room for three nights.", note: "'book' = reservar.", themes: ["travel-transport"] },
  { id: 66, unit: 10, cat: "Vocabulary", front: "go camping", back: "acampar", ex: "We went camping last summer.", note: "'go + -ing' para atividades.", themes: ["travel-transport", "sports-fitness"] },
  { id: 67, unit: 10, cat: "Vocabulary", front: "have a problem with the room", back: "ter um problema com o quarto", ex: "We had a problem with the room.", note: "Útil para reclamar em hotéis.", themes: ["travel-transport"] },
  { id: 68, unit: 10, cat: "Grammar", front: "Used to — o que significa?", back: "Hábito ou estado do passado que não existe mais.", ex: "I used to travel a lot before the pandemic.", note: "Não confundir com 'be used to' (estar acostumado).", prereq: [12] },
  { id: 69, unit: 10, cat: "Grammar", front: "Time clauses — when / before / after", back: "Conectam duas ações no tempo.", ex: "I'll call you when I arrive.", note: "Depois de 'when', usa-se present simple (não 'will').", prereq: [] },
  { id: 70, unit: 10, cat: "Grammar", front: "Time clauses — as soon as", back: "'assim que' — ação imediata.", ex: "I'll text you as soon as I land.", note: "Mesma regra: present simple depois de 'as soon as'.", prereq: [69] },

  // UNIT 11 — Science & Nature
  { id: 71, unit: 11, cat: "Vocabulary", front: "make a discovery", back: "fazer uma descoberta", ex: "Scientists made an important discovery.", note: "'make' + discovery (não 'do').", themes: ["science-environment"], family: [{ form: "verb", word: "discover" }] },
  { id: 72, unit: 11, cat: "Vocabulary", front: "protect the environment", back: "proteger o meio ambiente", ex: "We should protect the environment.", note: "'environment' = meio ambiente.", themes: ["science-environment"], family: [{ form: "noun", word: "protection" }, { form: "adjective", word: "protective" }] },
  { id: 73, unit: 11, cat: "Vocabulary", front: "an endangered species", back: "uma espécie ameaçada", ex: "The tiger is an endangered species.", note: "'species' é igual no singular e no plural.", themes: ["science-environment"], family: [{ form: "verb", word: "endanger" }] },
  { id: 74, unit: 11, cat: "Vocabulary", front: "conduct an experiment", back: "realizar um experimento", ex: "They conducted an experiment in the lab.", note: "'conduct' aqui = realizar/fazer.", themes: ["science-environment"] },
  { id: 75, unit: 11, cat: "Grammar", front: "Past Perfect Simple — quando usar?", back: "Para uma ação que aconteceu antes de outra no passado.", ex: "The scientist had already left when we arrived.", note: "had + particípio.", prereq: [12] },
  { id: 76, unit: 11, cat: "Grammar", front: "Voz Passiva — presente", back: "am/is/are + particípio", ex: "The results are published every year.", note: "Usada quando a ação importa mais que quem faz.", prereq: [5] },
  { id: 77, unit: 11, cat: "Grammar", front: "Voz Passiva — passado", back: "was/were + particípio", ex: "The experiment was done in 2020.", note: "'by + agente' é opcional.", prereq: [76, 12] },

  // UNIT 12 — On the Phone
  { id: 78, unit: 12, cat: "Vocabulary", front: "leave a message", back: "deixar um recado", ex: "I left a message on his phone.", note: "'leave' aqui = deixar.", themes: ["communication-technology"] },
  { id: 79, unit: 12, cat: "Vocabulary", front: "hang up", back: "desligar o telefone", ex: "She hung up before I finished.", note: "Oposto informal: pick up (atender).", themes: ["communication-technology"] },
  { id: 80, unit: 12, cat: "Vocabulary", front: "answer the phone", back: "atender o telefone", ex: "Can you answer the phone, please?", note: "'answer' aqui = atender (não confundir com 'attend').", themes: ["communication-technology"] },
  { id: 81, unit: 12, cat: "Vocabulary", front: "report a crime", back: "denunciar um crime", ex: "I reported the crime to the police.", note: "'report' = relatar/denunciar.", themes: ["communication-technology"], family: [{ form: "noun (person)", word: "reporter" }] },
  { id: 82, unit: 12, cat: "Grammar", front: "Yet / already — diferença", back: "'yet' em negativas/perguntas; 'already' em afirmativas.", ex: "I haven't finished yet. I've already called her.", note: "'yet' geralmente no final da frase.", prereq: [26] },
  { id: 83, unit: 12, cat: "Grammar", front: "Just / still — diferença", back: "'just' = há pouco tempo; 'still' = ainda (continua acontecendo).", ex: "I've just arrived. I'm still waiting.", note: "'just' com present perfect; 'still' com qualquer tempo verbal.", prereq: [26] },
  { id: 84, unit: 12, cat: "Grammar", front: "Discurso indireto (reported speech)", back: "Ao relatar o que alguém disse, o verbo geralmente volta um tempo.", ex: "She said that she was busy.", note: "'is' vira 'was'; 'will' vira 'would'.", prereq: [12, 5] },

  // UNIT 13 — Film & Music
  { id: 85, unit: 13, cat: "Vocabulary", front: "watch a series", back: "assistir a uma série", ex: "I'm watching a new series.", note: "'series' é igual no singular e plural.", themes: ["entertainment-media"] },
  { id: 86, unit: 13, cat: "Vocabulary", front: "play an instrument", back: "tocar um instrumento", ex: "He plays the guitar.", note: "Use 'the' antes do instrumento: play the piano.", themes: ["entertainment-media"] },
  { id: 87, unit: 13, cat: "Vocabulary", front: "release an album", back: "lançar um álbum", ex: "The band released a new album.", note: "'release' = lançar (música, filme).", themes: ["entertainment-media"] },
  { id: 88, unit: 13, cat: "Vocabulary", front: "be a fan of someone", back: "ser fã de alguém", ex: "I'm a big fan of that singer.", note: "'fan of' + pessoa/coisa.", themes: ["entertainment-media"] },
  { id: 89, unit: 13, cat: "Grammar", front: "Be supposed to — o que significa?", back: "Expectativa ou combinado, algo que deveria acontecer.", ex: "The movie is supposed to start at eight.", note: "Também usado para regras: You're supposed to arrive early.", prereq: [] },
  { id: 90, unit: 13, cat: "Grammar", front: "Present Perfect Continuous", back: "have/has been + verbo-ing, ação contínua até agora.", ex: "I've been watching this show for hours.", note: "Foco na duração da ação, não no resultado.", prereq: [26] },

  // UNIT 14 — Trips & Things
  { id: 91, unit: 14, cat: "Vocabulary", front: "pack a bag", back: "fazer a mala", ex: "I need to pack my bag for the trip.", note: "'pack' = arrumar/fazer a mala.", themes: ["travel-transport"] },
  { id: 92, unit: 14, cat: "Vocabulary", front: "recycle plastic", back: "reciclar plástico", ex: "We recycle plastic at home.", note: "Também: recycle paper, glass, metal.", themes: ["science-environment"], family: [{ form: "noun", word: "recycling" }] },
  { id: 93, unit: 14, cat: "Vocabulary", front: "throw something away", back: "jogar algo fora", ex: "Don't throw that away, recycle it.", note: "Verbo separável: throw it away.", themes: ["science-environment"] },
  { id: 94, unit: 14, cat: "Vocabulary", front: "borrow something", back: "pegar algo emprestado", ex: "Can I borrow your umbrella?", note: "Diferente de 'lend' (emprestar para alguém).", themes: ["family-relationships"] },
  { id: 95, unit: 14, cat: "Grammar", front: "Orações relativas — pessoas", back: "who/that + verbo, para identificar uma pessoa.", ex: "That's the man who fixed my car.", note: "'that' também pode substituir 'who' de forma informal.", prereq: [] },
  { id: 96, unit: 14, cat: "Grammar", front: "Orações relativas — coisas", back: "which/that + verbo, para identificar uma coisa.", ex: "This is the bag that I bought yesterday.", note: "Sem vírgula antes — é uma oração definidora.", prereq: [95] },
  { id: 97, unit: 14, cat: "Grammar", front: "Falando sobre regras — must/mustn't", back: "'must' = obrigatório; 'mustn't' = proibido.", ex: "You must wear a seatbelt. You mustn't smoke here.", note: "Diferente de 'don't have to' (não é necessário).", prereq: [47] },

  // UNIT 15 — Money
  { id: 98, unit: 15, cat: "Vocabulary", front: "save money", back: "economizar dinheiro", ex: "I'm trying to save money this year.", note: "Oposto: spend money (gastar dinheiro).", themes: ["money-finance"] },
  { id: 99, unit: 15, cat: "Vocabulary", front: "pay in cash", back: "pagar em dinheiro", ex: "I paid in cash at the market.", note: "Oposto: pay by card.", themes: ["money-finance"] },
  { id: 100, unit: 15, cat: "Vocabulary", front: "lend someone money", back: "emprestar dinheiro a alguém", ex: "I lent him some money.", note: "'lend' (eu empresto) x 'borrow' (eu pego emprestado).", themes: ["money-finance"] },
  { id: 101, unit: 15, cat: "Vocabulary", front: "donate to charity", back: "doar para caridade", ex: "We donate to charity every year.", note: "'charity' = instituição de caridade.", themes: ["money-finance"], family: [{ form: "noun", word: "donation" }, { form: "noun (person)", word: "donor" }] },
  { id: 102, unit: 15, cat: "Grammar", front: "Second Conditional — como formar?", back: "If + Past Simple, would + infinitivo. Situação hipotética.", ex: "If I had more money, I would travel more.", note: "Situação improvável ou imaginária.", prereq: [54] },
  { id: 103, unit: 15, cat: "Grammar", front: "Second Conditional com 'were'", back: "Com o verbo 'be', usa-se 'were' para todas as pessoas.", ex: "If I were rich, I would buy a house.", note: "Mais formal: If I were you, I would...", prereq: [102] },

  // UNIT 16 — Events
  { id: 104, unit: 16, cat: "Vocabulary", front: "throw a party", back: "dar uma festa", ex: "We're throwing a party this weekend.", note: "'throw a party' é a expressão comum, não 'make a party'.", themes: ["social-events"] },
  { id: 105, unit: 16, cat: "Vocabulary", front: "celebrate a birthday", back: "comemorar um aniversário", ex: "We celebrated her birthday yesterday.", note: "'celebrate' + evento.", themes: ["social-events"], family: [{ form: "noun", word: "celebration" }] },
  { id: 106, unit: 16, cat: "Vocabulary", front: "attend an event", back: "comparecer a um evento", ex: "I attended a wedding last month.", note: "'attend' = comparecer (não confundir com 'atender').", themes: ["social-events"], family: [{ form: "noun", word: "attendance" }, { form: "noun (person)", word: "attendee" }] },
  { id: 107, unit: 16, cat: "Vocabulary", front: "take place", back: "acontecer (um evento)", ex: "The concert took place in the park.", note: "'take place' = happen.", themes: ["social-events"] },
  { id: 108, unit: 16, cat: "Grammar", front: "Artigos — a/an x the", back: "'a/an' primeira menção; 'the' quando já é conhecido.", ex: "I went to a party. The party was great.", note: "'the' também para coisas únicas: the moon.", prereq: [] },
  { id: 109, unit: 16, cat: "Grammar", front: "Padrões verbais — verbo + -ing", back: "Alguns verbos são seguidos de verbo + -ing.", ex: "I enjoy dancing at parties.", note: "Outros: like, love, hate + -ing.", prereq: [] },
  { id: 110, unit: 16, cat: "Grammar", front: "Padrões verbais — infinitivo com 'to'", back: "Alguns verbos são seguidos de 'to' + infinitivo.", ex: "I decided to go to the party.", note: "Outros: want, plan, hope + to + infinitivo.", prereq: [109] },

  // Extra vocabulary — Unit 1 Jobs
  { id: 111, unit: 1, cat: "Vocabulary", front: "work for myself", back: "trabalhar por conta própria", ex: "I've always wanted to work for myself instead of having a boss.", note: "'Work for' + pronome reflexivo = ser autônomo.", themes: ["work-career"] },
  { id: 112, unit: 1, cat: "Vocabulary", front: "run my own company", back: "ter/dirigir minha própria empresa", ex: "She left her job last year to run her own company.", note: "'Run a company' = administrar um negócio.", themes: ["work-career"] },
  { id: 113, unit: 1, cat: "Vocabulary", front: "give a presentation", back: "dar uma apresentação", ex: "I have to give a presentation to the whole team on Friday.", note: "Colocação fixa: 'give', não 'do' ou 'make'.", themes: ["work-career"] },
  { id: 114, unit: 1, cat: "Vocabulary", front: "have an argument", back: "ter uma discussão", ex: "We had an argument about the schedule, but we sorted it out.", note: "Diferente de 'have a conversation' (neutro).", themes: ["work-career"] },

  // Extra vocabulary — Unit 2 Shopping
  { id: 115, unit: 2, cat: "Vocabulary", front: "in good/bad condition", back: "em bom/mau estado", ex: "I bought it second-hand, but it's in really good condition.", note: "Usado pra descrever o estado de algo comprado.", themes: ["shopping-consumer"] },
  { id: 116, unit: 2, cat: "Vocabulary", front: "keep me warm", back: "me manter aquecido", ex: "This coat keeps me warm even in winter.", note: "'Keep' + pessoa + adjetivo = manter em um estado.", themes: ["shopping-consumer"] },
  { id: 117, unit: 2, cat: "Vocabulary", front: "these shoes don't fit", back: "esses sapatos não servem", ex: "I tried them on, but they didn't fit — too small.", note: "'Fit' = servir em tamanho, diferente de 'suit'.", themes: ["shopping-consumer"] },
  { id: 118, unit: 2, cat: "Vocabulary", front: "these earrings suit you", back: "esses brincos combinam com você", ex: "Those earrings really suit you!", note: "'Suit' = ficar bem em alguém (aparência).", themes: ["shopping-consumer"] },

  // Extra vocabulary — Unit 3 Getting Around
  { id: 119, unit: 3, cat: "Vocabulary", front: "catch a train", back: "pegar um trem", ex: "I need to catch the 8am train or I'll be late.", note: "'Catch' = pegar transporte com horário marcado.", themes: ["travel-transport"] },
  { id: 120, unit: 3, cat: "Vocabulary", front: "get on/off the bus", back: "entrar/descer do ônibus", ex: "I got off the bus one stop too early.", note: "'Get on' = entrar, 'get off' = descer.", themes: ["travel-transport"] },
  { id: 121, unit: 3, cat: "Vocabulary", front: "get lost", back: "se perder", ex: "We got lost trying to find the hotel.", note: "Não confundir com o imperativo informal 'Get lost!'.", themes: ["travel-transport"] },
  { id: 122, unit: 3, cat: "Vocabulary", front: "walk instead of driving", back: "andar a pé em vez de dirigir", ex: "I try to walk instead of driving when the weather's good.", note: "'Instead of' + verbo -ing.", themes: ["travel-transport"] },

  // Extra vocabulary — Unit 4 Food
  { id: 123, unit: 4, cat: "Vocabulary", front: "go out for dinner", back: "sair para jantar", ex: "We went out for dinner to celebrate.", note: "'Go out for' + refeição.", themes: ["food-dining"] },
  { id: 124, unit: 4, cat: "Vocabulary", front: "eat out", back: "comer fora", ex: "We eat out about once a week.", note: "Oposto de 'eat in' / 'cook at home'.", themes: ["food-dining"] },
  { id: 125, unit: 4, cat: "Vocabulary", front: "be starving", back: "estar faminto", ex: "I'm starving — let's eat now.", note: "Informal, mais forte que 'be hungry'.", themes: ["food-dining"] },
  { id: 126, unit: 4, cat: "Vocabulary", front: "skip a meal", back: "pular uma refeição", ex: "I sometimes skip breakfast when I'm in a hurry.", note: "'Skip' = pular/não fazer algo de rotina.", themes: ["food-dining", "health-body"] },

  // Extra vocabulary — Unit 5 Sport & Leisure
  { id: 127, unit: 5, cat: "Vocabulary", front: "support a team", back: "torcer para um time", ex: "Which team do you support?", note: "'Support' = torcer, ser fã de um time.", themes: ["sports-fitness"] },
  { id: 128, unit: 5, cat: "Vocabulary", front: "compete in a race", back: "competir numa corrida", ex: "I've never competed in a race, but I'd like to try.", note: "'Compete in' + evento esportivo.", themes: ["sports-fitness"], family: [{ form: "noun", word: "competition" }, { form: "noun (person)", word: "competitor" }, { form: "adjective", word: "competitive" }] },
  { id: 129, unit: 5, cat: "Vocabulary", front: "go for a swim", back: "ir nadar", ex: "It's hot — let's go for a swim.", note: "Mesmo padrão de 'go for a run/walk'.", themes: ["sports-fitness"] },
  { id: 130, unit: 5, cat: "Vocabulary", front: "be good at something", back: "ser bom em algo", ex: "I'm not very good at football, but I love watching it.", note: "'Be good at' + substantivo ou verbo -ing.", themes: ["sports-fitness"] },

  // Extra vocabulary — Unit 6 Family & Friends
  { id: 131, unit: 6, cat: "Vocabulary", front: "go viral", back: "viralizar", ex: "The video went viral overnight.", note: "Usado pra conteúdo online que se espalha rápido.", themes: ["communication-technology"] },
  { id: 132, unit: 6, cat: "Vocabulary", front: "share a post", back: "compartilhar uma postagem", ex: "Please share the post if you can.", note: "'Share' = compartilhar em rede social.", themes: ["communication-technology"] },
  { id: 133, unit: 6, cat: "Vocabulary", front: "be reliable", back: "ser confiável", ex: "My brother's very reliable — he always keeps his promises.", note: "Usado pra descrever personalidade.", themes: ["family-relationships"], family: [{ form: "noun", word: "reliability" }, { form: "adverb", word: "reliably" }] },
  { id: 134, unit: 6, cat: "Vocabulary", front: "take after someone", back: "puxar a alguém (personalidade/aparência)", ex: "I take after my mother — we're both very patient.", note: "Diferente de 'look like' (só aparência física).", themes: ["family-relationships"] },

  // Extra vocabulary — Unit 7 Your Place
  { id: 135, unit: 7, cat: "Vocabulary", front: "a historic building", back: "um prédio histórico", ex: "The city centre has a lot of historic buildings.", note: "'Historic' = de valor histórico.", themes: ["home-housing"] },
  { id: 136, unit: 7, cat: "Vocabulary", front: "take public transport", back: "pegar transporte público", ex: "I usually take public transport to work.", note: "'Take' + meio de transporte.", themes: ["travel-transport"] },
  { id: 137, unit: 7, cat: "Vocabulary", front: "a quiet neighbourhood", back: "um bairro tranquilo", ex: "I'd like to live in a quieter neighbourhood.", note: "'Neighbourhood' (BrE) = 'neighborhood' (AmE).", themes: ["home-housing"] },
  { id: 138, unit: 7, cat: "Vocabulary", front: "the cost of living", back: "o custo de vida", ex: "The cost of living here is quite high.", note: "Expressão fixa em contextos econômicos.", themes: ["home-housing", "money-finance"] },

  // Extra vocabulary — Unit 8 Always Learning
  { id: 139, unit: 8, cat: "Vocabulary", front: "do a degree", back: "cursar uma graduação", ex: "She's doing a degree in Law at university.", note: "'Do a degree in' + área de estudo.", themes: ["education-learning"] },
  { id: 140, unit: 8, cat: "Vocabulary", front: "leave school", back: "sair da escola / concluir os estudos", ex: "He left school at sixteen and started working.", note: "'Leave school' = terminar o ensino obrigatório.", themes: ["education-learning"] },
  { id: 141, unit: 8, cat: "Vocabulary", front: "take a year off", back: "tirar um ano sabático", ex: "I took a year off before starting university.", note: "Pausa nos estudos ou no trabalho.", themes: ["education-learning", "work-career"] },
  { id: 142, unit: 8, cat: "Vocabulary", front: "get good grades", back: "tirar boas notas", ex: "She always gets good grades in science.", note: "'Get' + adjetivo + 'grades'.", themes: ["education-learning"] },

  // Extra vocabulary — Unit 9 Mind & Body
  { id: 143, unit: 9, cat: "Vocabulary", front: "catch the flu", back: "pegar gripe", ex: "I caught the flu last week and I'm still tired.", note: "'Catch' = pegar uma doença contagiosa.", themes: ["health-body"] },
  { id: 144, unit: 9, cat: "Vocabulary", front: "take pills", back: "tomar remédio (comprimidos)", ex: "My grandparents have to take pills every day.", note: "'Take' + medicamento.", themes: ["health-body"] },
  { id: 145, unit: 9, cat: "Vocabulary", front: "feel weak", back: "sentir-se fraco", ex: "I still feel weak after being sick.", note: "'Feel' + adjetivo de sensação física.", themes: ["health-body"] },
  { id: 146, unit: 9, cat: "Vocabulary", front: "suffer from something", back: "sofrer de algo (doença/condição)", ex: "He suffers from allergies every spring.", note: "'Suffer from' + condição de saúde crônica.", themes: ["health-body"], family: [{ form: "noun", word: "suffering" }] },

  // Extra vocabulary — Unit 10 Places to Stay
  { id: 147, unit: 10, cat: "Vocabulary", front: "put up a tent", back: "armar a barraca", ex: "It took us an hour to put up the tent.", note: "'Put up' = montar/armar.", themes: ["travel-transport"] },
  { id: 148, unit: 10, cat: "Vocabulary", front: "share a room", back: "dividir um quarto", ex: "We shared a room to save money.", note: "'Share' + espaço.", themes: ["travel-transport"] },
  { id: 149, unit: 10, cat: "Vocabulary", front: "a reduced rate", back: "uma tarifa com desconto", ex: "We got a reduced rate because we booked early.", note: "'Reduced rate' = preço reduzido.", themes: ["travel-transport", "money-finance"] },
  { id: 150, unit: 10, cat: "Vocabulary", front: "out of order", back: "fora de funcionamento", ex: "The lift was out of order, so we used the stairs.", note: "Usado pra elevadores, máquinas, banheiros etc.", themes: ["travel-transport"] },

  // Extra vocabulary — Unit 11 Science & Nature
  { id: 151, unit: 11, cat: "Vocabulary", front: "carry out an experiment", back: "realizar um experimento", ex: "Scientists carried out the experiment over five years.", note: "'Carry out' = realizar/conduzir (formal).", themes: ["science-environment"] },
  { id: 152, unit: 11, cat: "Vocabulary", front: "predict the future", back: "prever o futuro", ex: "It's hard to predict what will happen next.", note: "'Predict' + substantivo.", themes: ["science-environment"], family: [{ form: "noun", word: "prediction" }, { form: "adjective", word: "predictable" }] },
  { id: 153, unit: 11, cat: "Vocabulary", front: "reduce pollution", back: "reduzir a poluição", ex: "We need to reduce pollution in big cities.", note: "'Reduce' = diminuir.", themes: ["science-environment"], family: [{ form: "noun", word: "reduction" }] },
  { id: 154, unit: 11, cat: "Vocabulary", front: "go extinct", back: "ser extinto", ex: "Many species could go extinct in the next 50 years.", note: "'Go extinct' = deixar de existir.", themes: ["science-environment"], family: [{ form: "noun", word: "extinction" }] },

  // Extra vocabulary — Unit 12 On the Phone
  { id: 155, unit: 12, cat: "Vocabulary", front: "pick up the phone", back: "atender o telefone", ex: "He never picks up when I call him.", note: "'Pick up' = atender a chamada.", themes: ["communication-technology"] },
  { id: 156, unit: 12, cat: "Vocabulary", front: "a bad signal", back: "um sinal ruim", ex: "Sorry, it's a really bad signal here.", note: "'Signal' = sinal de celular.", themes: ["communication-technology"] },
  { id: 157, unit: 12, cat: "Vocabulary", front: "go straight to voicemail", back: "cair direto na caixa postal", ex: "I called twice, but it went straight to voicemail.", note: "Expressão fixa pra ligações não atendidas.", themes: ["communication-technology"] },
  { id: 158, unit: 12, cat: "Vocabulary", front: "break into a house", back: "arrombar/invadir uma casa", ex: "Someone broke into our house last week.", note: "'Break into' = entrar à força.", themes: ["home-housing"], family: [{ form: "noun", word: "break-in" }] },

  // Extra vocabulary — Unit 13 Film & Music
  { id: 159, unit: 13, cat: "Vocabulary", front: "take up an instrument", back: "começar a praticar um instrumento", ex: "I took up the guitar during the pandemic.", note: "'Take up' = começar a fazer algo novo.", themes: ["entertainment-media"] },
  { id: 160, unit: 13, cat: "Vocabulary", front: "give up an activity", back: "desistir de / abandonar uma atividade", ex: "He gave up piano after a year.", note: "'Give up' = parar de fazer algo.", themes: ["entertainment-media"] },
  { id: 161, unit: 13, cat: "Vocabulary", front: "join a choir", back: "entrar num coral", ex: "She joined a choir at school and loved it.", note: "'Join' = entrar/se inscrever em um grupo.", themes: ["entertainment-media"] },
  { id: 162, unit: 13, cat: "Vocabulary", front: "read music", back: "ler partitura", ex: "I can play by ear, but I can't read music.", note: "'Read music' = ler notação musical.", themes: ["entertainment-media"] },

  // Extra vocabulary — Unit 14 Trips & Things
  { id: 163, unit: 14, cat: "Vocabulary", front: "lend someone something", back: "emprestar algo a alguém", ex: "Can you lend me your charger?", note: "'Lend' (eu empresto) x 'borrow' (eu pego emprestado).", themes: ["family-relationships"] },
  { id: 164, unit: 14, cat: "Vocabulary", front: "separate the rubbish", back: "separar o lixo", ex: "We separate the rubbish for recycling every week.", note: "'Separate' + substantivo.", themes: ["science-environment"] },
  { id: 165, unit: 14, cat: "Vocabulary", front: "a folding chair", back: "uma cadeira dobrável", ex: "We took a folding chair for the beach.", note: "Substantivo composto comum em viagens.", themes: ["travel-transport"] },
  { id: 166, unit: 14, cat: "Vocabulary", front: "not allowed to", back: "não ter permissão para", ex: "You're not allowed to make noise after 10pm here.", note: "'Not allowed to' = proibido.", themes: ["travel-transport"] },

  // Extra vocabulary — Unit 15 Money
  { id: 167, unit: 15, cat: "Vocabulary", front: "the exchange rate", back: "a taxa de câmbio", ex: "The exchange rate is terrible at the moment.", note: "Usado ao trocar moeda/viajar.", themes: ["money-finance", "travel-transport"] },
  { id: 168, unit: 15, cat: "Vocabulary", front: "job security", back: "estabilidade no emprego", ex: "There's no real job security in that industry anymore.", note: "'Job security' = garantia de manter o emprego.", themes: ["work-career", "money-finance"], family: [{ form: "adjective", word: "secure" }, { form: "verb", word: "secure" }] },
  { id: 169, unit: 15, cat: "Vocabulary", front: "owe someone money", back: "dever dinheiro a alguém", ex: "I still owe him money from last month.", note: "'Owe' = dever (dinheiro ou favor).", themes: ["money-finance"] },
  { id: 170, unit: 15, cat: "Vocabulary", front: "transfer money", back: "transferir dinheiro", ex: "I transferred the money to her account this morning.", note: "'Transfer' = transferir (banco).", themes: ["money-finance"] },

  // Extra vocabulary — Unit 16 Events
  { id: 171, unit: 16, cat: "Vocabulary", front: "clear the dance floor", back: "esvaziar a pista de dança", ex: "The second DJ was so bad he cleared the dance floor.", note: "Usado quando a música afasta as pessoas da pista.", themes: ["social-events", "entertainment-media"] },
  { id: 172, unit: 16, cat: "Vocabulary", front: "a special atmosphere", back: "uma atmosfera especial", ex: "The venue used to be a factory — it has a very special atmosphere.", note: "'Atmosphere' = clima/ambiente de um lugar.", themes: ["social-events"] },
  { id: 173, unit: 16, cat: "Vocabulary", front: "get arrested", back: "ser preso", ex: "He got arrested for driving without a licence.", note: "'Get' + particípio = construção passiva informal.", themes: ["social-events"] },
  { id: 174, unit: 16, cat: "Vocabulary", front: "win an election", back: "vencer uma eleição", ex: "She won the election by a small margin.", note: "'Win an election' = vencer eleição.", themes: ["social-events"], family: [{ form: "noun (person)", word: "winner" }] },

  // Extra grammar — Unit 15 Money (completa o segundo ponto gramatical da
  // unidade, que ainda não tinha um card próprio: sequenciar uma história
  // ou processo com palavras de tempo, mantendo o tempo verbal consistente).
  { id: 175, unit: 15, cat: "Grammar", front: "Time Phrases — sequenciando uma história", back: "Palavras como first, then, after that e eventually organizam a ordem dos eventos e ajudam a manter o mesmo tempo verbal do início ao fim.", ex: "First, I saved some money. Then, I opened a savings account, and eventually I bought my first car.", note: "Mantenha o mesmo tempo verbal (aqui, Past Simple) em toda a sequência.", prereq: [12] },
];

// chunks from CARDS. **bold** marks the target chunk; [brackets] mark the
// part meant to be swapped for the learner's own details.
const PRE_INTERMEDIATE_PHRASES = {
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

// Curated songs for listening practice at this level. We never store or
// display lyrics ourselves — the embedded player relies on YouTube's own
// official captions (with auto-translate) so any text on screen comes
// straight from the platform/rights holder, not from us.
const PRE_INTERMEDIATE_MUSIC = [
  { title: "Count on Me", artist: "Bruno Mars", videoId: "6k8cpUkKK4c", note: "Ritmo calmo, vocabulário simples sobre amizade — ótimo para B1." },
  { title: "Perfect", artist: "Ed Sheeran", videoId: "2Vv-BfVoq4g", note: "Frases curtas, dicção clara, repetição de estruturas simples." },
  { title: "Fix You", artist: "Coldplay", videoId: "k4V3Mo61fJM", note: "Mais lento, bom para treinar o ouvido com calma." },
  { title: "Photograph", artist: "Ed Sheeran", videoId: "nSDgHBxUbVQ", note: "Vocabulário do dia a dia, ritmo tranquilo." },
  { title: "Someone Like You", artist: "Adele", videoId: "hLQl3WQQoQ0", note: "Dicção muito clara, ótimo pra treinar o ouvido em ritmo lento." },
  { title: "Let Her Go", artist: "Passenger", videoId: "RBumgq5yVrA", note: "Repetição de frases simples no refrão, fácil de acompanhar." },
  { title: "A Thousand Years", artist: "Christina Perri", videoId: "rtOvBOTyX00", note: "Balada lenta, boa pra focar em cada palavra." },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", videoId: "lp-EO5I60KA", note: "Andamento médio, vocabulário cotidiano sobre relacionamento." },
  { title: "Viva la Vida", artist: "Coldplay", videoId: "dvgZkm1xWPE", note: "Mais animada, boa pra variar o ritmo dos estudos." },
  { title: "Just the Way You Are", artist: "Bruno Mars", videoId: "LjhCEhWiKXk", note: "Vocabulário simples de elogios e sentimentos, ritmo pop acessível." },
  { title: "Stay With Me", artist: "Sam Smith", videoId: "pB-5XG-DbAA", note: "Curta e lenta, frases repetidas facilitam o acompanhamento." },
  { title: "Counting Stars", artist: "OneRepublic", videoId: "hT_nvWreIhg", note: "Ritmo mais acelerado, bom desafio depois das mais lentas." },
];

// Temas de redação (simulado de escrita), um por bloco de duas unidades —
// tema e dica escritos originalmente para este app, não copiados de
// nenhuma fonte externa. O bloco certo é escolhido automaticamente pela
// unidade selecionada (veja src/components/WritingScreen.jsx).
const PRE_INTERMEDIATE_WRITING = [
  {
    id: 1,
    fromUnit: 1,
    toUnit: 2,
    title: "A Work Update",
    prompt: "Write a short post (60–100 words) about your job — or a job you'd like to have one day. Say what you do, what a normal day looks like, and one thing you like or find difficult about it.",
    tip: "Tente usar pelo menos 3 palavras do vocabulário das Units 1–2 (ex: apply for a job, work part-time, get a refund).",
  },
  {
    id: 2,
    fromUnit: 3,
    toUnit: 4,
    title: "A Trip That Didn't Go as Planned",
    prompt: "Tell a short story (60–100 words) about a trip, a meal, or a journey that didn't go the way you expected. What happened, and how did you feel?",
    tip: "Use o Past Simple para a história e experimente o Past Continuous pra descrever o que estava acontecendo (ex: 'I was waiting for the bus when...').",
  },
  {
    id: 3,
    fromUnit: 5,
    toUnit: 6,
    title: "How I Relax, and Who I Relax With",
    prompt: "Write a short personal profile (60–100 words): what do you do in your free time to relax, and who is one person (family or friend) you like spending that time with?",
    tip: "Combine o vocabulário das Units 5–6 (sport, hobbies, family) com um superlativo, tipo 'the most relaxing thing I do is...'.",
  },
  {
    id: 4,
    fromUnit: 7,
    toUnit: 8,
    title: "Where I Live, and What I'm Learning",
    prompt: "Describe (60–100 words) the place where you live and something you're currently learning or would like to learn.",
    tip: "Pra descrever o lugar, use 'there is / there are'; pra falar do aprendizado, tente 'have to' / 'don't have to'.",
  },
  {
    id: 5,
    fromUnit: 9,
    toUnit: 10,
    title: "Holiday News",
    prompt: "Write a short message (60–100 words) giving news about a real or imaginary trip — where you stayed, something that happened to your health or body, and one piece of advice you'd give someone going to the same place.",
    tip: "Use 'used to' pra comparar como era antes da viagem, e 'should' ou 'had better' pro conselho.",
  },
  {
    id: 6,
    fromUnit: 11,
    toUnit: 12,
    title: "Plans and News",
    prompt: "Write about plans and arrangements you're making for the next few weeks, or retell an interesting news story (real or invented) using reported speech.",
    tip: "Se escolher contar uma notícia, tente usar discurso indireto: 'She said that...' / 'He told me that...'.",
  },
  {
    id: 7,
    fromUnit: 13,
    toUnit: 14,
    title: "A Short Review",
    prompt: "Write a short article (60–100 words) about a film, show, or piece of music you like. What is it about, and why do you recommend it?",
    tip: "Use orações relativas pra dar mais detalhe: 'It's a film which/that...' ou 'It's about a person who...'.",
  },
  {
    id: 8,
    fromUnit: 15,
    toUnit: 16,
    title: "You're Invited",
    prompt: "Write an invitation (60–100 words) to an event you're organizing. Include what it is, when and where it happens, and anything guests need to know about cost or what to bring.",
    tip: "Pra falar de custo hipotético, experimente o Second Conditional: 'If everyone paid $10, we could...'.",
  },
];
