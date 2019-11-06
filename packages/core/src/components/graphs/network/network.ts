// Internal Imports
import { Component } from "../../component";
import NetworkCards from "./network-cards";
import NetworkLines from "./network-lines";

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
