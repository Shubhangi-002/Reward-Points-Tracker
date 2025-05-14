import React, { useContext } from 'react';
import { TransactionContext } from '../../context/transactionContext';

function CustomerList() {
  const { transactions, setSelectedCustomer, selectedCustomer } = useContext(TransactionContext);
  const customers = [...new Set(transactions.map(t => t.customerId))];

  return (
    <div>
      <h2>Customers</h2>
      <ul >
        {customers.map(c => (
          <li className={selectedCustomer === c ? 'selected' : 'li'} key={c} onClick={() => setSelectedCustomer(c)}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;