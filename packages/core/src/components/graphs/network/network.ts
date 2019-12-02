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

	drawCards() {
		NetworkCard({
			svg: this.svg,
			selector: "rect.network-card",
			data: this.nodes,
			accessor: d => d,
			height: 64,
			width: 220,
		});
	}

	drawLines() {
		NetworkLine({
			svg: this.svg,
			selector: "rect.network-line",
			data: this.links,
			accessor: d => d
		});
	}

	render(animate: boolean) {
		this.drawCards();
		this.drawLines();
	}
}
