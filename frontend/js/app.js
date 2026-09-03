const API_URL = "http://127.0.0.1:5000";

async function loadTransactions() {

    try {

        const response = await fetch(`${API_URL}/transactions`);
        const transactions = await response.json();

        displayTransactions(transactions);

        document.getElementById("transaction-count").textContent = transactions.length;

    } catch (error) {

        console.error("Error loading transactions:", error);

    }

}

function displayTransactions(transactions) {

    const tableBody = document.getElementById("transaction-list");

    tableBody.innerHTML = "";

    transactions.forEach(transaction => {

        const row = `
            <tr>
                <td>${transaction.transaction_date}</td>
                <td>${transaction.title}</td>
                <td>${transaction.category}</td>
                <td>R ${transaction.amount}</td>
            </tr>
        `;

        tableBody.innerHTML += row;

    });

}

async function loadAnalytics() {

    try {

        const response = await fetch(`${API_URL}/analytics/summary`);
        const analytics = await response.json();

        document.getElementById("balance").textContent =
            `R ${analytics.balance.toFixed(2)}`;

        document.getElementById("income").textContent =
            `R ${analytics.income.toFixed(2)}`;

        document.getElementById("expenses").textContent =
            `R ${analytics.expenses.toFixed(2)}`;

    } catch (error) {

        console.error("Error loading analytics:", error);

    }

}

loadTransactions();
loadAnalytics();