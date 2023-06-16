import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCNn89rpy0HLLDmqnA-fQ6284z6wUacEYw",
  authDomain: "slotin-bank.firebaseapp.com",
  projectId: "slotin-bank",
  storageBucket: "slotin-bank.appspot.com",
  messagingSenderId: "191677409639",
  appId: "1:191677409639:web:4dbe4ec8e3d3cab07ce7c2",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
