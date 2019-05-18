import { ITableProps } from "../types";
import React from "react";
import Decimal from "decimal.js";

export const AllUnitsTable = ({ finData, rates }: ITableProps) => {
  return (
    <table>
      <tr>
        <th>Financial Unit Name</th>
        <th>Notional Value</th>
        <th>Rate</th>
        <th>Currency</th>
        <th>Calculated Value (in USD)</th>
      </tr>
      {finData.map((unit: any) => (
        <tr>
          <td>{unit.financialName}</td>
          <td>{unit.notionalValue.toFixed(4)}</td>
          <td>{rates[unit.currencyCode].toFixed(4)}</td>
          <td>{unit.currencyCode}</td>
          <td>
            {new Decimal(rates[unit.currencyCode])
              .times(unit.notionalValue)
              .toFixed(4)}
          </td>
        </tr>
      ))}
    </table>
  );
};
