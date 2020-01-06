import { zoom } from "d3-zoom";
import { event as d3Event } from "d3";
import settings from "carbon-components/src/globals/js/settings";

// Internal Imports
import { DOMUtils } from "../../../services";
import { Component } from "../../component";
import { NetworkCard } from "./network-card";
import { NetworkLine } from "./network-line";

const { prefix } = settings;

export class Network extends Component {
	type = "network";
	data = this.model.getDisplayData().datasets[0];
	options = this.model.getOptions();
	svg = this.getContainerSVG();

	drawCards(container) {
		const { nodeHeight, nodeWidth } = this.options;

		const cards = new NetworkCard(this.model, this.services, {
			container,
			selector: "rect.network-card",
			accessor: d => d,
			height: nodeHeight,
			width: nodeWidth,
		});

		cards.render();
	}

	drawLines(container) {
		const { nodeHeight, nodeWidth } = this.options;

		const lines = new NetworkLine(this.model, this.services, {
			container,
			selector: "rect.network-line",
			accessor: d => d,
			nodeHeight: nodeHeight,
			nodeWidth: nodeWidth
		});

		lines.render();
	}

	render() {
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });

		const zoomBox = this.svg.append("rect")
			.attr("height", height)
			.attr("width", width)
			.attr("class", `${prefix}--network__background`);

		const container = this.svg.append("g")
			.attr("class", `${prefix}--network__content`)
			.attr("transform", `translate(0,0)`);

		// TODO Move this into ZoomableChart class
		const zoomed = zoom()
			.scaleExtent([0.25, 3])
			.on("zoom", () => {
				container.attr("transform", d3Event.transform);
				container.selectAll("text").attr("user-select", "none");
			})
			.on("end", () => {
				container.selectAll("text").attr("user-select", "auto");
			});

		this.svg.call(zoomed);

		this.drawCards(container);
		this.drawLines(container);
	}
}
