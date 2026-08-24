// Personal word lookup: combines the Free Dictionary API (English
// definitions/examples — the same source src/utils/audio.js already uses
// for pronunciation) with the MyMemory Translation API (free,
// CORS-enabled, no key needed) for the Portuguese meaning. Powers the
// "My Words" screen. Unlike everything else in the app, this hits the
// network live at study time — it doesn't touch the book's own curated
// card data at all, it's the user's own personal word bank.

async function fetchEnglishDefinition(word) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
  if (!res.ok) return null;
  const data = await res.json();
  const entry = data?.[0];
  if (!entry) return null;
  const meaning = entry.meanings?.[0];
  const def = meaning?.definitions?.[0];
  if (!def) return null;
  return {
    word: entry.word || word,
    partOfSpeech: meaning?.partOfSpeech || "",
    definition: def.definition || "",
    example: def.example || "",
    phonetic: entry.phonetic || entry.phonetics?.find((p) => p.text)?.text || "",
  };
}

async function translate(text, from, to) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    // MyMemory returns 200 with an English warning string in the body
    // when it can't translate (e.g. rate-limited) — treat that as "no result".
    if (!translated || /MYMEMORY WARNING/i.test(translated)) return null;
    return translated;
  } catch {
    return null;
  }
}

// Accepts a word/phrase in EITHER English or Portuguese and returns a
// combined result. Throws a friendly Error (safe to show directly in the
// UI) if nothing usable was found.
async function lookupWord(rawInput) {
  const input = (rawInput || "").trim();
  if (!input) throw new Error("Type a word first.");

  // Try it as English first — this covers the common case with just 1
  // network call instead of 2.
  let def = null;
  try {
    def = await fetchEnglishDefinition(input);
  } catch {
    def = null;
  }
  let englishTerm = input;

  if (!def) {
    // Wasn't found as English — assume it's Portuguese, translate it,
    // and look up the definition for the translated term instead.
    const asEnglish = await translate(input, "pt", "en");
    if (asEnglish) {
      try {
        def = await fetchEnglishDefinition(asEnglish);
      } catch {
        def = null;
      }
      if (def) englishTerm = asEnglish;
    }
  }

  if (!def) {
    throw new Error(`Couldn't find "${input}" — check the spelling, or try a simpler word or phrase.`);
  }

  const ptMeaning = await translate(englishTerm, "en", "pt");

  return {
    term: def.word || englishTerm,
    partOfSpeech: def.partOfSpeech,
    definition: def.definition,
    example: def.example,
    phonetic: def.phonetic,
    ptMeaning: ptMeaning || "",
  };
}
