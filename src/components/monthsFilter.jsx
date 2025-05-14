import { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TransactionContext } from '../context/transactionContext';
import { MONTHS, YEARS } from '../constants/filters';

function MonthFilter() {
  const { setSelectedMonth, setSelectedYear } = useContext(TransactionContext);

  const handleMonthChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    setSelectedMonth(isNaN(value) ? null : value);
  }, [setSelectedMonth]);

  const handleYearChange = useCallback((e) => {
    setSelectedYear(parseInt(e.target.value));
  }, [setSelectedYear]);

  return (
    <div className='filter-controls'>
      <label>Month: </label>
      <select onChange={handleMonthChange}>
        <option value="">Select</option>
        {MONTHS.map((month, index) => (
          <option key={month} value={index}>{month}</option>
        ))}
      </select>

      <label>Year: </label>
      <select onChange={handleYearChange}>
        {YEARS.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}

MonthFilter.propTypes = {};

export default MonthFilter;
