import * as d3 from "d3";
import PatternsService from "./services/patterns";
export declare class BaseChart {
    static chartCount: number;
    id: string;
    chartContainerID: string;
    container: any;
    holder: Element;
    svg: any;
    innerWrap: any;
    options: any;
    data: any;
    displayData: any;
    patternScale: {};
    colorScale: {};
    patternsService: PatternsService;
    events: any;
    eventHandlers: {
        tooltips: any;
    };
    constructor(holder: Element, configs: any);
    dispatchEvent(eventType: string): void;
    setData(data: any): void;
    getKeysFromData(): {};
    getLegendType(): string;
    setPatterns(): void;
    setColorScale(): void;
    getChartSize(container?: any): {
        height: number;
        width: number;
    };
    removeChart(): void;
    setSVG(): any;
    updateSVG(): void;
    dataProcessor(data: any): any;
    initialDraw(): void;
    updateChart(): void;
    resizeChart(): void;
    update(value?: any): void;
    resizeWhenContainerChange(): void;
    setClickableLegend(): void;
    setChartIDContainer(): {
        chartId: any;
        container: any;
    };
    resetOpacity(): void;
    reduceOpacity(exception: any): void;
    getLegendItems(): {};
    getLegendItemArray(): {
        key: string;
        value: any;
    }[];
    getLegendItemKeys(): string[];
    getDisabledLegendItems(): string[];
    getActiveLegendItems(): string[];
    updateLegend(legend: any): void;
    addLegend(): void;
    positionLegend(): void;
    addOrUpdateLegend(): void;
    addLegendCircleHoverEffect(): void;
    hasLegendExpandBtn(): boolean;
    isLegendOnRight(): boolean;
    /**
     *
     * When a legend item is clicked, apply/remove the appropriate filter
     * @param {string} changedLabel The label of the legend element the user clicked on
     * @memberof PieChart
     */
    applyLegendFilter(changedLabel: string): void;
    setClickableLegendInTooltip(): void;
    addTooltipOpenButtonToLegend(): void;
    openLegendTooltip(target: any): void;
    showLabelTooltip(d: any, leftSide: any): void;
    hideTooltip(): void;
    addTooltipEventListeners(tooltip: any): void;
    removeTooltipEventListeners(): void;
    showTooltip(d: any, clickedElement: any): void;
    getFillScale(): {};
    getDefaultTransition(): d3.Transition<HTMLElement, {}, null, undefined>;
    getInstantTransition(): d3.Transition<HTMLElement, {}, null, undefined>;
    getFillTransition(animate?: boolean): d3.Transition<HTMLElement, {}, null, undefined>;
    updateOverlay(): {
        show: () => void;
        hide: () => void;
    };
    getBBox(selector: any): any;
}
