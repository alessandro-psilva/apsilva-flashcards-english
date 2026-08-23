# 📚 Flashcards English

App de estudo de inglês com flashcards, quiz, frases pra praticar falando sobre si mesmo, e recomendação de músicas pra treinar o ouvido — organizado por nível (Beginner ao Advanced). Hoje só o nível **Pre-Intermediate** tem conteúdo — os outros aparecem no menu como "em breve", prontos pra receber material.

🔗 **Acesse:** https://alessandro-psilva.github.io/apsilva-flashcards-english/

## Funcionalidades

- **Menu de níveis** — botão ☰ no canto abre um menu lateral com todos os níveis (Beginner, Elementary, Pre-Intermediate, Intermediate, Upper Intermediate, Advanced); só os níveis com conteúdo ficam clicáveis.
- **Estudar** — flashcards com virada de carta (frente/verso), separadas por unidade e categoria (Vocabulário / Gramática), com botão de áudio para ouvir a pronúncia.
- **Quiz** — perguntas de múltipla escolha geradas a partir das cartas da unidade selecionada, com placar final.
- **Frases** — frases por unidade para praticar falando sobre a própria vida, usando os mesmos termos das flashcards.
- **Música** — vídeos oficiais do YouTube com dicção clara, pra praticar listening com legenda traduzida. O atalho fica no menu principal/lateral (não numa aba de estudo), mas a lista de músicas é específica do nível selecionado — cada nível cura suas próprias recomendações.
- **Progresso salvo** — marque "já sei" / "revisar depois" em cada carta; o progresso fica salvo automaticamente por nível, então trocar de nível não mistura o progresso de um com o outro. Por padrão fica só no navegador local (localStorage); com login habilitado (veja "Sincronizar entre aparelhos" abaixo), sincroniza na nuvem.
- **Login com Google (opcional)** — cada pessoa loga com a própria conta Google, pelo menu lateral, e o progresso passa a sincronizar entre todos os aparelhos dela automaticamente. É multiusuário de verdade: cada conta só vê o próprio progresso. Precisa de configuração (veja abaixo); sem configurar, o app funciona normalmente do jeito de sempre.
- **Resumo** — visão geral do progresso por unidade do nível atual, com opção de resetar tudo.

## Conteúdo (Pre-Intermediate)

16 unidades, cobrindo vocabulário e gramática do livro (colocações e regras gramaticais reais do material, com frases de exemplo escritas originalmente para este app).

## Tecnologia

- React (via CDN, sem build/npm)
- Vários arquivos `.js`/`.jsx`, carregados em sequência pelo `index.html` e compilados no navegador com Babel Standalone — sem passo de build, então continua publicando direto no GitHub Pages a partir da própria branch
- Hospedado gratuitamente no GitHub Pages

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
│   │   └── levels/
│   │       ├── index.js              # registro central: lista de níveis + qual está disponível
│   │       └── pre-intermediate.js   # unidades, cartas, frases e músicas do nível Pre-Intermediate
│   ├── utils/
│   │   ├── helpers.js                # shuffle, textura de "papel pautado"
│   │   ├── audio.js                  # pronúncia (áudio real via API + voz sintética como fallback)
│   │   └── cloud.js                  # login com Google + sincronização de progresso (Firebase, opcional)
│   └── components/
│       ├── SpeakButton.jsx
│       ├── AccountSection.jsx        # login/logout com Google, dentro do menu lateral
│       ├── LevelMenu.jsx             # menu lateral (níveis + música + conta)
│       ├── SummaryScreen.jsx
│       ├── PhraseScreen.jsx
│       ├── MusicScreen.jsx
│       └── QuizScreen.jsx
└── README.md
```

## Como adicionar um nível novo

1. Crie `src/data/levels/<nivel>.js` com o mesmo formato de `pre-intermediate.js` (arrays `UNITS`/`CARDS`/`MUSIC` e objeto `PHRASES`), usando um prefixo próprio pros nomes — ex. `INTERMEDIATE_UNITS`, `INTERMEDIATE_CARDS`, `INTERMEDIATE_PHRASES`, `INTERMEDIATE_MUSIC`. `MUSIC` pode começar como um array vazio (`[]`) se ainda não tiver curadoria de músicas pra esse nível — a tela de Música mostra uma mensagem de "sem músicas ainda" nesse caso.
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
