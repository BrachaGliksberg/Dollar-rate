import axios from "axios";
import { fetchDailyRates } from "../../src/api/currencyApi";


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchDailyRates", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...OLD_ENV };
    process.env.CURRENCY_API_BASE_URL = "https://fake.api";
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("returns ILS rates array on success", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        rates: {
          "2024-01-01": { ILS: 3.7 },
          "2024-01-02": { ILS: 3.8 },
        },
      },
    } as any);

    const result = await fetchDailyRates("2024-01-01", "2024-01-02");

    expect(result).toEqual([3.7, 3.8]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it("returns empty array when rates is missing", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {},
    } as any);

    const result = await fetchDailyRates("2024-01-01", "2024-01-02");

    expect(result).toEqual([]);
  });

  it("throws error when axios fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    await expect(
      fetchDailyRates("2024-01-01", "2024-01-02")
    ).rejects.toThrow("Failed to fetch daily rates");
  });

  it("throws error when env var is missing", async () => {
    delete process.env.CURRENCY_API_BASE_URL;

    await expect(
      fetchDailyRates("2024-01-01", "2024-01-02")
    ).rejects.toThrow("Missing required environment variable");
  });
});
