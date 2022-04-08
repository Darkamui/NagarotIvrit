import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "nagarot-c07a8.firebaseapp.com",
	projectId: "nagarot-c07a8",
	storageBucket: "nagarot-c07a8.appspot.com",
	messagingSenderId: "933960405551",
	appId: process.env.REACT_APP_FIREBASE_APP,
};

initializeApp(firebaseConfig);
export const db = getFirestore();
