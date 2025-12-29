import { ExchangeRate } from "../../types/exchangeRate";


export function multiplyForecastByDifference(
    data: ExchangeRate[]
): ExchangeRate[] {
    return data.map(row => {
        if (row.forecast_rate === undefined || row.difference === undefined) {
            return { ...row, product: undefined };
        }

        return {
            ...row,
            product: row.forecast_rate * row.difference,
        };
    });
}
