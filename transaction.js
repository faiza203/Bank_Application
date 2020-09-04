
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
        .doc(userId)
        .collection("user Information")
        .doc(userName)
        .get()
        .then(async function (querySnapshot) {
            const { userInformation } = await querySnapshot.data();
            localStorage.setItem("alreadyBalance", { userInformation }.userInformation.balance);
            bankBalanceAmount.innerText = "Bank Balance : " + localStorage.getItem("alreadyBalance");
        })
        .catch((err) => {
            alert(err.message);
            console.log(err);
        });
    firestore
        .collection("users")
        .doc(userId)
        .collection("Transaction History")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                const transactionHistory = doc.data();
                const beforeTransaction = transactionHistory.transactionHistory.afterTransaction;
                const afterTransaction = transactionHistory.transactionHistory.beforeTransaction;
                const transactionAmount = transactionHistory.transactionHistory.amount;
                const timeInSec = transactionHistory.transactionHistory.time;
                var time = new Date(null);
                time.setTime(timeInSec * 1000);
                generateHistoryElements(beforeTransaction, afterTransaction, transactionAmount, time);
            });
        }).catch((err) => {
            alert(err.message);
            console.log(err);
        });


    function sendToFirestore(beforeTransaction, afterTransaction, amount, time) {
        const transactionHistory = {
            beforeTransaction: beforeTransaction,
            afterTransaction: afterTransaction,
            amount: amount,
            time: time,
        }
        const doc = firestore.doc(`users/${userId}/Transaction History/${historyId}`);
        doc
            .set({
                transactionHistory,
            })
            .then(() => {
                alert("Send to firebase")
            })
            .catch((err) => {
                alert("Got an error !!!");
                console.log(err);
            });
    }

    function generateHistoryElements(beforeTransaction = localStorage.getItem("alreadyBalance"), afterTransaction, amount, time) {
        const div = document.createElement("div");
        div.id = uuid;
        div.innerHTML = `<p class="ml-3 font-weight-lighter">Before Transaction : ${beforeTransaction} , After Transaction: ${afterTransaction} ,  amount_ ${amount} , Time :${time}</p>`;
        transcationHistory.appendChild(div);
    }

    addNewTransactionForm.addEventListener("submit", (e) => e.preventDefault());
    addTransaction.addEventListener("click", addAmountInFireBase);
    delTransaction.addEventListener("click", delAmountInFireBase);
    function addAmountInFireBase() {
        if (addNewTransactionAmount.value === "" || undefined || null || NaN) {
            alert("Enter valid number");
        } else {
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
                    generateHistoryElements(parseInt(alreadyBalance), parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value), parseInt(addNewTransactionAmount.value), new Date());
                    sendToFirestore(parseInt(alreadyBalance), parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value), parseInt(addNewTransactionAmount.value), new Date());
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
    }
    function delAmountInFireBase() {
        if (addNewTransactionAmount.value === "" || undefined || null || NaN) {
            alert("Enter valid number");
        } else {
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
                    generateHistoryElements(parseInt(alreadyBalance), parseInt(alreadyBalance) - parseInt(addNewTransactionAmount.value), parseInt(addNewTransactionAmount.value), new Date());
                    sendToFirestore(parseInt(alreadyBalance), parseInt(alreadyBalance) - parseInt(addNewTransactionAmount.value), parseInt(addNewTransactionAmount.value), new Date());
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
    }
}());