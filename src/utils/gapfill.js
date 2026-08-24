// Exercícios de "completar lacunas" (gap-fill): pega a frase de exemplo
// (`ex`) que cada card já tem e esconde o termo-alvo (`front`), pedindo pra
// digitar a palavra que falta. Não precisa de nenhum dado novo — é só uma
// forma diferente de praticar os MESMOS cards que já existem no app.
//
// O desafio é achar, dentro da frase de exemplo, o trecho exato que
// corresponde ao `front` — nem sempre é uma cópia literal, porque a frase
// costuma flexionar o verbo/palavra pra soar natural (front: "get a
// refund" / ex: "I got a refund..."). A função abaixo tenta, em ordem:
//   1. o texto exato de `front` dentro de `ex`;
//   2. cada palavra "de conteúdo" de `front` (ignorando artigos/preposições
//      como "a", "for", "with"), testando variações comuns (-s, -es, -ed,
//      -ing) e uma pequena lista de verbos irregulares;
// Se nada bater, a função retorna null e esse card simplesmente não vira
// exercício de lacuna — melhor pular um card do que mostrar uma lacuna
// errada.
const GAPFILL_IRREGULAR_VERBS = {
  get: ["got"],
  take: ["took"],
  buy: ["bought"],
  go: ["went"],
  do: ["did"],
  have: ["had"],
  be: ["was", "were"],
  come: ["came"],
  see: ["saw"],
  write: ["wrote"],
  give: ["gave"],
  make: ["made"],
  find: ["found"],
  think: ["thought"],
  run: ["ran"],
  eat: ["ate"],
  pay: ["paid"],
  tell: ["told"],
  sell: ["sold"],
  leave: ["left"],
  meet: ["met"],
  feel: ["felt"],
  keep: ["kept"],
  spend: ["spent"],
  apply: ["applied"],
  break: ["broke"],
  win: ["won"],
  lend: ["lent"],
  send: ["sent"],
  build: ["built"],
  bring: ["brought"],
  catch: ["caught"],
  drive: ["drove"],
  fall: ["fell"],
  fly: ["flew"],
  hear: ["heard"],
  hold: ["held"],
  lose: ["lost"],
  put: ["put"],
  read: ["read"],
  say: ["said"],
  stand: ["stood"],
  teach: ["taught"],
  wear: ["wore"],
  become: ["became"],
  choose: ["chose"],
  cost: ["cost"],
  cut: ["cut"],
  deal: ["dealt"],
  forget: ["forgot"],
  understand: ["understood"],
};

const GAPFILL_STOPWORDS = new Set([
  "a", "an", "the", "to", "of", "in", "on", "at", "for", "with", "from",
  "and", "or", "is", "are", "be", "your", "my", "this", "that", "it",
  "its", "you", "i", "someone", "something", "up", "out", "off",
]);

function gapfillEscapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Retorna { start, end, text } com a posição exata do trecho encontrado
// dentro de `ex`, ou null se não achar nada razoável.
function findGapFillSpan(front, ex) {
  const exactIdx = ex.toLowerCase().indexOf(front.toLowerCase());
  if (exactIdx !== -1) {
    return { start: exactIdx, end: exactIdx + front.length, text: ex.slice(exactIdx, exactIdx + front.length) };
  }

  const words = front.split(/\s+/).filter((w) => w && !GAPFILL_STOPWORDS.has(w.toLowerCase()));
  for (const w of words) {
    const wl = w.toLowerCase().replace(/[^a-z']/g, "");
    if (!wl) continue;
    const variants = [
      wl,
      wl + "s",
      wl + "es",
      wl + "d",
      wl + "ed",
      wl.replace(/e$/, "") + "ing",
      wl + "ing",
      ...(GAPFILL_IRREGULAR_VERBS[wl] || []),
    ];
    for (const v of variants) {
      const m = ex.match(new RegExp("\\b" + gapfillEscapeRegExp(v) + "\\b", "i"));
      if (m) {
        return { start: m.index, end: m.index + m[0].length, text: m[0] };
      }
    }
  }
  return null;
}

// Monta a lista de exercícios de lacuna a partir de um conjunto de cards
// (normalmente o `deck` já filtrado por unidade/categoria que o app usa
// pras outras telas). Cards sem uma frase de exemplo utilizável, ou onde
// não foi possível localizar o trecho-alvo, ficam de fora.
function buildGapFillItems(cards) {
  const items = [];
  for (const card of cards) {
    if (!card.ex || !card.front) continue;
    const span = findGapFillSpan(card.front, card.ex);
    if (!span) continue;
    items.push({
      card,
      before: card.ex.slice(0, span.start),
      blank: span.text,
      after: card.ex.slice(span.end),
    });
  }
  return items;
}
