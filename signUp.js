// Elements
const registerForm = document.getElementById("register_form");
const registerEmail = document.getElementById("register_email");
const registerPassword = document.getElementById("register_password");
const registerConfirmPassword = document.getElementById("register_confirm_password");
const registerSubmitBtn = document.getElementById("register_submit_btn");


// Initialize Firebase
(function () {
    const config = {
        apiKey: "AIzaSyAZX5VgMVNTyz-J_UUoCFuXIFK48pk7mzU",
        authDomain: "common-50c43.firebaseapp.com",
        databaseURL: "https://common-50c43.firebaseio.com",
        projectId: "common-50c43",
        storageBucket: "common-50c43.appspot.com",
        messagingSenderId: "670911494230",
        appId: "1:670911494230:web:ecefbb05d31dc80d75a3f7",
        measurementId: "G-VBPMYERL4D"
    };
    firebase.initializeApp(config);
    firebase.analytics();

    const auth = firebase.auth();
    

}());
