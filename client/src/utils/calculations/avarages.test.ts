import { addThreeMonthAverageRows } from "./averages";
import { ExchangeRate } from "../../types/exchangeRate";


describe("addThreeMonthAverageRows", () => {
    it("should add average row every 3 months", () => {
        const rows: ExchangeRate[] = [
            { month: "2023-01", average_rate: 3, forecast_rate: 3, difference: 1 },
            { month: "2023-02", average_rate: 4, forecast_rate: 4, difference: 2 },
            { month: "2023-03", average_rate: 5, forecast_rate: 5, difference: 3 },
        ];

        const result = addThreeMonthAverageRows(rows);

        expect(result.length).toBe(4);
        expect(result[3].month).toBe("Avg");
        expect(result[3].difference).toBeCloseTo(2);
    });

    it("should handle incomplete chunks", () => {
        const rows: ExchangeRate[] = [
            { month: "2023-01", average_rate: 3, forecast_rate: 3, difference: 1 },
            { month: "2023-02", average_rate: 4, forecast_rate: 4, difference: 2 },
        ];

        const result = addThreeMonthAverageRows(rows);
        expect(result.length).toBe(2);
    });
});
