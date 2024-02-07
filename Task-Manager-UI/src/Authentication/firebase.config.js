import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFYF0HJOAVRvljJqXI7-QmlloNtfp8t4g",
  authDomain: "task-manager-e7f2e.firebaseapp.com",
  projectId: "task-manager-e7f2e",
  storageBucket: "task-manager-e7f2e.appspot.com",
  messagingSenderId: "513439079947",
  appId: "1:513439079947:web:195b55ee296fd9af3f310e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth