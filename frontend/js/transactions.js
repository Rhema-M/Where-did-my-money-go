async function loadTransactions() {

    const tableBody = document.getElementById("transaction-list");

    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-message">
                Loading transactions...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(`${API_URL}/transactions`, {
            headers: getAuthHeaders()
        });

        if (handleUnauthorized(response)) return;

        const transactions = await response.json();

        const filteredTransactions = filterTransactions(transactions);
        displayTransactions(filteredTransactions);

        document.getElementById("transaction-count").textContent =
            `${filteredTransactions.length} transaction${filteredTransactions.length === 1 ? "" : "s"}`;

    } catch (error) {

        console.error("Error loading transactions:", error);

    }

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

        const date = new Date(transaction.transaction_date);

        const formattedDate = date.toLocaleDateString("en-ZA", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

                const amount = parseFloat(transaction.amount).toFixed(2);
        const amountClass =
            transaction.transaction_type === "income"
                ? "income"
                : "expense";
        const amountSign =
            transaction.transaction_type === "income"
                ? "+"
                : "−";

        const row = `
            <tr>
                <td>${formattedDate}</td>
                <td>${transaction.title}</td>
                <td>${transaction.category}</td>
                <td class="${amountClass}">${amountSign} R ${amount}</td>
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

async function editTransaction(id) {

    transactionToEdit = id;

    try {

        const response = await fetch(`${API_URL}/transactions/${id}`, {
            headers: getAuthHeaders()
        });

        if (handleUnauthorized(response)) return;

        const transaction = await response.json();

        if (!response.ok) {
            showNotification(transaction.error || "Unable to load transaction.", "error");
            return;
        }

        document.getElementById("title").value = transaction.title;
        document.getElementById("amount").value = transaction.amount;
        document.getElementById("transaction-type").value = transaction.transaction_type;
        document.getElementById("category").value = transaction.category_id;

        const date = new Date(transaction.transaction_date);
        const formattedDate = date.toISOString().split("T")[0];

        document.getElementById("transaction-date").value = formattedDate;
        document.getElementById("notes").value = transaction.notes || "";

        document.querySelector("#transaction-form button").textContent = "Update Transaction";

        document.getElementById("cancel-edit-btn").classList.remove("hidden");

    } catch (error) {
        console.error("Error loading transaction:", error);
    }

}

function cancelEdit() {

    transactionToEdit = null;

    transactionForm.reset();

    document.getElementById("submit-btn").textContent =
        "Add Transaction";

    document
        .getElementById("cancel-edit-btn")
        .classList.add("hidden");

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
                showNotification("Please enter a description.", "error");
                return;
            }

            if (isNaN(amount) || amount <= 0) {
                showNotification("Please enter a valid amount greater than R0.00.", "error");
                return;
            }

            if (!transactionDate) {
                showNotification("Please select a transaction date.", "error");
                return;
            }

            const transaction = {

                title: title,
                amount: amount,
                transaction_type: transactionType,
                category_id: categoryId,
                transaction_date: transactionDate,
                notes: notes

            };

    const isEditing = transactionToEdit !== null;

    const submitButton = document.querySelector("#transaction-form button");

    try {

        submitButton.disabled = true;
        submitButton.textContent = "Saving...";

        let response;

        if (transactionToEdit !== null) {

            response = await fetch(
                `${API_URL}/transactions/${transactionToEdit}`,
                {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(transaction)
                }
            );

        } else {

            response = await fetch(
                `${API_URL}/transactions`,
                {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(transaction)
                }
            );

        }
        
        if (handleUnauthorized(response)) return;

        const result = await response.json();

        if (!response.ok) {
            showNotification(result.error || "Something went wrong.", "error");
            return;
        }

        showNotification(
            transactionToEdit === null
                ? "Transaction added successfully!"
                : "Transaction updated successfully!"
        );

        transactionForm.reset();

        document.getElementById("search-transactions").value = "";
        document.getElementById("filter-type").value = "all";
        document.getElementById("filter-category").value = "all";

        transactionToEdit = null;

        document.getElementById("cancel-edit-btn").classList.add("hidden");

        document.querySelector("#transaction-form button").textContent =
            "Add Transaction";

        loadTransactions();
        loadAnalytics();
        loadCategories();
        loadSpendingTrend();

    } catch (error) {

        console.error("Error saving transaction:", error);

        showNotification(
            "Unable to save the transaction. Please try again.",
            "error"
        );

    } finally {

        submitButton.disabled = false;

        submitButton.textContent =
            transactionToEdit === null
                ? "Add Transaction"
                : "Update Transaction";

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
                method: "DELETE",
                headers: getAuthHeaders()
            }
        );

        if (handleUnauthorized(response)) return;

        const result = await response.json();

        showNotification("Transaction deleted successfully!");

        closeDeleteModal();

        loadTransactions();
        loadAnalytics();
        loadCategories();
        loadSpendingTrend();

    } catch (error) {

        console.error(error);

    }

}