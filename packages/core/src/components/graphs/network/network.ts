import { zoom } from "d3-zoom";
import { event as d3Event } from "d3";
import { max } from "d3-array";
import settings from "carbon-components/src/globals/js/settings";
import { DOMUtils } from "../../../services";
import classnames from "classnames";

// Marker icons
import ChevronRight from "@carbon/icons/es/chevron--right/24";
import ChevronLeft from "@carbon/icons/es/chevron--left/24";
import { getIconString } from "./utils";

// Internal Imports
import { Component } from "../../component";
import NetworkCard from "./network-card";
import NetworkLine from "./network-line";

const { prefix } = settings;

export class Network extends Component {
	type = "network";
	data = this.model.getDisplayData().datasets[0];
	options = this.model.getOptions();
	svg = this.getContainerSVG();

	drawCards(container) {
		const { nodeHeight, nodeWidth } = this.options;
		const { nodes } = this.data;

		NetworkCard({
			svg: container,
			selector: "rect.network-card",
			data: nodes,
			accessor: d => d,
			height: nodeHeight,
			width: nodeWidth,
		});
	}

	drawLines(container) {
		const { nodeHeight, nodeWidth } = this.options;
		const { links } = this.data;

		NetworkLine({
			svg: container,
			selector: "rect.network-line",
			data: links,
			accessor: d => d,
			nodeHeight: nodeHeight,
			nodeWidth: nodeWidth
		});
	}

	buildMarkerDefs = (links) => links.reduce((unique, link) => {
		const { kind, multiDirectional} = link;
		const id = `marker${kind ? `-${kind}` : ``}-end`;
		const markerClasses = classnames(`${prefix}--network-marker`, {
			[`${prefix}--network-marker--${kind}`]: kind
		});
		unique[id] = { id, end: true, markerClasses };

		if (multiDirectional) {
			const startMarkerId = `marker${kind ? `-${kind}` : ``}-start`;
			unique[startMarkerId] = { id: startMarkerId, end: false, markerClasses };
		}

		return unique;
	}, {})

	render(animate: boolean) {
		const { nodes, links } = this.data;
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
		const { nodeHeight = 64, nodeWidth = 208, margin = 80 } = this.options;
		const xMax = max(nodes, ({x}) => x);
		const yMax =  max(nodes, ({y})  => y);
		const innerWidth = parseFloat(xMax + nodeWidth);
		const innerHeight = parseFloat(yMax + nodeHeight);

		const markerData = this.buildMarkerDefs(links);

		const markers = this.svg.append("svg:defs")
			.selectAll("marker")
			.data(Object.values(markerData))
			.enter()
				.append("svg:marker")
				.attr("id", d => d.id)
				.attr("class", d => d.markerClasses)
				.attr("markerHeight", 24)
				.attr("markerWidth", 24)
				.attr("orient", "auto")
				.attr("refX", d => d.end ? 16 : 10)
				.attr("refY", 12)
					.html(d => getIconString(d.end ? ChevronRight : ChevronLeft));

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
			.translateExtent([[-margin, -margin], [innerWidth + margin, innerHeight + margin]])
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
