// Elements
const loadingDiv = document.getElementById("loading");
const contentDiv = document.getElementById("content");
const bankBalanceAmount = document.getElementById("bank-banalce-amount");
const transcationHistory = document.getElementById("transcation-history");
const addNewTransaction = document.getElementById("add_new_transaction");
const addNewTransactionForm = document.getElementById("add_new_transaction_form");
const addNewTransactionAmount = document.getElementById("add_new_transaction");
const addTransaction = document.getElementById("add_transaction");
const delTransaction = document.getElementById("del_transaction");
const cancleTransaction = document.getElementById("cancle_transaction");
const userId = localStorage.getItem("userId");

addNewTransaction.addEventListener("click", () => {
    addNewTransactionForm.style.display = "block";
});

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
    const firestore = firebase.firestore();
    function fecthHistory() {
        firestore
            .collection("users")
            .doc(`${userId}`)
            .collection("user Information")
            .get()
            .then((querySnapshot) => {
             querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                });
            })
            .catch((err) => {
                alert(err.message)
            })
        // .then((querySnapshot) => {
        //     querySnapshot.forEach(function (doc) {
        //         const { balance } = doc.data();
        //         console.log(balance);
        //         alert("I am comlpeted");
        //         stopLoading();
        //     });
        // })
        // .catch((err) => {
        //     alert("Error in fetching history");
        //     console.log(err);
        //     stopLoading();
        // });
    }
    fecthHistory();
}());


function startLoading() {
    loadingDiv.style.display = "block";
    contentDiv.style.display = "none";
}

function stopLoading() {
    loadingDiv.style.display = "none";
    contentDiv.style.display = "block";
}

function generateHistoryElements(amount, condition) {
    const div = document.createElement("div");
    div.id = userId;
    div.innerHTML = `<p>${amount}</p> is ${condition}`;
    transcationHistory.appendChild(div);
}