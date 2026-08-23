// Seção de conta no menu lateral: login com Google pra sincronizar o
// progresso entre aparelhos, via Firebase (veja src/utils/cloud.js e
// src/firebaseConfig.js). Some sozinha se o Firebase ainda não foi
// configurado, pra não mostrar um botão que não funciona.
function AccountSection() {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => onAuthChange(setUser), []);

  // Usa a mesma checagem de src/utils/cloud.js (firebaseIsConfigured) em
  // vez de duplicar a lógica — assim os dois lugares nunca podem discordar
  // sobre se o Firebase está "pronto pra usar" ou não. Isso também cobre o
  // caso do SDK do Firebase não ter carregado (rede, bloqueador de anúncio
  // etc.), não só a chave ainda ser o valor de exemplo.
  if (!firebaseIsConfigured()) return null;

  async function handleSignIn() {
    setBusy(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch {
      setError("Couldn't sign in — please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    setBusy(true);
    try {
      await signOutOfGoogle();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div style={{ height: 1, background: "#1F5C3B", margin: "18px 0" }} />
      <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#6FA98A", marginBottom: 10 }}>
        ACCOUNT
      </div>

      {user ? (
        <div>
          <div className="plex" style={{ fontSize: 11, color: "#CFEFDC", marginBottom: 10, wordBreak: "break-all" }}>
            {user.email || user.displayName || "Signed in"}
          </div>
          <button
            onClick={handleSignOut}
            disabled={busy}
            className="plex"
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              fontSize: 12,
              borderRadius: 3,
              border: "1px solid #1F5C3B",
              background: "transparent",
              color: "#CFEFDC",
              cursor: busy ? "default" : "pointer",
              opacity: busy ? 0.6 : 1,
            }}
          >
            {busy ? "SIGNING OUT…" : "SIGN OUT"}
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleSignIn}
            disabled={busy}
            className="plex"
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              fontSize: 12,
              borderRadius: 3,
              border: "1px solid #D4AF37",
              background: "transparent",
              color: "#D4AF37",
              cursor: busy ? "default" : "pointer",
              opacity: busy ? 0.6 : 1,
            }}
          >
            {busy ? "SIGNING IN…" : "SIGN IN WITH GOOGLE"}
          </button>
          {error && (
            <div className="plex" style={{ color: "#E08A87", fontSize: 10, marginTop: 6 }}>
              {error}
            </div>
          )}
          <div className="plex" style={{ fontSize: 9.5, color: "#4C7A63", marginTop: 8, lineHeight: 1.4 }}>
            Sign in to sync your progress across devices.
          </div>
        </div>
      )}
    </>
  );
}
