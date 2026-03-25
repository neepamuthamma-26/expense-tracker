let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add Transaction
function addTransaction() {
    const text = document.getElementById("text").value;
    const amount = document.getElementById("amount").value;

    if (text === "" || amount === "") {
        alert("Please enter details");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text,
        amount: +amount
    };

    transactions.push(transaction);

    updateUI();
    updateLocalStorage();

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
}

// Update UI
function updateUI() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let balance = 0;
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${t.text}: ₹${t.amount}
            <button onclick="deleteTransaction(${t.id})">❌</button>
        `;

        list.appendChild(li);

        balance += t.amount;

        if (t.amount > 0) {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    document.getElementById("balance").innerText = balance;
}

// Delete Transaction
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);

    updateUI();
    updateLocalStorage();
}

// Save to localStorage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load data when page opens
updateUI();