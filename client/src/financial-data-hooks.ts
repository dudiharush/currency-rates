import { loadFinData, loadRates } from "./data-loaders";
import { useState, useEffect } from "react";

export const useFinancialData = () => {
  const [finData, setFinData] = useState();
  const [rates, setRates] = useState();

  useEffect(() => {
    setTimeout(() => {
      loadFinData().then(setFinData);
      loadRates("USD").then(setRates);
    }, 3000);

    loadRates("USD").then(setRates);
    const handleId = setInterval(() => {
      loadRates("USD").then(setRates);
    }, 10000);
    return () => clearTimeout(handleId);
  }, []);

  return { finData, rates };
};
