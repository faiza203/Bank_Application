// Elements
const loadingDiv = document.getElementById("loading");
const contentDiv = document.getElementById("content");
const loginUserName = document.getElementById("login_user_name");
const loginForm = document.getElementById("login_form");
const loginEmail = document.getElementById("login_email");
const loginPassword = document.getElementById("login_password");
const loginForgetPassword = document.getElementById("login_forget_password");
const loginSubmitBtn = document.getElementById("login_submit_btn");
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
    const firestore = firebase.firestore();
    loginForm.addEventListener("submit", (e) => {
        startLoading();
        e.preventDefault();
        const promise = auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
        promise.then(function ({ user }) {
            const userId = { user }.user.u.src.uid;
            const userName = loginUserName.value;
            const userEmail = loginEmail.value;
            localStorage.setItem("userEmail" , userEmail);
            localStorage.setItem("userName" , userName);
            localStorage.setItem("userId" , userId);
            const userInformation = {
                userName: loginUserName.value,
                email: loginEmail.value,
                balance : 0,
            }
            sendToFirestore(userId, userInformation)
            stopLoading();

        });

        
        promise.catch(function (err) {
            alert(err.message);
            stopLoading();
        })
    })
    function sendToFirestore(userId, userInformation) {
        const doc = firestore.doc(`users/${userId}/${userInformation.userName}/user Information`);
        doc
            .set({
                userInformation,
            })
            .then(() => {
                window.location.href = "dashboard.html";
                stopLoading();
            })
            .catch((err) => {
                alert("Got an error !!!");
                console.log(err);
                stopLoading();
            });
    }

}());

registerPageBtn.addEventListener("click", () => {
    window.location.href = "register.html";
});

function startLoading() {
    loadingDiv.style.display = "block";
    contentDiv.style.display = "none";
}
function stopLoading() {
    loadingDiv.style.display = "none";
    contentDiv.style.display = "block";
}
 
