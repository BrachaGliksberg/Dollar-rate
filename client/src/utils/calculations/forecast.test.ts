import  addForecast  from "./forecast";


describe("addForecast", () => {
  it("calculates forecast as average of previous 3 months", () => {
    const data = [
      { month: "2024-01", average_rate: 3 },
      { month: "2024-02", average_rate: 6 },
      { month: "2024-03", average_rate: 9 },
      { month: "2024-04", average_rate: 12 },
    ];

    const result = addForecast(data as any);

    expect(result[2].forecast_rate).toBe(6);
  });

  it("does not add forecast for first 3 months", () => {
    const data = [
      { month: "2024-01", average_rate: 3 },
      { month: "2024-02", average_rate: 6 },
    ];

    const result = addForecast(data as any);

    expect(result[0].forecast_rate).toBeUndefined();
    expect(result[1].forecast_rate).toBeUndefined();
  });
});
