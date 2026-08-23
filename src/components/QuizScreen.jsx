function buildOptions(card, pool) {
  const notSame = (c) => c.id !== card.id && c.back !== card.back;
  // Prefer distractors from the same unit and category — that's what actually
  // tests whether you know THIS term, not just whether you recognize it's
  // out of place next to unrelated units/topics.
  const sameUnitCat = pool.filter((c) => c.unit === card.unit && c.cat === card.cat && notSame(c));
  const sameCat = pool.filter((c) => c.cat === card.cat && notSame(c));
  const anyCard = pool.filter(notSame);

  const distractors = [];
  const used = new Set();
  for (const tier of [sameUnitCat, sameCat, anyCard]) {
    if (distractors.length >= 3) break;
    for (const c of shuffle(tier)) {
      if (distractors.length >= 3) break;
      if (used.has(c.back)) continue;
      used.add(c.back);
      distractors.push(c.back);
    }
  }
  return shuffle([card.back, ...distractors]);
}

function QuizScreen({ deck, allCards }) {
  const [seed, setSeed] = useState(0);

  const quizItems = useMemo(() => {
    return shuffle(deck).map((card) => ({ card, options: buildOptions(card, allCards) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, allCards, seed]);

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, [quizItems]);

  if (quizItems.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        No cards in this category.
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / quizItems.length) * 100);
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
          QUIZ COMPLETE
        </div>
        <div style={{ fontSize: 36, color: "#006437", fontWeight: 700, marginBottom: 6 }}>{pct}%</div>
        <div className="plex" style={{ fontSize: 12, color: "#3F7A5C", marginBottom: 20 }}>
          {score} of {quizItems.length} correct
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
          RETRY QUIZ ⟲
        </button>
      </div>
    );
  }

  const item = quizItems[qIndex];
  const isLast = qIndex + 1 >= quizItems.length;

  function choose(opt) {
    if (selected) return;
    setSelected(opt);
    if (opt === item.card.back) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
    }
  }

  return (
    <div>
      <div
        className="plex"
        style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}
      >
        <span>QUESTION {qIndex + 1} / {quizItems.length}</span>
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
        <div
          className="plex"
          style={{
            fontSize: 10,
            color: "#3F7A5C",
            letterSpacing: "0.08em",
            marginBottom: 10,
          }}
        >
          {item.card.cat.toUpperCase()}
        </div>
        <div style={{ fontSize: 20, color: "#006437", fontWeight: 700, lineHeight: 1.4, textAlign: "center" }}>
          {item.card.front}
        </div>
        {item.card.cat === "Vocabulary" && (
          <div style={{ textAlign: "center", marginTop: 6 }}>
            <SpeakButton text={item.card.front} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {item.options.map((opt, i) => {
          const isCorrectOpt = opt === item.card.back;
          const isChosen = opt === selected;
          let bg = "#FFFFFF";
          let border = "#BFE3CC";
          let color = "#006437";
          if (selected) {
            if (isCorrectOpt) {
              bg = "#DDF3E4";
              border = "#1F9D55";
              color = "#0B3D24";
            } else if (isChosen) {
              bg = "#FBEAEA";
              border = "#C0504D";
              color = "#8C2F2C";
            } else {
              color = "#A9B8AF";
            }
          }
          return (
            <button
              key={i}
              onClick={() => choose(opt)}
              disabled={!!selected}
              className="cardbtn"
              style={{
                textAlign: "left",
                padding: "12px 16px",
                background: bg,
                border: `1px solid ${border}`,
                color,
                borderRadius: 5,
                fontSize: 14,
                cursor: selected ? "default" : "pointer",
              }}
            >
              {opt}
              {selected && isCorrectOpt ? " ✓" : selected && isChosen ? " ✗" : ""}
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          style={{
            ...notebookBg("#EAF6EF"),
            border: "1px solid #BFE3CC",
            borderRadius: 6,
            padding: "14px 16px",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: "#1F4A34", fontStyle: "italic", flex: 1 }}>
              "{item.card.ex}"
            </div>
            <SpeakButton text={item.card.ex} size={14} />
          </div>
          <div className="plex" style={{ fontSize: 11.5, color: "#3F7A5C", lineHeight: 1.5 }}>
            ✎ {item.card.note}
          </div>
        </div>
      )}

      <button
        onClick={next}
        disabled={!selected}
        className="cardbtn plex"
        style={{
          width: "100%",
          padding: "12px 0",
          background: selected ? "#006437" : "transparent",
          border: `1px solid ${selected ? "#006437" : "#2E7D52"}`,
          color: selected ? "#FFFFFF" : "#5C7A6A",
          borderRadius: 4,
          fontSize: 12,
          letterSpacing: "0.06em",
          cursor: selected ? "pointer" : "default",
        }}
      >
        {isLast ? "SEE RESULT" : "NEXT →"}
      </button>
    </div>
  );
}
