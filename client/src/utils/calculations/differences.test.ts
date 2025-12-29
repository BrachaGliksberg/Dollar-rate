import { addDifferences } from "./differences";


describe("addDifferences", () => {
    it("should calculate differences correctly", () => {
        const data = [
            { average_rate: 5 },
            { average_rate: 6, forecast_rate: 5 },
            { average_rate: 7, forecast_rate: 6 },
        ];

        const result = addDifferences(data as any);

        expect(result[0].difference).toBeUndefined();
        expect(result[1].difference).toBeUndefined();
        expect(result[2].difference).toBe(2);
    });
});
