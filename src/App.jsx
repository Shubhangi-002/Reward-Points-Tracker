import React, { useContext } from 'react';
import CustomerList from './components/customerList';
import Reset from './components/resetFilter';
import MonthFilter from './components/monthsFilter';
import CustomerDetails from './components/customerDetails';
import { TransactionContext } from './context/transactionContext';
import './styles/appStyles.css';
import { APPLICATION_TITLE } from './constants/constants';

function App() {
  const {
    loading,
    error,
    transactions,
    selectedCustomer,
    selectedMonth,
    selectedYear,
    setSelectedCustomer,
    setSelectedMonth,
    setSelectedYear
  } = useContext(TransactionContext);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container'>
      <h1>{APPLICATION_TITLE}</h1>

<div style={{display: 'flex', justifyContent: 'space-between'}}>
<MonthFilter
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      
      />

     <Reset setSelectedCustomer={setSelectedCustomer} setSelectedYear={setSelectedYear} setSelectedMonth={setSelectedMonth}/>

</div>
     
      <CustomerList
        transactions={transactions}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />

      <CustomerDetails
        transactions={transactions}
        selectedCustomer={selectedCustomer}
        selectedMonth={selectedMonth}
      />
    </div>
  );
}

export default App;
