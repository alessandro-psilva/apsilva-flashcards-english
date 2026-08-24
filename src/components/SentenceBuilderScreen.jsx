// Ordene a frase: pega a MESMA frase de exemplo (card.ex) que já aparece
// no verso do flashcard e no Quiz, embaralha as palavras, e o jogador
// toca na ordem certa pra reconstruir. Reforça estrutura/ordem gramatical,
// não só reconhecimento de vocabulário isolado. Nenhum dado novo precisa
// existir — só reaproveita o `ex` que cada card já tem.
const SENTENCE_MIN_WORDS = 4;
const SENTENCE_MAX_WORDS = 11;

function buildSentenceItems(deck) {
  const usable = deck.filter((c) => {
    const words = (c.ex || "").trim().split(/\s+/).filter(Boolean);
    return words.length >= SENTENCE_MIN_WORDS && words.length <= SENTENCE_MAX_WORDS;
  });
  return shuffle(usable).map((card) => {
    const words = card.ex.trim().split(/\s+/).filter(Boolean);
    return {
      card,
      words: words.map((w, i) => ({ id: `${card.id}-${i}`, text: w })),
    };
  });
}

function SentenceBuilderScreen({ deck }) {
  const [seed, setSeed] = useState(0);
  const items = useMemo(() => buildSentenceItems(deck), [deck, seed]);

  const [qIndex, setQIndex] = useState(0);
  const [bank, setBank] = useState([]); // shuffled word objects still available
  const [built, setBuilt] = useState([]); // word objects placed in order
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQIndex(0);
    setScore(0);
    setFinished(false);
  }, [items]);

  useEffect(() => {
    const item = items[qIndex];
    setBank(item ? shuffle(item.words) : []);
    setBuilt([]);
    setChecked(false);
    setCorrect(false);
  }, [items, qIndex]);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        No sentences of the right length here yet — try "All" categories or another unit.
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / items.length) * 100);
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
          SENTENCE BUILDER COMPLETE
        </div>
        <div style={{ fontSize: 36, color: "#006437", fontWeight: 700, marginBottom: 6 }}>{pct}%</div>
        <div className="plex" style={{ fontSize: 12, color: "#3F7A5C", marginBottom: 20 }}>
          {score} of {items.length} correct
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
          RETRY ⟲
        </button>
      </div>
    );
  }

  const item = items[qIndex];
  const isLast = qIndex + 1 >= items.length;

  function placeWord(word) {
    if (checked) return;
    setBuilt((b) => [...b, word]);
    setBank((b) => b.filter((w) => w.id !== word.id));
  }

  function removeWord(word) {
    if (checked) return;
    setBank((b) => [...b, word]);
    setBuilt((b) => b.filter((w) => w.id !== word.id));
  }

  function check() {
    if (checked || built.length !== item.words.length) return;
    const isRight = built.every((w, i) => w.text === item.words[i].text);
    setCorrect(isRight);
    setChecked(true);
    if (isRight) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setQIndex((i) => i + 1);
  }

  const allPlaced = built.length === item.words.length;

  return (
    <div>
      <div
        className="plex"
        style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}
      >
        <span>SENTENCE {qIndex + 1} / {items.length}</span>
        <span style={{ color: "#4ADE80" }}>CORRECT: {score}</span>
      </div>

      {/* Build area */}
      <div
        style={{
          ...notebookBg("#F4FBF6"),
          border: `1px solid ${checked ? (correct ? "#1F9D55" : "#C0504D") : "#BFE3CC"}`,
          borderRadius: 6,
          padding: "18px 20px",
          marginBottom: 14,
          minHeight: 88,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: 6,
        }}
      >
        {built.length === 0 && (
          <div className="plex" style={{ fontSize: 11, color: "#A9B8AF", fontStyle: "italic" }}>
            Tap the words below in the right order…
          </div>
        )}
        {built.map((w) => (
          <button
            key={w.id}
            onClick={() => removeWord(w)}
            disabled={checked}
            className="cardbtn"
            style={{
              padding: "8px 12px",
              fontSize: 14,
              borderRadius: 5,
              border: "1px solid #006437",
              background: "#006437",
              color: "#FFFFFF",
              cursor: checked ? "default" : "pointer",
            }}
          >
            {w.text}
          </button>
        ))}
      </div>

      {/* Word bank */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {bank.map((w) => (
          <button
            key={w.id}
            onClick={() => placeWord(w)}
            className="cardbtn"
            style={{
              padding: "8px 12px",
              fontSize: 14,
              borderRadius: 5,
              border: "1px solid #BFE3CC",
              background: "#FFFFFF",
              color: "#006437",
              cursor: "pointer",
            }}
          >
            {w.text}
          </button>
        ))}
      </div>

      {checked && (
        <div
          style={{
            ...notebookBg("#EAF6EF"),
            border: "1px solid #BFE3CC",
            borderRadius: 6,
            padding: "14px 16px",
            marginBottom: 14,
          }}
        >
          <div className="plex" style={{ fontSize: 11, color: correct ? "#1F9D55" : "#8C2F2C", letterSpacing: "0.06em", marginBottom: 6 }}>
            {correct ? "✓ CORRECT" : "✗ NOT QUITE — CORRECT ORDER:"}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
            <div style={{ fontSize: 14, color: "#1F4A34", fontStyle: "italic", flex: 1 }}>
              "{item.card.ex}"
            </div>
            <SpeakButton text={item.card.ex} size={14} />
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        {!checked && built.length > 0 && (
          <button
            onClick={() => {
              setBank((b) => shuffle([...b, ...built]));
              setBuilt([]);
            }}
            className="cardbtn plex"
            style={{
              flex: "0 0 auto",
              padding: "12px 16px",
              background: "transparent",
              border: "1px solid #2E7D52",
              color: "#CFEFDC",
              borderRadius: 4,
              fontSize: 12,
              letterSpacing: "0.05em",
              cursor: "pointer",
            }}
            title="Clear and start this sentence over"
          >
            ⟲ CLEAR
          </button>
        )}
        <button
          onClick={checked ? next : check}
          disabled={!checked && !allPlaced}
          className="cardbtn plex"
          style={{
            flex: 1,
            padding: "12px 0",
            background: checked || allPlaced ? "#006437" : "transparent",
            border: `1px solid ${checked || allPlaced ? "#006437" : "#2E7D52"}`,
            color: checked || allPlaced ? "#FFFFFF" : "#5C7A6A",
            borderRadius: 4,
            fontSize: 12,
            letterSpacing: "0.06em",
            cursor: checked || allPlaced ? "pointer" : "default",
          }}
        >
          {checked ? (isLast ? "SEE RESULT" : "NEXT →") : "CHECK"}
        </button>
      </div>
    </div>
  );
}
