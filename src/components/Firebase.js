import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC9RihR-SkaIoWvGjQzlw4SqouIVjGwxLs",
    authDomain: "chat-app-react-aeeb4.firebaseapp.com",
    projectId: "chat-app-react-aeeb4",
    storageBucket: "chat-app-react-aeeb4.appspot.com",
    messagingSenderId: "729302821690",
    appId: "1:729302821690:web:9db36e55d77cc962fdfe03"
  };
export const auth = firebase.initializeApp(firebaseConfig).auth();
