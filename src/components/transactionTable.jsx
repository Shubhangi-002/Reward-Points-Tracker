import { useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { calculateRewardPoints } from '../utils/rewardCalculator';
import { TransactionContext } from '../context/transactionContext';

function TransactionTable({ transactions }) {
  const { selectedMonth, selectedYear } = useContext(TransactionContext);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return transactions.filter(transaction => {
      const date = new Date(transaction.date);
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
    });
  }, [transactions, selectedMonth, selectedYear]);

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  if (filtered.length === 0) return <p>No transactions</p>;

  return (
    <div>
      <h3>Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(({date, amount, index}) => (
            <tr key={index}>
              <td>{date}</td>
              <td>${amount}</td>
              <td>{calculateRewardPoints(amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={page === 1} onClick={() => setPage(page => page - 1)}>Prev</button>
      <button
        disabled={page * itemsPerPage >= filtered.length}
        onClick={() => setPage(page => page + 1)}
      >
        Next
      </button>
    </div>
  );
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      customerId: PropTypes.string
    })
  ).isRequired
};

export default TransactionTable;
