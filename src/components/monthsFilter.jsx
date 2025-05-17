import PropTypes from 'prop-types';
import { MONTHS, YEARS } from '../constants/constants';

function MonthFilter({ setSelectedMonth, setSelectedYear, selectedMonth, selectedYear }) {
  const handleMonthChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedMonth(isNaN(value) ? null : value);
  };

  const handleYearChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedYear(isNaN(value) ? null : value);
  };

  return (
    <div className="filter-controls">
      <label>Month: </label>
      <select onChange={handleMonthChange} value={selectedMonth ?? ''}>
        <option value="">Select</option>
        {MONTHS.map((month, index) => (
          <option key={month} value={index}>{month}</option>
        ))}
      </select>

      <label>Year: </label>
      <select onChange={handleYearChange} value={selectedYear ?? ''}>
        <option value="">Select</option>
        {YEARS.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}

MonthFilter.propTypes = {
  setSelectedMonth: PropTypes.func.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
  selectedMonth: PropTypes.number, 
  selectedYear: PropTypes.number, 
};

export default MonthFilter;
