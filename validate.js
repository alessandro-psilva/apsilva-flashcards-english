// Consolidated validation harness for the whole app: loader integrity,
// every game/screen's data-derivation logic, and the ontology (grammar
// prereqs, vocabulary themes, word families). This is the ONE script
// meant to be committed to the repo and run in CI (see
// .github/workflows/validate.yml) — `npm install && node validate.js`.
//
// Uses real (0, eval)() semantics on purpose, not vm.runInContext: the
// production loader (index.html) concatenates every file and runs them
// through a single eval() so top-level const/let bindings are shared
// across files — vm.runInContext's separate global object can mask real
// loader bugs that only show up with genuine indirect eval() semantics.
const fs = require("fs");
const path = require("path");
const Babel = require("@babel/standalone");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const FILES = [
  "src/bootstrap.js",
  "src/data/categories.js",
  "src/data/themes.js",
  "src/firebaseConfig.js",
  "src/utils/cloud.js",
  "src/data/levels/pre-intermediate.js",
  "src/data/levels/index.js",
  "src/utils/helpers.js",
  "src/utils/audio.js",
  "src/utils/gapfill.js",
  "src/utils/lookup.js",
  "src/components/SpeakButton.jsx",
  "src/components/AccountSection.jsx",
  "src/components/HomeScreen.jsx",
  "src/components/MusicScreen.jsx",
  "src/components/PhraseScreen.jsx",
  "src/components/WritingScreen.jsx",
  "src/components/SummaryScreen.jsx",
  "src/components/QuizScreen.jsx",
  "src/components/GapFillScreen.jsx",
  "src/components/MemoryScreen.jsx",
  "src/components/SentenceBuilderScreen.jsx",
  "src/components/ListeningScreen.jsx",
  "src/components/WordScrambleScreen.jsx",
  "src/components/ThemeScreen.jsx",
  "src/components/MyWordsScreen.jsx",
  "src/components/LevelMenu.jsx",
  "src/app.jsx",
];

global.window = { storage: undefined, speechSynthesis: undefined };
global.localStorage = {
  _data: {},
  getItem(k) { return Object.prototype.hasOwnProperty.call(this._data, k) ? this._data[k] : null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; },
};
global.fetch = () => Promise.reject(new Error("no network in test"));
global.Audio = function Audio() { this.play = () => {}; };
global.React = React;

for (const file of FILES) {
  if (!fs.existsSync(path.join(__dirname, file))) {
    console.error("MISSING FILE listed in FILES:", file);
    process.exit(1);
  }
}

// index.html's FILES array must match this list exactly (order matters —
// e.g. QuizScreen.jsx must load before ListeningScreen.jsx, which calls
// its buildOptions()). Catches drift between the loader and this harness.
{
  const indexHtml = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  const match = indexHtml.match(/var FILES = \[([\s\S]*?)\];/);
  if (!match) {
    console.error("FAIL: couldn't find FILES array in index.html");
    process.exit(1);
  }
  const htmlFiles = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (JSON.stringify(htmlFiles) !== JSON.stringify(FILES)) {
    console.error("FAIL: index.html's FILES array doesn't match this harness's FILES list.");
    console.error("index.html:", htmlFiles);
    console.error("this file: ", FILES);
    process.exit(1);
  }
  console.log("OK  index.html FILES array matches (order + contents)");
}

let combined = "";
for (const file of FILES) {
  const code = fs.readFileSync(path.join(__dirname, file), "utf8");
  const compiled = Babel.transform(code, { filename: file, presets: [["react", { runtime: "classic" }]] }).code;
  combined += `\n// ---- ${file} ----\n` + compiled + "\n";
}

let ok = true;
try {
  (0, eval)(combined);
  console.log("Single eval() loaded without throwing.");
} catch (err) {
  console.error("FAIL: single eval() throws:");
  console.error(err);
  process.exit(1);
}

function check(label, fn) {
  try {
    const html = fn();
    console.log(`OK  ${label} (rendered ${html.length} chars)`);
    return html;
  } catch (err) {
    ok = false;
    console.error(`FAIL ${label}:`);
    console.error(err);
    return "";
  }
}

const level = getLevelData("pre-intermediate");
const allCards = level.cards;
const grammarCards = allCards.filter((c) => c.cat === "Grammar");
const vocabCards = allCards.filter((c) => c.cat === "Vocabulary");

