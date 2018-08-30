import { BaseAxisChart } from "./base-axis-chart";
export declare class BarChart extends BaseAxisChart {
    x: any;
    x1?: any;
    y: any;
    colorScale: any;
    constructor(holder: Element, configs: any);
    setXScale(noAnimation?: boolean): void;
    draw(): void;
    interpolateValues(newData: any): void;
    updateElements(animate: boolean, rect?: any, g?: any): void;
    resizeChart(): void;
}
