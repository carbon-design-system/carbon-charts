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
		// nest data by group
		const nestedDataByGroup = nest<Datum>()
			.key(d => d.group)
			.entries(displayData);

		const options = this.model.getOptions();

		// console.log("  data:", data);
		// console.log("  displayData:", displayData);
		// console.log("  nestedDataByGroup:", nestedDataByGroup);
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

		// scales

		// given a key, return the corrisponding angle in radiants
		const xScale = scaleBand()
			.domain(displayData.map(d => d.key))
			.range([0, 2 * Math.PI]);

		const ticksNumber = 5;
		const yScale = scaleLinear()
			.domain([0, max(displayData.map(d => d.value))])
			.range([0, radius]);
		const yTicks = yScale.ticks(ticksNumber);

		// angle slice
		const keysValues = uniqBy(displayData, "key");
		const angleSlice = (2 * Math.PI) / keysValues.length;

		const radialLineGenerator = lineRadial<Datum>()
			.angle(d => xScale(d.key))
			.radius(d => yScale(d.value))
			.curve(curveLinearClosed);

		const getCoordinates = (key: string, r: number) => {
			const angle = xScale(key);
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

		// Create blobs
		const blobs = DOMUtils.appendOrSelect(svg, "g.blobs").attr("transform", `translate(${cx}, ${cy})`);
		const blobWrapper = blobs.selectAll(".g")
			.data(nestedDataByGroup)
			.enter()
			.append("g")
			.attr("class", d => d.key);
		// Append the backgrounds
		blobWrapper
			.append("path")
			.attr("class", d => `blob-area-${d.key}`)
			.attr("d", d => radialLineGenerator(d.values))
			.attr("stroke", "green")
			.style("fill", "green")
			.style("fill-opacity", 0.3);

		// spokes
		const spokesValues = uniqBy(data, "key");
		const spokes = DOMUtils.appendOrSelect(debugContainer, "g.spokes");
		const spokesUpdate = spokes.selectAll("line").data(spokesValues);
		spokesUpdate
			.enter()
			.append("line")
			.merge(spokesUpdate)
			.attr("x1", cx)
			.attr("y1", cy)
			.attr("x2", d => getCoordinates(d, radius).x)
			.attr("y2", d => getCoordinates(d, radius).y)
			.attr("stroke", "cyan");
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
