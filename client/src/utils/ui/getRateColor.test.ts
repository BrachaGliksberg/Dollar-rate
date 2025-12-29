import { getRateColor } from "./getRateColor";


describe("getRateColor", () => {
  it("returns green for max value", () => {
    const color = getRateColor(10, 5, 10);
    expect(color).toContain("rgb");
  });

  it("returns red for min value", () => {
    const color = getRateColor(5, 5, 10);
    expect(color).toContain("rgb");
  });

  it("handles equal min and max", () => {
    const color = getRateColor(5, 5, 5);
    expect(color).toBe("rgb(0,128,0)");
  });
});
