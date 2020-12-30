import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCJVby981nE-4pQvLJRm9bLsT6SlrJMAGo",
    authDomain: "booksanta-a08fe.firebaseapp.com",
    projectId: "booksanta-a08fe",
    storageBucket: "booksanta-a08fe.appspot.com",
    messagingSenderId: "293606866878",
    appId: "1:293606866878:web:6d026914552d4eea7e03ef"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()