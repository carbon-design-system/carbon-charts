// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import * as Configuration from "../../configuration";
import { Tools } from "../../tools";
import {
	CalloutDirections,
	Roles,
	TooltipTypes,
	Events
} from "../../interfaces";

// D3 Imports
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { lineRadial, curveLinearClosed } from "d3-shape";

const DEBUG = false;
const MIN_DEFAULT_TICK = 8;

interface Datum {
	group?: string;
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

		const data: Array<Datum> = this.model.getData();
		const displayData: Array<Datum> = this.model.getDisplayData();
		const groupedData = this.model.getGroupedData();
		const options = this.model.getOptions();
		const configuration = Configuration.options.radarChart.radar;

		// console.log("  data:", data);
		// console.log("  displayData:", displayData);
		// console.log("  groupedData:", groupedData);
		// console.log("  options:", options);
		// console.log("  configuration:", configuration);

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
			.range([0, radius])
			.nice();
		const completeYTicks = yScale.ticks(ticksNumber); // original d3 ticks
		const stepTicks = completeYTicks[1] - completeYTicks[0];
		const minRoundedTick = roundXToN(MIN_DEFAULT_TICK, stepTicks);
		const yTicks = range(minRoundedTick, max(completeYTicks), stepTicks); // ticks starting from rounded MIN_DEFAULT_TICK and not from 0

		const colorScale = (key: string): string => this.model.getFillColor(key);

		const radialLineGenerator = lineRadial<Datum>()
			.angle(d => xScale(d.key))
			.radius(d => yScale(d.value))
			.curve(curveLinearClosed);

		// given the key (= value corrisponding to a an x axis), a radius r and translation values
		// return the coordinates of the corrisponding point stayng on the x axis with radius r
		const getCoordinates = (key: string, r: number, tx = 0, ty = 0) => {
			const angle = xScale(key) - Math.PI / 2;
			// translate by tx and ty
			const x = r * Math.cos(angle) + tx;
			const y = r * Math.sin(angle) + ty;
			return { x, y };
		};

		/////////////////////////////
		// Draw
		/////////////////////////////

		///////////////
		const debugContainer = DOMUtils.appendOrSelect(svg, "g.debug");

		// backdrop
		const backdropRect = DOMUtils.appendOrSelect(debugContainer, "rect.radar-backdrop")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("stroke", "red")
			.attr("fill", "none");

		// center
		const center = DOMUtils.appendOrSelect(debugContainer, "circle.center")
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("r", 3)
			.attr("fill", "red");

		// circumferences
		const circumferences = DOMUtils.appendOrSelect(debugContainer, "g.circumferences");
		const circumferencesUpdate = circumferences.selectAll("circle").data(completeYTicks);
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

		svg.select("g.debug").attr("opacity", DEBUG ? 0.5 : 0);
		///////////////

		// y axes
		const yAxes = DOMUtils.appendOrSelect(svg, "g.y-axes");
		const yAxesUpdate = yAxes.selectAll("path").data(yTicks);
		yAxesUpdate
			.enter()
			.append("path")
			.merge(yAxesUpdate)
			.attr("transform", `translate(${cx}, ${cy})`)
			.attr("d", tickValue => {
				const xAxesKeys = xScale.domain();
				const points = xAxesKeys.map(key => ({ key, value: tickValue }));
				return radialLineGenerator(points);
			})
			.attr("fill", "none")
			.attr("stroke", "#dcdcdc");
		yAxesUpdate.exit().remove();

		// x axes
		const keysValues = uniqBy(data, "key");
		const xAxes = DOMUtils.appendOrSelect(svg, "g.x-axes");
		const xAxesUpdate = xAxes.selectAll("line").data(keysValues);
		xAxesUpdate
			.enter()
			.append("line")
			.merge(xAxesUpdate)
			.attr("class", key => `x-axis-${key}`)
			.attr("x1", key => getCoordinates(key, yScale(minRoundedTick), cx, cy).x)
			.attr("y1", key => getCoordinates(key, yScale(minRoundedTick), cx, cy).y)
			.attr("x2", key => getCoordinates(key, radius, cx, cy).x)
			.attr("y2", key => getCoordinates(key, radius, cx, cy).y)
			.attr("stroke", "#dcdcdc");
		xAxesUpdate.exit().remove();

		// blobs
		const blobs = DOMUtils.appendOrSelect(svg, "g.blobs").attr("transform", `translate(${cx}, ${cy})`);
		const blobUpdate = blobs.selectAll("g").data(groupedData, group => group.name);

		blobUpdate
			.enter()
			.append("g")
			.attr("class", d => d.name)
			.append("path")
			.merge(svg.selectAll("g.paths path"))
			.attr("class", d => `blob-area-${d.name}`)
			.attr("d", d => radialLineGenerator(d.data))
			.attr("stroke", d => colorScale(d.name))
			.attr("stroke-width", 1.5)
			.attr("fill", d => colorScale(d.name))
			.style("fill-opacity", configuration.opacity.selected);

		blobUpdate.exit().remove();
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;
		const { opacity } = Configuration.options.radarChart.radar;
		this.parent.selectAll("g.blobs path")
			.transition(this.services.transitions.getTransition("legend-hover-path"))
			.style("fill-opacity", group => {
				if (group.name !== hoveredElement.datum().name) {
					return opacity.unselected;
				}
				return opacity.selected;
			});
	}

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent.selectAll("g.blobs path")
			.transition(this.services.transitions.getTransition("legend-mouseout-path"))
			.style("fill-opacity", 0.5);
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

// Round x to the nearest multiple of n
// Example:
// 	x = 7, n = 5 -> 5
// 	x = 8, n = 5 -> 10
function roundXToN(x: number, n: number) {
	const xRoundedToN = n * Math.round(x / n);
	return xRoundedToN === 0 ? n : xRoundedToN;
}

// Returns an array of numbers between start and end (inclusive), equally spaced by step interval
function range(start: number, end: number, step: number) {
	const arrayLenght = (end - start) / step + 1;
	return Array.from({ length: arrayLenght }, (_, i) => (i * step) + start);
}
