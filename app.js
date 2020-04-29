const firebase = require('firebase');
const fs = require('fs');

const firebaseConfig = {
  apiKey: "AIzaSyC8woTZJM1TUhI-DS--oZQzE2fNBm6h-cQ",
  authDomain: "capstone-backend-e69ed.firebaseapp.com",
  databaseURL: "https://capstone-backend-e69ed.firebaseio.com",
  projectId: "capstone-backend-e69ed",
  storageBucket: "capstone-backend-e69ed.appspot.com",
  messagingSenderId: "268494188035",
  appId: "1:268494188035:web:a47bfb8a80dc0240c02836"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

function clear() {
  for (i in 1000) {
    console.log('\n', " ");
  }
}

function write(title, description, userId, id) {
  firebase.database().ref('streams/' + id).set({
    title: title,
    description: description,
    userId: userId,
    id: id
  });
}

let _streams = [];
var watching = false;

let data = fs.readFileSync('db.json');
let streamUpdate = JSON.parse(data);
let s = streamUpdate.streams;

fs.watch("./", (eventType, filename) => {
  if(!watching) {
    watching = true;
    return;
  }
  if (filename) {
    console.log(`event type is: ${eventType}`);
    data = fs.readFileSync('db.json');
    streamUpdate = JSON.parse(data);
    s = streamUpdate.streams;
    firebase.database().ref('streams/').set(s);


    // console output
    console.log("__________________________________")
    console.log(`filename provided: ${filename}`);
    console.log("Adding stream");
    _streams.push(s[s.length - 1]);
    console.log("Streams: ");
    for (i in _streams) {
      console.log(_streams[i]);
    }
    console.log("\n Addition: ");
    let current_stream = _streams[_streams.length - 1];
    console.log(current_stream);
    console.log("__________________________________")
    console.log('\n\n')
    // end console output

  } else {
    console.log('filename not provided');
  }
  setTimeout(() => {
    watching = false;
  }, 100);
})

let streams = firebase.database().ref('streams/');

streams.on('child_changed', (snapshot) => {
  console.log("fired");
  console.log(snapshot.val());
})