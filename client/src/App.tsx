import "./App.css";
import { CSVLink } from "react-csv";
import { PerUnitTable } from "./components/PerUnitTable";
import { AllUnitsTable } from "./components/AllUnitsTable";
import { CurrencyExchange } from "./components/CurrencyExchange";
import { Spinner } from "./components/Spinner/Spinner";
import { getCSVData } from "./utils";
import { useFinancialData } from "./financial-data-hooks";
import React from "react";

const App = () => {
  const { finData, rates } = useFinancialData();

  if (!rates || !finData) return <Spinner />;

  const currencies = Object.keys(rates);
  const [headers, values] = getCSVData(rates, finData);

  return (
    <div className="App">
      <CurrencyExchange rates={rates} currencies={currencies} />
      <AllUnitsTable finData={finData} rates={rates} />
      <CSVLink
        filename={"fin-data.csv"}
        data={values}
        headers={headers}
        className="export-btn"
        target="_blank"
      >
        Export to Excel
      </CSVLink>
      <div className={"table-title"}>
        Accumulated Value By Financial Unit Name
      </div>
      <PerUnitTable finData={finData} rates={rates} />
    </div>
  );
};

export default App;
