import { zoom } from "d3-zoom";
import { event as d3Event } from "d3";
import { max, min } from "d3-array";
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

	drawCards(container) {
		NetworkCard({
			svg: container,
			selector: "rect.network-card",
			data: this.nodes,
			accessor: d => d,
			height: this.nodeHeight,
			width: this.nodeWidth,
		});
	}

	drawLines(container) {
		NetworkLine({
			svg: container,
			selector: "rect.network-line",
			data: this.links,
			accessor: d => d,
			nodeHeight: this.nodeHeight,
			nodeWidth: this.nodeWidth
		});
	}

	render(animate: boolean) {
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });

		const xMax = max(this.nodes, ({x}) => x);
		const yMax =  max(this.nodes, ({y})  => y);
		const innerWidth = parseFloat(xMax) +  this.nodeWidth;
		const innerHeight = parseFloat(yMax) + this.nodeHeight;
		const margin = 80;

		const container = this.svg.append("g")
			.attr("class", `${prefix}--network__content`);

		// TODO Move this into ZoomableChart class
		const zoomed = zoom()
			.scaleExtent([1, 40])
			.translateExtent([[-margin, -margin], [height + margin, width + margin]])
			.on("zoom", () => {
				container.attr("transform", d3Event.transform);
				container.selectAll("text").attr("user-select", "none");
			})
			.on("end", () => {
				container.selectAll("text").attr("user-select", "auto");
			});

		container.append("rect")
			.attr("height", innerHeight)
			.attr("width", innerWidth)
			.attr("class", `${prefix}--network__background`);

		this.svg.call(zoomed(container));

		this.drawCards(container);
		this.drawLines(container);
	}
}
