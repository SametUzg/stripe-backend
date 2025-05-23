import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcT8H0sXeiN8QufSM_HnZuJdI4MBXJyKY",
  authDomain: "samet-205c9.firebaseapp.com",
  projectId: "samet-205c9",
  storageBucket: "samet-205c9.appspot.com", // ❗ bunu düzeltiyorsun
  messagingSenderId: "976572682385",
  appId: "1:976572682385:web:2e5edbd42fa865ae492f30"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
