function MusicScreen() {
  const [selected, setSelected] = useState(0);
  const song = MUSIC_RECOMMENDATIONS[selected];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {MUSIC_RECOMMENDATIONS.map((s, i) => (
          <button
            key={s.videoId}
            onClick={() => setSelected(i)}
            className="cardbtn"
            style={{
              textAlign: "left",
              padding: "10px 14px",
              borderRadius: 5,
              cursor: "pointer",
              background: i === selected ? "#FFFFFF" : "#F4FBF6",
              border: `1px solid ${i === selected ? "#006437" : "#BFE3CC"}`,
            }}
          >
            <div style={{ fontWeight: 700, color: "#006437", fontSize: 14 }}>{s.title}</div>
            <div className="plex" style={{ fontSize: 11, color: "#3F7A5C", marginTop: 2 }}>{s.artist}</div>
            <div style={{ fontSize: 12, color: "#1F4A34", marginTop: 4 }}>{s.note}</div>
          </button>
        ))}
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
