import {initializeApp,} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPV2fjSLQlEZJj02vBXnumy_9Q8a701O4",
    authDomain: "ecomced-clothing.firebaseapp.com",
    projectId: "ecomced-clothing",
    storageBucket: "ecomced-clothing.appspot.com",
    messagingSenderId: "723627522811",
    appId: "1:723627522811:web:e64760304711d35e79ce5e"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);
      console.log(userDocRef);
      //persist la donnée dans firestore
      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      //verifie si la donnée existe déja
      console.log(userSnapshot.exists());
  }