import { addDifferences } from "./calculations/differences";
import addForecast from "./calculations/forecast";
import { addThreeMonthAverageRows } from "./calculations/averages";
import { ExchangeRate } from "../types/exchangeRate";
import { multiplyForecastByDifference } from "./calculations/multiplication";


export function buildDifferencesTable(
  data: ExchangeRate[]
): ExchangeRate[] {
  const withForecast = addForecast(data);
  const withDifference = addDifferences(withForecast);
  const multiplied = multiplyForecastByDifference(withDifference);
  return addThreeMonthAverageRows(multiplied);
}
