// Componente principal: monta o cabeçalho, o menu de níveis, e alterna
// entre as telas (estudar / quiz / frases / música / resumo) de acordo
// com o nível e a unidade selecionados.

function FlashcardCatalog() {
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [view, setView] = useState("home"); // 'home' | 'study' | 'quiz' | 'phrases' | 'music' | 'summary'
  const [unit, setUnit] = useState(1);
  const [category, setCategory] = useState("All");
  const [reviewOnly, setReviewOnly] = useState(false);
  const [order, setOrder] = useState(() => getLevelData(DEFAULT_LEVEL).cards.map((c) => c.id));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState({}); // id -> 'know' | 'review'
  const [loaded, setLoaded] = useState(false);

  // Dados do nível atual — trocar de nível troca UNITS/CARDS/PHRASES juntos.
  const { units: UNITS, cards: CARDS, phrases: PHRASES, music: MUSIC } = useMemo(
    () => getLevelData(level),
    [level]
  );

  // Carrega o nível salvo uma vez, na montagem. Só aceita um nível
  // conhecido e disponível — protege contra um valor salvo por uma
  // versão antiga do app ou corrompido.
  useEffect(() => {
    (async () => {
      try {
        let saved = null;
        if (window.storage?.get) {
          saved = (await window.storage.get("flashcard-level", false))?.value ?? null;
        } else {
          saved = localStorage.getItem("flashcard-level");
        }
        if (saved && LEVELS.some((l) => l.id === saved && l.available)) {
          setLevel(saved);
        }
      } catch {
        // sem nível salvo — mantém o padrão
      }
    })();
  }, []);

  // Salva o nível toda vez que muda.
  useEffect(() => {
    if (window.storage?.set) {
      window.storage.set("flashcard-level", level, false).catch(() => {});
    } else {
      try {
        localStorage.setItem("flashcard-level", level);
      } catch {
        // storage indisponível — só não persiste
      }
    }
  }, [level]);

  // Carrega o progresso do nível atual — uma chave de storage por nível,
  // pra não misturar "já sei" de níveis diferentes. Se ainda não existir
  // progresso na chave nova mas existir na chave antiga (de antes do
  // seletor de nível), migra ela pra cá — só pro nível padrão — pra quem
  // já vinha usando o app não perder o progresso.
  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    (async () => {
      const key = `flashcard-status-${level}`;
      try {
        let raw;
        if (window.storage?.get) {
          raw = (await window.storage.get(key, false))?.value ?? null;
        } else {
          raw = localStorage.getItem(key);
        }
        if (!raw && level === DEFAULT_LEVEL) {
          raw = window.storage?.get
            ? (await window.storage.get("flashcard-status", false))?.value ?? null
            : localStorage.getItem("flashcard-status");
        }
        if (!cancelled) setStatus(raw ? JSON.parse(raw) : {});
      } catch {
        if (!cancelled) setStatus({});
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [level]);

  // Salva o progresso sempre que muda (depois da carga inicial).
  useEffect(() => {
    if (!loaded) return;
    const key = `flashcard-status-${level}`;
    const payload = JSON.stringify(status);
    if (window.storage?.set) {
      window.storage.set(key, payload, false).catch(() => {});
    } else {
      try {
        localStorage.setItem(key, payload);
      } catch {
        // storage indisponível ou cheio — progresso só não persiste
      }
    }
  }, [status, loaded, level]);

  const deck = useMemo(() => {
    const filtered = CARDS.filter(
      (c) =>
        c.unit === unit &&
        (category === "All" || c.cat === category) &&
        (!reviewOnly || status[c.id] === "review")
    );
    const idSet = new Set(filtered.map((c) => c.id));
    const ordered = order.filter((id) => idSet.has(id));
    filtered.forEach((c) => {
      if (!ordered.includes(c.id)) ordered.push(c.id);
    });
    return ordered.map((id) => CARDS.find((c) => c.id === id));
  }, [unit, category, reviewOnly, order, status]);

  const safeIndex = Math.min(index, Math.max(deck.length - 1, 0));
  const card = deck[safeIndex];
  const known = deck.filter((c) => status[c.id] === "know").length;
  const review = deck.filter((c) => status[c.id] === "review").length;
  const unitTitle = UNITS.find((u) => u.id === unit)?.title ?? "";

  function goTo(i) {
    if (deck.length === 0) return;
    const next = ((i % deck.length) + deck.length) % deck.length;
    setIndex(next);
    setFlipped(false);
  }

  function mark(kind) {
    if (!card) return;
    setStatus((s) => ({ ...s, [card.id]: kind }));
    setTimeout(() => goTo(safeIndex + 1), 180);
  }

  function handleShuffle() {
    setOrder(shuffle(CARDS.map((c) => c.id)));
    setIndex(0);
    setFlipped(false);
  }

  function changeUnit(u) {
    setUnit(u);
    setIndex(0);
    setFlipped(false);
  }

  function openUnitFromSummary(u) {
    setUnit(u);
    setCategory("All");
    setReviewOnly(false);
    setIndex(0);
    setFlipped(false);
    setView("study");
  }

  function changeCategory(cat) {
    setCategory(cat);
    setIndex(0);
    setFlipped(false);
  }

  function toggleReviewOnly() {
    setReviewOnly((r) => !r);
    setIndex(0);
    setFlipped(false);
  }

  function resetProgress() {
    setStatus({});
    setReviewOnly(false);
    const key = `flashcard-status-${level}`;
    if (window.storage?.set) {
      window.storage.set(key, JSON.stringify({}), false).catch(() => {});
    } else {
      try {
        localStorage.removeItem(key);
      } catch {
        // nothing to clear
      }
    }
  }

  // Troca de nível: reseta unidade/categoria/embaralho pro novo nível e
  // manda pra tela de estudo. Ignora cliques em níveis ainda sem conteúdo
  // ("em breve"). Clicar no nível que já está ativo (por exemplo, voltando
  // da Música ou do Resumo) não reseta nada — só volta pra tela de estudo.
  function changeLevel(id) {
    const target = LEVELS.find((l) => l.id === id);
    if (!target || !target.available) return;
    if (id === level) {
      setView("study");
      return;
    }
    const data = getLevelData(id);
    setLevel(id);
    setOrder(data.cards.map((c) => c.id));
    setUnit(data.units[0]?.id ?? 1);
    setCategory("All");
    setReviewOnly(false);
    setIndex(0);
    setFlipped(false);
    setView("study");
  }

  const catInk = card ? (CAT_STYLE[card.cat]?.ink ?? "#006437") : "#006437";

  return (
    <div
      className="app-shell"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#006437",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "14px 14px",
        display: "flex",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "'Libre Baskerville', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .typewriter { font-family: 'Special Elite', monospace; }
        .plex { font-family: 'IBM Plex Mono', monospace; }
        .flip-scene { perspective: 1600px; }
        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card.is-flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 6px;
        }
        .flip-back { transform: rotateY(180deg); }
        .cardbtn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .cardbtn:hover { transform: translateY(-2px); }
        .cardbtn:active { transform: translateY(0px) scale(0.98); }
        .tab-btn, .unit-btn { transition: all 0.15s ease; }
        .unit-strip { scrollbar-width: thin; scrollbar-color: #2E7D52 transparent; }
        .unit-strip::-webkit-scrollbar { height: 6px; }
        .unit-strip::-webkit-scrollbar-thumb { background: #2E7D52; border-radius: 3px; }
        @media (prefers-reduced-motion: reduce) {
          .flip-card, .cardbtn, .tab-btn, .unit-btn { transition: none !important; }
        }

        /* Telas estreitas (celular): menos padding nas bordas e textos um
           pouco menores, pra caber sem cortar nem forçar zoom. */
        @media (max-width: 420px) {
          .app-shell { padding: 20px 10px !important; }
          .app-title { font-size: 21px !important; }
          .flip-scene { height: 280px !important; }
        }
        @media (max-width: 340px) {
          .app-shell { padding: 16px 8px !important; }
          .flip-scene { height: 250px !important; }
        }
      `}</style>

      <LevelMenu
        level={level}
        onSelectLevel={changeLevel}
        view={view}
        onSelectHome={() => setView("home")}
        onSelectMusic={() => setView("music")}
      />

      <div style={{ width: "100%", maxWidth: 560 }}>
        {/* Header — drawer label */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div
            className="plex"
            style={{ fontSize: 11, letterSpacing: "0.28em", color: "#9FE6BE", marginBottom: 6 }}
          >
            {view === "home" || view === "music"
              ? "FLASHCARDS ENGLISH"
              : (LEVELS.find((l) => l.id === level)?.label ?? "").toUpperCase()}
          </div>
          <h1
            className="typewriter app-title"
            style={{ fontSize: 26, color: "#FFFFFF", margin: "0 0 12px", letterSpacing: "0.02em" }}
          >
            {view === "music"
              ? "Music"
              : view === "home"
              ? "Choose a level"
              : view === "summary"
              ? "Progress Summary"
              : view === "quiz"
              ? `Quiz · ${unitTitle}`
              : view === "phrases"
              ? `Phrases · ${unitTitle}`
              : `Unit ${unit} · ${unitTitle}`}
          </h1>
          {(view === "study" || view === "quiz" || view === "phrases" || view === "summary") && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
              {[
                { key: "study", label: "STUDY" },
                { key: "quiz", label: "QUIZ" },
                { key: "phrases", label: "PHRASES" },
                { key: "summary", label: "SUMMARY" },
              ].map((v) => (
                <button
                  key={v.key}
                  onClick={() => setView(v.key)}
                  className="plex"
                  style={{
                    padding: "5px 12px",
                    fontSize: 10,
                    letterSpacing: "0.04em",
                    borderRadius: 3,
                    border: `1px solid ${view === v.key ? "#FFFFFF" : "#2E7D52"}`,
                    background: view === v.key ? "#FFFFFF" : "transparent",
                    color: view === v.key ? "#006437" : "#9FE6BE",
                    fontWeight: view === v.key ? 700 : 400,
                    cursor: "pointer",
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {view === "home" || view === "music" ? (
          <HomeScreen
            level={level}
            onSelectLevel={changeLevel}
            showMusic={view === "music"}
            onToggleMusic={() => setView(view === "music" ? "home" : "music")}
            songs={MUSIC}
          />
        ) : view === "summary" ? (
          <SummaryScreen units={UNITS} cards={CARDS} status={status} onSelectUnit={openUnitFromSummary} onReset={resetProgress} />
        ) : (
          <>
            {/* Unit selector — drawer front labels */}
            <div
              className="unit-strip"
              style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}
            >
              {UNITS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => changeUnit(u.id)}
                  className="unit-btn plex"
                  style={{
                    flex: "0 0 auto",
                    padding: "6px 10px",
                    fontSize: 10.5,
                    letterSpacing: "0.03em",
                    borderRadius: 3,
                    border: `1px solid ${unit === u.id ? "#D4AF37" : "#1F5C3B"}`,
                    background: unit === u.id ? "#D4AF37" : "transparent",
                    color: unit === u.id ? "#006437" : "#9FE6BE",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontWeight: unit === u.id ? 700 : 400,
                  }}
                >
                  {String(u.id).padStart(2, "0")} {u.title}
                </button>
              ))}
            </div>

            {/* Category tabs */}
            {view !== "phrases" && (
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => changeCategory(cat)}
                    className="tab-btn plex"
                    style={{
                      padding: "6px 14px",
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      borderRadius: 3,
                      border: `1px solid ${category === cat ? "#FFFFFF" : "#2E7D52"}`,
                      background: category === cat ? "#FFFFFF" : "transparent",
                      color: category === cat ? "#006437" : "#CFEFDC",
                      cursor: "pointer",
                    }}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {view !== "phrases" && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                <button
                  onClick={toggleReviewOnly}
                  className="tab-btn plex"
                  title="Show only the cards marked for review"
                  style={{
                    padding: "6px 14px",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    borderRadius: 3,
                    border: `1px solid ${reviewOnly ? "#D4AF37" : "#2E7D52"}`,
                    background: reviewOnly ? "#D4AF37" : "transparent",
                    color: reviewOnly ? "#0B3D24" : "#CFEFDC",
                    fontWeight: reviewOnly ? 700 : 400,
                    cursor: "pointer",
                  }}
                >
                  {reviewOnly ? "★ REVIEW ONLY" : "☆ REVIEW ONLY"}
                </button>
              </div>
            )}

            {view === "phrases" ? (
              <PhraseScreen sentences={PHRASES[unit] || []} />
            ) : view === "quiz" ? (
              <QuizScreen deck={deck} allCards={CARDS} />
            ) : (
              <>
            {/* Stats bar */}
            <div
              className="plex"
              style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#BFEAD2", marginBottom: 10, padding: "0 4px" }}
            >
              <span>CARD {deck.length ? safeIndex + 1 : 0} / {deck.length}</span>
              <span style={{ color: "#4ADE80" }}>KNOWN: {known}</span>
              <span style={{ color: "#D4AF37" }}>REVIEW: {review}</span>
            </div>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: 3, marginBottom: 18, flexWrap: "wrap" }}>
              {deck.map((c, i) => (
                <div
                  key={c.id}
                  style={{
                    height: 4,
                    flex: 1,
                    minWidth: 4,
                    borderRadius: 2,
                    background:
                      i === safeIndex
                        ? "#FFFFFF"
                        : status[c.id] === "know"
                        ? "#4ADE80"
                        : status[c.id] === "review"
                        ? "#D4AF37"
                        : "#1F5C3B",
                  }}
                />
              ))}
            </div>

            {!card ? (
              <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
                No cards in this category.
              </div>
            ) : (
              <>
                {/* The index card */}
                <div
                  className="flip-scene"
                  style={{ height: 320, marginBottom: 18 }}
                  onClick={() => setFlipped((f) => !f)}
                  role="button"
                  tabIndex={0}
                  aria-label={flipped ? "Card flipped, showing the answer. Tap to see the term." : "Tap to flip and see the answer."}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFlipped((f) => !f);
                    }
                  }}
                >
                  <div className={`flip-card ${flipped ? "is-flipped" : ""}`}>
                    {/* FRONT */}
                    <div
                      className="flip-face"
                      style={{
                        ...notebookBg("#F4FBF6"),
                        border: "1px solid #BFE3CC",
                        boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
                        padding: "26px 30px",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      {category === "All" && (
                        <div
                          className="plex"
                          style={{
                            fontSize: 11,
                            color: catInk,
                            border: `1px solid ${catInk}`,
                            alignSelf: "flex-start",
                            padding: "2px 8px",
                            borderRadius: 2,
                            letterSpacing: "0.05em",
                            marginBottom: 4,
                            opacity: 0.85,
                          }}
                        >
                          {card.cat.toUpperCase()}
                        </div>
                      )}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 8 }}>
                        <div style={{ fontSize: card.front.length > 30 ? 20 : 26, color: "#006437", fontWeight: 700, lineHeight: 1.35 }}>
                          {card.front}
                        </div>
                        {card.cat === "Vocabulary" && <SpeakButton text={card.front} />}
                      </div>
                      <div className="plex" style={{ textAlign: "center", fontSize: 10, color: "#6FA98A", letterSpacing: "0.1em" }}>
                        TAP TO FLIP
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className="flip-face flip-back"
                      style={{
                        ...notebookBg("#EAF6EF"),
                        border: "1px solid #BFE3CC",
                        boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
                        padding: "22px 28px",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        overflowY: "auto",
                      }}
                    >
                      <div className="plex" style={{ fontSize: 10, color: catInk, letterSpacing: "0.08em", marginBottom: 10 }}>
                        ANSWER
                      </div>
                      <div style={{ fontSize: 19, color: "#006437", fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>
                        {card.back}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 4,
                          marginBottom: 12,
                          paddingLeft: 10,
                          borderLeft: `2px solid ${catInk}55`,
                        }}
                      >
                        <div style={{ fontSize: 14, color: "#1F4A34", fontStyle: "italic", flex: 1 }}>
                          "{card.ex}"
                        </div>
                        <SpeakButton text={card.ex} size={15} />
                      </div>
                      <div className="plex" style={{ fontSize: 11.5, color: "#3F7A5C", lineHeight: 1.5, marginTop: "auto" }}>
                        ✎ {card.note}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Know / review buttons */}
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <button
                    onClick={() => mark("review")}
                    className="cardbtn plex"
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: "transparent",
                      border: "1px solid #D4AF37",
                      color: "#D4AF37",
                      borderRadius: 4,
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    REVIEW LATER
                  </button>
                  <button
                    onClick={() => mark("know")}
                    className="cardbtn plex"
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: "#FFFFFF",
                      border: "1px solid #FFFFFF",
                      color: "#006437",
                      borderRadius: 4,
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    I KNOW IT ✓
                  </button>
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => goTo(safeIndex - 1)} className="cardbtn plex" style={navBtnStyle}>
                    ← PREVIOUS
                  </button>
                  <button
                    onClick={handleShuffle}
                    className="cardbtn plex"
                    style={{ ...navBtnStyle, flex: "0 0 auto", padding: "10px 14px" }}
                    title="Shuffle this unit's cards"
                  >
                    ⟲
                  </button>
                  <button onClick={() => goTo(safeIndex + 1)} className="cardbtn plex" style={navBtnStyle}>
                    NEXT →
                  </button>
                </div>
              </>
            )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const navBtnStyle = {
  flex: 1,
  padding: "10px 0",
  background: "transparent",
  border: "1px solid #2E7D52",
  color: "#CFEFDC",
  borderRadius: 4,
  fontSize: 11,
  letterSpacing: "0.05em",
  cursor: "pointer",
};
