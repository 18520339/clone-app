import firebase from 'firebase';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
export default database;
