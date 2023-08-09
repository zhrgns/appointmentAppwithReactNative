// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfpth64pLyjKlrRWLMFFr6uNRsPO79R-0",
  authDomain: "myfirstproject-3e982.firebaseapp.com",
  databaseURL: "https://myfirstproject-3e982-default-rtdb.firebaseio.com",
  projectId: "myfirstproject-3e982",
  storageBucket: "myfirstproject-3e982.appspot.com",
  messagingSenderId: "318473703490",
  appId: "1:318473703490:web:31e16c3c9ab31406491ddb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);