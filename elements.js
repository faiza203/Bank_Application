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

cancleTransaction.addEventListener("click",()=>{

    addNewTransactionForm.style.display = "none";
})

addNewTransaction.addEventListener("click", () => {
    addNewTransactionForm.style.display = "block" ;
});


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
