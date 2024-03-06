import { initializeApp, getApps } from "firebase/app";

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firebaseConfig = {
    apiKey: "AIzaSyAQkqAyV6mKzlOLgsrF1BUWq2wKirUZb5k",
    authDomain: "model-caldron-307618.firebaseapp.com",
    projectId: "model-caldron-307618",
    storageBucket: "model-caldron-307618.appspot.com",
    messagingSenderId: "1070432104741",
    appId: "1:1070432104741:web:d70504ca8d5b3423942acc",
    measurementId: "G-V6CP9LQX4Y"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

export default app;