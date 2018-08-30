import { PieChart } from "./pie-chart";
export declare class DonutChart extends PieChart {
    center: DonutCenter;
    constructor(holder: Element, configs: any);
    draw(): void;
    resizeChart(): void;
}
export declare class DonutCenter {
    configs: any;
    oldConfigs: any;
    donutSVG: any;
    constructor(configs: any);
    draw(innerWrap: any): void;
    update(): void;
    resize(svgElement: any, actualChartSize: any): void;
}
