import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyDuEk5PUZkzfnjKoK989g1HJbfGMqDYm84",
  // authDomain: "teslaeats-82417.firebaseapp.com",
  // databaseURL: "https://teslaeats-82417.firebaseio.com",
  // projectId: "teslaeats-82417",
  // storageBucket: "teslaeats-82417.appspot.com",
  // messagingSenderId: "221450821469",
  // appId: "1:221450821469:web:593dde40fd7282fdb412b4",

  apiKey: "AIzaSyAXTyvhp_WiAYprr2lu0chOLY8s-GGdYwo",
  authDomain: "asddd-c43f3.firebaseapp.com",
  databaseURL: "https://asddd-c43f3.firebaseio.com",
  projectId: "asddd-c43f3",
  storageBucket: "asddd-c43f3.appspot.com",
  messagingSenderId: "689588614375",
  appId: "1:689588614375:web:9b41741e553fd0f2249e42",
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
