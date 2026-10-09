import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCescVd6SKsjKrmN2iYIlkq4O7LOb7ai2A",
  authDomain: "ubuntumarkketplace-1ac09.firebaseapp.com",
  projectId: "ubuntumarkketplace-1ac09",
  storageBucket: "ubuntumarkketplace-1ac09.firebasestorage.app",
  messagingSenderId: "340118672769",
  appId: "1:340118672769:web:c8925f5253ba9ca325c480",
  measurementId: "G-H1M2ZVTF2D"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
