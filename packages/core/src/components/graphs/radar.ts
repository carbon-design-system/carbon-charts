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
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";

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
		const options = this.model.getOptions();

		// console.log("  data:", data);
		// console.log("  displayData:", displayData);
		// console.log("  options:", options);

		/////////////////////////////
		// Computations
		/////////////////////////////

		// center
		const cx = width / 2;
		const cy = height / 2;

		// angle between spokes
		const spokesValues = uniqBy(data, "key");
		const angleStep = (2 * Math.PI) / spokesValues.length;

		const ticksNumber = 5;
		const fontSize = 10;
		const size = Math.min(width, height);
		const diameter = size - 2 * fontSize;
		const radius = diameter / 2;
		const [minValue, maxValue] = extent(displayData.map(d => d.value));
		const valueScale = scaleLinear().domain([minValue, maxValue]).range([0, radius]).nice();
		const valueTicks = valueScale.ticks(ticksNumber);

		const angleScale = (key: string) => {
			const i = spokesValues.indexOf(key);
			const angle = angleStep * i;
			// rotate by -90° because of the first list should be vertical and not horizontal
			return angle - Math.PI / 2;
		};

		const getCoordinates = (key: string, radius: number) => {
			const angle = angleScale(key);
			// translate by the center
			const x = radius * Math.cos(angle) + cx;
			const y = radius * Math.sin(angle) + cy;
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
		const circumferencesUpdate = circumferences.selectAll("circle").data(valueTicks);
		circumferencesUpdate
			.enter()
			.append("circle")
			.merge(circumferencesUpdate)
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("r", d => valueScale(d))
			.attr("fill", "none")
			.attr("stroke", "red");

		// spokes
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
