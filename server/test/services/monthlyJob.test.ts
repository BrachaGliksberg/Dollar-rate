import cron from "node-cron";
import { saveMonthlyAverage } from "../../src/services/exchangeRate.service";
import { startMonthlyJob } from "../../src/services/monthlyJob";


jest.mock("node-cron", () => ({
  schedule: jest.fn(),
}));

jest.mock("../../src/services/exchangeRate.service", () => ({
  saveMonthlyAverage: jest.fn(),
}));

describe("startMonthlyJob", () => {
  const mockSchedule = (cron as any).schedule as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("schedules cron with correct expression", () => {
    startMonthlyJob();

    expect(mockSchedule).toHaveBeenCalledWith(
      "0 0 1 * *",
      expect.any(Function)
    );
  });

  it("calls saveMonthlyAverage with previous month", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-03-15"));

    startMonthlyJob();

    const jobFn = mockSchedule.mock.calls[0][1];
    await jobFn();

    expect(saveMonthlyAverage).toHaveBeenCalledWith(2024, 2);
    jest.useRealTimers();
  });

  it("handles january correctly", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-01-10"));

    startMonthlyJob();

    const jobFn = mockSchedule.mock.calls[0][1];
    await jobFn();

    expect(saveMonthlyAverage).toHaveBeenCalledWith(2023, 12);
    jest.useRealTimers();
  });

  it("does not throw when service fails", async () => {
    (saveMonthlyAverage as jest.Mock).mockRejectedValue(
      new Error("fail")
    );

    jest.useFakeTimers().setSystemTime(new Date("2024-03-10"));

    startMonthlyJob();

    const jobFn = mockSchedule.mock.calls[0][1];
    await expect(jobFn()).rejects.toThrow();

    jest.useRealTimers();
  });
});
