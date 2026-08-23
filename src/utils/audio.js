let cachedVoice = null;
function pickBestVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferredNames = [
    "Google US English",
    "Samantha",
    "Ava",
    "Alex",
    "Microsoft Aria Online (Natural)",
    "Microsoft Jenny Online (Natural)",
    "Microsoft Zira",
  ];
  for (const name of preferredNames) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) {
      cachedVoice = match;
      return match;
    }
  }
  const enUS = voices.find((v) => v.lang === "en-US") || voices.find((v) => v.lang?.startsWith("en"));
  cachedVoice = enUS || null;
  return cachedVoice;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickBestVoice();
  };
}

function speak(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.95;
  const voice = pickBestVoice();
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

// Real human-recorded audio for single words, via the free Dictionary API.
// Falls back to synthetic speech for phrases or words with no recording.
const audioCache = {};
async function playPronunciation(text) {
  const isSingleWord = /^[a-zA-Z'-]+$/.test(text.trim());
  if (isSingleWord) {
    const key = text.trim().toLowerCase();
    try {
      let url = audioCache[key];
      if (url === undefined) {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`);
        if (res.ok) {
          const data = await res.json();
          const found = data?.[0]?.phonetics?.find((p) => p.audio)?.audio || null;
          url = found ? (found.startsWith("http") ? found : `https:${found}`) : null;
        } else {
          url = null;
        }
        audioCache[key] = url;
      }
      if (url) {
        const audio = new Audio(url);
        audio.play();
        return;
      }
    } catch {
      // fall through to synthetic voice
    }
  }
  speak(text);
}
