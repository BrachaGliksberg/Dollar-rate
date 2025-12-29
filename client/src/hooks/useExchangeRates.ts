import { useEffect, useState } from "react";
import { ExchangeRate } from "../types/exchangeRate";
import fetchExchangeRates from "../api/fetchExchangeRates";


export function useExchangeRates() {
  const [data, setData] = useState<ExchangeRate[]>([]);

  const loadData = async () => {
    const rawData = await fetchExchangeRates();
    const mapped: ExchangeRate[] = rawData.map((item: any) => {
      const d = new Date(item.month);
      return {
        month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        average_rate: Number(item.average_rate),
      };
    });
    setData(mapped);
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loadData };
}
