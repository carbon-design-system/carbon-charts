import { BaseChart } from "./base-chart";
export declare class BaseAxisChart extends BaseChart {
    x: any;
    y: any;
    y2: any;
    constructor(holder: Element, configs: any);
    setSVG(): any;
    initialDraw(data?: any): void;
    update(): void;
    updateDisplayData(): any;
    addLabelsToDataPoints(d: any, index: any): any;
    draw(): void;
    interpolateValues(newData: any): void;
    /**************************************
     *  Computations/Calculations         *
     *************************************/
    getChartSize(container?: any): {
        height: number;
        width: number;
    };
    resizeChart(): void;
    /**************************************
     *  Axis & Grids                      *
     *************************************/
    setXScale(noAnimation?: boolean): void;
    setXAxis(noAnimation?: boolean): void;
    repositionXAxisTitle(): void;
    getYMax(): any;
    getYMin(): any;
    setYScale(): void;
    setYAxis(noAnimation?: boolean): void;
    drawXGrid(): void;
    drawYGrid(): void;
    updateXandYGrid(noAnimation?: boolean): void;
    cleanGrid(g: any): void;
    wrapTick(ticks: any): void;
    getLargestTickHeight(ticks: any): number;
    /**************************************
     *  Events & User interactions        *
     *************************************/
    addDataPointEventListener(): void;
}
