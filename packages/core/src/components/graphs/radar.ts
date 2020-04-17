// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";
import {
	CalloutDirections,
	Roles,
	TooltipTypes,
	Events
} from "../../interfaces";

// D3 Imports
import { scaleBand, scaleLinear } from "d3-scale";
import { extent, max } from "d3-array";
import { lineRadial, areaRadial, curveLinearClosed, curveCardinalClosed } from "d3-shape";
import { nest } from "d3-collection";

const DEBUG = true;

interface Datum {
	group: string;
	key: string;
	value: number;
}

export class Radar extends Component {
	type = "radar";

	init() {
		const { events } = this.services;
		// Highlight correct line legend item hovers
		events.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover);
		// Un-highlight lines on legend item mouseouts
		events.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut);
	}

	render(animate = true) {
		/////////////////////////////
		// Containers
		/////////////////////////////
		const svg = this.parent;
		const { width, height } = DOMUtils.getSVGElementSize(svg, { useAttrs: true });
		if (!width || !height) {
			return;
		}

		// draw backdrop
		const backdropRect = DOMUtils.appendOrSelect(svg, "rect.radar-backdrop")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("stroke", "red")
			.attr("fill", "none");

		const data: Array<Datum> = this.model.getData();
		const displayData: Array<Datum> = this.model.getDisplayData();
		const groupedData = this.model.getGroupedData();
		const options = this.model.getOptions();

		// console.log("  data:", data);
		// console.log("  displayData:", displayData);
		// console.log("  groupedData:", groupedData);
		// console.log("  options:", options);

		/////////////////////////////
		// Computations
		/////////////////////////////

		// center
		const cx = width / 2;
		const cy = height / 2;

		const fontSize = 10;
		const size = Math.min(width, height);
		const diameter = size - 2 * fontSize;
		const radius = diameter / 2;

		// given a key, return the corrisponding angle in radiants
		const xScale = scaleBand()
			.domain(displayData.map(d => d.key))
			.range([0, 2 * Math.PI]);

		const ticksNumber = 5;
		const yScale = scaleLinear()
			.domain([0, max(displayData.map(d => d.value))])
			.range([0, radius]);
		const yTicks = yScale.ticks(ticksNumber);

		const colorScale = (key: string): string => this.model.getFillColor(key);

		const radialLineGenerator = lineRadial<Datum>()
			.angle(d => xScale(d.key))
			.radius(d => yScale(d.value))
			.curve(curveLinearClosed);

		const getCoordinates = (key: string, r: number) => {
			const angle = xScale(key) - Math.PI / 2;
			// translate by the center
			const x = r * Math.cos(angle) + cx;
			const y = r * Math.sin(angle) + cy;
			return { x, y };
		};

		/////////////////////////////
		// Draw
		/////////////////////////////

		const debugContainer = DOMUtils.appendOrSelect(svg, "g.debug");

		// center
		const center = DOMUtils.appendOrSelect(debugContainer, "circle.center")
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("r", 2)
			.attr("fill", "gold");

		// circumferences
		const circumferences = DOMUtils.appendOrSelect(debugContainer, "g.circumferences");
		const circumferencesUpdate = circumferences.selectAll("circle").data(yTicks);
		circumferencesUpdate
			.enter()
			.append("circle")
			.merge(circumferencesUpdate)
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("r", d => yScale(d))
			.attr("fill", "none")
			.attr("stroke", "red");
		circumferencesUpdate.exit().remove();

		// x axes
		const keysValues = uniqBy(data, "key");
		const spokes = DOMUtils.appendOrSelect(debugContainer, "g.axis");
		const spokesUpdate = spokes.selectAll("line").data(keysValues);
		spokesUpdate
			.enter()
			.append("line")
			.merge(spokesUpdate)
			.attr("class", key => `axis-${key}`)
			.attr("x1", cx)
			.attr("y1", cy)
			.attr("x2", key => getCoordinates(key, radius).x)
			.attr("y2", key => getCoordinates(key, radius).y)
			.attr("stroke", "cyan");

		// blobs
		const blobsContainer = DOMUtils.appendOrSelect(svg, "g.blobs").attr("transform", `translate(${cx}, ${cy})`);
		const blob = blobsContainer.selectAll("g").data(groupedData, group => group.name);
		// remove node if necessary
		blob.exit().attr("opacity", 0).remove();
		// add node if necessary
		const enteringBlob = blob
			.enter()
			.append("g")
			.classed("paths", true)
			.attr("class", d => d.name);
		const enteringPahts = enteringBlob
			.append("path")
			.attr("opacity", 0);
		// update node (?)
		enteringPahts.merge(svg.selectAll("g.paths path"))
			.attr("class", d => `blob-area-${d.name}`)
			.attr("d", d => radialLineGenerator(d.data))
			.attr("stroke", d => colorScale(d.name))
			.attr("fill", d => colorScale(d.name))
			.attr("opacity", 1)
			.style("fill-opacity", 0.2);
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;
		this.parent.selectAll("g.blobs path")
			.transition(this.services.transitions.getTransition("legend-hover-path"))
			.attr("opacity", group => {
				if (group.name !== hoveredElement.datum().name) {
					return 0.1;
				}
				return 0.5;
			});
	}

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent.selectAll("g.blobs path")
			.transition(this.services.transitions.getTransition("legend-mouseout-path"))
			.attr("opacity", 0.5);
	}

	destroy() {
		// Remove event listeners
		this.parent.selectAll("path")
			.on("mousemove", null)
			.on("mouseout", null);
		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover);
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut);
	}
}

function uniqBy(dataset: any, attribute: string): any[] {
	const allTheValuesByAttribute = dataset.map(d => d[attribute]);
	const uniqValues = [...Array.from(new Set(allTheValuesByAttribute))];
	return uniqValues;
}

function radToDeg(rad: number) {
	return rad * (180 / Math.PI);
}

function degToRad(deg: number) {
	return deg * (Math.PI / 180);
}
