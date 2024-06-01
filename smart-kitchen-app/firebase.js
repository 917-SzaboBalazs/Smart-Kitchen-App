// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAmXCYbojaLUkkOGwZ5S6w6pHLZuKSDrU",
  authDomain: "smart-kitchen-app-56432.firebaseapp.com",
  projectId: "smart-kitchen-app-56432",
  storageBucket: "smart-kitchen-app-56432.appspot.com",
  messagingSenderId: "536366357741",
  appId: "1:536366357741:web:b5abe67f50289b623000e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { auth, db };