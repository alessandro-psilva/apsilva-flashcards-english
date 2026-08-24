// Exercício de redação (simulado de escrita): um tema original por bloco
// de duas unidades, escolhido automaticamente pela unidade selecionada no
// momento. O texto do aluno fica salvo automaticamente (mesmo mecanismo de
// window.storage usado pro progresso de estudo — sincroniza na nuvem se a
// pessoa estiver logada, senão fica no localStorage).
function WritingScreen({ level, unit, prompts }) {
  const active = useMemo(
    () => prompts.find((p) => unit >= p.fromUnit && unit <= p.toUnit) ?? null,
    [unit, prompts]
  );
  const storageKey = active ? `flashcard-writing-${level}-${active.id}` : null;

  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [savedPulse, setSavedPulse] = useState(false);

  useEffect(() => {
    if (!storageKey) return;
    let cancelled = false;
    setLoaded(false);
    (async () => {
      try {
        let raw;
        if (window.storage?.get) {
          raw = (await window.storage.get(storageKey, false))?.value ?? "";
        } else {
          raw = localStorage.getItem(storageKey) ?? "";
        }
        if (!cancelled) setText(raw || "");
      } catch {
        if (!cancelled) setText("");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  // Autosave com um pequeno atraso — evita gravar a cada tecla digitada.
  useEffect(() => {
    if (!loaded || !storageKey) return;
    const t = setTimeout(() => {
      if (window.storage?.set) {
        window.storage.set(storageKey, text, false).catch(() => {});
      } else {
        try {
          localStorage.setItem(storageKey, text);
        } catch {
          // storage indisponível — só não persiste
        }
      }
      setSavedPulse(true);
      setTimeout(() => setSavedPulse(false), 1200);
    }, 600);
    return () => clearTimeout(t);
  }, [text, loaded, storageKey]);

  if (!active) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        No writing prompt for this unit yet.
      </div>
    );
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div>
      <div
        style={{
          ...notebookBg("#F4FBF6"),
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "20px 22px",
          marginBottom: 14,
          boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
        }}
      >
        <div className="plex" style={{ fontSize: 10, color: "#3F7A5C", letterSpacing: "0.08em", marginBottom: 8 }}>
          WRITING · UNITS {active.fromUnit}–{active.toUnit}
        </div>
        <div style={{ fontSize: 18, color: "#006437", fontWeight: 700, marginBottom: 10 }}>{active.title}</div>
        <div style={{ fontSize: 14, color: "#1F4A34", lineHeight: 1.6, marginBottom: 12 }}>{active.prompt}</div>
        <div
          className="plex"
          style={{
            fontSize: 11.5,
            color: "#8A6D14",
            lineHeight: 1.5,
            borderLeft: "2px solid #D4AF37",
            paddingLeft: 10,
          }}
        >
          💡 {active.tip}
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your answer here…"
        rows={10}
        className="plex"
        style={{
          width: "100%",
          padding: "14px 16px",
          fontSize: 14,
          lineHeight: 1.6,
          borderRadius: 6,
          border: "1px solid #BFE3CC",
          background: "#FFFFFF",
          color: "#1F4A34",
          resize: "vertical",
          marginBottom: 8,
        }}
      />

      <div
        className="plex"
        style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "#6FA98A" }}
      >
        <span>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
        <span style={{ color: savedPulse ? "#4ADE80" : "#4C7A63" }}>
          {savedPulse ? "✓ saved" : "auto-saves as you type"}
        </span>
      </div>
    </div>
  );
}
