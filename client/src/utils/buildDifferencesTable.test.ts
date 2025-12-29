import { buildDifferencesTable } from "./buildDifferencesTable";
import { ExchangeRate } from "../types/exchangeRate";


jest.mock("./calculations/forecast", () => ({
  __esModule: true,
  default: (data: any[]) =>
    data.map(d => ({ ...d, forecast_rate: d.average_rate })),
}));

jest.mock("./calculations/differences", () => ({
    addDifferences: (data: ExchangeRate[]) =>
        data.map((row, i) => ({ ...row, difference: i === 0 ? undefined : 1 })),
}));

jest.mock("./calculations/multiplication", () => ({
    multiplyForecastByDifference: (data: ExchangeRate[]) =>
        data.map((row) => ({ ...row, product: row.forecast_rate && row.difference ? row.forecast_rate * row.difference : undefined })),
}));

jest.mock("./calculations/averages", () => ({
    addThreeMonthAverageRows: (data: ExchangeRate[]) => [...data, { month: "Avg", average_rate: NaN, forecast_rate: NaN, difference: 1, product: NaN }],
}));

describe("buildDifferencesTable", () => {
    it("should build Differences Table rows correctly", () => {
        const data: ExchangeRate[] = [
            { month: "2023-01", average_rate: 3 },
            { month: "2023-02", average_rate: 4 },
            { month: "2023-03", average_rate: 5 },
        ];

        const result = buildDifferencesTable(data);
        expect(result[result.length - 1].month).toBe("Avg");
        expect(result[result.length - 1].difference).toBe(1);
    });
});
