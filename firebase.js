import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCzVafcSTerrq9KWuJ--IsZG6HoHGy43G8",
  authDomain: "news-f38a9.firebaseapp.com",
  projectId: "news-f38a9",
  storageBucket: "news-f38a9.appspot.com",
  messagingSenderId: "301844582222",
  appId: "1:301844582222:web:c560e88cb40e70d00f181f",
  measurementId: "G-9HP75R88QQ"
};


  let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export {auth};