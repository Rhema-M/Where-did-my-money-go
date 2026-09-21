function loadAnalytics() {

    const balanceElement = document.getElementById("balance");
    const incomeElement = document.getElementById("income");
    const expensesElement = document.getElementById("expenses");

    const transactions = currentFilteredTransactions;

    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {

        const amount = parseFloat(transaction.amount);

        if (transaction.transaction_type === "income") {
            income += amount;
        }

        if (transaction.transaction_type === "expense") {
            expenses += amount;
        }

    });

    const balance = income - expenses;

    balanceElement.textContent =
        `R ${balance.toFixed(2)}`;

    incomeElement.textContent =
        `R ${income.toFixed(2)}`;

    expensesElement.textContent =
        `R ${expenses.toFixed(2)}`;

    balanceElement.classList.remove(
        "positive",
        "negative",
        "neutral"
    );

    if (balance > 0) {
        balanceElement.classList.add("positive");
    } else if (balance < 0) {
        balanceElement.classList.add("negative");
    } else {
        balanceElement.classList.add("neutral");
    }

    incomeElement.classList.add("summary-income");
    expensesElement.classList.add("summary-expense");

}

function loadCategories() {

    const categoryBreakdown =
        document.getElementById("category-breakdown");

    categoryBreakdown.innerHTML = "";

    const transactions = currentFilteredTransactions;

    const expenses = transactions.filter(transaction =>
        transaction.transaction_type === "expense"
    );

    if (expenses.length === 0) {

        categoryBreakdown.innerHTML = `
            <p class="empty-message">
                No spending data available.
            </p>
        `;

        return;
    }

    const categoryTotals = {};

    expenses.forEach(transaction => {

        const category = transaction.category;

        const amount = parseFloat(transaction.amount);

        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += amount;

    });

    const categories = Object.entries(categoryTotals)
        .map(([category, total]) => ({
            category: category,
            total: total
        }))
        .sort((a, b) => b.total - a.total);

    const totals = categories.map(category =>
        category.total
    );

    const maxTotal = Math.max(...totals);

    const totalSpending = totals.reduce(
        (sum, value) => sum + value,
        0
    );

    categories.forEach(category => {

        const total = category.total;

        const percentage =
            (total / maxTotal) * 100;

        const spendingPercentage =
            (total / totalSpending) * 100;

        const categoryItem =
            document.createElement("div");

        categoryItem.className = "category-item";

        categoryItem.innerHTML = `
            <div class="category-header">

                <span class="category-name">
                    ${category.category}
                </span>

                <span class="category-total">
                    R ${total.toFixed(2)}
                    (${spendingPercentage.toFixed(1)}%)
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

}

function loadSpendingTrend() {

    const trendData =
        document.getElementById("trend-data");

    trendData.innerHTML = "";

    const transactions = currentFilteredTransactions;

    const expenses = transactions.filter(transaction =>
        transaction.transaction_type === "expense"
    );

    if (expenses.length === 0) {

        trendData.innerHTML = `
            <p class="empty-message">
                No spending trend data available.
            </p>
        `;

        return;
    }

    const dailyTotals = {};

    expenses.forEach(transaction => {

        const date = transaction.transaction_date;
        const amount = parseFloat(transaction.amount);

        if (!dailyTotals[date]) {
            dailyTotals[date] = 0;
        }

        dailyTotals[date] += amount;

    });

    const trend = Object.entries(dailyTotals)
        .map(([date, total]) => ({
            transaction_date: date,
            total: total
        }))
        .sort((a, b) =>
            new Date(a.transaction_date) -
            new Date(b.transaction_date)
        );

    const totals = trend.map(day =>
        day.total
    );

    const maxTotal = Math.max(...totals);

    trend.forEach(day => {

        const total = day.total;

        const percentage =
            (total / maxTotal) * 100;

        const date =
            new Date(day.transaction_date);

        const formattedDate =
            date.toLocaleDateString("en-ZA", {
                day: "2-digit",
                month: "short"
            });

        const trendItem =
            document.createElement("div");

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

}

