import { pool } from "./index";
import { saveMonthlyAverage } from "../services/exchangeRate.service";


async function seedMonth(year: number, month: number) {
    try {
        const avg = await saveMonthlyAverage(year, month);
        if (avg == null || Number.isNaN(avg)) {
            return;
        }
    } catch (error: any) {
    }
}


export async function runInitialSeed() {
    const client = await pool.connect();
    try {
        const { rowCount } = await client.query("SELECT 1 FROM monthly_exchange_rates LIMIT 1");
        if (rowCount) {
            return;
        }

        const startYear = 2023;
        const now = new Date();
        const endYear = now.getFullYear();
        const endMonth = now.getMonth();

        for (let year = startYear; year <= endYear; year++) {
            const lastMonth = year === endYear ? endMonth : 12;
            for (let month = 1; month <= lastMonth; month++) {
                await seedMonth(year, month);
            }
        }

    } catch (error: any) {
        throw new Error(`Seed failed: ${error.message}`);
    } finally {
        client.release();
    }
}
