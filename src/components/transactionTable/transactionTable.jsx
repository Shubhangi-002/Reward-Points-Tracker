import React, { useState, useContext } from 'react';
import { calculateRewardPoints } from '../../utils/rewardCalculator';
import { TransactionContext } from '../../context/transactionContext';

function TransactionTable({ transactions }) {
  const { selectedMonth, selectedYear } = useContext(TransactionContext);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (filtered.length === 0) return <p>No transactions</p>;

  return (
    <div>
      <h3>Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Amount</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>${t.amount}</td>
              <td>{calculateRewardPoints(t.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
      <button disabled={page * itemsPerPage >= filtered.length} onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}

export default TransactionTable;
