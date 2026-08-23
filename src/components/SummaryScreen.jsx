function SummaryScreen({ units, cards, status, onSelectUnit, onReset }) {
  const [confirming, setConfirming] = useState(false);
  const totalCards = cards.length;
  const totalKnow = cards.filter((c) => status[c.id] === "know").length;
  const totalReview = cards.filter((c) => status[c.id] === "review").length;
  const totalPct = totalCards ? Math.round((totalKnow / totalCards) * 100) : 0;

  return (
    <div>
      {/* Overall totals */}
      <div
        style={{
          background: "#F4FBF6",
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "16px 18px",
          marginBottom: 16,
          boxShadow: "0 6px 18px rgba(6,40,25,0.28)",
        }}
      >
        <div className="plex" style={{ fontSize: 11, color: "#3F7A5C", letterSpacing: "0.06em", marginBottom: 6 }}>
          OVERALL PROGRESS · {totalPct}% LEARNED
        </div>
        <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", background: "#DDEEE3", marginBottom: 8 }}>
          <div style={{ width: totalCards ? `${(totalKnow / totalCards) * 100}%` : "0%", background: "#1F9D55" }} />
          <div style={{ width: totalCards ? `${(totalReview / totalCards) * 100}%` : "0%", background: "#D4AF37" }} />
        </div>
        <div className="plex" style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
          <span style={{ color: "#1F9D55" }}>KNOWN: {totalKnow}</span>
          <span style={{ color: "#8A6D14" }}>REVIEW: {totalReview}</span>
          <span style={{ color: "#006437" }}>TOTAL: {totalCards}</span>
        </div>
      </div>

      {/* Per-unit rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {units.map((u) => {
          const cardsInUnit = cards.filter((c) => c.unit === u.id);
          const total = cardsInUnit.length;
          const know = cardsInUnit.filter((c) => status[c.id] === "know").length;
          const rev = cardsInUnit.filter((c) => status[c.id] === "review").length;
          return (
            <button
              key={u.id}
              onClick={() => onSelectUnit(u.id)}
              className="cardbtn"
              style={{
                textAlign: "left",
                background: "#F4FBF6",
                border: "1px solid #BFE3CC",
                borderRadius: 5,
                padding: "10px 14px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: "#006437", fontSize: 14 }}>
                  {String(u.id).padStart(2, "0")} · {u.title}
                </span>
                <span className="plex" style={{ fontSize: 11, color: "#3F7A5C" }}>
                  {know}/{total}
                </span>
              </div>
              <div style={{ display: "flex", height: 5, borderRadius: 3, overflow: "hidden", background: "#DDEEE3" }}>
                <div style={{ width: total ? `${(know / total) * 100}%` : "0%", background: "#1F9D55" }} />
                <div style={{ width: total ? `${(rev / total) * 100}%` : "0%", background: "#D4AF37" }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Reset progress */}
      <div style={{ marginTop: 22, textAlign: "center" }}>
        {confirming ? (
          <div
            style={{
              background: "#FBEAEA",
              border: "1px solid #C0504D",
              borderRadius: 6,
              padding: "14px 16px",
            }}
          >
            <div style={{ fontSize: 13, color: "#8C2F2C", marginBottom: 12 }}>
              This will erase all "known / review" marks across all {units.length} units. This can't be undone.
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button
                onClick={() => setConfirming(false)}
                className="cardbtn plex"
                style={{
                  padding: "8px 16px",
                  background: "transparent",
                  border: "1px solid #8C2F2C",
                  color: "#8C2F2C",
                  borderRadius: 4,
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  onReset();
                  setConfirming(false);
                }}
                className="cardbtn plex"
                style={{
                  padding: "8px 16px",
                  background: "#8C2F2C",
                  border: "1px solid #8C2F2C",
                  color: "#FFFFFF",
                  borderRadius: 4,
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                YES, RESET
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="plex"
            style={{
              padding: "6px 14px",
              fontSize: 10.5,
              letterSpacing: "0.04em",
              borderRadius: 3,
              border: "1px solid #8C6F6F",
              background: "transparent",
              color: "#8C6F6F",
              cursor: "pointer",
            }}
          >
            RESET PROGRESS
          </button>
        )}
      </div>
    </div>
  );
}
