// Elements
const loadingDiv = document.getElementById("loading");
const contentDiv = document.getElementById("content");
const registerUserName = document.getElementById("register_user_name");
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
    registerForm.addEventListener("submit", (e) => {
        startLoading();
        e.preventDefault();
        if (registerPassword.value === registerConfirmPassword.value) {
            const promise = auth.createUserWithEmailAndPassword(registerEmail.value, registerPassword.value)
            promise.then(function ({ user }) {
                alert("Create account sucessfully");
                window.location.href = "index.html";
                stopLoading();
            });
            promise.catch(function (err) {
                alert(err.message);
                stopLoading();
            })
        } else {
            alert("Password does not matched")
        }
    })
}());

function startLoading() {
    loadingDiv.style.display = "block";
    contentDiv.style.display = "none";
}
function stopLoading() {
    loadingDiv.style.display = "none";
    contentDiv.style.display = "block";
}