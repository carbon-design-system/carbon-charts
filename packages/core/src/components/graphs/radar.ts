// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import * as Configuration from "../../configuration";
import { Events } from "../../interfaces";
import { Tools } from "../../tools";
import { flatMapDeep } from "lodash-es";

// D3 Imports
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { lineRadial, curveLinearClosed } from "d3-shape";

const DEBUG = false;

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
		// console.log("\n");

		const displayData: Array<Datum> = this.model.getDisplayData();
		const groupedData = this.model.getGroupedData();

		const uniqKeys: string[] = Array.from(new Set(displayData.map(d => d.key)));
		const uniqGroups: string[] = Array.from(new Set(displayData.map(d => d.group)));
		const displayDataNormalized: Array<Datum> = normalizeFlatData(displayData, uniqKeys, uniqGroups);
		const groupedDataNormalized = normalizeGroupedData(groupedData, uniqKeys);

		const options = this.model.getOptions();
		const configuration = Configuration.options.radarChart.radar;

		// console.log("animate:", animate);
		// console.log("data:", data);
		// console.log("displayData:", displayData);
		// console.log("groupedData:", groupedData);
		// console.log("options:", options);
		// console.log("configuration:", configuration);

		/////////////////////////////
		// Computations
		/////////////////////////////

		// center
		const cx = width / 2;
		const cy = height / 2;

		const fontSize = 30;
		const margin = 2 * fontSize;
		const size = Math.min(width, height);
		const diameter = size - margin;
		const radius = diameter / 2;
		// console.log("radius:", radius);

		// given a key, return the corrisponding angle in radiants
		const xScale = scaleBand()
			.domain(displayDataNormalized.map(d => d.key))
			.range([0, 2 * Math.PI]);
		// console.log(`xScale [${xScale.domain()}] -> [${xScale.range()}]`);

		const ticksNumber = 5;
		const minRange = 10;
		const yScale = scaleLinear()
			.domain([0, max(displayDataNormalized.map(d => d.value))])
			.range([minRange, radius])
			.nice(ticksNumber);
		const yTicks = yScale.ticks(ticksNumber);
		// console.log(`yScale [${yScale.domain()}] -> [${yScale.range()}]`);

		const colorScale = (key: string): string => this.model.getFillColor(key);

		const radialLineGenerator = lineRadial<Datum>()
			.angle(d => xScale(d.key))
			.radius(d => yScale(d.value))
			.curve(curveLinearClosed);

		// given the key (= value corrisponding to a an x axis), a radius r and translation values
		// return the coordinates of the corrisponding point stayng on the x axis with radius r
		const polarCoords = (key: string, r: number, tx = 0, ty = 0) => {
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

		svg.select("g.debug").attr("opacity", DEBUG ? 0.5 : 0);
		///////////////

		// y axes
		const yAxes = DOMUtils.appendOrSelect(svg, "g.y-axes");
		const yAxisUpdate = yAxes.selectAll("path").data(yTicks);
		yAxisUpdate.join(
			enter => enter.append("path"),
			update => update,
			exit => exit.remove()
		)
		.attr("transform", `translate(${cx}, ${cy})`)
		.attr("opacity", 0)
		.transition(this.services.transitions.getTransition("y-axis-update-enter", animate))
		.attr("d", tickValue => {
			const xAxesKeys = xScale.domain();
			const points = xAxesKeys.map(key => ({ key, value: tickValue }));
			return radialLineGenerator(points);
		})
		.attr("fill", "none")
		.attr("opacity", 1)
		.attr("stroke", "#dcdcdc");

		// x axes
		const labelPadding = 10;
		const xAxes = DOMUtils.appendOrSelect(svg, "g.x-axes");
		const xAxisUpdate = xAxes.selectAll("g.x-axis").data(uniqKeys);
		xAxisUpdate.join(
			enter => enter.append("g")
				.attr("class", "x-axis")
				.call(selection => selection
					.append("line")
					.attr("stroke", "#dcdcdc")
					.attr("x1", key => polarCoords(key, 0, cx, cy).x)
					.attr("y1", key => polarCoords(key, 0, cx, cy).y)
					.attr("x2", key => polarCoords(key, 1, cx, cy).x)
					.attr("y2", key => polarCoords(key, 1, cx, cy).y)
					.transition().duration(500)
					// .transition(this.services.transitions.getTransition("x-axis-line-enter", animate))
					.attr("x1", key => polarCoords(key, yScale.range()[0], cx, cy).x)
					.attr("y1", key => polarCoords(key, yScale.range()[0], cx, cy).y)
					.attr("x2", key => polarCoords(key, yScale.range()[1], cx, cy).x)
					.attr("y2", key => polarCoords(key, yScale.range()[1], cx, cy).y)
				)
				.call(selection => selection
					.append("text")
					.text(d => d)
					.attr("x", key => polarCoords(key, yScale.range()[1] + labelPadding, cx, cy).x)
					.attr("y", key => polarCoords(key, yScale.range()[1] + labelPadding, cx, cy).y)
					.style("text-anchor", key => radialLabelPlacement(xScale(key)).textAnchor)
					.style("dominant-baseline", key => radialLabelPlacement(xScale(key)).dominantBaseline)
					.attr("opacity", 0)
					.transition().duration(500)
					// .transition(this.services.transitions.getTransition("x-axis-text-enter", animate))
					.attr("opacity", 1)
				),

			update => update
				.call(selection => selection
					.select("line")
					.attr("x1", key => polarCoords(key, 0, cx, cy).x)
					.attr("y1", key => polarCoords(key, 0, cx, cy).y)
					.attr("x2", key => polarCoords(key, 1, cx, cy).x)
					.attr("y2", key => polarCoords(key, 1, cx, cy).y)
					.transition().duration(500)
					// .transition(this.services.transitions.getTransition("x-axis-line-update", animate))
					.attr("x1", key => polarCoords(key, yScale.range()[0], cx, cy).x)
					.attr("y1", key => polarCoords(key, yScale.range()[0], cx, cy).y)
					.attr("x2", key => polarCoords(key, yScale.range()[1], cx, cy).x)
					.attr("y2", key => polarCoords(key, yScale.range()[1], cx, cy).y)
				)
				.call(selection => selection
					.select("text")
					.text(d => d)
					.attr("x", key => polarCoords(key, yScale.range()[1] + labelPadding, cx, cy).x)
					.attr("y", key => polarCoords(key, yScale.range()[1] + labelPadding, cx, cy).y)
					.style("text-anchor", key => radialLabelPlacement(xScale(key)).textAnchor)
					.style("dominant-baseline", key => radialLabelPlacement(xScale(key)).dominantBaseline)
					.attr("opacity", 0)
					.transition().duration(500)
					// .transition(this.services.transitions.getTransition("x-axis-text-update", animate))
					.attr("opacity", 1)
				),

			exit => exit.remove()
		);

		// blobs
		const blobs = DOMUtils.appendOrSelect(svg, "g.blobs").attr("transform", `translate(${cx}, ${cy})`);
		const blobUpdate = blobs.selectAll("g.blob").data(groupedDataNormalized, group => group.name);
		blobUpdate.join(
			enter => enter.append("g")
				.attr("class", "blob")
				.call(selection => selection
					.append("path")
					.attr("class", group => `blob-area-${group.name}`)
				),
			update => update,
			exit => exit.remove()
		)
		.call(selection => selection
			.select("path")
			.attr("d", group => radialLineGenerator(group.data))
			.transition(this.services.transitions.getTransition("blob-update-enter", animate))
			.attr("stroke", group => colorScale(group.name))
			.attr("stroke-width", 1.5)
			.attr("fill", group => colorScale(group.name))
			.style("fill-opacity", configuration.opacity.selected)
		);
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

function radToDeg(rad: number) {
	return rad * (180 / Math.PI);
}

function isInRange(x: number, minMax: number[]): boolean {
	return x >= minMax[0] && x <= minMax[1];
}

function radialLabelPlacement(angleRadians: number) {
	const angle = radToDeg(angleRadians) % 360; // rounded angle

	let textAnchor: "start" | "middle" | "end" = "middle"; // *___   __*__   ___*
	let dominantBaseline: "baseline" | "middle" | "hanging" = "middle"; // __*   --*--   --.

	let quadrant = 0;

	if (isInRange(angle, [0, 90])) {
		quadrant = 0;
	} else if (isInRange(angle, [90, 180])) {
		quadrant = 1;
	} else if (isInRange(angle, [180, 270])) {
		quadrant = 2;
	} else if (isInRange(angle, [270, 360])) {
		quadrant = 3;
	}

	if (quadrant === 0) {
		textAnchor = "start";
		dominantBaseline = "baseline";
	} else if (quadrant === 1) {
		textAnchor = "start";
		dominantBaseline = "hanging";
	} else if (quadrant === 2) {
		textAnchor = "end";
		dominantBaseline = "hanging";
	} else if (quadrant === 3) {
		textAnchor = "end";
		dominantBaseline = "baseline";
	}

	let edge = null;

	if (isInRange(angle, [0, 10]) || isInRange(angle, [350, 0])) {
		edge = 0;
	} else if (isInRange(angle, [80, 100])) {
		edge = 1;
	} else if (isInRange(angle, [170, 190])) {
		edge = 2;
	} else if (isInRange(angle, [260, 280])) {
		edge = 3;
	}

	if (edge === 0) {
		textAnchor = "middle";
		dominantBaseline = "baseline";
	} else if (edge === 1) {
		textAnchor = "start";
		dominantBaseline = "middle";
	} else if (edge === 2) {
		textAnchor = "middle";
		dominantBaseline = "hanging";
	} else if (edge === 3) {
		textAnchor = "end";
		dominantBaseline = "middle";
	}

	return { textAnchor, dominantBaseline };
}

/**
 * If there are missing data on key, create corrisponding data with value = 0.
 */
function normalizeFlatData(dataset: Array<Datum>, keys: string[], groups: string[]) {
	const completeBlankData = flatMapDeep(keys.map(key => {
		return groups.map(group => ({key, group, value: 0}));
	}));
	return Tools.merge(completeBlankData, dataset);
}

function normalizeGroupedData(dataset: any, keys: string[]) {
	return dataset.map(({name, data}) => {
		const completeBlankData = keys.map(k => ({ group: name, key: k, value: 0 }));
		return { name, data: Tools.merge(completeBlankData, data) };
	});
}
