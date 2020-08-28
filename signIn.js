// Elements
const loginForm = document.getElementById("login_form")
const loginEmail = document.getElementById("login_email");
const loginPassword = document.getElementById("login_password");
const loginForgetPassword = document.getElementById("login_forget_password");
const loginSubmitBtn = document.getElementById("login_sumbit_btn");
const registerPageBtn = document.getElementById("register_page_btn");

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
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    })

}());

registerPageBtn.addEventListener("click", () => {
    window.location.href = "register.html";
});

