import request from "supertest";
import app from "../../src/app/app";


describe("GET /api/exchange-rates", () => {
  it("should return exchange rates", async () => {
    const res = await request(app).get("/api/exchange-rates");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("month");
    expect(res.body[0]).toHaveProperty("average_rate");
  });
});
