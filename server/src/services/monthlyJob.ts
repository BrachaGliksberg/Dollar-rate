import cron from "node-cron";
import { saveMonthlyAverage } from "./exchangeRate.service";


export function startMonthlyJob() {
  cron.schedule("0 0 1 * *", async () => {
    const now = new Date();
    const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const month = now.getMonth() === 0 ? 12 : now.getMonth();

    try {
      await saveMonthlyAverage(year, month);
    } catch (error: any) {
      throw new error(error.message);
    }

  });
}
