import { Request, Response } from "express";
import { pool } from "../db";


export async function getExchangeRates(req: Request, res: Response) {
    try {
        const result = await pool.query(
            `
       SELECT 
       month,
       average_rate
       FROM monthly_exchange_rates
       ORDER BY month
      `
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch exchange rates",
        });
    }
}
