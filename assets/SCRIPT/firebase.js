//----------------------------------------------------- Listen
document.getElementById('loginForm').addEventListener('submit', submitLogin);
document.getElementById('registerForm').addEventListener('submit', submitRegister);


//----------------------------------------------------- signIn
function submitLogin(e) {
  e.preventDefault();

  //Get Values
  var uMail = getInputVal('emailLog');
  var uPassword = getInputVal('passwordLog');

  console.log(uMail);
  console.log(uPassword);

  toggleSignIn(uMail, uPassword)
}

function toggleSignIn(email, password) {
  var success = false;
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      document.getElementById("LogReg").style.display = "none";
      document.getElementById("SignOut").style.display = "block";
      document.getElementById("dashboard").style.display = "block";
      document.getElementById("dashboardLink").style.color = "#f7f7ff";   
      document.getElementById('id01').style.display='none';
      document.getElementById("loginForm").reset()
      }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      console.log(success);
      // document.getElementById('signIn').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  //document.getElementById('signIn').disabled = true;
}


//----------------------------------------------------- signOut
function handleSignOut(e) {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
  document.getElementById("LogReg").style.display = "block";
  document.getElementById("SignOut").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
}


//----------------------------------------------------- signUp
function submitRegister(e) {
  e.preventDefault();

  //Get Values
  var uMail = getInputVal('emailReg');
  var uPassword = getInputVal('passwordReg');

  //console.log(username);
  console.log(uMail);
  console.log(uPassword);

  handleSignUp(uMail, uPassword)
}

function handleSignUp(email, password) {
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    document.getElementById("LogReg").style.display = "none";
    document.getElementById("SignOut").style.display = "block";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("dashboardLink").style.color = "#f7f7ff";   
    document.getElementById('id02').style.display='none';
    }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
}


//----------------------------------------------------- Password Reset
function sendPasswordReset() {
  var email = document.getElementById('emailLog').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}

//----------------------------------------------------- initApp 
//handles setting up UI event listeners and registering Firebase auth listeners: - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or out, and that is where we update the UI.
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function (user) {
    // [START_EXCLUDE silent]
    //document.getElementById('verifyEmail').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('signIn').textContent = 'Sign out';
      //if (!emailVerified) {
        //document.getElementById('verifyEmail').disabled = false;
      //}
      document.getElementById("LogReg").style.display = "none";
      document.getElementById("SignOut").style.display = "block";
      document.getElementById("dashboard").style.display = "block"; 
      document.getElementById("dashboardLink").style.color = "#f7f7ff";       
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById('signIn').textContent = 'Sign in';
      document.getElementById("LogReg").style.display = "block";
      document.getElementById("LogReg").style.display = "block";
      document.getElementById("SignOut").style.display = "none";
      document.getElementById("dashboard").style.display = "none";   
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById('signIn').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]

  document.getElementById('signIn').addEventListener('click', toggleSignIn, false);
  document.getElementById('signUp').addEventListener('click', handleSignUp, false);
  document.getElementById('signUp').addEventListener('click', handleSignOut, false);
  //document.getElementById('verifyEmail').addEventListener('click', sendEmailVerification, false);
  document.getElementById('passwordReset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function () {
  initApp();
};


//Get Input
function getInputVal(id) {
  return document.getElementById(id).value;
}

