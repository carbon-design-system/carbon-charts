// D3 Imports
import { select, selectAll, mouse } from "d3-selection";
import { line } from "d3-shape";

import { ScatterChart } from "./scatter-chart";
import * as Configuration from "./configuration";
import { ChartConfig, LineChartOptions, ChartType } from "./configuration";

import { getD3Curve } from "./services/curves";
import { Tools } from "./tools";

export class LineChart extends ScatterChart {
	lineGenerator: any;

	options: LineChartOptions;

	constructor(holder: Element, configs: ChartConfig<LineChartOptions>) {
		super(holder, configs);

		// initialize options
		if (configs.options) {
			this.options = Tools.merge({}, Configuration.options.LINE, configs.options);
		} else {
			this.options = Tools.merge({}, Configuration.options.LINE);
		}

		this.options.type = ChartType.LINE;
	}

	draw() {
		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const { line: margins } = Configuration.charts.margin;

		this.innerWrap.style("width", "100%").style("height", "100%");

		this.innerWrap.attr("transform", `translate(${margins.left}, ${margins.top})`);

		let curveName;
		let curveOptions;
		this.options.curve = this.options.curve || "curveLinear";
		if (typeof this.options.curve === "string") { // curve: 'string'
			curveName = this.options.curve;
			curveOptions = {};
		} else { // curve: { name: 'string' }
			curveName = this.options.curve.name || "curveLinear";
			curveOptions = this.options.curve;
			delete curveOptions["name"];
		}

		// D3 line generator function
		this.lineGenerator = line()
			.x((d, i) => this.x(this.displayData.labels[i]) + this.x.step() / 2)
			.y((d: any) => this.y(d))
			.curve(getD3Curve(curveName, curveOptions));

		const gLines = this.innerWrap.selectAll("g.lines")
			.data(this.displayData.datasets)
			.enter()
				.append("g")
				.classed("lines", true);

		gLines.append("path")
			.attr("stroke", d => this.getStrokeColor(d.label))
			.datum(d => d.data)
			.attr("class", "line")
			.attr("d", this.lineGenerator);

		super.draw();
	}

	interpolateValues(newData: any) {
		const { line: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		this.innerWrap.selectAll(".removed")
			.remove();

		// Apply new data to the lines
		const gLines = this.innerWrap.selectAll("g.lines")
			.data(newData.datasets);

		this.updateElements(true, gLines);

		// Add lines that need to be added now
		const addedLineGroups = gLines.enter()
			.append("g")
			.classed("lines", true);

		addedLineGroups.append("path")
			.attr("stroke", d => this.getStrokeColor(d.label))
			.datum(d => d.data)
			.style("opacity", 0)
			.transition(this.getDefaultTransition())
			.style("opacity", 1)
			.attr("class", "line")
			.attr("d", this.lineGenerator);

		// Remove lines that are no longer needed
		gLines.exit()
			.classed("removed", true) // mark this element with "removed" class so it isn't reused
			.transition(this.getDefaultTransition())
			.style("opacity", 0)
			.remove();

		super.interpolateValues(newData);
	}

	updateElements(animate: boolean, gLines?: any) {
		if (!gLines) {
			gLines = this.innerWrap.selectAll("g.lines");
		}

		const transitionToUse = animate ? this.getFillTransition() : this.getInstantTransition();
		const self = this;
		gLines.selectAll("path.line")
			.datum(function(d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return parentDatum.data;
			})
			.transition(transitionToUse)
			.style("opacity", 1)
			.attr("stroke", function(d) {
				const parentDatum = select(this.parentNode).datum() as any;
				return self.getStrokeColor(parentDatum.label);
			})
			.attr("class", "line")
			.attr("d", this.lineGenerator);

		super.updateElements(animate);
	}
}
