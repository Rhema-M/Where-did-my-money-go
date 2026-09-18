async function loadAnalytics() {

    const balanceElement = document.getElementById("balance");
    const incomeElement = document.getElementById("income");
    const expensesElement = document.getElementById("expenses");

    balanceElement.textContent = "Loading...";
    incomeElement.textContent = "Loading...";
    expensesElement.textContent = "Loading...";

    try {

        const response = await fetch(`${API_URL}/analytics/summary`, {
            headers: getAuthHeaders()
        });

        if (handleUnauthorized(response)) return;

        const analytics = await response.json();

        balanceElement.textContent =
            `R ${analytics.balance.toFixed(2)}`;

        balanceElement.classList.remove("positive", "negative", "neutral");

        if (analytics.balance > 0) {

            balanceElement.classList.add("positive");

        } else if (analytics.balance < 0) {

            balanceElement.classList.add("negative");

        } else {

            balanceElement.classList.add("neutral");

        }

        incomeElement.textContent =
            `R ${analytics.income.toFixed(2)}`;

        expensesElement.textContent =
            `R ${analytics.expenses.toFixed(2)}`;

        incomeElement.classList.add("summary-income");
        expensesElement.classList.add("summary-expense");

    } catch (error) {

        console.error("Error loading analytics:", error);

        balanceElement.textContent = "Unable to load";
        incomeElement.textContent = "Unable to load";
        expensesElement.textContent = "Unable to load";

    }

}

async function loadCategories() {

    const categoryBreakdown =
        document.getElementById("category-breakdown");

    categoryBreakdown.innerHTML = `
        <p class="loading-message">
            Loading spending data...
        </p>
    `;

    try {

        const response = await fetch(`${API_URL}/analytics/categories`, {
            headers: getAuthHeaders()
        });

        if (handleUnauthorized(response)) return;

        const categories = await response.json();

        categoryBreakdown.innerHTML = "";

        if (categories.length === 0) {

            categoryBreakdown.innerHTML = `
                <p class="empty-message">
                    No spending data available.
                </p>
            `;

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

        categoryBreakdown.innerHTML = `
            <p class="error-message">
                Unable to load spending data.
            </p>
        `;
    }

}

async function loadSpendingTrend() {

    const trendData =
        document.getElementById("trend-data");

    trendData.innerHTML = `
        <p class="loading-message">
            Loading spending trend...
        </p>
    `;

    try {

        const response = await fetch(`${API_URL}/analytics/trend`, {
            headers: getAuthHeaders()
        });

        if (handleUnauthorized(response)) return;

        const trend = await response.json();

        trendData.innerHTML = "";

        if (trend.length === 0) {

            trendData.innerHTML = `
                <p class="empty-message">
                    No spending trend data available.
                </p>
            `;

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

        trendData.innerHTML = `
            <p class="error-message">
                Unable to load spending trend.
            </p>
        `;
    }

}

