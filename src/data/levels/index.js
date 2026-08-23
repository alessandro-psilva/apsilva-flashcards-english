// Registro central de níveis do app. Cada entrada vira um item no menu
// lateral; níveis sem "available: true" aparecem esmaecidos com um selo
// "COMING SOON" e não podem ser abertos ainda.
//
// Para adicionar um nível novo:
//   1. Crie src/data/levels/<nivel>.js com as unidades/cartas/frases/músicas
//      desse nível, no mesmo formato de pre-intermediate.js (troque o
//      prefixo). A música também é por nível — cada nível cura sua própria
//      lista de músicas, do jeito apropriado pra esse estágio.
//   2. Liste esse arquivo em FILES, dentro do index.html, logo depois deste
//      arquivo (src/data/levels/index.js já precisa ter carregado antes,
//      então na prática o arquivo do nível entra ANTES deste no manifesto —
//      veja o comentário em FILES no index.html).
//   3. Registre o nível no objeto LEVEL_DATA abaixo.
//   4. Marque available: true na lista LEVELS abaixo.
const LEVELS = [
  { id: "beginner", label: "Beginner", available: false },
  { id: "elementary", label: "Elementary", available: false },
  { id: "pre-intermediate", label: "Pre-Intermediate", available: true },
  { id: "intermediate", label: "Intermediate", available: false },
  { id: "upper-intermediate", label: "Upper Intermediate", available: false },
  { id: "advanced", label: "Advanced", available: false },
];

const DEFAULT_LEVEL = "pre-intermediate";

const LEVEL_DATA = {
  "pre-intermediate": {
    units: PRE_INTERMEDIATE_UNITS,
    cards: PRE_INTERMEDIATE_CARDS,
    phrases: PRE_INTERMEDIATE_PHRASES,
    music: PRE_INTERMEDIATE_MUSIC,
  },
};

const EMPTY_LEVEL_DATA = { units: [], cards: [], phrases: {}, music: [] };

function getLevelData(levelId) {
  return LEVEL_DATA[levelId] ?? EMPTY_LEVEL_DATA;
}
