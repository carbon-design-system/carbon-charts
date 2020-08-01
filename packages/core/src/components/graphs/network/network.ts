import { zoom } from "d3-zoom";
import { event as d3Event } from "d3";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
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
	xMax;
	yMax;
	innerWidth;
	innerHeight;
	xScale;
	yScale;
	parsedNodes;
	parsedLinks;

	calculateInnerHeight = (yMax) => {
		const { cellHeight } = this.options;
		return (yMax + 1) * cellHeight;
	}

	calculateInnerWidth = (xMax) => {
		const { cellWidth } = this.options;
		return (xMax + 1) * cellWidth;
	}

	calculatePositions = () => {
		const { nodes, links } = this.data;

		this.xMax = max(nodes, ({column}) => column);
		this.yMax = max(nodes, ({row}) => row);

		this.innerWidth = this.calculateInnerWidth(this.xMax);
		this.innerHeight = this.calculateInnerHeight(this.yMax);

		this.xScale = scaleLinear()
			.rangeRound([0, this.innerWidth])
			.domain([0, this.xMax + 1]);

		this.yScale = scaleLinear()
			.rangeRound([0, this.innerHeight])
			.domain([0, this.yMax + 1]);

		this.parsedNodes = nodes.map( ({column, row, ...rest}) => {
			const xScaled = this.xScale(column);
			const yScaled = this.yScale(row);

			return {
				x: xScaled,
				y: yScaled,
				column,
				row,
				...rest
			};
		});

		this.parsedLinks = links.map(({source, target, ...rest}) => {
			const sourceNode = this.parsedNodes.find(node => node.id === source);
			const targetNode = this.parsedNodes.find(node => node.id === target);

			return {
				source: sourceNode,
				target: targetNode,
				...rest
			};
		});
	}

	drawCards(container) {
		const { nodeHeight, nodeWidth } = this.options;

		const cards = new NetworkCard(this.model, this.services, {
			container,
			selector: "rect.network-card",
			height: nodeHeight,
			width: nodeWidth,
			data: this.parsedNodes
		});

		cards.render();
	}

	drawLines(container) {
		const { nodeHeight, nodeWidth } = this.options;

		const lines = new NetworkLine(this.model, this.services, {
			container,
			selector: "rect.network-line",
			nodeHeight: nodeHeight,
			nodeWidth: nodeWidth,
			data: this.parsedLinks
		});

		lines.render();
	}

	render() {
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
		const svg = this.getContainerSVG();

		const zoomBox = svg.append("rect")
			.attr("height", height)
			.attr("width", width)
			.attr("class", `${prefix}--network__background`);

		const container = svg.append("g")
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

		svg.call(zoomed);

		this.calculatePositions();
		this.drawCards(container);
		this.drawLines(container);
	}
}
