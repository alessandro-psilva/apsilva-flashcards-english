function SpeakButton({ text, color = "#006437", size = 16 }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        playPronunciation(text);
      }}
      aria-label="Ouvir pronúncia"
      title="Ouvir pronúncia"
      style={{
        border: "none",
        background: "transparent",
        color,
        cursor: "pointer",
        fontSize: size,
        lineHeight: 1,
        padding: 4,
        flexShrink: 0,
      }}
    >
      🔊
    </button>
  );
}
