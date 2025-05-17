import PropTypes from 'prop-types';
import { useMemo } from 'react';
import {CUSTOMER_HEADING} from '../constants/constants'

function CustomerList({ transactions, selectedCustomer, setSelectedCustomer }) {
  const customers = useMemo(() => {
    return [...new Set(transactions.map(transaction => transaction.customerId))];
  }, [transactions]);

  return (
    <div>
      <h2>{CUSTOMER_HEADING}</h2>
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

CustomerList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCustomer: PropTypes.string,
  setSelectedCustomer: PropTypes.func.isRequired,
};

export default CustomerList;
