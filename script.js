const expenses = {
    Accommodation: 0,
    Travel: 0,
    Food: 0,
    Activities: 0,
    "Car Expenses": 0,
};

const ctx = document.getElementById('expenseChart').getContext('2d');
const expenseChart = new Chart(ctx, {
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
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});

document.getElementById('addExpense').addEventListener('click', () => {
    const cost = parseFloat(document.getElementById('expenseCost').value);
    const type = document.getElementById('expenseType').value;

    if (!isNaN(cost) && cost > 0) {
        expenses[type] += cost;
        expenseChart.data.datasets[0].data = Object.values(expenses);
        expenseChart.update();
    } else {
        alert('Please enter a valid amount.');
    }

    document.getElementById('expenseCost').value = '';
});

