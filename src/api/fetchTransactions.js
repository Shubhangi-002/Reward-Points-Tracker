export const fetchTransactions = async () => {
  try {
    const response = await fetch("/transactions.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch transactions: " + error.message);
  }
};
