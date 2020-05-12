var firebaseConfig = {
    apiKey: "AIzaSyDdi476d9Zkv-tGmbgwLg5Q0Fc-d2Oc2jQ",
    authDomain: "webtechassessment2.firebaseapp.com",
    databaseURL: "https://webtechassessment2.firebaseio.com",
    projectId: "webtechassessment2",
    storageBucket: "webtechassessment2.appspot.com",
    messagingSenderId: "552477184206",
    appId: "1:552477184206:web:0620b54b1dd74e6573c09f",
    measurementId: "G-Q4YNRWMH0M"
  };


  var app = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore(app);

// Listen For Submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
    
    var name = getInputValue('nameContact');
    var email = getInputValue('emailContact');
    var number = getInputValue('numberContact');
    var message = getInputValue('messageBox');

    //save message
    saveMessages(name, email, number, message);
}

function displayConfirmation() {
    alert("I am an alert box!");
}

//get form values
function getInputValue(id) {
    return document.getElementById(id).value
}

//save messages
function saveMessages(name, email, number, message) {
    db.collection("Messages").doc().set({
        name: name,
        state: email,
        country: number,
        message: message
    })
    .then(function() {
        console.log("Document successfully written!");
        alert("Message successfully submitted!");
    })
    .catch(function(error) {
        alert("Error Submitting Message!");
    });
}