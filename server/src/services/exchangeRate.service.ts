import { fetchDailyRates } from "../api/currencyApi";
import { pool } from "../db";


function getMonthRange(year: number, month: number) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = new Date(year, month, 0).toISOString().slice(0, 10);
  return { start, end };
}


function calculateMonthlyAverage(rates: number[]): number {
  if (rates.length === 0) return 0;
  return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
}


async function upsertMonthlyAverage(month: string, avg: number) {
  await pool.query(
    `INSERT INTO monthly_exchange_rates (month, average_rate)
     VALUES ($1, $2)
     ON CONFLICT (month)
     DO UPDATE SET average_rate = EXCLUDED.average_rate`,
    [month, avg]
  );
}


export async function saveMonthlyAverage(year: number, month: number) {
  const { start, end } = getMonthRange(year, month);

  try {
    const rates = await fetchDailyRates(start, end);
    if (rates.length === 0) return;

    const avg = calculateMonthlyAverage(rates);
    await upsertMonthlyAverage(start, avg);

    return avg;
  } catch (error: any) {
    throw new Error(`Failed to save monthly average: ${error.message}`);
  }
}
