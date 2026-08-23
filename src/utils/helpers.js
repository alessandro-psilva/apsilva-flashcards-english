function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Subtle ruled-paper texture, like notebook lines — reused across every
// card face that holds text (front/back of the flip card, quiz prompt,
// phrase rows) so the whole app reads as one consistent "study notebook".
function notebookBg(baseColor, lineColor = "rgba(0,100,55,0.12)") {
  return {
    backgroundColor: baseColor,
    backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 25px, ${lineColor} 26px)`,
  };
}
