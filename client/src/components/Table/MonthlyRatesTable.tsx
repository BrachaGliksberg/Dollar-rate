import React, { useState } from "react";
import { addForecast } from "../../utils/calculations/forecast";
import { ExchangeRate } from "../../types/exchangeRate";
import { getRateColor } from "../../utils/ui/getRateColor";
import "./Table.css";


type Props = {
  data: ExchangeRate[];
};

type SortKey = "month" | "average_rate";

const MonthlyRatesTable: React.FC<Props> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("month");

  if (data.length === 0) return null;

  const dataWithForecast = addForecast(data);

  const sortedData = [...dataWithForecast].sort((a, b) => {
    if (sortKey === "month") {
      return a.month.localeCompare(b.month);
    }
    return a.average_rate - b.average_rate;
  });

  const rates = data.map(d => d.average_rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);

  const filteredData = selectedMonth
    ? sortedData.filter(row => row.month === selectedMonth)
    : sortedData;


  return (
    <>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="month-search"
      >
        <option value="">All months</option>
        {data.map(row => (
          <option key={row.month} value={row.month}>
            {row.month}
          </option>
        ))}
      </select>

      <div className="sort-controls">
        <label>
          <input
            type="radio"
            checked={sortKey === "month"}
            onChange={() => setSortKey("month")}
          />
          Sort by Month
        </label>

        <label>
          <input
            type="radio"
            checked={sortKey === "average_rate"}
            onChange={() => setSortKey("average_rate")}
          />
          Sort by Average Rate
        </label>
      </div>
      <h3>Part B – Monthly Rates & Forecast</h3>
      <table className="exchange-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Average Rate</th>
            <th>Forecast</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>

              <td
                style={{
                  backgroundColor: getRateColor(
                    row.average_rate,
                    min,
                    max
                  ),
                  color: "white",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {row.average_rate.toFixed(4)}
              </td>

              <td>
                {row.forecast_rate !== undefined
                  ? row.forecast_rate.toFixed(4)
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MonthlyRatesTable;
