# 📚 Flashcards English

App de estudo de inglês com flashcards, quiz, frases pra praticar falando sobre si mesmo, e recomendação de músicas pra treinar o ouvido — organizado por nível (Beginner ao Advanced). Hoje só o nível **Pre-Intermediate** tem conteúdo — os outros aparecem no menu como "em breve", prontos pra receber material.

🔗 **Acesse:** https://alessandro-psilva.github.io/apsilva-flashcards-english/

## Funcionalidades

- **Menu de níveis** — botão ☰ no canto abre um menu lateral com todos os níveis (Beginner, Elementary, Pre-Intermediate, Intermediate, Upper Intermediate, Advanced); só os níveis com conteúdo ficam clicáveis.
- **Estudar** — flashcards com virada de carta (frente/verso), separadas por unidade e categoria (Vocabulário / Gramática), com botão de áudio para ouvir a pronúncia.
- **Quiz** — perguntas de múltipla escolha geradas a partir das cartas da unidade selecionada, com placar final.
- **Gap-Fill (completar lacunas)** — a frase de exemplo de cada carta aparece com a palavra-alvo escondida; digite o que falta. Gerado automaticamente a partir das próprias cartas (não precisa de conteúdo extra por nível).
- **Jogo da memória** — vire duas cartas por vez tentando casar o termo em inglês com a tradução. Até 8 pares por rodada, gerados na hora a partir do deck selecionado.
- **Ordene a frase** — reconstrua a frase de exemplo de cada carta, embaralhada, tocando as palavras na ordem certa. Foca em estrutura/ordem gramatical.
- **Contra o relógio (listening)** — ouça a pronúncia do termo e escolha o significado certo entre 4 opções antes o tempo acabar (8s por rodada). Único exercício focado em compreensão auditiva.
- **Palavra embaralhada** — as letras de um termo (de uma palavra só) aparecem embaralhadas, com a tradução como dica; monte a palavra tocando as letras na ordem certa.
- **Temas** — navegue o vocabulário por assunto (dinheiro, viagem, trabalho...) em vez de por unidade — cruza várias unidades de uma vez. Acessível pelo menu lateral, junto com Música.
- **Pré-requisitos de gramática** — no verso de cada carta de Gramática, se aquele ponto depende de outro que vem antes (ex: Present Perfect depende de Past Simple), aparece um aviso com atalho pra pular direto pra unidade do pré-requisito.
- **Família de palavras** — algumas cartas de Vocabulário mostram, no verso, formas relacionadas da mesma palavra (ex: "protect" → protection, protective), quando isso ajuda a fixar o termo.
- **My Words** — pesquise qualquer palavra (em inglês ou português) e veja definição, exemplo e tradução na hora, puxando de duas APIs gratuitas (Free Dictionary API + MyMemory Translation API). Salve as que quiser — ficam num banco de palavras pessoal, separado do conteúdo do livro — e baixe tudo em JSON ou CSV pra usar fora do app. Acessível pelo menu lateral.
- **Frases** — frases por unidade para praticar falando sobre a própria vida, usando os mesmos termos das flashcards.
- **Redação (Writing)** — um tema de redação original por bloco de duas unidades, com dica de vocabulário/gramática; o texto digitado fica salvo automaticamente (localStorage, ou na nuvem se estiver logado).
- **Música** — vídeos oficiais do YouTube com dicção clara, pra praticar listening com legenda traduzida. O atalho fica no menu principal/lateral (não numa aba de estudo), mas a lista de músicas é específica do nível selecionado — cada nível cura suas próprias recomendações.
- **Progresso salvo** — marque "já sei" / "revisar depois" em cada carta; o progresso fica salvo automaticamente por nível, então trocar de nível não mistura o progresso de um com o outro. Por padrão fica só no navegador local (localStorage); com login habilitado (veja "Sincronizar entre aparelhos" abaixo), sincroniza na nuvem.
- **Login com Google (opcional)** — cada pessoa loga com a própria conta Google, pelo menu lateral, e o progresso passa a sincronizar entre todos os aparelhos dela automaticamente. É multiusuário de verdade: cada conta só vê o próprio progresso. Precisa de configuração (veja abaixo); sem configurar, o app funciona normalmente do jeito de sempre.
- **Resumo** — visão geral do progresso por unidade do nível atual, com opção de resetar tudo.