// ---------------------------------------------------------------------
// Gap-Fill
// ---------------------------------------------------------------------
{
  const items = buildGapFillItems(vocabCards);
  const coverage = items.length / vocabCards.length;
  console.log(`Gap-fill coverage: ${items.length}/${vocabCards.length} (${Math.round(coverage * 100)}%)`);
  if (coverage < 0.9) {
    ok = false;
    console.error("FAIL: gap-fill coverage dropped below 90% of Vocabulary cards.");
  }
  const refundCard = allCards.find((c) => c.front === "get a refund");
  const refundItem = buildGapFillItems([refundCard])[0];
  if (!refundItem || refundItem.blank.toLowerCase() !== "got") {
    ok = false;
    console.error("FAIL: gap-fill did not correctly blank the irregular verb in 'get a refund' example.", refundItem);
  } else {
    console.log("OK  gap-fill correctly blanks irregular verbs (get → got)");
  }
}
check("GapFillScreen (Unit 1 deck)", () => {
  const unit1 = allCards.filter((c) => c.unit === 1);
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(GapFillScreen, { deck: unit1 }));
  if (!html.includes("GAP 1")) throw new Error("Expected a gap-fill question to render for Unit 1.");
  return html;
});

// ---------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------
{
  const w = level.writing;
  if (w.length !== 8) {
    ok = false;
    console.error(`FAIL: expected 8 writing blocks, got ${w.length}`);
  }
  for (let u = 1; u <= 16; u++) {
    const matches = w.filter((p) => u >= p.fromUnit && u <= p.toUnit);
    if (matches.length !== 1) {
      ok = false;
      console.error(`FAIL: unit ${u} matches ${matches.length} writing blocks (expected exactly 1).`);
    }
  }
  console.log("OK  writing blocks cover units 1–16 with no gaps/overlaps");
}

// ---------------------------------------------------------------------
// Memory Match
// ---------------------------------------------------------------------
{
  const deck = allCards.filter((c) => c.unit === 9);
  const tiles = buildMemoryTiles(deck);
  if (tiles.length !== 16) {
    ok = false;
    console.error(`FAIL: expected 16 memory tiles (8 pairs) for a large deck, got ${tiles.length}`);
  } else {
    console.log("OK  Memory Match caps at 8 pairs (16 tiles) for a large deck");
  }
}
check("MemoryScreen (Unit 9 deck)", () => {
  const deck = allCards.filter((c) => c.unit === 9);
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(MemoryScreen, { deck }));
  if (!html.includes("PAIRS 0")) throw new Error("Expected the pairs counter to render.");
  return html;
});

// ---------------------------------------------------------------------
// Sentence Builder
// ---------------------------------------------------------------------
{
  const items = buildSentenceItems(allCards);
  const coverage = items.length / allCards.length;
  console.log(`Sentence Builder coverage: ${items.length}/${allCards.length} (${Math.round(coverage * 100)}%)`);
  if (coverage < 0.85) {
    ok = false;
    console.error("FAIL: Sentence Builder coverage dropped below 85% of all cards.");
  } else {
    console.log("OK  Sentence Builder coverage is healthy");
  }
}

// ---------------------------------------------------------------------
// Listening
// ---------------------------------------------------------------------
check("ListeningScreen (Unit 1 deck, initial state)", () => {
  const deck = allCards.filter((c) => c.unit === 1);
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(ListeningScreen, { deck, allCards }));
  if (!html.includes("LISTEN AND CHOOSE THE MEANING")) throw new Error("Expected the listening prompt before any answer is picked.");
  if (html.includes(deck[0].front)) throw new Error("The English term shouldn't be visible before answering.");
  return html;
});

// ---------------------------------------------------------------------
// Word Scramble
// ---------------------------------------------------------------------
{
  let anyEmptyUnit = false;
  for (const u of level.units) {
    const deck = allCards.filter((c) => c.unit === u.id);
    if (buildScrambleItems(deck).length === 0) {
      anyEmptyUnit = true;
      console.error(`FAIL: Unit ${u.id} has zero Word Scramble terms.`);
    }
  }
  ok = ok && !anyEmptyUnit;
  if (!anyEmptyUnit) console.log("OK  every unit has at least 1 usable Word Scramble term");
}

