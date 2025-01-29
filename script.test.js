const { JSDOM } = require('jsdom');
const { Chart } = require('chart.js');

global.document = new JSDOM('<!DOCTYPE html><canvas id="expenseChart"></canvas><button id="addExpense"></button><input id="expenseCost"><select id="expenseType"></select>').window.document;
global.window = document.defaultView;

describe('Expense Tracker', () => {
    let expenses, expenseChart;

    beforeEach(() => {
        expenses = {
            Accommodation: 0,
            Travel: 0,
            Food: 0,
            Activities: 0,
            "Car Expenses": 0,
        };

        const ctx = document.getElementById('expenseChart').getContext('2d');
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
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        });
    });

    test('should update expenses correctly when adding a valid expense', () => {
        const costInput = document.getElementById('expenseCost');
        const typeSelect = document.getElementById('expenseType');
        
        typeSelect.value = 'Food';
        costInput.value = '20';
        document.getElementById('addExpense').click();
        
        expect(expenses['Food']).toBe(20);
        expect(expenseChart.data.datasets[0].data).toEqual(Object.values(expenses));
    });

    test('should not update expenses when input is invalid', () => {
        const initialExpenses = { ...expenses };
        const costInput = document.getElementById('expenseCost');
        const typeSelect = document.getElementById('expenseType');
        
        typeSelect.value = 'Food';
        costInput.value = '-10'; // Invalid amount
        document.getElementById('addExpense').click();
        
        expect(expenses['Food']).toBe(initialExpenses['Food']);
        expect(expenseChart.data.datasets[0].data).toEqual(Object.values(initialExpenses));
    });
});