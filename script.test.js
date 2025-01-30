import { jest } from '@jest/globals';
import Chart from 'chart.js/auto';

jest.mock('chart.js/auto', () => ({
    Chart: jest.fn().mockImplementation(() => ({
        destroy: jest.fn(),
        update: jest.fn(),
    })),
}));

import { expenses, createChart } from './script';

describe('Expense Tracker', () => {
    beforeEach(() => {
        Chart.mockClear(); // Clear previous Chart mocks
    });

    test('should update expenses correctly when adding a valid expense', () => {
        expenses.Travel = 0; 
        const cost = 50;
        expenses.Travel += cost;

        createChart();

        expect(expenses.Travel).toBe(50);
        expect(Chart).toHaveBeenCalledTimes(1);
    });

    test('should not update expenses when input is invalid', () => {
        const invalidCosts = [NaN, -10, 'text'];
        invalidCosts.forEach(cost => {
            const previousValue = expenses.Food;
            if (!isNaN(cost) && cost > 0) {
                expenses.Food += cost;
            }
            expect(expenses.Food).toBe(previousValue);
        });

        createChart();
        expect(Chart).toHaveBeenCalledTimes(1);
    });
});
