import axios from "axios";


export async function fetchDailyRates(
  startDate: string,
  endDate: string
): Promise<number[]> {

const url = process.env.CURRENCY_API_BASE_URL;

if (!url) {
  throw new Error("Missing required environment variable: CURRENCY_API_BASE_URL");
}

  try {
    const res = await axios.get(
      `${url}/${startDate}..${endDate}`,
      {
        params: {
          from: "USD",
          to: "ILS",
        },
      }
    );

    const rates = res.data.rates ?? {};
    return Object.values(rates).map((r: any) => r.ILS);
  } catch (error:any) {
    throw new Error(`Failed to fetch daily rates: ${error.message}`);
  }
}
