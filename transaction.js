
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
        .collection(userName)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const { userInformation } = doc.data();
                // localStorage.setItem("alreadyBalance", { userInformation }.userInformation.balance);
                console.log({userInformation}.userInformation.balance);
                bankBalanceAmount.innerText = "Bank Balance : " + localStorage.getItem("alreadyBalance");
            });
        })
        .catch((err) => {
            alert(err.message);
            console.log(err);
        });

    // function sendToFirestore(history) {
    //     const transactionHistory = {
    //           history,
    //     }
    //     const doc = firestore.doc(`users/${userId}/${userName}/Transaction History`);
    //     doc
    //         .set({
    //             transactionHistory,
    //         })
    //         .then(() => {
    //        alert("Send to firebase")
    //         })
    //         .catch((err) => {
    //             alert("Got an error !!!");
    //             console.log(err);
    //         });
    // }

    // function generateHistoryElements(condition) {
    //     const div = document.createElement("div"); div.id = uuid;
    //     if (condition === "Deposit Amount") {
    //         const alreadyBalance = localStorage.getItem("alreadyBalance");
    //         div.innerHTML = `<p class="ml-3 font-weight-lighter">Before Transaction : ${alreadyBalance} , After Transaction : ${parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value)} , ${condition}_ ${addNewTransactionAmount.value} , Time :${new Date()} </p>`;
    //         transcationHistory.appendChild(div);
    //         const p = {
    //             beforeTransaction : alreadyBalance ,
    //          afterTransaction : parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value),
    //           depositAmount :  addNewTransactionAmount.value ,
    //            Time :new Date()
    //         }
    //         sendToFirestore(p);
    //     } else if (condition === "Widraw Amount") {
    //         const alreadyBalance = localStorage.getItem("alreadyBalance");
    //         div.innerHTML = `<p class="ml-3 font-weight-lighter">Before Transaction : ${alreadyBalance} , After Transaction : ${parseInt(alreadyBalance) - parseInt(addNewTransactionAmount.value)} , ${condition}_ ${addNewTransactionAmount.value} , Time :${new Date()}</p>`;
    //         transcationHistory.appendChild(div);
    //         const p = {
    //             beforeTransaction : alreadyBalance ,
    //          afterTransaction : parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value),
    //           depositAmount :  addNewTransactionAmount.value ,
    //            Time :new Date()
    //         }
    //         sendToFirestore(p);
    //     }
    // }

    // addNewTransactionForm.addEventListener("submit", (e) => e.preventDefault());
    // addTransaction.addEventListener("click", addAmountInFireBase);
    // delTransaction.addEventListener("click", delAmountInFireBase);
    // function addAmountInFireBase() {
    //     if (addNewTransactionAmount.value === "" || undefined || null || NaN) {
    //         alert("Enter valid number");
    //     } else {
    //         const docRef = firestore.doc(`users/${userId}/${userName}/user Information`);
    //         const alreadyBalance = localStorage.getItem("alreadyBalance");
    //         docRef.update({
    //             userInformation: {
    //                 name: userName,
    //                 email: userEmail,
    //                 balance: parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value),
    //             }
    //         })
    //             .then(() => {
    //                 alert("Document Updated in firebase");
    //                 generateHistoryElements("Deposit Amount");
    //                 addNewTransactionForm.style.display = "none";
    //                 localStorage.setItem("alreadyBalance", parseInt(alreadyBalance) + parseInt(addNewTransactionAmount.value));
    //                 bankBalanceAmount.innerText = "Bank Balance : " + localStorage.getItem("alreadyBalance");
    //             })
    //             .catch((err) => {
    //                 alert("Error in updating amount in firebase");
    //                 addNewTransactionForm.style.display = "none";
    //                 console.log(err);
    //             });
    //     }
    // }
    // function delAmountInFireBase() {
    //     if (addNewTransactionAmount.value === "" || undefined || null || NaN) {
    //         alert("Enter valid number");
    //     } else {
    //         const docRef = firestore.doc(`users/${userId}/${userName}/user Information`);
    //         const alreadyBalance = localStorage.getItem("alreadyBalance");
    //         docRef.update({
    //             userInformation: {
    //                 name: userName,
    //                 email: userEmail,
    //                 balance: parseInt(alreadyBalance) - parseInt(addNewTransactionAmount.value),
    //             }
    //         })
    //             .then(() => {
    //                 alert("Document Updated in firebase");
    //                 generateHistoryElements("Widraw Amount");
    //                 addNewTransactionForm.style.display = "none";
    //                 localStorage.setItem("alreadyBalance", parseInt(alreadyBalance) - parseInt(addNewTransactionAmount.value));
    //                 bankBalanceAmount.innerText = "Bank Balance : " + localStorage.getItem("alreadyBalance");
    //             })
    //             .catch((err) => {
    //                 alert("Error in updating amount in firebase");
    //                 addNewTransactionForm.style.display = "none";
    //                 console.log(err);
    //             });


    //     }
    // }
}());
