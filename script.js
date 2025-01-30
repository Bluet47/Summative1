const expenses = {
    Accommodation: 0,
    Travel: 0,
    Food: 0,
    Activities: 0,
    "Car Expenses": 0,
};

let expenseChart = null;

function createChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    if (expenseChart) {
        expenseChart.destroy(); // Ensure old chart is removed
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(expenses),
            datasets: [{
                data: Object.values(expenses),
                backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#ff5722', '#9c27b0'],
                borderColor: '#fff',
                borderWidth: 2,
            }],
        },
        options: {
            responsive: false, // Disable responsiveness to avoid ResizeObserver
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });
}

document.getElementById('addExpense').addEventListener('click', () => {
    const cost = parseFloat(document.getElementById('expenseCost').value);
    const type = document.getElementById('expenseType').value;

    if (!isNaN(cost) && cost > 0) {
        expenses[type] += cost;
        createChart(); // Recreate the chart with updated data
    } else {
        alert('Please enter a valid amount.');
    }

    document.getElementById('expenseCost').value = '';
});

createChart(); // Initialize chart on page load
