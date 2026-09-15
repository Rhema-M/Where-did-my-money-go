const welcomeText = document.getElementById("welcome-user");
if (welcomeText && userName) {
    welcomeText.textContent = `Welcome, ${userName}`;
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

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}

transactionForm.addEventListener("submit", addTransaction);

loadTransactions();
loadAnalytics();
loadCategories();
loadSpendingTrend();

