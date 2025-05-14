import React, { useContext } from 'react';
import { TransactionContext } from '../../context/transactionContext';
import { MONTHS, YEARS } from '../../constants/filters';

function MonthFilter() {
  const { setSelectedMonth, setSelectedYear } = useContext(TransactionContext);

  return (
    <div className='filter-controls'>
      <label>Month: </label>
      <select onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
        <option value="">Select</option>
        {MONTHS.map((month, index) => (
          <option key={index} value={index}>{month}</option>
        ))}
      </select>

      <label>Year: </label>
      <select onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
        {YEARS.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}

export default MonthFilter;