import PropTypes from 'prop-types';

const Reset = ({ setSelectedCustomer, setSelectedMonth, setSelectedYear }) => {

  const handleReset = () => {
    setSelectedCustomer(null);
    setSelectedMonth(null);
    setSelectedYear(2025);
  };

  return (
    <button onClick={handleReset} className="reset-button">
      Reset Filters
    </button>
  );
};

Reset.propTypes = {
  setSelectedCustomer: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
};

export default Reset;
