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
			.attr("x", d => d.x)
			.attr("y", d => d.y)
			.attr("tabindex", 0)
			.attr("stroke-width", "1px")
			.attr("stroke", strokeColor);
	return cards;
};

export class Network extends Component {
	type = "network";
	data = this.model.getDisplayData().datasets;
	nodes = this.data[0].data;
	links = this.data[0].links;

	drawCards(svg) {
		NetworkCards({
			svg,
			selector: "rect.network-card",
			data: this.nodes,
			accessor: d => d,
			height: 64,
			width: 220,
			fill: "#eeeeee",
			strokeColor: "#000"
		});
	}

	render(animate: boolean) {
		const svg = this.getContainerSVG();
		this.drawCards(svg);

	}
}
