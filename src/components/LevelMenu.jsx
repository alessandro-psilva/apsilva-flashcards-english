// Menu lateral do app: troca de nível (Beginner…Advanced) e acesso à seção
// de Música (que mostra as músicas do nível atualmente selecionado) — por
// isso o atalho mora aqui no menu principal, e não dentro das abas de
// estudo de um nível específico.
function LevelMenu({ level, onSelectLevel, view, onSelectHome, onSelectMusic, onSelectThemes }) {
  const [open, setOpen] = useState(false);
  const currentLabel = LEVELS.find((l) => l.id === level)?.label ?? "";

  function pickHome() {
    onSelectHome();
    setOpen(false);
  }

  function pickLevel(id) {
    onSelectLevel(id);
    setOpen(false);
  }

  function pickMusic() {
    onSelectMusic();
    setOpen(false);
  }

  function pickThemes() {
    onSelectThemes();
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open level menu"
        className="plex"
        style={{
          position: "fixed",
          top: 18,
          left: 18,
          zIndex: 40,
          width: 38,
          height: 38,
          borderRadius: 4,
          border: "1px solid #2E7D52",
          background: "rgba(0,50,30,0.85)",
          color: "#9FE6BE",
          fontSize: 16,
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 50 }}
        />
      )}

      <div
        className="plex"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: 260,
          maxWidth: "82vw",
          background: "#04351F",
          borderRight: "1px solid #1F5C3B",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
          zIndex: 51,
          padding: "24px 18px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: "0.28em", color: "#9FE6BE", marginBottom: 4 }}>
          FLASHCARDS
        </div>
        <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "#4C7A63", marginBottom: 20 }}>
          {currentLabel.toUpperCase()} · ACTIVE
        </div>

        <button
          onClick={pickHome}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "10px 12px",
            marginBottom: 18,
            fontSize: 12,
            borderRadius: 3,
            border: `1px solid ${view === "home" ? "#FFFFFF" : "#1F5C3B"}`,
            background: view === "home" ? "#FFFFFF" : "transparent",
            color: view === "home" ? "#053B22" : "#CFEFDC",
            fontWeight: view === "home" ? 700 : 400,
            cursor: "pointer",
          }}
        >
          HOME
        </button>

        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#6FA98A", marginBottom: 10 }}>
          LEVELS
        </div>
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => pickLevel(l.id)}
            disabled={!l.available}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              marginBottom: 6,
              fontSize: 12,
              borderRadius: 3,
              border: `1px solid ${level === l.id ? "#FFFFFF" : "#1F5C3B"}`,
              background: level === l.id ? "#FFFFFF" : "transparent",
              color: !l.available ? "#4C7A63" : level === l.id ? "#053B22" : "#CFEFDC",
              fontWeight: level === l.id ? 700 : 400,
              cursor: l.available ? "pointer" : "not-allowed",
            }}
          >
            <span>{l.label}</span>
            {!l.available && (
              <span style={{ fontSize: 8.5, letterSpacing: "0.05em", color: "#4C7A63" }}>
                COMING SOON
              </span>
            )}
          </button>
        ))}

        <div style={{ height: 1, background: "#1F5C3B", margin: "18px 0" }} />

        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#6FA98A", marginBottom: 10 }}>
          OTHER
        </div>
        <button
          onClick={pickMusic}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            textAlign: "left",
            padding: "10px 12px",
            fontSize: 12,
            borderRadius: 3,
            border: `1px solid ${view === "music" ? "#FFFFFF" : "#1F5C3B"}`,
            background: view === "music" ? "#FFFFFF" : "transparent",
            color: view === "music" ? "#053B22" : "#CFEFDC",
            fontWeight: view === "music" ? 700 : 400,
            cursor: "pointer",
          }}
        >
          MUSIC
        </button>
        <button
          onClick={pickThemes}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            textAlign: "left",
            padding: "10px 12px",
            marginTop: 6,
            fontSize: 12,
            borderRadius: 3,
            border: `1px solid ${view === "themes" ? "#FFFFFF" : "#1F5C3B"}`,
            background: view === "themes" ? "#FFFFFF" : "transparent",
            color: view === "themes" ? "#053B22" : "#CFEFDC",
            fontWeight: view === "themes" ? 700 : 400,
            cursor: "pointer",
          }}
        >
          THEMES
        </button>

        <AccountSection />
      </div>
    </>
  );
}
