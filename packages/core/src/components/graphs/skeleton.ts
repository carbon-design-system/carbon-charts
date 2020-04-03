// Internal Imports
import { Component } from "../component";

// D3 Imports
import { scaleLinear } from "d3-scale";

export class Skeleton extends Component {
	type = "skeleton";
	xScale: any;
	yScale: any;

	setScales() {
		const xRange = this.services.cartesianScales.getMainXScale().range();
		const yRange = this.services.cartesianScales.getMainYScale().range();
		this.xScale = scaleLinear().domain([0, 1]).range(xRange);
		this.yScale = scaleLinear().domain([0, 1]).range(yRange);
	}

	setStyle() {
		const svg = this.parent;
		const container = svg.select(".chart-skeleton-backdrop");
		const options = this.model.getOptions();
		// TODO: get the right option that, for now, it doesn't exist
		const strokeColor = options.grid.strokeColor;
		container.selectAll("line").attr("stroke", strokeColor);
		container.selectAll("rect").attr("stroke", strokeColor);
	}

	removeSkeleton() {
		const container = this.parent.select("svg.chart-skeleton-backdrop");
		container.remove();
	}

}
