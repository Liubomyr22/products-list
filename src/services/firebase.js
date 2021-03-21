import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDLix0nrCgeXUHPg5rVS3NRi8SA1TsLMqg",
    authDomain: "products-project-27451.firebaseapp.com",
    projectId: "products-project-27451",
    storageBucket: "products-project-27451.appspot.com",
    messagingSenderId: "729878761533",
    appId: "1:729878761533:web:e1cace5d8d0204f996da54"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;