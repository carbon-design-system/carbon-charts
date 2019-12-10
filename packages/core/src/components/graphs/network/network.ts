import { zoom } from "d3-zoom";
import { event as d3Event } from "d3";
import { max } from "d3-array";
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
	options = this.model.getOptions();
	nodes = this.data[0].data;
	links = this.data[1].data;
	svg = this.getContainerSVG();

	drawCards(container) {
		const { nodeHeight, nodeWidth } = this.options;
		NetworkCard({
			svg: container,
			selector: "rect.network-card",
			data: this.nodes,
			accessor: d => d,
			height: nodeHeight,
			width: nodeWidth,
		});
	}

	drawLines(container) {
		const { nodeHeight, nodeWidth } = this.options;
		NetworkLine({
			svg: container,
			selector: "rect.network-line",
			data: this.links,
			accessor: d => d,
			nodeHeight: nodeHeight,
			nodeWidth: nodeWidth
		});
	}

	render(animate: boolean) {
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
		const { nodeHeight = 64, nodeWidth = 208, margin = 80 } = this.options;
		const xMax = max(this.nodes, ({x}) => x);
		const yMax =  max(this.nodes, ({y})  => y);
		const innerWidth = parseFloat(xMax + nodeWidth);
		const innerHeight = parseFloat(yMax + nodeHeight);

		const container = this.svg.append("g")
			.attr("class", `${prefix}--network__content`)
			.attr("transform", `translate(0,0)`);

		// TODO Move this into ZoomableChart class
		const zoomed = zoom()
				.scaleExtent([0.25, 3])
				.translateExtent([[-margin, -margin], [innerWidth + margin, innerHeight + margin]])
				.on("zoom", () => {
					container.attr("transform", d3Event.transform);
					container.selectAll("text").attr("user-select", "none");
				})
				.on("end", () => {
					container.selectAll("text").attr("user-select", "auto");
				});

		this.svg.append("rect")
			.attr("height", height)
			.attr("width", width)
			.attr("class", `${prefix}--network__background`);

		this.svg.call(zoomed);

		this.drawCards(container);
		this.drawLines(container);
	}
}
