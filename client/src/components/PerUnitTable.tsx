import { ITableProps } from "../types";
import * as React from "react";
import Decimal from "decimal.js";

export const PerUnitTable = ({ finData, rates }: ITableProps) => {
  const perUnitData = finData.reduce((unitMap: any, unit: any) => {
    if (unitMap[unit.financialName]) {
      unitMap[unit.financialName].accumulatedValue = new Decimal(
        unit.notionalValue
      ).add(new Decimal(unitMap[unit.financialName].accumulatedValue));
    } else {
      unitMap[unit.financialName] = {
        ...unit,
        accumulatedValue: unit.notionalValue
      };
    }
    return unitMap;
  }, {});
  return (
    <table>
      <tr>
        <th>Financial Unit Name</th>
        <th>Accumulated Notional Value</th>
        <th>Calculated Value (in USD)</th>
      </tr>
      {Object.values(perUnitData).map((unit: any) => (
        <tr>
          <td>{unit.financialName}</td>
          <td>{unit.accumulatedValue.toFixed(4)}</td>
          <td>
            {new Decimal(rates[unit.currencyCode])
              .times(unit.accumulatedValue)
              .toFixed(4)}
          </td>
        </tr>
      ))}
    </table>
  );
};
