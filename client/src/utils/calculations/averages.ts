import { ExchangeRate } from "../../types/exchangeRate";


export function addThreeMonthAverageRows(
    rows: ExchangeRate[]
): ExchangeRate[] {
    const valid = rows.filter(
        r => r.difference !== undefined && !isNaN(r.difference)
    );

    const result: ExchangeRate[] = [];

    for (let i = 0; i < valid.length; i++) {
        result.push(valid[i]);

        if ((i + 1) % 3 === 0) {
            const chunk = valid.slice(i - 2, i + 1);
            const avg =
                chunk.reduce((s, r) => s + (r.difference ?? 0), 0) / 3;

            result.push({
                month: "Avg",
                average_rate: NaN,
                forecast_rate: NaN,
                difference: avg,
                product: NaN,
            });
        }
    }

    return result;
}
