// Internal Imports
import { Component } from "../../component";
import NetworkCard from "./network-card";
import NetworkLine from "./network-line";

export class Network extends Component {
	type = "network";
	data = this.model.getDisplayData().datasets;
	nodes = this.data[0].data;
	links = this.data[1].data;
	svg = this.getContainerSVG();
	nodeHeight = 64;
	nodeWidth = 208;

	drawCards() {
		NetworkCard({
			svg: this.svg,
			selector: "rect.network-card",
			data: this.nodes,
			accessor: d => d,
			height: this.nodeHeight,
			width: this.nodeWidth,
		});
	}

	drawLines() {
		NetworkLine({
			svg: this.svg,
			selector: "rect.network-line",
			data: this.links,
			accessor: d => d,
			nodeHeight: this.nodeHeight,
			nodeWidth: this.nodeWidth
		});
	}

	render(animate: boolean) {
		this.drawCards();
		this.drawLines();
	}
}
