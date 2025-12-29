import { renderHook, act, waitFor } from "@testing-library/react";
import fetchExchangeRates from "../api/fetchExchangeRates";
import { useExchangeRates } from "./useExchangeRates";


jest.mock("../api/fetchExchangeRates", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockData = [
  { month: "2023-01-01", average_rate: "3.5" },
  { month: "2023-02-01", average_rate: "3.6" },
];

describe("useExchangeRates", () => {
  beforeEach(() => {
    (fetchExchangeRates as jest.Mock).mockResolvedValue(mockData);
  });

  it("fetches data on mount", async () => {
    const { result } = renderHook(() => useExchangeRates());

    await waitFor(() => {
      expect(result.current.data.length).toBe(2);
    });
  });

  it("loadData updates data", async () => {
    const { result } = renderHook(() => useExchangeRates());

    await act(async () => {
      await result.current.loadData();
    });

    expect(result.current.data).toEqual([
      { month: "2023-01", average_rate: 3.5 },
      { month: "2023-02", average_rate: 3.6 },
    ]);
  });
});
