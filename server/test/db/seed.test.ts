import { pool } from "../../src/db";
import { runInitialSeed } from "../../src/db/seed";
import { saveMonthlyAverage } from "../../src/services/exchangeRate.service";

jest.mock("../../src/services/exchangeRate.service");
jest.mock("../../src/db");

describe("runInitialSeed", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("skips seeding if table is not empty", async () => {
    const mockClient = {
      query: jest.fn().mockResolvedValue({ rowCount: 1 }),
      release: jest.fn(),
    };

    (pool.connect as jest.Mock).mockResolvedValue(mockClient);

    await expect(runInitialSeed()).resolves.not.toThrow();

    expect(saveMonthlyAverage).not.toHaveBeenCalled();
    expect(mockClient.release).toHaveBeenCalled();
  });

  it("calls saveMonthlyAverage when table is empty", async () => {
    const mockClient = {
      query: jest.fn().mockResolvedValue({ rowCount: 0 }),
      release: jest.fn(),
    };

    (pool.connect as jest.Mock).mockResolvedValue(mockClient);
    (saveMonthlyAverage as jest.Mock).mockResolvedValue(3.5);

    await runInitialSeed();

    expect(saveMonthlyAverage).toHaveBeenCalled();
    expect(mockClient.release).toHaveBeenCalled();
  });

  it("continues when saveMonthlyAverage returns null", async () => {
    const mockClient = {
      query: jest.fn().mockResolvedValue({ rowCount: 0 }),
      release: jest.fn(),
    };

    (pool.connect as jest.Mock).mockResolvedValue(mockClient);
    (saveMonthlyAverage as jest.Mock).mockResolvedValue(null);

    await expect(runInitialSeed()).resolves.not.toThrow();

    expect(saveMonthlyAverage).toHaveBeenCalled();
    expect(mockClient.release).toHaveBeenCalled();
  });

  it("throws when DB query fails", async () => {
    const mockClient = {
      query: jest.fn().mockRejectedValue(new Error("DB error")),
      release: jest.fn(),
    };

    (pool.connect as jest.Mock).mockResolvedValue(mockClient);

    await expect(runInitialSeed()).rejects.toThrow("Seed failed");
    expect(mockClient.release).toHaveBeenCalled();
  });
});