// ---------------------------------------------------------------------
// Ontology: grammar prereqs
// ---------------------------------------------------------------------
{
  const grammarIds = new Set(grammarCards.map((c) => c.id));
  let allValid = true;
  for (const c of grammarCards) {
    if (!Array.isArray(c.prereq)) {
      allValid = false;
      console.error(`FAIL: Grammar card ${c.id} has no prereq array.`);
      continue;
    }
    for (const pid of c.prereq) {
      if (pid === c.id) {
        allValid = false;
        console.error(`FAIL: Grammar card ${c.id} lists itself as a prerequisite.`);
      } else if (!grammarIds.has(pid)) {
        allValid = false;
        console.error(`FAIL: Grammar card ${c.id} has a prereq ${pid} that isn't a real Grammar card id.`);
      }
    }
  }
  const visiting = new Set(), visited = new Set();
  const byId = Object.fromEntries(grammarCards.map((c) => [c.id, c]));
  function hasCycle(id) {
    if (visited.has(id)) return false;
    if (visiting.has(id)) return true;
    visiting.add(id);
    for (const pid of byId[id]?.prereq || []) {
      if (hasCycle(pid)) return true;
    }
    visiting.delete(id);
    visited.add(id);
    return false;
  }
  if (grammarCards.some((c) => hasCycle(c.id))) {
    allValid = false;
    console.error("FAIL: the grammar prereq graph has a cycle.");
  }
  ok = ok && allValid;
  if (allValid) console.log(`OK  all ${grammarCards.length} Grammar cards have a valid, acyclic prereq array`);
}

// ---------------------------------------------------------------------
// Ontology: vocabulary themes
// ---------------------------------------------------------------------
{
  const themesSrc = fs.readFileSync(path.join(__dirname, "src/data/themes.js"), "utf8");
  const registryKeys = new Set([...themesSrc.matchAll(/key:\s*"([^"]+)"/g)].map((m) => m[1]));
  let allValid = true;
  let untaggedCount = 0;
  for (const c of vocabCards) {
    if (!Array.isArray(c.themes) || c.themes.length === 0) {
      untaggedCount++;
      continue;
    }
    for (const key of c.themes) {
      if (!registryKeys.has(key)) {
        allValid = false;
        console.error(`FAIL: Vocabulary card ${c.id} uses theme "${key}", which isn't in the THEMES registry.`);
      }
    }
  }
  if (untaggedCount > 0) {
    allValid = false;
    console.error(`FAIL: ${untaggedCount} Vocabulary cards have no theme at all.`);
  }
  ok = ok && allValid;
  if (allValid) console.log(`OK  all ${vocabCards.length} Vocabulary cards have at least 1 valid theme`);
}

// ---------------------------------------------------------------------
// Ontology: word families + ThemeScreen
// ---------------------------------------------------------------------
{
  let allValid = true;
  let count = 0;
  for (const c of vocabCards) {
    if (!c.family) continue;
    count++;
    if (!Array.isArray(c.family) || c.family.some((f) => typeof f.form !== "string" || typeof f.word !== "string")) {
      allValid = false;
      console.error(`FAIL: Vocabulary card ${c.id} has a malformed family array.`, c.family);
    }
  }
  ok = ok && allValid;
  if (allValid) console.log(`OK  all ${count} word-family entries are well-formed`);
}
check("ThemeScreen (theme picker)", () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(ThemeScreen, { cards: allCards }));
  if (!html.includes("TERM")) throw new Error("Expected theme term counts to render.");
  return html;
});

// ---------------------------------------------------------------------
// My Words (word lookup)
// ---------------------------------------------------------------------
check("MyWordsScreen (initial state)", () => {
  // Static render only — the saved-words load happens in a useEffect,
  // which SSR never runs, so `loaded` stays false here (same as any
  // other screen's first paint before its effect fires). Just confirm
  // the search UI itself renders.
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(MyWordsScreen));
  if (!html.includes("Word to look up") && !html.includes("SEARCH")) throw new Error("Expected the search box to render.");
  return html;
});

// ---------------------------------------------------------------------
// Full app smoke test
// ---------------------------------------------------------------------
check("FlashcardCatalog (default = home view)", () =>
  ReactDOMServer.renderToStaticMarkup(React.createElement(FlashcardCatalog))
);

// Everything above this point is synchronous; this last check is async
// (fetch is mocked to always reject in this harness) so it needs its own
// await before we can safely process.exit() — confirms lookupWord()
// degrades to its friendly, UI-safe error message instead of throwing
// something unexpected (a raw network error, undefined access, etc.)
// all the way up to the caller.
(async () => {
  try {
    await lookupWord("anything");
    ok = false;
    console.error("FAIL: lookupWord() should reject when the network is unavailable, but resolved instead.");
  } catch (err) {
    if (typeof err.message !== "string" || !err.message.includes("Couldn't find")) {
      ok = false;
      console.error("FAIL: lookupWord()'s offline error message isn't the expected friendly one:", err.message);
    } else {
      console.log("OK  lookupWord() degrades gracefully when the network is unavailable");
    }
  }

  console.log(ok ? "\nALL CHECKS PASSED" : "\nSOME CHECKS FAILED");
  process.exit(ok ? 0 : 1);
})();
