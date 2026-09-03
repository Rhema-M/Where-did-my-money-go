const API_URL = "http://127.0.0.1:5000";

let transactionToDelete = null;
let transactionToEdit = null;

const deleteModal = document.getElementById("delete-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

async function loadTransactions() {

    try {

        const response = await fetch(`${API_URL}/transactions`);
        const transactions = await response.json();

        const filteredTransactions = filterTransactions(transactions);
        displayTransactions(filteredTransactions);

        document.getElementById("transaction-count").textContent = filteredTransactions.length;

    } catch (error) {

        console.error("Error loading transactions:", error);

    }

}

async function editTransaction(id) {

    transactionToEdit = id;

    try {

        const response = await fetch(`${API_URL}/transactions/${id}`);
        const transaction = await response.json();

        document.getElementById("title").value = transaction.title;
        document.getElementById("amount").value = transaction.amount;
        document.getElementById("transaction-type").value = transaction.transaction_type;
        document.getElementById("category").value = transaction.category_id;

        const date = new Date(transaction.transaction_date);
        const formattedDate = date.toISOString().split("T")[0];

        document.getElementById("transaction-date").value = formattedDate;
        document.getElementById("notes").value = transaction.notes || "";
        document.querySelector("#transaction-form button").textContent = "Update Transaction";

    } catch (error) {
        console.error("Error loading transaction:", error);
    }

}

function filterTransactions(transactions) {

    const searchTerm = document
        .getElementById("search-transactions")
        .value
        .toLowerCase()
        .trim();

    const filterType = document
        .getElementById("filter-type")
        .value;

    const filterCategory = document
        .getElementById("filter-category")
        .value;

    return transactions.filter(transaction => {

        const title = transaction.title.toLowerCase();

        const matchesSearch = title.includes(searchTerm);

        const matchesType =
            filterType === "all" ||
            transaction.transaction_type === filterType;

        const matchesCategory =
            filterCategory === "all" ||
            transaction.category_id === parseInt(filterCategory);

        return matchesSearch && matchesType && matchesCategory;

    });

}

function displayTransactions(transactions) {

    const tableBody = document.getElementById("transaction-list");

    tableBody.innerHTML = "";

            if (transactions.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="no-transactions">
                        No transactions found.
                    </td>
                </tr>
            `;

            return;
        }

    transactions.forEach(transaction => {

        const row = `
            <tr>
                <td>${transaction.transaction_date}</td>
                <td>${transaction.title}</td>
                <td>${transaction.category}</td>
                <td>R ${parseFloat(transaction.amount).toFixed(2)}</td>
                <td>
                    <button class="edit-btn" onclick="editTransaction(${transaction.id})">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
                        Delete
                    </button>
                </td>
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

            const title = document.getElementById("title").value.trim();
            const amount = parseFloat(document.getElementById("amount").value);
            const transactionType = document.getElementById("transaction-type").value;
            const categoryId = parseInt(document.getElementById("category").value);
            const transactionDate = document.getElementById("transaction-date").value;
            const notes = document.getElementById("notes").value.trim();

            if (title === "") {
                alert("Please enter a description.");
                return;
            }

            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid amount greater than R0.00.");
                return;
            }

            if (!transactionDate) {
                alert("Please select a transaction date.");
                return;
            }

            const transaction = {

                user_id: 1,

                title: title,
                amount: amount,
                transaction_type: transactionType,
                category_id: categoryId,
                transaction_date: transactionDate,
                notes: notes

            };

    try {

        let response;

        if (transactionToEdit !== null) {

            response = await fetch(
                `${API_URL}/transactions/${transactionToEdit}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(transaction)
                }
            );

        } else {

            response = await fetch(
                `${API_URL}/transactions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(transaction)
                }
            );

        }

        const result = await response.json();

        if (!response.ok) {
            alert(result.error || "Something went wrong.");
            return;
        }

        console.log(result);

        transactionForm.reset();

        document.getElementById("search-transactions").value = "";
        document.getElementById("filter-type").value = "all";
        document.getElementById("filter-category").value = "all";

        transactionToEdit = null;

        document.querySelector("#transaction-form button").textContent =
            "Add Transaction";

        loadTransactions();
        loadAnalytics();
        loadCategories();
        loadSpendingTrend();

    } catch (error) {

        console.error("Error saving transaction:", error);

    }

}

function deleteTransaction(id) {

    transactionToDelete = id;

    deleteModal.classList.remove("hidden");

}

async function confirmDeleteTransaction() {

    if (transactionToDelete === null) return;

    try {

        const response = await fetch(
            `${API_URL}/transactions/${transactionToDelete}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        console.log(result);

        closeDeleteModal();

        loadTransactions();
        loadAnalytics();
        loadCategories();
        loadSpendingTrend();

    } catch (error) {

        console.error(error);

    }

}

function closeDeleteModal() {

    transactionToDelete = null;

    deleteModal.classList.add("hidden");

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

const transactionForm = document.getElementById("transaction-form");

const searchInput = document.getElementById("search-transactions");
if (searchInput) {
    searchInput.addEventListener("input", loadTransactions);
}

const filterType = document.getElementById("filter-type");
if (filterType) {
    filterType.addEventListener("change", loadTransactions);
}

const filterCategory = document.getElementById("filter-category");
if (filterCategory) {
    filterCategory.addEventListener("change", loadTransactions);
}

const clearFiltersBtn = document.getElementById("clear-filters");
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {

        document.getElementById("search-transactions").value = "";
        document.getElementById("filter-type").value = "all";
        document.getElementById("filter-category").value = "all";

        loadTransactions();

    });
}

confirmDeleteBtn.addEventListener("click", confirmDeleteTransaction);
cancelDeleteBtn.addEventListener("click", closeDeleteModal);

transactionForm.addEventListener("submit", addTransaction);

loadTransactions();
loadAnalytics();
loadCategories();
loadSpendingTrend();