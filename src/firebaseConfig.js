// Configuração do Firebase — preencha com as chaves do SEU projeto Firebase
// pra ativar o login com Google e a sincronização de progresso na nuvem.
// Sem preencher isso, o app funciona exatamente como sempre funcionou,
// salvando o progresso só no navegador local (localStorage) — nada quebra.
//
// Como conseguir essas chaves (uns 10 minutos, é tudo gratuito):
//   1. Acesse https://console.firebase.google.com, entre com sua conta
//      Google e clique em "Add project" / "Adicionar projeto".
//   2. Em "Build" → "Authentication" → aba "Sign-in method", ative o
//      provedor "Google".
//   3. Em "Build" → "Firestore Database", clique em "Create database"
//      (pode deixar no modo padrão/produção — as regras abaixo cuidam da
//      segurança).
//   4. Ainda no Firestore, vá em "Rules" e cole isto, substituindo o que
//      já estiver lá:
//
//        rules_version = '2';
//        service cloud.firestore {
//          match /databases/{database}/documents {
//            match /users/{userId}/kv/{docId} {
//              allow read, write: if request.auth != null && request.auth.uid == userId;
//            }
//          }
//        }
//
//      Isso garante que cada pessoa só lê/escreve os próprios dados —
//      importante porque essas chaves de configuração ficam públicas no
//      código (isso é normal e esperado pra apps Firebase; quem protege de
//      verdade são essas regras, não a chave).
//   5. Clique no ícone de engrenagem (⚙️) → "Project settings" → role até
//      "Your apps" → clique no ícone "</>" (Web) → registre um app (pode
//      chamar de "flashcards" ou qualquer nome) → copie o objeto
//      "firebaseConfig" que aparece na tela e cole os valores abaixo.
//   6. Ainda em "Authentication" → aba "Settings" → "Authorized domains",
//      clique em "Add domain" e adicione:
//        alessandro-psilva.github.io
//      (sem isso o login com Google falha no site publicado, mesmo com as
//      chaves certas — só funcionaria em localhost).
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC85EwXHi1Q4A9b_PsHdUToYt8Uc-401g8",
  authDomain: "apsilva-flashcards-english.firebaseapp.com",
  projectId: "apsilva-flashcards-english",
  storageBucket: "apsilva-flashcards-english.firebasestorage.app",
  messagingSenderId: "577880653424",
  appId: "1:577880653424:web:6a47f2c7893cb2f8e33eb5",
};
