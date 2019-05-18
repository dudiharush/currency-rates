export const loadFinData = (): Promise<any[]> => {
  return fetch("http://localhost:8081/fin-data").then(res => {
    return res.json();
  });
};

export const loadRates = (baseCurrencyCode: string): Promise<any[]> => {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=${baseCurrencyCode}`
  )
    .then(res => res.json())
    .then(json => json.rates);
};
