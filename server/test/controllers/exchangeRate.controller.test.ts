import { Request, Response } from "express";
import { getExchangeRates } from "../../src/controllers/exchangeRate.controller";
import { pool } from "../../src/db";


jest.mock("../../src/db");

describe("getExchangeRates", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("returns exchange rates on success", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [
        { month: "2024-01", average_rate: 3.7 },
        { month: "2024-02", average_rate: 3.8 },
      ],
    });

    await getExchangeRates(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([
      { month: "2024-01", average_rate: 3.7 },
      { month: "2024-02", average_rate: 3.8 },
    ]);
  });

  it("returns 500 on db error", async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error("DB fail"));

    await getExchangeRates(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch exchange rates",
    });
  });
});
