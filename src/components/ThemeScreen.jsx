// Navegar por tema: ao contrário de Study/Quiz/etc (que sempre olham só
// pra UMA unidade por vez), aqui o corte é por assunto — "tudo sobre
// dinheiro", "tudo sobre viagem" — cruzando várias unidades de uma vez.
// Puramente uma tela de consulta (sem quiz/progresso aqui): mostra as
// cartas de Vocabulary que carregam aquele tema (veja `themes` em
// src/data/levels/pre-intermediate.js e o registro em src/data/themes.js).
function ThemeScreen({ cards }) {
  const [selected, setSelected] = useState(null);

  const counts = useMemo(() => {
    const c = {};
    cards.forEach((card) => {
      (card.themes || []).forEach((t) => {
        c[t] = (c[t] || 0) + 1;
      });
    });
    return c;
  }, [cards]);

  if (!selected) {
    return (
      <div>
        <div className="plex" style={{ fontSize: 11, color: "#BFEAD2", marginBottom: 14, padding: "0 4px", lineHeight: 1.6 }}>
          Browse vocabulary by topic, across every unit at once.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {THEMES.filter((t) => counts[t.key] > 0).map((t) => (
            <button
              key={t.key}
              onClick={() => setSelected(t.key)}
              className="cardbtn"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "left",
                padding: "14px 18px",
                borderRadius: 6,
                border: "1px solid #BFE3CC",
                background: "#F4FBF6",
                boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: "#006437" }}>{t.label}</span>
              <span className="plex" style={{ fontSize: 10, letterSpacing: "0.05em", color: "#3F7A5C" }}>
                {counts[t.key]} {counts[t.key] === 1 ? "TERM" : "TERMS"}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const themeLabel = themeLabelFor(selected);
  const matches = cards
    .filter((c) => (c.themes || []).includes(selected))
    .sort((a, b) => a.unit - b.unit);

  return (
    <div>
      <button
        onClick={() => setSelected(null)}
        className="plex"
        style={{
          display: "inline-block",
          marginBottom: 14,
          padding: "6px 12px",
          fontSize: 10.5,
          letterSpacing: "0.04em",
          borderRadius: 3,
          border: "1px solid #2E7D52",
          background: "transparent",
          color: "#CFEFDC",
          cursor: "pointer",
        }}
      >
        ← ALL THEMES
      </button>

      <div className="plex" style={{ fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}>
        {themeLabel.toUpperCase()} · {matches.length} {matches.length === 1 ? "TERM" : "TERMS"}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {matches.map((card) => (
          <div
            key={card.id}
            style={{
              ...notebookBg("#F4FBF6"),
              border: "1px solid #BFE3CC",
              borderRadius: 6,
              padding: "14px 16px",
              boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 16, color: "#006437", fontWeight: 700 }}>{card.front}</div>
              <span className="plex" style={{ flexShrink: 0, fontSize: 9, color: "#6FA98A", letterSpacing: "0.04em", marginTop: 3 }}>
                UNIT {String(card.unit).padStart(2, "0")}
              </span>
            </div>
            <div style={{ fontSize: 13.5, color: "#1F4A34", marginBottom: 6 }}>{card.back}</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
              <div style={{ fontSize: 12.5, color: "#3F7A5C", fontStyle: "italic", flex: 1 }}>"{card.ex}"</div>
              <SpeakButton text={card.front} size={14} />
            </div>
            {card.family && card.family.length > 0 && (
              <div className="plex" style={{ fontSize: 10.5, color: "#8A6D14", marginTop: 8, letterSpacing: "0.02em" }}>
                Word family: {card.family.map((f) => `${f.word} (${f.form})`).join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function themeLabelFor(key) {
  return THEMES.find((t) => t.key === key)?.label ?? key;
}
