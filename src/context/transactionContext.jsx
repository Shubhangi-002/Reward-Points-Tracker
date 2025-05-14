import React, { createContext, useState, useEffect } from 'react';
import { fetchTransactions } from '../api/fetchTransactions';
import { logger } from '../utils/logger';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025);

  useEffect(() => {
    fetchTransactions()
      .then(data => {
        setTransactions(data);
        logger.info("Transactions loaded", data);
      })
      .catch(err => {
        setError('Failed to load transactions');
        logger.error("Transaction fetch Error", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        selectedCustomer,
        setSelectedCustomer,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};