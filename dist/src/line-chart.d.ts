import { BaseAxisChart } from "./base-axis-chart";
export declare class LineChart extends BaseAxisChart {
    x: any;
    y: any;
    colorScale: any;
    lineGenerator: any;
    constructor(holder: Element, configs: any);
    getLegendType(): string;
    addLabelsToDataPoints(d: any, index: any): any;
    draw(): void;
    interpolateValues(newData: any): void;
    updateElements(animate: boolean, gLines?: any): void;
    resizeChart(): void;
}
