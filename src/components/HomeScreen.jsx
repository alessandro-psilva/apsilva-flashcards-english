// Página inicial: grid de níveis (Beginner…Advanced) + acesso à Música, que
// vale pra qualquer nível. É a tela que abre quando o app carrega, e pra
// onde "INÍCIO" no menu lateral traz de volta.
function HomeScreen({ level, onSelectLevel, onSelectMusic }) {
  return (
    <div>
      <div
        className="plex"
        style={{ fontSize: 12, color: "#CFEFDC", lineHeight: 1.6, textAlign: "center", marginBottom: 20 }}
      >
        Flashcards, quiz e frases pra praticar inglês, seguindo a coleção Outcomes.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelectLevel(l.id)}
            disabled={!l.available}
            className={l.available ? "cardbtn" : undefined}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "left",
              padding: "16px 18px",
              borderRadius: 6,
              border: `1px solid ${level === l.id && l.available ? "#D4AF37" : l.available ? "#BFE3CC" : "#1F5C3B"}`,
              background: l.available ? "#F4FBF6" : "transparent",
              boxShadow: l.available ? "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset" : "none",
              cursor: l.available ? "pointer" : "not-allowed",
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: l.available ? "#006437" : "#4C7A63",
              }}
            >
              {l.label}
            </span>
            <span className="plex" style={{ fontSize: 10, letterSpacing: "0.05em", color: l.available ? "#3F7A5C" : "#4C7A63" }}>
              {l.available ? "ABRIR" : "EM BREVE"}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onSelectMusic}
        className="cardbtn plex"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          padding: "14px 0",
          borderRadius: 6,
          border: "1px solid #2E7D52",
          background: "transparent",
          color: "#CFEFDC",
          fontSize: 11,
          letterSpacing: "0.06em",
          cursor: "pointer",
        }}
      >
        MÚSICA — PRATICAR LISTENING
      </button>
    </div>
  );
}
