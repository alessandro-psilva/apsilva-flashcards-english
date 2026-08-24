// Exercício de "completar lacunas": mostra a frase de exemplo de um card
// com a parte-alvo escondida e pede pra digitar o que falta. Os exercícios
// são gerados na hora a partir dos MESMOS cards do Study/Quiz (veja
// src/utils/gapfill.js) — nenhum dado novo precisa existir pra essa tela
// funcionar em qualquer unidade/nível.
function GapFillScreen({ deck }) {
  const [seed, setSeed] = useState(0);
  const items = useMemo(() => shuffle(buildGapFillItems(deck)), [deck, seed]);

  const [qIndex, setQIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQIndex(0);
    setInputValue("");
    setChecked(false);
    setCorrect(false);
    setScore(0);
    setFinished(false);
  }, [items]);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        No gap-fill exercises for this selection yet — try "All" categories or another unit.
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
          GAP-FILL COMPLETE
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
  const blankWidth = Math.max(item.blank.length, 4) + "ch";

  function check() {
    if (checked || !inputValue.trim()) return;
    const isRight = inputValue.trim().toLowerCase() === item.blank.toLowerCase();
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
    setInputValue("");
    setChecked(false);
    setCorrect(false);
  }

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (checked) next();
    else check();
  }

  return (
    <div>
      <div
        className="plex"
        style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}
      >
        <span>GAP {qIndex + 1} / {items.length}</span>
        <span style={{ color: "#4ADE80" }}>CORRECT: {score}</span>
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
        <div className="plex" style={{ fontSize: 10, color: "#3F7A5C", letterSpacing: "0.08em", marginBottom: 12 }}>
          {item.card.cat.toUpperCase()} · COMPLETE THE SENTENCE
        </div>
        <div style={{ fontSize: 17, color: "#1F4A34", lineHeight: 1.8, textAlign: "center" }}>
          {item.before}
          <span
            className="plex"
            style={{
              display: "inline-block",
              minWidth: blankWidth,
              borderBottom: `2px solid ${checked ? (correct ? "#1F9D55" : "#C0504D") : "#C0504D"}`,
              color: checked ? (correct ? "#0B3D24" : "#8C2F2C") : "#006437",
              fontWeight: 700,
              textAlign: "center",
              padding: "0 4px",
            }}
          >
            {checked ? item.blank : " "}
          </span>
          {item.after}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={checked}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder="Type the missing word…"
          aria-label="Type the missing word"
          className="plex"
          style={{
            flex: 1,
            padding: "12px 14px",
            fontSize: 14,
            borderRadius: 5,
            border: `1px solid ${checked ? (correct ? "#1F9D55" : "#C0504D") : "#BFE3CC"}`,
            background: checked ? (correct ? "#DDF3E4" : "#FBEAEA") : "#FFFFFF",
            color: "#1F4A34",
          }}
        />
        {!checked && (
          <SpeakButton text={item.before + item.blank + item.after} size={18} />
        )}
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
            {correct ? "✓ CORRECT" : `✗ CORRECT ANSWER: "${item.blank}"`}
          </div>
          <div style={{ fontSize: 15, color: "#006437", fontWeight: 700, marginBottom: 6 }}>{item.card.back}</div>
          <div className="plex" style={{ fontSize: 11.5, color: "#3F7A5C", lineHeight: 1.5 }}>
            ✎ {item.card.note}
          </div>
        </div>
      )}

      <button
        onClick={checked ? next : check}
        disabled={!checked && !inputValue.trim()}
        className="cardbtn plex"
        style={{
          width: "100%",
          padding: "12px 0",
          background: checked || inputValue.trim() ? "#006437" : "transparent",
          border: `1px solid ${checked || inputValue.trim() ? "#006437" : "#2E7D52"}`,
          color: checked || inputValue.trim() ? "#FFFFFF" : "#5C7A6A",
          borderRadius: 4,
          fontSize: 12,
          letterSpacing: "0.06em",
          cursor: checked || inputValue.trim() ? "pointer" : "default",
        }}
      >
        {checked ? (isLast ? "SEE RESULT" : "NEXT →") : "CHECK"}
      </button>
    </div>
  );
}
