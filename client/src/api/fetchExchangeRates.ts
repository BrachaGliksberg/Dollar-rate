const fetchExchangeRates = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/api/exchange-rates`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export default fetchExchangeRates;
