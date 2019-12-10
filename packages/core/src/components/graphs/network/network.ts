import { zoom } from "d3-zoom";
import { event as d3Event } from "d3";
import settings from "carbon-components/src/globals/js/settings";
import { DOMUtils } from "../../../services";

// Internal Imports
import { Component } from "../../component";
import NetworkCard from "./network-card";
import NetworkLine from "./network-line";

const { prefix } = settings;

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
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });

		this.svg.append("rect")
			.attr("height", height)
			.attr("width", width)
			.attr("width", width)
			.attr("class", `${prefix}--network__background`);

		this.svg.call(zoom()
			.on("zoom", () => {
				this.svg.attr("transform", d3Event.transform);
				this.svg.selectAll("text").attr("user-select", "none");
			})
			.on("end", () => {
				this.svg.selectAll("text").attr("user-select", "auto");
			})
		);

		this.drawCards();
		this.drawLines();
	}
}
