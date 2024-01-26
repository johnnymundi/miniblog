// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR1uQDl3_0E4RpymrElM1Hfo8G3NHQ4Pc",
  authDomain: "miniblog-97a50.firebaseapp.com",
  projectId: "miniblog-97a50",
  storageBucket: "miniblog-97a50.appspot.com",
  messagingSenderId: "544357830970",
  appId: "1:544357830970:web:9b7dc94cb48b5ce95bc003",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFireStore(app);

export { db };
