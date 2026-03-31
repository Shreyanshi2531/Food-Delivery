// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "savora-b96fc.firebaseapp.com",
  projectId: "savora-b96fc",
  storageBucket: "savora-b96fc.firebasestorage.app",
  messagingSenderId: "38041818806",
  appId: "1:38041818806:web:27cf1bff16852cb0867817",
  measurementId: "G-TV25KLLXXN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { app, auth };