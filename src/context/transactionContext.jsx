import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchTransactions } from '../api/fetchTransactions';
import { logger } from '../utils/logger';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCustomer, setSelectedCustomerRaw] = useState(null);
  const [selectedMonth, setSelectedMonthRaw] = useState(null);
  const [selectedYear, setSelectedYearRaw] = useState(2025);

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        logger.info("Transactions loaded", data);
      } catch (err) {
        setError("Failed to load transactions");
        logger.error("Transaction fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const updateSelectedCustomer = useCallback((customer) => {
    setSelectedCustomerRaw(customer);
  }, []);

  const updateSelectedMonth = useCallback((month) => {
    setSelectedMonthRaw(month);
  }, []);

  const updateSelectedYear = useCallback((year) => {
    setSelectedYearRaw(year);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        selectedCustomer,
        setSelectedCustomer: updateSelectedCustomer,
        selectedMonth,
        setSelectedMonth: updateSelectedMonth,
        selectedYear,
        setSelectedYear: updateSelectedYear
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { TransactionContext };
