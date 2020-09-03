// Elements
const loadingDiv = document.getElementById("loading");
const contentDiv = document.getElementById("content");
const bankBalanceAmount = document.getElementById("bank-banalce-amount");
const transcationHistory = document.getElementById("transcation-history");
const addNewTransaction = document.getElementById("add_new_transaction");
const addNewTransactionForm = document.getElementById("add_new_transaction_form");
const addNewTransactionDiv = document.getElementById("add_new_transaction");
const addNewTransactionAmount = document.getElementById("amount");
const addTransaction = document.getElementById("add_transaction");
const delTransaction = document.getElementById("del_transaction");
const cancleTransaction = document.getElementById("cancle_transaction");
const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");
const historyId = uuid();

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
    firestore
        .collection("users")
        .doc(`${userId}`)
        .collection("user Information")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const { userInformation } = doc.data();
                localStorage.setItem("alreadyBalance", { userInformation }.userInformation.balance);
                bankBalanceAmount.innerText = "Bank Balance : " + localStorage.getItem("alreadyBalance");
            });
        })
        .catch((err) => {
            alert(err.message)
        })

    addNewTransactionForm.addEventListener("submit", (e) => e.preventDefault());
    addTransaction.addEventListener("click", addAmountInFireBase);
    delTransaction.addEventListener("click", delAmountInFireBase);
    cancleTransaction.addEventListener("click", () => addNewTransactionForm.style.display = "none");
    function addAmountInFireBase() {
        const docRef = firestore.doc(`users/${userId}/user Information/${userName}`);
        const alreadyBalance = localStorage.getItem("alreadyBalance");
        docRef.update({
            userInformation: {
                name: userName,
                email: userEmail,
                balance: parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value),
            }
        })
            .then(() => {
                alert("Document Updated in firebase");
                generateHistoryElements("Deposit Amount");
                addNewTransactionForm.style.display = "none";
                localStorage.setItem("alreadyBalance", parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value));
                bankBalanceAmount.innerText = "Bank Balance : " + localStorage.getItem("alreadyBalance");
            })
            .catch((err) => {
                alert("Error in updating amount in firebase");
                addNewTransactionForm.style.display = "none";
                console.log(err);
            });
    }
    function delAmountInFireBase() {
        const docRef = firestore.doc(`users/${userId}/user Information/${userName}`);
        const alreadyBalance = localStorage.getItem("alreadyBalance");
        docRef.update({
            userInformation: {
                name: userName,
                email: userEmail,
                balance: parseInt(alreadyBalance) - parseInt(addNewTransactionAmount.value),
            }
        })
            .then(() => {
                alert("Document Updated in firebase");
                generateHistoryElements("Widraw Amount");
                addNewTransactionForm.style.display = "none";
                localStorage.setItem("alreadyBalance", parseInt(alreadyBalance) - parseInt(addNewTransactionAmount.value));
                bankBalanceAmount.innerText = "Bank Balance : " + localStorage.getItem("alreadyBalance");
            })
            .catch((err) => {
                alert("Error in updating amount in firebase");
                addNewTransactionForm.style.display = "none";
                console.log(err);
            });
    }
}());

function generateHistoryElements(condition) {
    const div = document.createElement("div");
    div.id = uuid;
    if (condition === "Deposit Amount") {
        const alreadyBalance = localStorage.getItem("alreadyBalance");
        div.innerHTML = `<p class="ml-3 font-weight-lighter">Before Transaction : ${alreadyBalance} , After Transaction : ${parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value)} , ${condition}_ ${addNewTransactionAmount.value} , Time :${new Date()}`;
        transcationHistory.appendChild(div);
    } else if (condition === "Widraw Amount") {
        const alreadyBalance = localStorage.getItem("alreadyBalance");
        div.innerHTML = `<p class="ml-3 font-weight-lighter">Before Transaction : ${alreadyBalance} , After Transaction : ${parseInt(alreadyBalance) - parseInt(addNewTransactionAmount.value)} , ${condition}_ ${addNewTransactionAmount.value} , Time :${new Date()}`;
        transcationHistory.appendChild(div)
    }
}

function startLoading() {
    loadingDiv.style.display = "block";
    contentDiv.style.display = "none";
}

function stopLoading() {
    loadingDiv.style.display = "none";
    contentDiv.style.display = "block";
}
