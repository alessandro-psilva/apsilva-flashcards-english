// Jogo da memória: vira duas cartas por vez tentando casar o termo em
// inglês (front) com a tradução (back) do MESMO card. Gerado na hora a
// partir do deck já filtrado (igual Quiz/Gap-Fill) — nenhum dado novo
// precisa existir por nível. Limita a 8 pares por rodada pra a grade
// continuar jogável (e legível) mesmo em unidades com muitas cartas.
const MEMORY_MAX_PAIRS = 8;

function buildMemoryTiles(deck) {
  const chosen = shuffle(deck).slice(0, MEMORY_MAX_PAIRS);
  const tiles = [];
  chosen.forEach((card) => {
    tiles.push({ key: `${card.id}-front`, cardId: card.id, side: "front", text: card.front });
    tiles.push({ key: `${card.id}-back`, cardId: card.id, side: "back", text: card.back });
  });
  return shuffle(tiles);
}

function MemoryScreen({ deck }) {
  const [seed, setSeed] = useState(0);
  const tiles = useMemo(() => buildMemoryTiles(deck), [deck, seed]);
  const totalPairs = tiles.length / 2;

  const [flipped, setFlipped] = useState([]); // indices, max 2
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [wrongPair, setWrongPair] = useState([]); // indices currently flashing red
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setWrongPair([]);
    setLocked(false);
  }, [tiles]);

  if (deck.length < 3) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        Not enough cards here for Memory Match yet — try "All" categories or another unit.
      </div>
    );
  }

  const finished = totalPairs > 0 && matched.size === totalPairs;

  if (finished) {
    const accuracy = Math.round((totalPairs / moves) * 100);
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
          MEMORY MATCH COMPLETE
        </div>
        <div style={{ fontSize: 36, color: "#006437", fontWeight: 700, marginBottom: 6 }}>{accuracy}%</div>
        <div className="plex" style={{ fontSize: 12, color: "#3F7A5C", marginBottom: 20 }}>
          {totalPairs} pairs in {moves} {moves === 1 ? "move" : "moves"}
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
          PLAY AGAIN ⟲
        </button>
      </div>
    );
  }

  function reveal(i) {
    if (locked) return;
    if (flipped.includes(i) || matched.has(tiles[i].cardId)) return;
    if (flipped.length === 2) return;

    const next = [...flipped, i];
    setFlipped(next);

    if (next.length === 2) {
      setLocked(true);
      const [a, b] = next;
      const isMatch = tiles[a].cardId === tiles[b].cardId;
      setMoves((m) => m + 1);
      if (isMatch) {
        setTimeout(() => {
          setMatched((prev) => new Set(prev).add(tiles[a].cardId));
          setFlipped([]);
          setLocked(false);
        }, 450);
      } else {
        setWrongPair(next);
        setTimeout(() => {
          setWrongPair([]);
          setFlipped([]);
          setLocked(false);
        }, 700);
      }
    }
  }

  return (
    <div>
      <div
        className="plex"
        style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}
      >
        <span>PAIRS {matched.size} / {totalPairs}</span>
        <span style={{ color: "#4ADE80" }}>MOVES: {moves}</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          marginBottom: 14,
        }}
      >
        {tiles.map((tile, i) => {
          const isMatched = matched.has(tile.cardId);
          const isFlipped = flipped.includes(i) || isMatched;
          const isWrong = wrongPair.includes(i);
          let bg = "#0B4A2C";
          let border = "#2E7D52";
          let color = "#9FE6BE";
          if (isMatched) {
            bg = "#DDF3E4";
            border = "#1F9D55";
            color = "#0B3D24";
          } else if (isWrong) {
            bg = "#FBEAEA";
            border = "#C0504D";
            color = "#8C2F2C";
          } else if (isFlipped) {
            bg = "#F4FBF6";
            border = "#BFE3CC";
            color = "#006437";
          }
          return (
            <button
              key={tile.key}
              onClick={() => reveal(i)}
              disabled={isMatched || locked}
              className="cardbtn plex"
              aria-label={isFlipped ? tile.text : "Hidden tile"}
              style={{
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 6,
                fontSize: isFlipped ? (tile.text.length > 14 ? 9.5 : 11.5) : 18,
                lineHeight: 1.25,
                borderRadius: 5,
                border: `1px solid ${border}`,
                background: bg,
                color,
                cursor: isMatched ? "default" : "pointer",
                overflow: "hidden",
              }}
            >
              {isFlipped ? tile.text : "?"}
            </button>
          );
        })}
      </div>

      <div className="plex" style={{ textAlign: "center", fontSize: 10, color: "#6FA98A", letterSpacing: "0.06em" }}>
        TAP TWO TILES TO FIND A MATCHING PAIR
      </div>
    </div>
  );
}
