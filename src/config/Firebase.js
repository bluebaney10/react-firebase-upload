import * as firebase from 'firebase';


const settings = {timestampsInSnapshots: true};

var data = require('./config.json'); 
var obj = data[0];

 //your setting
var config = {
  apiKey: obj.apiKey,             
  authDomain: obj.authDomain,      
  databaseURL: obj.databaseURL,
  projectId: obj.projectId,
  storageBucket: obj.storageBucket,
  messagingSenderId: obj.messagingSenderId
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;