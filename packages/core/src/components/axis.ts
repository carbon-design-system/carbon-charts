// Internal Imports
import { ChartComponent } from "./base-component";
import * as Configuration from "../configuration";
import { AxisPositions } from "../interfaces";

// D3 Imports
import { scaleBand, ScaleBand, ScaleLinear, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft, axisRight, AxisScale, AxisDomain, axisTop } from "d3-axis";
import { min, max } from "d3-array";

export class Axis extends ChartComponent {
	x: ScaleBand<any>;
	y: ScaleLinear<any, any>;
	y2: ScaleLinear<any, any>;
	thresholdDimensions: any;
	options: any;

	constructor(options?: any) {
		super();

		this.options = options;
	}

	render() {
		this.updateXandYGrid();

		if (this.options.axisType === AxisPositions.TOP || this.options.axisType === AxisPositions.BOTTOM) {
			this.setXScale();
			this.setXAxis();
		} else {
			this.setYScale();
			this.setYAxis();
		}
	}

	update() {
		this.setXScale();
		this.setXAxis();
		this.setYScale();
		this.setYAxis();
	}

	updateXandYGrid() {

	}

	setXScale() {
		const { width } = this._services.domUtils.getSVGSize(this._parent);

		this.x = scaleBand().rangeRound([0, width]).padding(Configuration.scales.x.padding);
		this.x.domain(this._model.getData().labels);
	}

