/*  ── Firebase Configuration ──
 *  
 *  Project: CKO Emerson
 *  Console: https://console.firebase.google.com/project/cko-emerson
 *  
 *  SETUP CHECKLIST:
 *  1. Authentication → Sign-in method → Enable "Email/Password"
 *  2. Firestore Database → Create database → Production mode
 *  3. Firestore → Rules tab → paste rules from firestore-rules.txt → Publish
 */

var firebaseConfig = {
  apiKey: "AIzaSyCyiFL-a8hBFO0mxjZLiVYkPFiIflF0LHQ",
  authDomain: "cko-emerson.firebaseapp.com",
  projectId: "cko-emerson",
  storageBucket: "cko-emerson.firebasestorage.app",
  messagingSenderId: "435392157146",
  appId: "1:435392157146:web:663d574d4fcfd2afe5dce3",
  measurementId: "G-6DX94WEJMP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

// Auth state helper — redirects to login if not signed in
function requireAuth(callback) {
  auth.onAuthStateChanged(function(user) {
    if (!user) {
      window.location.href = 'members.html';
    } else if (callback) {
      callback(user);
    }
  });
}
