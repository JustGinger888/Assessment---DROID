//Nav
toggleNav = () => {
    $('.menuToggle').click(function () {
        $('nav').toggleClass('active')
    })
}
//Nav


//Form Validation
function formValidation() {
    var username = document.registration.username;
    var uemail = document.registration.email;
    var password = document.registration.password;
    var passwordRepeat = document.registration.passwordRepeat;
    if (usernameValidation(username, 5, 32)) {
        if (validateEmail(uemail)) {
            if (passwordValidation(password, 8, 64)) {
                    if (passwordRepeatValidation(password,passwordRepeat)) {
                        return true;
                    }
                }
            }
        }
    return false;
}

function usernameValidation(uid, mx, my) {
    var uid_len = uid.value.length;
    if (uid_len == 0 || uid_len >= my || uid_len < mx) {
        alert("Username should not be empty / length be between " + mx + " to " + my);
        uid.focus();
        return false;
    }
    return true;
}

function validateEmail(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.value.match(mailformat)) {
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}

function passwordValidation(password, mx, my) {
    var password_len = password.value.length;
    if (password_len == 0 || password_len >= my || password_len < mx) {
        alert("Password should not be empty / length be between " + mx + " to " + my);
        password.focus();
        return false;
    }
    return true;
}

function passwordRepeatValidation(password, passwordRepeat) {
    if (password.value !== passwordRepeat.value) {
        console.log(password.value + passwordRepeat.value);
        alert("Ensure that passwords match one another");
        password.focus();
        return false;
    }
    return true;
}
//Form Validation

//Modal Close
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  else if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

//Modal Close