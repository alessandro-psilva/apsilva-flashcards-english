// Contra o relógio: toca o áudio do termo (mesmo mecanismo de pronúncia
// usado no resto do app) e o jogador escolhe o significado certo entre
// 4 opções antes o tempo acabar — sem mostrar o texto em inglês até
// responder. É o único exercício focado em listening puro (os outros
// treinam leitura/escrita). Reaproveita buildOptions do QuizScreen.jsx
// (carregado antes deste arquivo em index.html) pra montar as opções
// erradas do mesmo jeito que o Quiz já faz.
const LISTENING_TIME_LIMIT = 8; // segundos por pergunta

function ListeningScreen({ deck, allCards }) {
  const [seed, setSeed] = useState(0);

  const items = useMemo(() => {
    return shuffle(deck).map((card) => ({ card, options: buildOptions(card, allCards) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, allCards, seed]);

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(LISTENING_TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQIndex(0);
    setScore(0);
    setFinished(false);
  }, [items]);

  // Timer + autoplay for the current question.
  useEffect(() => {
    if (finished || items.length === 0) return;
    setSelected(null);
    setTimedOut(false);
    setTimeLeft(LISTENING_TIME_LIMIT);

    const current = items[qIndex];
    if (current) playPronunciation(current.card.front);

    const interval = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, items, finished]);

  useEffect(() => {
    if (timeLeft === 0 && selected === null && !finished) {
      setTimedOut(true);
    }
  }, [timeLeft, selected, finished]);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        No cards in this category to listen to yet.
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
          LISTENING ROUND COMPLETE
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
  const locked = selected !== null || timedOut;

  function choose(opt) {
    if (locked) return;
    setSelected(opt);
    if (opt === item.card.back) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
    }
  }

  return (
    <div>
      <div
        className="plex"
        style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}
      >
        <span>ROUND {qIndex + 1} / {items.length}</span>
        <span style={{ color: "#4ADE80" }}>CORRECT: {score}</span>
      </div>

      {/* Timer bar */}
      <div style={{ height: 5, borderRadius: 3, overflow: "hidden", background: "#0B4A2C", marginBottom: 14 }}>
        <div
          style={{
            height: "100%",
            width: `${(timeLeft / LISTENING_TIME_LIMIT) * 100}%`,
            background: timeLeft <= 3 ? "#C0504D" : "#1F9D55",
            transition: "width 1s linear, background 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          ...notebookBg("#F4FBF6"),
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "26px 24px",
          marginBottom: 14,
          boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
          textAlign: "center",
        }}
      >
        <div className="plex" style={{ fontSize: 10, color: "#3F7A5C", letterSpacing: "0.08em", marginBottom: 14 }}>
          {locked ? item.card.front : "LISTEN AND CHOOSE THE MEANING"}
        </div>
        <div style={{ marginBottom: locked ? 4 : 0 }}>
          <SpeakButton text={item.card.front} size={30} />
        </div>
        {!locked && (
          <div className="plex" style={{ fontSize: 22, color: locked ? "#006437" : "#BFE3CC", marginTop: 6 }}>
            {timeLeft}s
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
          if (locked) {
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
              disabled={locked}
              className="cardbtn"
              style={{
                textAlign: "left",
                padding: "12px 16px",
                background: bg,
                border: `1px solid ${border}`,
                color,
                borderRadius: 5,
                fontSize: 14,
                cursor: locked ? "default" : "pointer",
              }}
            >
              {opt}
              {locked && isCorrectOpt ? " ✓" : locked && isChosen ? " ✗" : ""}
            </button>
          );
        })}
      </div>

      {timedOut && selected === null && (
        <div className="plex" style={{ textAlign: "center", fontSize: 11, color: "#C0504D", marginBottom: 14, letterSpacing: "0.05em" }}>
          ⏱ TIME'S UP
        </div>
      )}

      <button
        onClick={next}
        disabled={!locked}
        className="cardbtn plex"
        style={{
          width: "100%",
          padding: "12px 0",
          background: locked ? "#006437" : "transparent",
          border: `1px solid ${locked ? "#006437" : "#2E7D52"}`,
          color: locked ? "#FFFFFF" : "#5C7A6A",
          borderRadius: 4,
          fontSize: 12,
          letterSpacing: "0.06em",
          cursor: locked ? "pointer" : "default",
        }}
      >
        {isLast ? "SEE RESULT" : "NEXT →"}
      </button>
    </div>
  );
}
