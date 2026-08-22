# 📚 Flashcards English — Outcomes Pre-Intermediate

App de estudo de inglês (nível B1) feito sob medida para acompanhar o livro **Outcomes Pre-Intermediate**, com flashcards, quiz, frases pra praticar falando sobre si mesmo, e recomendação de músicas pra treinar o ouvido.

🔗 **Acesse:** https://alessandro-psilva.github.io/apsilva-flashcards-english/

## Funcionalidades

- **Estudar** — flashcards com virada de carta (frente/verso), separados por unidade e categoria (Vocabulário / Gramática), com botão de áudio para ouvir a pronúncia.
- **Quiz** — perguntas de múltipla escolha geradas a partir das cartas da unidade selecionada, com placar final.
- **Frases** — 10 frases por unidade para praticar falando sobre a própria vida, usando os mesmos termos das flashcards.
- **Música** — vídeos oficiais do YouTube com dicção clara, para praticar listening com legenda traduzida.
- **Progresso salvo** — marque "já sei" / "revisar depois" em cada carta; o progresso fica salvo automaticamente (localStorage no navegador quando hospedado fora do Claude).
- **Resumo** — visão geral do progresso por unidade, com opção de resetar tudo.

## Conteúdo

16 unidades, cobrindo vocabulário e gramática do livro (colocações e regras gramaticais reais do material, com frases de exemplo escritas originalmente para este app).

## Tecnologia

- React (via CDN, sem build/npm)
- Um único arquivo `flashcards-ingles.jsx`, carregado direto pelo `index.html` com Babel Standalone
- Hospedado gratuitamente no GitHub Pages

## Estrutura do projeto

```
apsilva-flashcards-english/
├── index.html            # carrega React e o app
├── flashcards-ingles.jsx # componente principal (todo o app)
└── README.md
```

## Como rodar localmente

Não precisa de instalação. Basta abrir o `index.html` num navegador, ou usar uma extensão tipo "Live Server" no VS Code para evitar bloqueios de CORS ao carregar o `.jsx`.

## Atualizando o app

Para atualizar depois de fazer mudanças no arquivo `flashcards-ingles.jsx`:

1. Vá em **Add file → Upload files** neste repositório
2. Suba o arquivo atualizado (substitui o antigo)
3. Commit — o GitHub Pages atualiza automaticamente em 1–2 minutos