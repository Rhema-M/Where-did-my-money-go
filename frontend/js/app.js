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

async function addTransaction(event) {

    event.preventDefault();

    const transaction = {

        user_id: 1,

        title: document.getElementById("title").value,
        amount: parseFloat(document.getElementById("amount").value),
        transaction_type: document.getElementById("transaction-type").value,
        category_id: parseInt(document.getElementById("category").value),
        transaction_date: document.getElementById("transaction-date").value,
        notes: document.getElementById("notes").value

    };

    const response = await fetch(`${API_URL}/transactions`, {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction)

    });

    const result = await response.json();
    console.log(result);

    transactionForm.reset();

    loadTransactions();
    loadAnalytics();

}

async function loadCategories() {

    try {

        const response = await fetch(`${API_URL}/analytics/categories`);
        const categories = await response.json();

        const categoryBreakdown =
            document.getElementById("category-breakdown");

        categoryBreakdown.innerHTML = "";

        if (categories.length === 0) {

            categoryBreakdown.innerHTML =
                "<p>No expense data available.</p>";

            return;
        }

        const totals = categories.map(category =>
            parseFloat(category.total)
        );

        const maxTotal = Math.max(...totals);

        categories.forEach(category => {

            const total = parseFloat(category.total);

            const percentage = (total / maxTotal) * 100;

            const categoryItem = document.createElement("div");

            categoryItem.className = "category-item";

            categoryItem.innerHTML = `
                <div class="category-header">

                    <span class="category-name">
                        ${category.category}
                    </span>

                    <span class="category-total">
                        R ${total.toFixed(2)}
                    </span>

                </div>

                <div class="category-bar">

                    <div
                        class="category-fill"
                        style="width: ${percentage}%">
                    </div>

                </div>
            `;

            categoryBreakdown.appendChild(categoryItem);

        });

    } catch (error) {
        console.error("Error loading categories:", error);
    }

}

async function loadSpendingTrend() {

    try {

        const response = await fetch(`${API_URL}/analytics/trend`);
        const trend = await response.json();

        const trendData = document.getElementById("trend-data");

        trendData.innerHTML = "";

        if (trend.length === 0) {

            trendData.innerHTML =
                "<p>No spending data available.</p>";

            return;
        }

        const totals = trend.map(day =>
            parseFloat(day.total)
        );

        const maxTotal = Math.max(...totals);

        trend.forEach(day => {

            const total = parseFloat(day.total);

            const percentage = (total / maxTotal) * 100;

            const date = new Date(day.transaction_date);

            const formattedDate = date.toLocaleDateString("en-ZA", {
                day: "2-digit",
                month: "short"
            });

            const trendItem = document.createElement("div");

            trendItem.className = "trend-item";

            trendItem.innerHTML = `
                <div class="trend-header">

                    <span class="trend-date">
                        ${formattedDate}
                    </span>

                    <span class="trend-total">
                        R ${total.toFixed(2)}
                    </span>

                </div>

                <div class="trend-bar">

                    <div
                        class="trend-fill"
                        style="width: ${percentage}%">
                    </div>

                </div>
            `;

            trendData.appendChild(trendItem);

        });

    } catch (error) {

        console.error("Error loading spending trend:", error);

    }

}

loadTransactions();
loadAnalytics();
loadCategories();
loadSpendingTrend();

const transactionForm = document.getElementById("transaction-form");
transactionForm.addEventListener("submit", addTransaction);

