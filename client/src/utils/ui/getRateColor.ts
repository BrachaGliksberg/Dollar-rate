export function getRateColor(value: number, min: number, max: number): string {
    if (min === max) return "rgb(0,128,0)";

    const ratio = (value - min) / (max - min);
    const red = Math.round(255 * (1 - ratio));
    const green = Math.round(180 * ratio);

    return `rgb(${red}, ${green}, 0)`;
}
