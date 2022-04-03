const doLogin = function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    login({
        username: username,
        password: password
    }).then(function(res) {
        if (res.status === 200) {
            window.location.href = "home.html";
        } 
        else{
            alert('Could not auth user.'); //redundant with auth.controller, how to display msg?
        }
    });
};


const doRegister = function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    
    register({
        username: username,
        password: password,
        email: email
    }).then(function(res) {
        if (res.status === 500) {
            alert('Could not register user.'); //redundant with auth.controller, how to display msg?
        } 
        else{
            window.location.href = "home.html";
        }
    });
};

const doLogout = function(e) {
    e.preventDefault();
};

var currentPhrase = "";

//replacement for MongoDB until that functionality is implemented (limited)
var icebreakers = [
    "What do you think of",
    "How about them",
    "Why do you like those"
];

var subjects = [
    "Eagles",
    "Steelers",
    "Cowboys"
];

/*class User{
    username;
    password;
    email;

    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

function loginAttempt(username, password, email) {
    let enteredCredentials = new User(username, password);
    let authenticationMessage = autenticateOnlyUser(enteredCredentials); //not a realistic implementation
    alert(authenticationMessage);
}

function createAccountAttempt(username, password, email) {
    alert("Can't create account yet. What are your thoughts on account creation?");
}

function autenticateOnlyUser(enteredCredentials) { 
    let output = "No users yet, just a few bland phrases...isn't that a shame?";
    return (output);
}*/

function generatePhrase() {
    let icebreaker = icebreakers[Math.floor(icebreakers.length*Math.random())]; 
    let subject = subjects[Math.floor(subjects.length*Math.random())];
    currentPhrase = icebreaker + " " + subject + "?";
    document.getElementById("generatePhrase").innerHTML = currentPhrase;
    document.getElementById('generatePhrase').innerHTML += '<button type="button" onclick="savePhrase();">Save Phrase</button>'
}

function savePhrase() {
    alert("Oops! Can't save phrase yet. Wouldn't you like this feature?");
}