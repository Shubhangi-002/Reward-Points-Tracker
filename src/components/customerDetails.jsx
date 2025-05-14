import { useContext, useMemo } from 'react';
import { TransactionContext } from '../context/transactionContext';
import { calculateRewardPoints } from '../utils/rewardCalculator';
import TransactionTable from './transactionTable';

function CustomerDetails() {
  const { transactions, selectedCustomer, selectedMonth } = useContext(TransactionContext);

  const filtered = useMemo(() => {
    return transactions?.filter(t => t.customerId === selectedCustomer) || [];
  }, [transactions, selectedCustomer]);

  const { monthlyPoints, totalPoints } = useMemo(() => {
    const result = {
      monthlyPoints: {},
      totalPoints: 0,
    };
  
    filtered.forEach(({ date, amount }) => {
      const parsedDate = new Date(date);
      const month = parsedDate.getMonth() + 1;
      const year = parsedDate.getFullYear();
      const points = calculateRewardPoints(amount);
  
      const key = `${month}-${year}`;
      if (!result.monthlyPoints[key]) result.monthlyPoints[key] = 0;
      result.monthlyPoints[key] += points;
      result.totalPoints += points;
    });
  
    return result;
  }, [filtered]);
  
  if (!selectedCustomer) return null;

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
