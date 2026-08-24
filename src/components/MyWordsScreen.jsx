// "My Words" — a personal word bank, separate from the book's own
// curated cards. Type a word or phrase in EITHER English or Portuguese,
// look it up live (src/utils/lookup.js — Free Dictionary API + MyMemory
// Translation API), save the ones you want, and download the list to use
// outside the app. Storage is a single global key (not per-level, unlike
// study progress) — your personal word list follows you across levels,
// since it's not really "book content".
const MYWORDS_KEY = "flashcard-mywords";

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function MyWordsScreen() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let raw;
        if (window.storage?.get) {
          raw = (await window.storage.get(MYWORDS_KEY, false))?.value ?? null;
        } else {
          raw = localStorage.getItem(MYWORDS_KEY);
        }
        if (!cancelled) setSaved(raw ? JSON.parse(raw) : []);
      } catch {
        if (!cancelled) setSaved([]);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function persist(list) {
    setSaved(list);
    const payload = JSON.stringify(list);
    if (window.storage?.set) {
      window.storage.set(MYWORDS_KEY, payload, false).catch(() => {});
    } else {
      try {
        localStorage.setItem(MYWORDS_KEY, payload);
      } catch {
        // storage indisponível — só não persiste
      }
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim() || searching) return;
    setSearching(true);
    setError("");
    setResult(null);
    try {
      const found = await lookupWord(query);
      setResult(found);
    } catch (err) {
      setError(err.message || "Something went wrong — try again.");
    } finally {
      setSearching(false);
    }
  }

  function handleSave() {
    if (!result) return;
    const already = saved.some((w) => w.term.toLowerCase() === result.term.toLowerCase());
    if (already) {
      setResult(null);
      setQuery("");
      return;
    }
    const entry = { id: `${Date.now()}-${result.term}`, ...result };
    persist([entry, ...saved]);
    setResult(null);
    setQuery("");
  }

  function handleRemove(id) {
    persist(saved.filter((w) => w.id !== id));
  }

  function handleDownloadJSON() {
    downloadFile("my-words.json", JSON.stringify(saved, null, 2), "application/json");
  }

  function handleDownloadCSV() {
    const header = ["term", "partOfSpeech", "definition", "example", "ptMeaning"];
    const rows = saved.map((w) => header.map((k) => csvEscape(w[k])).join(","));
    downloadFile("my-words.csv", [header.join(","), ...rows].join("\n"), "text/csv");
  }

  const alreadySaved = result && saved.some((w) => w.term.toLowerCase() === result.term.toLowerCase());

  return (
    <div>
      <div className="plex" style={{ fontSize: 11, color: "#BFEAD2", marginBottom: 14, padding: "0 4px", lineHeight: 1.6 }}>
        Look up any word — in English or Portuguese — and save the ones you want to study later.
      </div>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a word, in English or Portuguese…"
          aria-label="Word to look up"
          className="plex"
          style={{
            flex: 1,
            padding: "12px 14px",
            fontSize: 14,
            borderRadius: 5,
            border: "1px solid #BFE3CC",
            background: "#FFFFFF",
            color: "#1F4A34",
          }}
        />
        <button
          type="submit"
          disabled={searching || !query.trim()}
          className="cardbtn plex"
          style={{
            flex: "0 0 auto",
            padding: "0 18px",
            background: searching || !query.trim() ? "transparent" : "#006437",
            border: `1px solid ${searching || !query.trim() ? "#2E7D52" : "#006437"}`,
            color: searching || !query.trim() ? "#5C7A6A" : "#FFFFFF",
            borderRadius: 5,
            fontSize: 12,
            letterSpacing: "0.05em",
            cursor: searching || !query.trim() ? "default" : "pointer",
          }}
        >
          {searching ? "…" : "SEARCH"}
        </button>
      </form>

      {error && (
        <div
          className="plex"
          style={{
            border: "1px solid #C0504D",
            background: "#FBEAEA",
            color: "#8C2F2C",
            borderRadius: 6,
            padding: "12px 14px",
            fontSize: 12,
            marginBottom: 14,
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div
          style={{
            ...notebookBg("#F4FBF6"),
            border: "1px solid #BFE3CC",
            borderRadius: 6,
            padding: "18px 20px",
            marginBottom: 14,
            boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ fontSize: 20, color: "#006437", fontWeight: 700 }}>{result.term}</div>
            <SpeakButton text={result.term} size={18} />
            {result.phonetic && (
              <span className="plex" style={{ fontSize: 12, color: "#6FA98A" }}>{result.phonetic}</span>
            )}
          </div>
          {result.partOfSpeech && (
            <div className="plex" style={{ fontSize: 10, color: "#3F7A5C", letterSpacing: "0.06em", marginBottom: 8 }}>
              {result.partOfSpeech.toUpperCase()}
            </div>
          )}
          <div style={{ fontSize: 14, color: "#1F4A34", marginBottom: 8, lineHeight: 1.5 }}>{result.definition}</div>
          {result.example && (
            <div style={{ fontSize: 13, color: "#3F7A5C", fontStyle: "italic", marginBottom: 8 }}>"{result.example}"</div>
          )}
          {result.ptMeaning && (
            <div style={{ fontSize: 15, color: "#8A6D14", fontWeight: 700, marginBottom: 12 }}>{result.ptMeaning}</div>
          )}
          <button
            onClick={handleSave}
            className="cardbtn plex"
            style={{
              padding: "10px 18px",
              background: alreadySaved ? "transparent" : "#006437",
              border: `1px solid ${alreadySaved ? "#2E7D52" : "#006437"}`,
              color: alreadySaved ? "#CFEFDC" : "#FFFFFF",
              borderRadius: 4,
              fontSize: 12,
              letterSpacing: "0.05em",
              cursor: "pointer",
            }}
          >
            {alreadySaved ? "ALREADY SAVED ✓" : "SAVE THIS WORD"}
          </button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div className="plex" style={{ fontSize: 11, color: "#BFEAD2", letterSpacing: "0.05em" }}>
          MY WORDS · {saved.length}
        </div>
        {saved.length > 0 && (
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={handleDownloadJSON} className="plex" style={downloadBtnStyle}>
              ⬇ JSON
            </button>
            <button onClick={handleDownloadCSV} className="plex" style={downloadBtnStyle}>
              ⬇ CSV
            </button>
          </div>
        )}
      </div>

      {loaded && saved.length === 0 && (
        <div style={{ textAlign: "center", padding: 30, color: "#BFEAD2", fontStyle: "italic" }}>
          No words saved yet — search above to add your first one.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {saved.map((w) => (
          <div
            key={w.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 10,
              background: "#F4FBF6",
              border: "1px solid #BFE3CC",
              borderRadius: 6,
              padding: "12px 14px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 15, color: "#006437", fontWeight: 700 }}>{w.term}</span>
                <SpeakButton text={w.term} size={14} />
              </div>
              <div style={{ fontSize: 12.5, color: "#8A6D14", fontWeight: 700, marginBottom: 3 }}>{w.ptMeaning}</div>
              <div style={{ fontSize: 11.5, color: "#3F7A5C" }}>{w.definition}</div>
            </div>
            <button
              onClick={() => handleRemove(w.id)}
              aria-label={`Remove ${w.term}`}
              title="Remove"
              style={{
                flexShrink: 0,
                border: "none",
                background: "transparent",
                color: "#A9B8AF",
                fontSize: 16,
                cursor: "pointer",
                padding: 2,
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const downloadBtnStyle = {
  padding: "5px 10px",
  fontSize: 10,
  letterSpacing: "0.03em",
  borderRadius: 3,
  border: "1px solid #2E7D52",
  background: "transparent",
  color: "#CFEFDC",
  cursor: "pointer",
};
