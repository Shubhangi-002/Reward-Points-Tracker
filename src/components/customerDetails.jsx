import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { calculateRewardPoints } from '../utils/rewardCalculator';
import TransactionTable from './transactionTable';

function CustomerDetails({ transactions, selectedCustomer, selectedMonth }) {
  const customerTransactions = useMemo(() => {
    return transactions?.filter(transaction => transaction.customerId === selectedCustomer) || [];
  }, [transactions, selectedCustomer]);

  const lastThreeMonthKeys = useMemo(() => {
    const monthSet = new Set();
    const sorted = [...customerTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    for (let transaction of sorted) {
      const date = new Date(transaction.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthSet.add(key);
      if (monthSet.size === 3) break;
    }

    return monthSet;
  }, [customerTransactions]);

  const recentTransactions = useMemo(() => {
    return customerTransactions.filter(transaction => {
      const date = new Date(transaction.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      return lastThreeMonthKeys.has(key);
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [customerTransactions, lastThreeMonthKeys]);

  const { monthlyPoints, totalPoints } = useMemo(() => {
    const result = {
      monthlyPoints: {},
      totalPoints: 0,
    };

    recentTransactions.forEach(({ date, amount }) => {
      const d = new Date(date);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`; 

      const points = calculateRewardPoints(amount);
      if (!result.monthlyPoints[key]) result.monthlyPoints[key] = 0;
      result.monthlyPoints[key] += points;
      result.totalPoints += points;
    });

    return result;
  }, [recentTransactions]);

  const sortedMonthlyPoints = useMemo(() => {
    return Object.entries(monthlyPoints)
      .sort((a, b) => {
        const [yearA, monthA] = a[0].split('-').map(Number);
        const [yearB, monthB] = b[0].split('-').map(Number);
        const dateA = new Date(yearA, monthA - 1);
        const dateB = new Date(yearB, monthB - 1);
        return dateB - dateA;
      });
  }, [monthlyPoints]);

  if (!selectedCustomer) return null;

  return (
    <div>
      <h2>Details for {selectedCustomer}</h2>
      <h3>Total Points: {totalPoints}</h3>

      <ul>
        {sortedMonthlyPoints.map(([key, value]) => (
          <li key={key}>{key}: {value} points</li>
        ))}
      </ul>

      {selectedMonth !== null && (
        <TransactionTable transactions={recentTransactions} />
      )}
    </div>
  );
}

CustomerDetails.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCustomer: PropTypes.string,
  selectedMonth: PropTypes.number,
};

export default CustomerDetails;
