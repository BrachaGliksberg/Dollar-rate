import { ExchangeRate } from "../../types/exchangeRate";


export default function addForecast (data: ExchangeRate[]): ExchangeRate[] {
  return data.map((item, index, arr) => {
    if (index < 2) {
      return { ...item, forecast_rate: undefined };
    }

    const lastThree = arr.slice(index - 2, index + 1);
    const avg =
      lastThree.reduce((sum, m) => sum + m.average_rate, 0) / 3;

    return {
      ...item,
      forecast_rate: avg
    };
  });
};