## Conteúdo (Pre-Intermediate)

16 unidades, cobrindo vocabulário e gramática do livro (colocações e regras gramaticais reais do material, com frases de exemplo escritas originalmente para este app). Ao todo: 409 cartas de Vocabulário (~25 por unidade) e 47 cartas de Gramática — a lista de termos foi ampliada a partir do índice de palavras do Vocabulary Builder do livro (usado só como checklist; toda tradução, exemplo e explicação foi escrita do zero para o app, sem copiar texto do livro).

## Tecnologia

- React (via CDN, sem build/npm)
- Vários arquivos `.js`/`.jsx`, carregados em sequência pelo `index.html` e compilados no navegador com Babel Standalone — sem passo de build, então continua publicando direto no GitHub Pages a partir da própria branch
- Hospedado gratuitamente no GitHub Pages
- A tela **My Words** é a única parte do app que depende de rede em tempo real (além do áudio/login) — usa duas APIs públicas gratuitas: [Free Dictionary API](https://dictionaryapi.dev/) (definição em inglês) e [MyMemory Translation API](https://mymemory.translated.net/) (tradução PT↔EN, sem necessidade de chave/cadastro). Se alguma das duas estiver fora do ar, a busca falha com uma mensagem amigável — o resto do app não é afetado.

## Estrutura do projeto

```
apsilva-flashcards-english/
├── index.html                        # carrega React, Babel e os arquivos abaixo, em ordem
├── docs/                             # PDFs dos livros-base (ignorados pelo git, não vão pro GitHub)
├── src/
│   ├── bootstrap.js                  # destructuring dos hooks do React (useState, useMemo, useEffect)
│   ├── app.jsx                       # componente principal: cabeçalho, menu de níveis, roteamento de telas
│   ├── firebaseConfig.js             # chaves do Firebase p/ login+sync na nuvem (opcional, veja abaixo)
│   ├── data/
│   │   ├── categories.js             # categorias de carta (Vocabulary/Grammar), compartilhadas entre níveis
│   │   ├── themes.js                 # registro dos temas de vocabulário (dinheiro, viagem...), compartilhado entre níveis
│   │   └── levels/
│   │       ├── index.js              # registro central: lista de níveis + qual está disponível
│   │       └── pre-intermediate.js   # unidades, cartas, frases e músicas do nível Pre-Intermediate
│   ├── utils/
│   │   ├── helpers.js                # shuffle, textura de "papel pautado"
│   │   ├── audio.js                  # pronúncia (áudio real via API + voz sintética como fallback)
│   │   ├── gapfill.js                # acha, dentro da frase de exemplo, o trecho que vira lacuna
│   │   ├── lookup.js                 # busca definição + tradução pra My Words (Free Dictionary API + MyMemory)
│   │   └── cloud.js                  # login com Google + sincronização de progresso (Firebase, opcional)
│   └── components/
│       ├── SpeakButton.jsx
│       ├── AccountSection.jsx        # login/logout com Google, dentro do menu lateral
│       ├── LevelMenu.jsx             # menu lateral (níveis + música + conta)
│       ├── SummaryScreen.jsx
│       ├── PhraseScreen.jsx
│       ├── WritingScreen.jsx         # tela de redação (tema + textarea com autosave)
│       ├── MusicScreen.jsx
│       ├── QuizScreen.jsx
│       ├── GapFillScreen.jsx         # tela de completar lacunas
│       ├── MemoryScreen.jsx          # jogo da memória
│       ├── SentenceBuilderScreen.jsx # ordene a frase
│       ├── ListeningScreen.jsx       # contra o relógio (listening)
│       ├── WordScrambleScreen.jsx    # palavra embaralhada
│       ├── ThemeScreen.jsx           # navegar vocabulário por tema, cruzando unidades
│       └── MyWordsScreen.jsx         # busca + banco pessoal de palavras (My Words)
└── README.md
```

## Como adicionar um nível novo

1. Crie `src/data/levels/<nivel>.js` com o mesmo formato de `pre-intermediate.js` (arrays `UNITS`/`CARDS`/`MUSIC`/`WRITING` e objeto `PHRASES`), usando um prefixo próprio pros nomes — ex. `INTERMEDIATE_UNITS`, `INTERMEDIATE_CARDS`, `INTERMEDIATE_PHRASES`, `INTERMEDIATE_MUSIC`, `INTERMEDIATE_WRITING`. `MUSIC` e `WRITING` podem começar como array vazio (`[]`) se ainda não tiver conteúdo pra esse nível — as telas de Música e Redação mostram uma mensagem de "ainda não tem" nesse caso. Gap-Fill, Jogo da memória, Ordene a frase e Palavra embaralhada não precisam de nada novo — funcionam automaticamente a partir das cartas de qualquer nível (Contra o relógio também, usando o mesmo áudio já usado no resto do app). Já `themes` (nas cartas de Vocabulary) e `prereq`/`family` (nas cartas de Grammar/Vocabulary) são opcionais — sem eles, a carta funciona normalmente, só não aparece na tela de Temas nem mostra os avisos extras no verso.
2. Liste esse arquivo em `FILES`, dentro de `index.html`, logo antes de `src/data/levels/index.js`.
3. Em `src/data/levels/index.js`, registre o nível no objeto `LEVEL_DATA`.
4. Ainda em `src/data/levels/index.js`, marque `available: true` na entrada correspondente da lista `LEVELS`.
5. (Opcional) Coloque o PDF do livro em `docs/` — já fica fora do git automaticamente (veja `.gitignore`).

O nível aparece no menu lateral assim que `available` vira `true`.

## Sincronizar progresso entre aparelhos (login com Google)

Por padrão o progresso fica só no navegador (localStorage). Pra sincronizar entre celular/notebook/etc., cada pessoa pode logar com a própria conta Google — mas isso precisa de um projeto Firebase (gratuito) configurado uma vez:

1. Siga o passo a passo completo nos comentários de `src/firebaseConfig.js` (criar o projeto, ativar login Google, criar o Firestore, colar as regras de segurança, pegar as chaves, autorizar o domínio do GitHub Pages).
2. Cole as chaves no lugar dos `REPLACE_WITH_...` em `src/firebaseConfig.js`.
3. Suba o arquivo (`git push`).

Enquanto `src/firebaseConfig.js` estiver com os valores de exemplo, a seção de conta nem aparece no menu — o app roda exatamente como sempre rodou, com localStorage. Depois de configurado, é multiusuário: cada pessoa loga com a própria conta e só vê o próprio progresso (as regras do Firestore garantem isso). Se alguém já tinha progresso salvo localmente antes de logar pela primeira vez, ele é copiado pra nuvem automaticamente no primeiro login, sem perder nada.

## Como rodar localmente

Não precisa de instalação. Use uma extensão tipo "Live Server" no VS Code (ou qualquer servidor estático local) para abrir o `index.html` — os vários arquivos em `src/` são carregados via `fetch`, que a maioria dos navegadores bloqueia por CORS se você só abrir o arquivo direto do disco (`file://`).

## Atualizando o app

Suba os arquivos alterados (via `git push` ou pelo **Add file → Upload files** no GitHub) e dê commit — o GitHub Pages atualiza automaticamente em 1–2 minutos.
