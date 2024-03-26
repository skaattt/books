import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIVMd6OVfrZyaY3cKnBkzFjCvpbI_qo2c",
  authDomain: "bookshop-c9b1f.firebaseapp.com",
  projectId: "bookshop-c9b1f",
  storageBucket: "bookshop-c9b1f.appspot.com",
  messagingSenderId: "776053924652",
  appId: "1:776053924652:web:7f0a44afb0d7eec4b1c289",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
