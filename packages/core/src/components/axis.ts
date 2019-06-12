// Internal Imports
import { ChartComponent } from "./base-component";
import * as Configuration from "../configuration";

// D3 Imports
import { scaleBand, ScaleBand, ScaleLinear } from "d3-scale";
import { axisBottom, axisLeft, axisRight, AxisScale, AxisDomain } from "d3-axis";
import { select } from "d3-selection";

export class Axis extends ChartComponent {
	x: ScaleBand<any>;
	y: ScaleLinear<any, any>;
	y2: ScaleLinear<any, any>;
	thresholdDimensions: any;

	render() {
		console.log("rander AXIS");
		this.updateXandYGrid();
		this.setXScale();
		this.setXAxis();
		this.setYScale();
		this.setYAxis();
	}

	update() {
		// console.log("UPDATE AXIS");
	}

	updateXandYGrid() {
		
	}

	setXScale() {
		const { bar: margins } = Configuration.charts.margin;

		const chartSize = this._essentials.domUtils.getChartSize();
		const width = chartSize.width - margins.left - margins.right;

		this.x = scaleBand().rangeRound([0, width]).padding(Configuration.scales.x.padding);
		this.x.domain(this._model.getData().labels);

		console.log(this.x.domain())
	}

	setXAxis(noAnimation?: boolean) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this._essentials.domUtils.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;

		const svg = select(this._essentials.domUtils.getSVG());
		// const t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();

		const xAxis = axisBottom(this.x)
			.tickSize(0)
			.tickSizeOuter(0);
		let xAxisRef = svg.select("g.x.axis");

		// If the <g class="x axis"> exists in the chart SVG, just update it
		if (xAxisRef.nodes().length > 0) {
			xAxisRef = svg.select("g.x.axis")
				// .transition(t)
				.attr("transform", `translate(0, ${height})`)
				// Casting to any because d3 does not offer appropriate typings for the .call() function
				.call(xAxis);
		} else {
			xAxisRef = svg.append("g")
				.attr("class", "x axis");

			xAxisRef.call(xAxis);
		}

		// Update the position of the pieces of text inside x-axis
		xAxisRef.selectAll("g.tick text")
			.attr("y", Configuration.scales.magicY1)
			.attr("x", Configuration.scales.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.scales.xAxisAngle})`)
			.style("text-anchor", "end")
			// .call(text => this.wrapTick(text));

		// // get the tickHeight after the ticks have been wrapped
		// const tickHeight = this.getLargestTickHeight(xAxisRef.selectAll(".tick")) + Configuration.scales.tick.heightAddition;
		// // Add x-axis title
		// if (this.innerWrap.select(".axis-label.x").nodes().length === 0 && this.options.scales.x.title) {
		// 	xAxisRef.append("text")
		// 		.attr("class", "x axis-label")
		// 		.attr("text-anchor", "middle")
		// 		.attr("transform", `translate(${xAxisRef.node().getBBox().width / 2}, ${tickHeight})`)
		// 		.text(this.options.scales.x.title);
		// }

		// // get the yHeight after the height of the axis has settled
		// const yHeight = this.getChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		// xAxisRef.attr("transform", `translate(0, ${yHeight})`);
	}

	setYScale() {

	}

	setYAxis() {

	}
}
