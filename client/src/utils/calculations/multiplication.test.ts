import { ExchangeRate } from "../../types/exchangeRate";
import { multiplyForecastByDifference } from "./multiplication";


describe("multiplyForecastByDifference", () => {
  it("should multiply forecast_rate by difference when both exist", () => {
    const data: ExchangeRate[] = [
      { month: "2023-01", average_rate: 3, forecast_rate: 3, difference: 1 },
      { month: "2023-02", average_rate: 4, forecast_rate: 4, difference: 2 },
    ];

    const result = multiplyForecastByDifference(data);

    expect(result[0].product).toBe(3);
    expect(result[1].product).toBe(8);
  });

  it("should return undefined if forecast_rate or difference is undefined", () => {
    const data: ExchangeRate[] = [
      { month: "2023-01", average_rate: 3, forecast_rate: undefined, difference: 1 },
      { month: "2023-02", average_rate: 4, forecast_rate: 4, difference: undefined },
    ];

    const result = multiplyForecastByDifference(data);

    expect(result[0].product).toBeUndefined();
    expect(result[1].product).toBeUndefined();
  });
});
