import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

    const firebaseConfig = {
        apiKey: "AIzaSyCIxq8Gq6qs-PqrWlJ34y6g-2ibbvs1JXQ",
        authDomain: "products-app-9687f.firebaseapp.com",
        projectId: "products-app-9687f",
        storageBucket: "products-app-9687f.appspot.com",
        messagingSenderId: "371114775973",
        appId: "1:371114775973:web:328ca0d10d9df8e47e444c"
      };
      
      firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;