import { BaseChart } from "./base-chart";
export declare class PieChart extends BaseChart {
    pie: any;
    arc: any;
    path: any;
    colorScale: any;
    constructor(holder: Element, configs: any, type?: string);
    dataProcessor(dataObject: any): any;
    initialDraw(): void;
    draw(): void;
    interpolateValues(newData: any): void;
    reduceOpacity(exception?: any): void;
    showTooltip(d: any): void;
    addDataPointEventListener(): void;
    update(newData?: any): void;
    addLegend(): void;
    resizeChart(): void;
    private computeRadius();
    /**
     * Return the css transform string to be used for the slice
     *
     * @private
     * @param {any} d - d3 data item for slice
     * @param {any} radius - computed radius of the chart
     * @returns final transform string to be applied to the <text> element
     * @memberof PieChart
     */
    private deriveTransformString(d, radius);
    /**
     * Decide what text-anchor value the slice label item would need based on the quadrant it's in
     *
     * @private
     * @param {any} d - d3 data item for slice
     * @returns computed decision on what the text-anchor string should be
     * @memberof PieChart
     */
    private deriveTextAnchor(d);
}
