// Internal Imports
import { Component } from "../component";

const NetworkLines = ({svg, data, accessor, selector, strokeColor}) => {
	const lines = svg.selectAll(selector)
		.data(data, accessor)
		.enter()
		.append("line")
		.classed("line", true)
		.attr("x1", d => d.source.x)
		.attr("y1", d => d.source.y)
		.attr("x2", d => d.target.x)
		.attr("y2", d => d.target.y)
		.attr("stroke", strokeColor);
	return lines;
};

// Add a network card and link class here initially? then move to another file
const NetworkCards = ({svg, selector, data, accessor, height, width, fill, strokeColor}) => {
	const cards = svg.selectAll(selector)
			.data(data, accessor)
			.enter()
			.append("rect")
			.classed("node", true)
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
	links = this.data[1].data;
	svg = this.getContainerSVG();

	drawCards() {
		NetworkCards({
			svg: this.svg,
			selector: "rect.network-card",
			data: this.nodes,
			accessor: d => d,
			height: 64,
			width: 220,
			fill: "#eeeeee",
			strokeColor: "#000"
		});
	}

	drawLines() {
		NetworkLines({
			svg: this.svg,
			selector: "rect.network-line",
			data: this.links,
			accessor: d => d,
			strokeColor: "#000"
		});
	}

	render(animate: boolean) {
		this.drawCards();
		this.drawLines();

	}
}
