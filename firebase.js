import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0FBtmJJlXXAV-KdXoRHzer95fxUuaqxM",
  authDomain: "one-signal-14abc.firebaseapp.com",
  projectId: "one-signal-14abc",
  storageBucket: "one-signal-14abc.appspot.com",
  messagingSenderId: "918969017545",
  appId: "1:918969017545:web:eac083f617152b984f1918",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
