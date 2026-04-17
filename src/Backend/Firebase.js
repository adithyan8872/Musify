import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6pXhHBm_qdz1UfxQSy4ML-qgT6gp90wA",
  authDomain: "musify-10071.firebaseapp.com",
  projectId: "musify-10071",
  storageBucket: "musify-10071.firebasestorage.app",
  messagingSenderId: "404105345548",
  appId: "1:404105345548:web:3fe7e52cb7dd4921514c29",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export let _Auth = getAuth(app)
export let _DB = getFirestore(app)


// export default firebaseConfig
