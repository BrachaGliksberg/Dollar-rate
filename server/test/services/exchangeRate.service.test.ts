import { fetchDailyRates } from "../../src/api/currencyApi";
import { pool } from "../../src/db";
import { saveMonthlyAverage } from "../../src/services/exchangeRate.service";


jest.mock("../../src/api/currencyApi");
jest.mock("../../src/db");

describe("saveMonthlyAverage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate average and upsert into DB", async () => {

    (fetchDailyRates as jest.Mock).mockResolvedValue([3.5, 3.6, 3.7]);

    const mockQuery = pool.query as jest.Mock;
    mockQuery.mockResolvedValue({});

    const avg = await saveMonthlyAverage(2023, 5);

    expect(avg).toBeCloseTo(3.6);


    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO monthly_exchange_rates"),
      expect.any(Array)
    );

    expect(mockQuery.mock.calls[0][1][0]).toMatch(/^2023-05/);

    expect(mockQuery.mock.calls[0][1][1]).toBeCloseTo(3.6);
  });

  it("should do nothing if fetchDailyRates returns empty array", async () => {
    (fetchDailyRates as jest.Mock).mockResolvedValue([]);

    const mockQuery = pool.query as jest.Mock;

    const avg = await saveMonthlyAverage(2023, 5);

    expect(avg).toBeUndefined();
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("should throw an error if fetchDailyRates fails", async () => {
    (fetchDailyRates as jest.Mock).mockRejectedValue(new Error("API error"));

    await expect(saveMonthlyAverage(2023, 5)).rejects.toThrow(
      "Failed to save monthly average: API error"
    );
  });
});
