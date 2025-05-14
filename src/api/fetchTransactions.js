
export const fetchTransactions = async () => {

     try {
  const response = await fetch("/transactions.json")
   const data = await response.json()
   return data;
    }catch(error)
    {console.log('Failed to fetch transactions', error)
      return []
    }

  }