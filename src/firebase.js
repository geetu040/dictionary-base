// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD41vP6-q6aDkgLc1ibHtzJms5JB94mgis",
	authDomain: "dictionarybase.firebaseapp.com",
	projectId: "dictionarybase",
	storageBucket: "dictionarybase.appspot.com",
	messagingSenderId: "912783485119",
	appId: "1:912783485119:web:a242bd2c69a7723e03be0a",
	measurementId: "G-0X435YYLMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "dict", "dict1");
// export const db = getFirestore(app);

async function save_data(new_data) {
	updateDoc(docRef, { "data": JSON.stringify(new_data) });
}

async function load_data() {
	const docSnap = await getDoc(docRef);
	return JSON.parse(docSnap.data().data);
}

export {save_data, load_data};