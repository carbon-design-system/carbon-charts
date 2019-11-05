// Internal Imports
import { Component } from "../component";

// Add a network card and link class here initially? then move to another file

/**
class NetworkCard extends Component {
	type = "network-card";

	render() {

	}
} */

export class Network extends Component {
	type = "network";

	render(animate: boolean) {
		// Define some mock data here
		// Select all 'network-card'
		// Enter, append

		const svg = this.getContainerSVG();

		const cards = svg.selectAll("rect.network-card")
			.data(this.model.getDisplayData().datasets, dataset => dataset.label)
			.enter()
			.append("rect")
			.classed("dataset", true)
			.attr("height", 80)
			.attr("width", 240)
			.attr("focusable", true)
			.attr("fill", "#eeeeee")
			.attr("stroke-width", "1px")
			.attr("stroke", "#000");
	}
}
