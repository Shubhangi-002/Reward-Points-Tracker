import React, { useContext } from 'react';
import { TransactionContext } from '../../context/transactionContext';
import { calculateRewardPoints } from '../../utils/rewardCalculator';
import TransactionTable from '../transactionTable/transactionTable';

function CustomerDetails() {
  const { transactions, selectedCustomer, selectedMonth } = useContext(TransactionContext);
  if (!selectedCustomer) return null;

  const filtered = transactions.filter(t => t.customerId === selectedCustomer);

  const monthlyPoints = {};
  let totalPoints = 0;

  filtered.forEach(t => {
    const date = new Date(t.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const points = calculateRewardPoints(t.amount);

    if (!monthlyPoints[`${month}-${year}`]) monthlyPoints[`${month}-${year}`] = 0;
    monthlyPoints[`${month}-${year}`] += points;
    totalPoints += points;
  });

  return (
    <div>
      <h2>Details for {selectedCustomer}</h2>
      <h3>Total Points: {totalPoints}</h3>
      <ul>
        {Object.entries(monthlyPoints).map(([key, value]) => (
          <li key={key}>{key}: {value} points</li>
        ))}
      </ul>
      {selectedMonth !== null && <TransactionTable transactions={filtered} />}
    </div>
  );
}

export default CustomerDetails;