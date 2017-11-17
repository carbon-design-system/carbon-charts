import * as d3 from "d3";
import { BaseAxisChart } from "./base-axis-chart";
import { Configuration } from "./configuration";

export class PieChart extends BaseAxisChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "pie";
	}

	drawChart(data?: any) {
		if (data) {
			this.data = data;
		}

		this.setSVG();

		this.setXScale();
		this.setYScale();
		this.addLegend();
		if (this.options.legendClickable) {
			this.setClickableLegend();
		}

		this.positionLegend();
		this.repositionSVG();
		this.draw();
		this.addDataPointEventListener();
		if (this.options.containerResizable) {
			this.setResizeWhenContainerChange();
		}
	}

	draw(yScale: d3.ScaleLinear<number, number> = this.yScale, activeSeries = this.getActiveDataSeries()) {

	}

	addDataPointEventListener() {
	}
}
