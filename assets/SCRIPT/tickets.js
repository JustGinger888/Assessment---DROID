
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

  var submit = document.getElementById("submit");

// Listen For Submit
document.getElementById('ticketForm').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
    
    var message = getInputValue('messageBox');

    //save message
    saveMessages(message);
}

function displayConfirmation() {
    alert("I am an alert box!");
}

//get form values
function getInputValue(id) {
    return document.getElementById(id).value
}

//save messages
function saveMessages(message) {
    db.collection("Tickets").doc().set({
        message: message
    })
    .then(function() {
        console.log("Ticket successfully created!");
        alert("Ticket successfully created!");
    })
    .catch(function(error) {
        alert("Error Creating Ticket!");
    })
}

function GetData() {
    document.getElementById('gridContainer').innerHTML = "";
    db.collection("Tickets").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            document.getElementById('gridContainer').innerHTML +=  
            "<div class='item card'>"+ doc.data().message +"</div>";
        });
    });
     
}

