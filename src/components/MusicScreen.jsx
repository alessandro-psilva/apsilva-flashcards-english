function MusicScreen({ songs }) {
  const [selected, setSelected] = useState(0);

  if (!songs || songs.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        No songs yet for this level.
      </div>
    );
  }

  const safeSelected = Math.min(selected, songs.length - 1);
  const song = songs[safeSelected];

  return (
    <div>
      {/* Caixa de seleção compacta em vez de uma lista longa de cartões —
          ocupa uma linha só; nota e artista aparecem embaixo, pra música
          escolhida, depois de selecionar. */}
      <select
        value={safeSelected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="plex"
        style={{
          display: "block",
          width: "100%",
          padding: "12px 14px",
          marginBottom: 14,
          fontSize: 14,
          borderRadius: 6,
          border: "1px solid #BFE3CC",
          background: "#F4FBF6",
          color: "#006437",
          cursor: "pointer",
        }}
      >
        {songs.map((s, i) => (
          <option key={s.videoId} value={i}>
            {s.title} — {s.artist}
          </option>
        ))}
      </select>

      <div
        style={{
          ...notebookBg("#EAF6EF"),
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "10px 14px",
          marginBottom: 14,
          fontSize: 12,
          color: "#1F4A34",
        }}
      >
        {song.note}
      </div>

      <div
        style={{
          position: "relative",
          paddingTop: "56.25%",
          borderRadius: 6,
          overflow: "hidden",
          marginBottom: 14,
          boxShadow: "0 6px 18px rgba(6,40,25,0.28)",
        }}
      >
        <iframe
          key={song.videoId}
          src={`https://www.youtube-nocookie.com/embed/${song.videoId}?cc_load_policy=1`}
          title={`${song.title} — ${song.artist}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="plex" style={{ fontSize: 10.5, color: "#6FA98A", textAlign: "center", lineHeight: 1.5 }}>
        Captions come straight from YouTube — the app doesn't store or show song lyrics.
      </div>
    </div>
  );
}
