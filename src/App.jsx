import React, { useContext } from 'react';
import CustomerList from './components/customerList/customerList';
import MonthFilter from './components/monthsFilter/monthsFilter';
import CustomerDetails from './components/customerDetails/customerDetails';
import { TransactionContext } from './context/transactionContext';
import './styles/appStyles.css'

function App() {
  const { loading, error } = useContext(TransactionContext);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container'>
     <h1>Reward Points Tracker</h1>
      <MonthFilter />
      <CustomerList />
      <CustomerDetails />
    </div>
     
  );
}

export default App;