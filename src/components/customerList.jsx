import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TransactionContext } from '../context/transactionContext';

function CustomerList() {
  const { transactions, setSelectedCustomer, selectedCustomer } = useContext(TransactionContext);

  const customers = useMemo(() => {
    return [...new Set(transactions.map(t => t.customerId))];
  }, [transactions]);

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map(customer => (
          <li
            className={selectedCustomer === customer ? 'selected' : 'li'}
            key={customer}
            onClick={() => setSelectedCustomer(customer)}
          >
            {customer}
          </li>
        ))}
      </ul>
    </div>
  );
}

CustomerList.propTypes = {};

export default CustomerList;
