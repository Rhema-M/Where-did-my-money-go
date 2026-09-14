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