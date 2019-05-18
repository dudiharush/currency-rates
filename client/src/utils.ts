import Decimal from "decimal.js";

export const getCSVData = (rates: any, finData: any) => {
  const headers = [
    "Financial Unit Name",
    "Notional Value",
    "Rate",
    "Currency",
    "Calculated Value (in USD)"
  ];
  const values = finData.map((unit: any) => [
    unit.financialName,
    unit.notionalValue.toFixed(4),
    rates[unit.currencyCode].toFixed(4),
    unit.currencyCode,
    new Decimal(rates[unit.currencyCode]).times(unit.notionalValue).toFixed(4)
  ]);
  return [headers, values];
};
