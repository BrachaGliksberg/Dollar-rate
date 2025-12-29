import app from "./app/app";
import { runInitialSeed } from './db/seed';
import { startMonthlyJob } from "./services/monthlyJob";


const PORT = process.env.SERVER_PORT;

if (!PORT) {
  throw new Error("Missing required environment variable: PORT");
}

(async () => {
  await runInitialSeed();
  startMonthlyJob();

  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

})();
