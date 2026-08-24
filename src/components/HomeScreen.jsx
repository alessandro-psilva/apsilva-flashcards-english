// Página inicial: grid de níveis (Beginner…Advanced) + Música do nível
// atualmente selecionado. Música mora aqui (acessível pelo menu principal),
// não dentro das abas de estudo de um nível — mas a lista de músicas em si
// é por nível (cada nível cura suas próprias músicas). Clicar em MUSIC troca
// o grid pela lista, em vez de empilhar os dois. É a tela que abre quando o
// app carrega, e pra onde "HOME" no menu lateral traz de volta.
// Simple inline decorative graphic for the home page — a stack of index
// cards, drawn as SVG so it stays self-contained (no image file to host or
// keep track of) and matches the app's notebook/green-and-gold look.
function HomeArt() {
  return (
    <svg
      viewBox="0 0 160 100"
      width="140"
      height="88"
      role="img"
      aria-label="Illustration of a stack of flashcards"
      style={{ display: "block", margin: "0 auto 18px" }}
    >
      <rect x="18" y="26" width="110" height="66" rx="6" fill="#04351F" stroke="#1F5C3B" />
      <rect x="28" y="16" width="110" height="66" rx="6" fill="#0B4A2C" stroke="#2E7D52" />
      <rect x="38" y="6" width="110" height="66" rx="6" fill="#F4FBF6" stroke="#BFE3CC" />
      <line x1="52" y1="24" x2="134" y2="24" stroke="#BFE3CC" strokeWidth="1" />
      <text x="93" y="46" textAnchor="middle" fontSize="20" fontWeight="700" fill="#006437" fontFamily="Georgia, serif">
        A
      </text>
      <line x1="52" y1="58" x2="110" y2="58" stroke="#006437" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HomeScreen({ level, onSelectLevel, showMusic, onToggleMusic, songs }) {
  return (
    <div>
      <HomeArt />

      <div
        className="plex"
        style={{ fontSize: 12, color: "#CFEFDC", lineHeight: 1.6, textAlign: "center", marginBottom: 20 }}
      >
        Flashcards, quizzes, and phrases to practice English.
      </div>

      {/* Toggle entre grid de níveis e lista de música — os dois nunca
          ficam visíveis ao mesmo tempo, pra não virar uma página gigante
          de scroll. Clicar em MUSIC troca o conteúdo aqui embaixo, não
          empilha um embaixo do outro. */}
      {!showMusic && (
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
                border: `1px solid ${level === l.id && l.available ? "#FFFFFF" : l.available ? "#BFE3CC" : "#1F5C3B"}`,
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
                {l.available ? "OPEN" : "COMING SOON"}
              </span>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={onToggleMusic}
        className="cardbtn plex"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          padding: "14px 0",
          borderRadius: 6,
          border: `1px solid ${showMusic ? "#FFFFFF" : "#2E7D52"}`,
          background: showMusic ? "#FFFFFF" : "transparent",
          color: showMusic ? "#053B22" : "#CFEFDC",
          fontWeight: showMusic ? 700 : 400,
          fontSize: 11,
          letterSpacing: "0.06em",
          cursor: "pointer",
        }}
      >
        {showMusic ? "← BACK TO LEVELS" : "MUSIC — PRACTICE LISTENING ▾"}
      </button>

      {showMusic && (
        <div style={{ marginTop: 18 }}>
          <MusicScreen songs={songs} />
        </div>
      )}
    </div>
  );
}
