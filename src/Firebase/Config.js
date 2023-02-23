import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUGbN6shwOXoFxmX80LSnW4I1s9PutLao",
  authDomain: "galeria-a914a.firebaseapp.com",
  projectId: "galeria-a914a",
  storageBucket: "galeria-a914a.appspot.com",
  messagingSenderId: "248859059206",
  appId: "1:248859059206:web:bb56d5b5b55ea766c04f87"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
