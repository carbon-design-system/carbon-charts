// Internal Imports
import { Component } from "../component";

// Add a network card and link class here initially? then move to another file
const NetworkCards = ({svg, selector, data, accessor, height, width, fill, strokeColor}) => {
	const cards = svg.selectAll(selector)
			.data(data, accessor)
			.enter()
			.append("rect")
			.classed("dataset", true)
			.attr("height", height)
			.attr("width", width)
			.attr("focusable", true)
			.attr("fill", fill)
			.attr("stroke-width", "1px")
			.attr("stroke", strokeColor);
	return cards;
};

export class Network extends Component {
	type = "network";

	drawCards(svg) {
		NetworkCards({
			svg,
			selector: "rect.network-card",
			data: this.model.getDisplayData().datasets,
			accessor: dataset => dataset.label,
			height: 80,
			width: 240,
			fill: "#eeeeee",
			strokeColor: "#000"
		});
	}

	render(animate: boolean) {
		// Define some mock data here
		// Select all 'network-card'
		// Enter, append
		const svg = this.getContainerSVG();
		this.drawCards(svg);

	}
}
