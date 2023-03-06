import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxIFFkLiMyHjfgzCE5V5fHFkuF1zRIvS4",
  authDomain: "ob-application-579f1.firebaseapp.com",
  projectId: "job-application-579f1",
  storageBucket: "job-application-579f1.appspot.com",
  messagingSenderId: "817435518624",
  appId: "1:817435518624:web:6d54796551d43c1995cbc5",
  measurementId: "G-STLYYL7VY1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
