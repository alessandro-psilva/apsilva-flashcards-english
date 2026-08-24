// Palavra embaralhada: pega o termo em inglês (card.front) — que na
// maioria das cartas é uma colocação curta de 2-3 palavras, não uma
// palavra só (ex.: "get a refund") — remove os espaços, embaralha as
// letras, e o jogador toca as letras na ordem certa pra soletrar de
// volta, com a tradução (card.back) como dica. As "caixas" na área de
// montagem já mostram os espaços entre palavras (só as letras precisam
// ser encontradas), então o jogador sabe onde cada palavra começa e
// termina. Foca em ortografia, ao contrário do Quiz/Gap-Fill
// (reconhecimento) ou Sentence Builder (ordem gramatical/palavras
// inteiras). Limitado a termos curtos (até 3 palavras, até 12 letras)
// pra a rodada continuar jogável.
const SCRAMBLE_MAX_WORDS = 3;
const SCRAMBLE_MAX_LETTERS = 12;
const SCRAMBLE_VALID_CHARS = /^[A-Za-z' -]+$/;

function scrambleLetters(letters) {
  let shuffled = shuffle(letters);
  if (letters.length > 1) {
    let attempts = 0;
    while (shuffled.join("") === letters.join("") && attempts < 5) {
      shuffled = shuffle(letters);
      attempts++;
    }
  }
  return shuffled;
}

function buildScrambleItems(deck) {
  const usable = deck.filter((c) => {
    const front = (c.front || "").trim();
    if (!SCRAMBLE_VALID_CHARS.test(front)) return false;
    const words = front.split(/\s+/).filter(Boolean);
    const letterCount = front.replace(/[^A-Za-z']/g, "").length;
    return words.length >= 1 && words.length <= SCRAMBLE_MAX_WORDS && letterCount >= 3 && letterCount <= SCRAMBLE_MAX_LETTERS;
  });
  return shuffle(usable).map((card) => {
    const front = card.front.trim();
    const words = front.split(/\s+/).filter(Boolean);
    const wordLengths = words.map((w) => w.length);
    const answer = words.join(""); // letters only, no spaces — what the player actually spells
    return {
      card,
      front,
      answer,
      wordLengths,
      letters: scrambleLetters(answer.split("")).map((ch, i) => ({ id: `${card.id}-${i}`, ch })),
    };
  });
}

// Turns a flat sequence of placed letters into grouped word-chunks
// according to wordLengths, so the build area can show a visual gap
// between words even before every letter is filled in.
function groupByWords(placed, wordLengths) {
  const groups = [];
  let cursor = 0;
  for (const len of wordLengths) {
    groups.push(placed.slice(cursor, cursor + len));
    cursor += len;
  }
  return groups;
}

function WordScrambleScreen({ deck }) {
  const [seed, setSeed] = useState(0);
  const items = useMemo(() => buildScrambleItems(deck), [deck, seed]);

  const [qIndex, setQIndex] = useState(0);
  const [bank, setBank] = useState([]);
  const [built, setBuilt] = useState([]);
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
    setBank(item ? item.letters : []);
    setBuilt([]);
    setChecked(false);
    setCorrect(false);
  }, [items, qIndex]);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        No short-enough terms here for Word Scramble yet — try "All" categories or another unit.
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
          WORD SCRAMBLE COMPLETE
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
  const allPlaced = built.length === item.letters.length;
  const wordGroups = groupByWords(built, item.wordLengths);

  function placeLetter(letter) {
    if (checked) return;
    setBuilt((b) => [...b, letter]);
    setBank((b) => b.filter((l) => l.id !== letter.id));
  }

  function removeLetter(letter) {
    if (checked) return;
    setBank((b) => [...b, letter]);
    setBuilt((b) => b.filter((l) => l.id !== letter.id));
  }

  function check() {
    if (checked || !allPlaced) return;
    const guess = built.map((l) => l.ch).join("");
    const isRight = guess === item.answer;
    setCorrect(isRight);
    setChecked(true);
    if (isRight) setScore((s) => s + 1);
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
        <span>WORD {qIndex + 1} / {items.length}</span>
        <span style={{ color: "#4ADE80" }}>CORRECT: {score}</span>
      </div>

      <div
        style={{
          ...notebookBg("#F4FBF6"),
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "16px 20px",
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        <div className="plex" style={{ fontSize: 10, color: "#3F7A5C", letterSpacing: "0.08em", marginBottom: 6 }}>
          HINT
        </div>
        <div style={{ fontSize: 17, color: "#006437", fontWeight: 700 }}>{item.card.back}</div>
      </div>

      {/* Build area — one group of boxes per word, with a gap between words */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 14,
          marginBottom: 14,
          minHeight: 52,
          padding: "10px 8px",
          borderRadius: 6,
          border: `1px solid ${checked ? (correct ? "#1F9D55" : "#C0504D") : "#2E7D52"}`,
          background: "rgba(0,0,0,0.15)",
        }}
      >
        {built.length === 0 && (
          <div className="plex" style={{ fontSize: 11, color: "#6FA98A", fontStyle: "italic", alignSelf: "center" }}>
            Tap the letters below…
          </div>
        )}
        {built.length > 0 &&
          wordGroups.map((group, gi) => (
            <div key={gi} style={{ display: "flex", gap: 6 }}>
              {group.map((l) => (
                <button
                  key={l.id}
                  onClick={() => removeLetter(l)}
                  disabled={checked}
                  className="cardbtn plex"
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    borderRadius: 5,
                    border: "1px solid #006437",
                    background: "#006437",
                    color: "#FFFFFF",
                    cursor: checked ? "default" : "pointer",
                  }}
                >
                  {l.ch}
                </button>
              ))}
            </div>
          ))}
      </div>

      {/* Letter bank */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {bank.map((l) => (
          <button
            key={l.id}
            onClick={() => placeLetter(l)}
            className="cardbtn plex"
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              borderRadius: 5,
              border: "1px solid #BFE3CC",
              background: "#FFFFFF",
              color: "#006437",
              cursor: "pointer",
            }}
          >
            {l.ch}
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
            textAlign: "center",
          }}
        >
          <div className="plex" style={{ fontSize: 11, color: correct ? "#1F9D55" : "#8C2F2C", letterSpacing: "0.06em", marginBottom: 6 }}>
            {correct ? "✓ CORRECT" : `✗ CORRECT SPELLING: "${item.front}"`}
          </div>
          <SpeakButton text={item.front} size={16} />
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        {!checked && built.length > 0 && (
          <button
            onClick={() => {
              setBank(item.letters);
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
            title="Clear and start this word over"
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
