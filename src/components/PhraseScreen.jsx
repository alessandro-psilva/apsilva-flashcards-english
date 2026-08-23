function renderSentenceParts(sentence) {
  // Splits on **bold** and [bracket] markers so we can style each part
  // differently while keeping the rest as plain text.
  const parts = sentence.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#006437" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <span
          key={i}
          style={{
            fontStyle: "italic",
            color: "#8A6D14",
            borderBottom: "1px dashed #D4AF37",
          }}
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function plainTextForSpeech(sentence) {
  return sentence
    .replace(/\*\*/g, "")
    .replace(/[[\]]/g, "")
    .replace(/\s*\/\s*/g, " or ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function PhraseScreen({ sentences }) {
  if (!sentences.length) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#BFEAD2", fontStyle: "italic" }}>
        No phrases yet for this unit.
      </div>
    );
  }
  return (
    <div>
      <div
        className="plex"
        style={{ fontSize: 11, color: "#BFEAD2", marginBottom: 14, padding: "0 4px", lineHeight: 1.6 }}
      >
        Swap the <span style={{ fontStyle: "italic", color: "#D4AF37" }}>underlined</span> part for your own reality and practice saying it out loud.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sentences.map((sentence, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              ...notebookBg("#F4FBF6"),
              border: "1px solid #BFE3CC",
              borderRadius: 6,
              padding: "12px 14px",
              boxShadow: "0 6px 18px rgba(6,40,25,0.28), 0 1px 0 #fff inset",
            }}
          >
            <span className="plex" style={{ fontSize: 11, color: "#3F7A5C", flexShrink: 0, marginTop: 2 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div style={{ flex: 1, fontSize: 14.5, lineHeight: 1.55, color: "#1F4A34" }}>
              {renderSentenceParts(sentence)}
            </div>
            <SpeakButton text={plainTextForSpeech(sentence)} size={17} />
          </div>
        ))}
      </div>
    </div>
  );
}
