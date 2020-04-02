// Internal Imports
import { Component } from "../component";

export class Skeleton extends Component {
	type = "skeleton";

	setStyle(color: string) {
		const svg = this.parent;
		const container = svg.select(".chart-skeleton");
		const options = this.model.getOptions();
		// TODO: get the right option that, for now, it doesn't exist
		const strokeColor = options.grid.strokeColor ? options.grid.strokeColor : color;
		container.selectAll("line").attr("stroke", strokeColor);
		container.selectAll("rect").attr("stroke", strokeColor);
	}

	removeSkeleton() {
		const container = this.parent.select("svg.chart-skeleton");
		container.remove();
	}

}