	setXAxis(noAnimation?: boolean) {
		const { appendOrSelect } = this._services.domUtils;
		const svg = this._parent;
		// const t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();

		const axisFunction = this.options.axisType === AxisPositions.TOP ? axisTop : axisBottom;
		const xAxis = axisFunction(this.x)
			// .tickSize(0)
			// .tickSizeOuter(0);

		const xAxisRef = appendOrSelect(svg, "g.x.axis")
			.call(xAxis);

		xAxisRef.select("path.domain").remove();

		if (this.options.axisType === AxisPositions.TOP) {
			const heightShift = this._services.domUtils.getSVGSize(xAxisRef).height;
			xAxisRef.attr("transform", `translate(0, ${heightShift - 1})`);
		}

		// Update the position of the pieces of text inside x-axis
		// xAxisRef.selectAll("g.tick text")
		// 	.attr("y", Configuration.scales.magicY1)
		// 	.attr("x", Configuration.scales.magicX1)
		// 	.attr("dy", ".35em")
		// 	// .attr("transform", `rotate(${Configuration.scales.xAxisAngle})`)
		// 	.style("text-anchor", "end");
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

	getYMax() {
		const { datasets } = this._model.getData();
		const { scales } = this._model.getOptions();
		let yMax;

		if (datasets.length === 1) {
			yMax = max(datasets[0].data);
		} else {
			yMax = max(datasets, (d: any) => (max(d.data)));
		}

		if (scales.y.yMaxAdjuster) {
			yMax = scales.y.yMaxAdjuster(yMax);
		}

		return yMax;
	}

	getYMin() {
		const { datasets } = this._model.getData();
		const { scales } = this._model.getOptions();
		let yMin;

		if (datasets.length === 1) {
			yMin = min(datasets[0].data);
		} else {
			yMin = min(datasets, (d: any) => (min(d.data)));
		}

		if (scales.y.yMinAdjuster) {
			yMin = scales.y.yMinAdjuster(yMin);
		}

		return yMin;
	}

	setYScale(yScale?: any) {
		const height = this._services.domUtils.getSVGSize(this._parent).height;
		const { scales } = this._model.getOptions();

		const yMin = this.getYMin();
		const yMax = this.getYMax();

		this.y = scaleLinear().range([height, 0]);
		this.y.domain([Math.min(yMin, 0), yMax]);

		if (scales.y2 && scales.y2.ticks.max) {
			this.y2 = scaleLinear().rangeRound([height, 0]);
			this.y2.domain([scales.y2.ticks.min, scales.y2.ticks.max]);
		}
	}

	setYAxis(noAnimation?: boolean) {
		const chartSize = this._services.domUtils.getChartSize();
		const svg = this._parent;

		const { scales } = this._model.getOptions();
		// const t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();
console.log("scales.y.formatter", scales.y.formatter)
		const axisFunction = this.options.axisType === AxisPositions.LEFT ? axisLeft : axisRight;
		const yAxis = axisFunction(this.y)
			.ticks(scales.y.numberOfTicks || Configuration.scales.y.numberOfTicks)
			.tickSize(0)
			.tickFormat(scales.y.formatter as any);

		let yAxisRef = svg.select("g.y.axis");
		const horizontalLine = svg.select("line.domain");

		// svg.select("g.x.axis path.domain")
		// 	.remove();

		// If the <g class="y axis"> exists in the chart SVG, just update it
		if (yAxisRef.nodes().length > 0) {
			yAxisRef
				// .attr("transform", "translate(30, 0)")
				// .transition(t)
				// Casting to any because d3 does not offer appropriate typings for the .call() function
				.call(yAxis as any);

			horizontalLine
				// .transition(t)
				.attr("y1", this.y(0))
				.attr("y2", this.y(0))
				.attr("x1", 0)
				.attr("x2", chartSize.width);
		} else {
			yAxisRef = svg.append("g")
				.attr("class", "y axis yAxes")
				// .attr("transform", "translate(30, 0)");

			yAxisRef.call(yAxis);

			// yAxisRef.append("line")
			// 	.classed("domain", true)
			// 	.attr("y1", this.y(0))
			// 	.attr("y2", this.y(0))
			// 	.attr("x1", 0)
			// 	.attr("x2", chartSize.width)
			// 	.attr("stroke", Configuration.scales.domain.color)
			// 	.attr("fill", Configuration.scales.domain.color)
			// 	.attr("stroke-width", Configuration.scales.domain.strokeWidth);
		}

		if (this.options.axisType === AxisPositions.LEFT) {
			const widthShift = this._services.domUtils.getSVGSize(yAxisRef).width;
			yAxisRef.attr("transform", `translate(${widthShift - 1}, 0)`);
		}

		// const tickHeight = this.getLargestTickHeight(yAxisRef.selectAll(".tick"));

		// // Add y-axis title
		// if (this.innerWrap.select(".axis-label.y").nodes().length === 0 && this.options.scales.y.title) {
		// 	yAxisRef.append("text")
		// 		.attr("class", "y axis-label")
		// 		.text(this.options.scales.y.title);

		// 	const yAxisCenter = yAxisRef.node().getBBox().height / 2;
		// 	const yAxisLabelWidth = this.innerWrap.select(".axis-label.y").node().getBBox().width;

		// 	const yAxisTitleTranslate = {
		// 		x: - yAxisCenter + yAxisLabelWidth / 2,
		// 		y: - (tickHeight + Configuration.scales.tick.heightAddition)
		// 	};

		// 	// Align y axis title on the y axis
		// 	this.innerWrap.select(".axis-label.y")
		// 		.attr("transform", `rotate(-90) translate(${yAxisTitleTranslate.x}, ${yAxisTitleTranslate.y})`);
		// }

		// Tools.moveToFront(horizontalLine);

		// if (scales.y2 && scales.y2.ticks.max) {
		// 	const secondaryYAxis = axisRight(this.y2)
		// 		.ticks(scales.y2.numberOfTicks || Configuration.scales.y2.numberOfTicks)
		// 		.tickSize(0)
		// 		.tickFormat(scales.y2.formatter);

		// 	const secondaryYAxisRef = this.svg.select("g.y2.axis");
		// 	// If the <g class="y axis"> exists in the chart SVG, just update it
		// 	if (secondaryYAxisRef.nodes().length > 0) {
		// 		secondaryYAxisRef.transition(t)
		// 			.attr("transform", `translate(${this.getChartSize().width}, 0)`)
		// 			// Being cast to any because d3 does not offer appropriate typings for the .call() function
		// 			.call(secondaryYAxis as any);
		// 	} else {
		// 		this.innerWrap.append("g")
		// 			.attr("class", "y2 axis yAxes")
		// 			.attr("transform", `translate(${this.getChartSize().width}, 0)`)
		// 			.call(secondaryYAxis);
		// 	}
		// }
	}
}
