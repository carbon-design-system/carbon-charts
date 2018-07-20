import {
	Component,
	Input,
	AfterViewInit,
	ViewChild,
	ViewEncapsulation
} from "@angular/core";

import { BaseChart as BC } from "@peretz/charts/bundle/bundle.js";

/**
 * Wrapper around `BaseChart` in peretz charts library
 *
 * Most functions just call their equivalent from the chart library.
 *
 * @export
 * @class BaseChart
 * @implements {AfterViewInit}
 */
@Component({
	selector: "n-base-chart",
	template: `
		<div #nChart
			class='n-chart-container'>
		</div>
	`,
	styleUrls: ["./charts.scss"],
	encapsulation: ViewEncapsulation.None
})
export class BaseChart implements AfterViewInit {
	/**
	 * Data passed to charts library for displaying
	 *
	 * @type {*}
	 * @memberof BaseChart
	 */
	@Input() data: any;
	/**
	 * Options passed to charts library
	 *
	 * @type {*}
	 * @memberof BaseChart
	 */
	@Input() options: any;
	/**
	 * Chart container element ref
	 *
	 * @memberof BaseChart
	 */
	@ViewChild("nChart") chartRef;

	/**
	 * Chart object instance
	 *
	 * You can use this to do whatever you would normally do with a chart if you used
	 * charts library directly.
	 *
	 * @memberof BaseChart
	 */
	chart;

	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 *
	 * @memberof BaseChart
	 */
	ngAfterViewInit() {
		this.chart = new BC(this.chartRef.nativeElement, this.options, this.data);
		Object.assign(this, this.chart);
		this.drawChart();
	}

	/**
	 * Calls `getActualChartSize()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	getActualChartSize() {
		this.chart.getActualChartSize();
	}

	/**
	 * Calls `removeChart()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	removeChart() {
		this.chart.removeChart();
	}

	/**
	 * Calls `redrawChart()` from the chart library.
	 *
	 * @param {*} [data]
	 * @memberof BaseChart
	 */
	redrawChart(data?: any) {
		this.chart.redrawChart(data);
	}

	/**
	 * Calls `setSVG()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	setSVG() {
		this.chart.setSVG();
	}

	/**
	 * Calls `updateSVG()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	updateSVG() {
		this.chart.updateSVG();
	}

	/**
	 * Calls `repositionSVG()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	repositionSVG() {
		this.chart.repositionSVG();
	}

	/**
	 * Calls `drawChart()` from the chart library.
	 *
	 * @param {*} [data]
	 * @memberof BaseChart
	 */
	drawChart(data?: any) {
		this.chart.draw(data);
	}

	/**
	 * Calls `updateChart()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	updateChart() {
		this.chart.updateChart();
	}

	/**
	 * Calls `setResizeWhenContainerChange()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	setResizeWhenContainerChange() {
		this.chart.setResizeWhenContainerChange();
	}

	/**
	 * Calls `resizeWhenContainerChange()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	resizeWhenContainerChange() {
		this.chart.resizeWhenContainerChange();
	}

	/**
	 * Calls `setClickableLegend()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	setClickableLegend() {
		this.chart.setClickableLegend();
	}

	/**
	 * Calls `setClickableLegendInTooltip()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	setClickableLegendInTooltip() {
		this.chart.setClickableLegendInTooltip();
	}

	/**
	 * Calls `getActiveDataSeries()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	getActiveDataSeries() {
		this.chart.getActiveDataSeries();
	}

	/**
	 * Calls `setChartIdContainer()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	setChartIdContainer() {
		this.chart.setChartIDContainer();
	}

	/**
	 * Calls `resetOpacity()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	resetOpacity() {
		this.chart.resetOpacity();
	}

	/**
	 * Calls `()` from the chart library.
	 *
	 * @preduceOpacityaram {any} exception
	 * @memberof BaseChart
	 */
	reduceOpacity(exception) {
		this.chart.reduceOpacity(exception);
	}

	/**
	 * Calls `getLegendItems()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	getLegendItems() {
		this.chart.getLegendItems();
	}

	/**
	 * Calls `()` from the chart library.
	 *
	 * @pupdateLegendaram {any} legend
	 * @memberof BaseChart
	 */
	updateLegend(legend) {
		this.chart.updateLegend(legend);
	}

	/**
	 * Calls `addLegend()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	addLegend() {
		this.chart.addLegend();
	}

	/**
	 * Calls `positionLegend()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	positionLegend() {
		this.chart.positionLegend();
	}

	/**
	 * Calls `addLegendCircleHoverEffect()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	addLegendCircleHoverEffect() {
		this.chart.addLegendCircleHoverEffect();
	}

	/**
	 * Calls `hasLegendExpandBtn()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	hasLegendExpandBtn() {
		this.chart.hasLegendExpandBtn();
	}

	/**
	 * Calls `isLegendOnRight()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	isLegendOnRight() {
		this.chart.isLegendOnRight();
	}

	/**
	 * Calls `addTooltipOpenButtonToLegend()` from the chart library.
	 *
	 * @memberof BaseChart
	 */
	addTooltipOpenButtonToLegend() {
		this.chart.addTooltipOpenButtonToLegend();
	}

	/**
	 * Calls `()` from the chart library.
	 *
	 * @popenLegendTooltiparam {any} target
	 * @memberof BaseChart
	 */
	openLegendTooltip(target) {
		this.chart.openLegendTooltip(target);
	}

	/**
	 * Calls `()` from the chart library.
	 *
	 * @param showLabelTooltip{any} d
	 * @param {any} leftSide
	 * @memberof BaseChart
	 */
	showLabelTooltip(d, leftSide) {
		this.chart.showLabelTooltip(d, leftSide);
	}

	/**
	 * Calls `()` from the chart library.
	 *
	 * @pshowTooltiparam {any} d
	 * @memberof BaseChart
	 */
	showTooltip(d) {
		this.chart.showTooltip(d);
	}
}
