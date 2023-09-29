import firebase from 'firebase';

const firebaseConfig = {

  databaseURL: 'https://gaitcollector-be249-default-rtdb.europe-west1.firebasedatabase.app/',

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;