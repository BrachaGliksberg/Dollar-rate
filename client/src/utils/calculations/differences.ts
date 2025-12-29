import { ExchangeRate } from "../../types/exchangeRate";


export function addDifferences(data: ExchangeRate[]): ExchangeRate[] {
    return data.map((row, index) => {
        const prev = data[index - 1];
        const difference =
            prev?.forecast_rate !== undefined
                ? row.average_rate - prev.forecast_rate
                : undefined;

        return { ...row, difference };
    });
}
