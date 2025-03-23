// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4JAFbRi9nmwhSkFq-PmNpb58la50FPMo",
  authDomain: "employment-site-41206.firebaseapp.com",
  projectId: "employment-site-41206",
  storageBucket: "employment-site-41206.firebasestorage.app",
  messagingSenderId: "418616579892",
  appId: "1:418616579892:web:d8fe51bdcb1b4f3fc2b761",
  measurementId: "G-6PXRE9BHNG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Set persistence to local to keep user logged in
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch((error) => {
    console.error("Authentication persistence error:", error);
  });

// Enable analytics if available
let analytics = null;
if (firebase.analytics) {
  analytics = firebase.analytics();
}

// Check authentication state
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user.uid);
    // You can update UI elements here based on authentication state
  } else {
    // User is signed out
    console.log("User is signed out");
    // You can update UI elements here based on authentication state
  }
});