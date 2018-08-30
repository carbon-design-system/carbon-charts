import { BaseAxisChart } from "./base-axis-chart";
export declare class StackedBarChart extends BaseAxisChart {
    constructor(holder: Element, configs: any);
    getYMax(): any;
    getStackData(): any;
    draw(): void;
    interpolateValues(newData: any): void;
    resizeChart(): void;
    updateElements(animate: boolean, rect?: any, g?: any): void;
}
