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

      <div
        style={{
          ...notebookBg("#EAF6EF"),
          border: "1px solid #BFE3CC",
          borderRadius: 6,
          padding: "14px 16px",
        }}
      >
        <div className="plex" style={{ fontSize: 10, color: "#3F7A5C", letterSpacing: "0.08em", marginBottom: 8 }}>
          COMO VER A LETRA COM TRADUÇÃO
        </div>
        <div style={{ fontSize: 13, color: "#1F4A34", lineHeight: 1.6 }}>
          1. Toque no ícone <strong>CC</strong> (legenda) na barra do vídeo.
          <br />
          2. Toque na engrenagem ⚙️ → <strong>Legendas</strong> → <strong>Traduzir automaticamente</strong> → escolha <strong>Português</strong>.
          <br />
          3. Toque de novo em ⚙️ → Legendas → English, se quiser ler no idioma original.
        </div>
      </div>
      <div className="plex" style={{ fontSize: 10.5, color: "#6FA98A", marginTop: 10, textAlign: "center", lineHeight: 1.5 }}>
        A legenda vem direto do YouTube — o app não guarda nem mostra letras de música.
      </div>
    </div>
  );
}
