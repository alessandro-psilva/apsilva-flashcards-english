// Sincronização opcional do progresso via login com conta Google (Firebase
// Auth + Firestore). Se src/firebaseConfig.js não estiver preenchido, ou o
// SDK do Firebase não carregar por algum motivo, nada disso roda e o app
// continua funcionando 100% normal com localStorage — como sempre
// funcionou.
//
// O ponto de integração é window.storage: o resto do app (veja
// src/app.jsx) já sabia usar window.storage.get/set quando existisse, com
// fallback pro localStorage quando não existisse — essa checagem já
// estava lá antes desse recurso existir. Aqui a gente SEMPRE define
// window.storage, mas por baixo dos panos ele decide sozinho se usa a
// nuvem (usuário logado) ou o localStorage (deslogado, ou Firebase não
// configurado, ou a rede falhou) — o resto do app nunca precisa saber qual
// dos dois está sendo usado de fato.
//
// Multiusuário: cada pessoa loga com a própria conta Google e os dados
// ficam em users/{uid}/kv/{chave} no Firestore — as regras de segurança
// (veja o comentário em firebaseConfig.js) garantem que cada uid só lê e
// escreve os próprios documentos.

let currentUser = null;
const authListeners = [];
let resolveAuthReady;
const authReady = new Promise((resolve) => {
  resolveAuthReady = resolve;
});
let authResolved = false;

function notifyAuthListeners() {
  authListeners.forEach((fn) => fn(currentUser));
}

// Componentes usam isso (via useEffect) pra saber o usuário atual e
// re-renderizar quando o login/logout acontecer.
function onAuthChange(fn) {
  authListeners.push(fn);
  fn(currentUser);
  return () => {
    const i = authListeners.indexOf(fn);
    if (i >= 0) authListeners.splice(i, 1);
  };
}

function firebaseIsConfigured() {
  return (
    typeof FIREBASE_CONFIG !== "undefined" &&
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.apiKey !== "REPLACE_WITH_YOUR_FIREBASE_API_KEY" &&
    typeof firebase !== "undefined"
  );
}

function firestoreDocFor(uid, key) {
  return firebase.firestore().collection("users").doc(uid).collection("kv").doc(key);
}

// Na primeira vez que alguém loga neste navegador, sobe pra nuvem qualquer
// progresso que já existisse só localmente (localStorage) — assim quem já
// vinha usando o app sem login não perde o que já estudou ao logar. Só
// roda uma vez por navegador+conta (marca um flag no localStorage).
async function adoptLocalProgress(uid) {
  const marker = `flashcard-cloud-adopted-${uid}`;
  if (localStorage.getItem(marker)) return;
  const keys = Object.keys(localStorage).filter((k) => k.startsWith("flashcard-") && !k.startsWith("flashcard-cloud-adopted-"));
  for (const key of keys) {
    try {
      const doc = await firestoreDocFor(uid, key).get();
      if (!doc.exists) {
        const value = localStorage.getItem(key);
        if (value != null) {
          await firestoreDocFor(uid, key).set({ value, updatedAt: Date.now() });
        }
      }
    } catch {
      // se uma chave falhar ao migrar, segue pras próximas — não trava o
      // login por causa disso.
    }
  }
  localStorage.setItem(marker, "1");
}

if (firebaseIsConfigured()) {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().onAuthStateChanged(async (user) => {
      currentUser = user;
      if (user) {
        try {
          await adoptLocalProgress(user.uid);
        } catch {
          // não trava o login se a migração falhar
        }
      }
      if (!authResolved) {
        authResolved = true;
        resolveAuthReady();
      }
      notifyAuthListeners();
    });
  } catch (err) {
    console.error("Firebase init failed:", err);
    authResolved = true;
    resolveAuthReady();
  }
} else {
  // Sem configuração (ou SDK não carregou) — resolve na hora, o app usa
  // localStorage normalmente, como sempre usou.
  authResolved = true;
  resolveAuthReady();
}

// Implementação real de window.storage — o resto do app não sabe (nem
// precisa saber) que isso existe.
window.storage = {
  async get(key) {
    await authReady;
    if (currentUser) {
      try {
        const doc = await firestoreDocFor(currentUser.uid, key).get();
        return { value: doc.exists ? doc.data().value : null };
      } catch {
        // rede/Firestore falhou — cai pro localStorage como reforço, não
        // trava o app.
      }
    }
    return { value: localStorage.getItem(key) };
  },
  async set(key, value) {
    await authReady;
    if (currentUser) {
      try {
        await firestoreDocFor(currentUser.uid, key).set({ value, updatedAt: Date.now() });
        return;
      } catch {
        // segue pro localStorage como reforço/fallback
      }
    }
    localStorage.setItem(key, value);
  },
};

function signInWithGoogle() {
  if (!firebaseIsConfigured()) {
    return Promise.reject(new Error("Firebase not configured yet — fill in src/firebaseConfig.js first."));
  }
  return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function signOutOfGoogle() {
  if (!firebaseIsConfigured()) return Promise.resolve();
  return firebase.auth().signOut();
}
