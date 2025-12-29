import React from "react";
import { buildDifferencesTable } from "../../utils/buildDifferencesTable";
import { ExchangeRate } from "../../types/exchangeRate";
import "./Table.css";


type Props = {
  data: ExchangeRate[];
};

const DifferencesTable: React.FC<Props> = ({ data }) => {
  if (data.length === 0) return null;

  const rows = buildDifferencesTable(data);

  return (
    <>
      <h3>Part C – Differences & Matrix Multiplication</h3>

      <table className="exchange-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Average Rate</th>
            <th>Forecast</th>
            <th>Difference</th>
            <th>Product</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.month + i}
              className={row.month === "Avg" ? "summary-row" : undefined}
            >
              <td>{row.month}</td>

              <td>
                {!isNaN(row.average_rate)
                  ? row.average_rate.toFixed(4)
                  : "-"}
              </td>

              <td>
                {!isNaN(row.forecast_rate ?? NaN)
                  ? row.forecast_rate.toFixed(4)
                  : "-"}
              </td>

              <td
                style={
                  row.difference !== undefined && !isNaN(row.difference)
                    ? {
                      color: row.difference > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }
                    : undefined
                }
              >
                {!isNaN(row.difference ?? NaN)
                  ? row.difference.toFixed(4)
                  : "-"}
              </td>

              <td>
                {!isNaN(row.product ?? NaN)
                  ? row.product.toFixed(4)
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DifferencesTable;
