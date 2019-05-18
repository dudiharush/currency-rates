import { Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import Decimal from "decimal.js";

export interface ICurrencyCalculatorProps {
  currencies: string[];
  rates: any;
}
export const CurrencyExchange = ({
  currencies,
  rates
}: ICurrencyCalculatorProps) => {
  const [inputAmount, setInputAmount] = useState("0");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  const onSelect = (selectedCurency: string) => {
    setSelectedCurrency(selectedCurency);
  };

  return (
    <div className="currency-selection-wrapper">
      <Dropdown onSelect={onSelect}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Select Currency
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {currencies.map((currency: string) => {
            return (
              <Dropdown.Item eventKey={currency}>{currency}</Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <span className="ml-20">amount:</span>
      <input
        type="number"
        className="amount-field"
        value={inputAmount}
        onChange={e => setInputAmount(e.target.value)}
      />
      <span>{selectedCurrency}</span>
      <span className="ml-20">in USD:</span>
      <span>
        {new Decimal(inputAmount || 0)
          .dividedBy(rates[selectedCurrency] || 0)
          .toFixed(4)}
      </span>
    </div>
  );
};
