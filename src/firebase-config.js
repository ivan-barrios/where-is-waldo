import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNHFoCxfVXIeDlQsBW4TqTFqlDJB22HiA",
  authDomain: "where-is-waldo-d98e3.firebaseapp.com",
  projectId: "where-is-waldo-d98e3",
  storageBucket: "where-is-waldo-d98e3.appspot.com",
  messagingSenderId: "319222316304",
  appId: "1:319222316304:web:b95bb46bec979a770e7995",
  measurementId: "G-PLLL6HNCKE",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
