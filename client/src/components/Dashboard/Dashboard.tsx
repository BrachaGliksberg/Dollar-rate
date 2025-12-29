import React, { useState } from "react";
import DifferencesTable from "../Table/DifferencesTable";
import Graph from "../Graph/Graph";
import MonthlyRatesTable from "../Table/MonthlyRatesTable";
import { useExchangeRates } from "../../hooks/useExchangeRates";
import "./Dashboard.css";


type TableView = "none" | "MonthlyRatesTable" | "DifferencesTable";

const Dashboard: React.FC = () => {
  const { data, loadData } = useExchangeRates();
  const [tableView, setTableView] = useState<TableView>("none");

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dollar Exchange Rate 💲</h1>
        <div className="refresh-button">
          <button onClick={loadData}>
          🔄 Update Data
        </button>
        </div>
      </div>

      <div className="layout">
        <div className="left-panel">
          <Graph data={data} />
        </div>

        <div className="right-panel">
          <div className="view-buttons">
            <button onClick={() => setTableView("MonthlyRatesTable")}>
              📊 Monthly Rates & Forecast
            </button>

            <button onClick={() => setTableView("DifferencesTable")}>
              🧮 Differences & Matrix
            </button>

            <button onClick={() => setTableView("none")}>
              ❌ Hide Table
            </button>
          </div>

          <div className="table-content">
            {tableView === "none" && (
              <p className="placeholder">Please select a table</p>
            )}

            {tableView === "MonthlyRatesTable" && <MonthlyRatesTable data={data} />}
            {tableView === "DifferencesTable" && <DifferencesTable data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
