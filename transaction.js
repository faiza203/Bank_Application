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
    firestore
        .collection("users")
        .doc(`${userId}`)
        .collection("user Information")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                const { userInformation } = doc.data();
                console.log({ userInformation });
                generateHistoryElements({ userInformation }.userInformation.balance)
            });
        })
        .catch((err) => {
            alert(err.message)
        })

    addNewTransaction.addEventListener("click", () => {
        addNewTransactionForm.style.display = "block";
        addNewTransactionForm.addEventListener("submit", (e) => {
            e.preventDefault();
        })
    });
  
    function updateFireBase(){
        
    }

}());


function startLoading() {
    loadingDiv.style.display = "block";
    contentDiv.style.display = "none";
}

function stopLoading() {
    loadingDiv.style.display = "none";
    contentDiv.style.display = "block";
}

function generateHistoryElements(amount) {
    const div = document.createElement("div");
    div.id = userId;
    div.innerHTML = `<p class="m-3 p-2 text-center" style="background-image:linear-gradient(to bottom, #dee2e6,#f8f9fa)
    ">${amount}</p> `;
    transcationHistory.appendChild(div);
}