// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import * as Configuration from "../../configuration";
import { Events } from "../../interfaces";

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

		const data: Array<Datum> = this.model.getData();
		const displayData: Array<Datum> = this.model.getDisplayData();
		const groupedData = this.model.getGroupedData();
		const options = this.model.getOptions();
		const configuration = Configuration.options.radarChart.radar;

		/////////////////////////////
		// Computations
		/////////////////////////////

		// center
		const cx = width / 2;
		const cy = height / 2;

		const fontSize = 10;
		const margin = 2 * fontSize;
		const size = Math.min(width, height);
		const diameter = size - margin;
		const radius = diameter / 2;

		// given a key, return the corrisponding angle in radiants
		const xScale = scaleBand()
			.domain(displayData.map(d => d.key))
			.range([0, 2 * Math.PI]);

		const ticksNumber = 5;
		const minRange = 10;
		const yScale = scaleLinear()
			.domain([0, max(displayData.map(d => d.value))])
			.range([minRange, radius])
			.nice(ticksNumber);
		const yTicks = yScale.ticks(ticksNumber);

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
			.transition(this.services.transitions.getTransition("y-axis-update-enter", animate))
			.attr("fill", "none")
			.attr("stroke", "#dcdcdc");
		yAxesUpdate.exit().remove();

		// x axes
		const keysValues = uniqBy(displayData, "key");
		const xAxes = DOMUtils.appendOrSelect(svg, "g.x-axes");
		const xAxesUpdate = xAxes.selectAll("line").data(keysValues);
		xAxesUpdate
			.enter()
			.append("line")
			.merge(xAxesUpdate)
			.attr("class", key => `x-axis-${key}`)
			.attr("x1", key => getCoordinates(key, yScale.range()[0], cx, cy).x)
			.attr("y1", key => getCoordinates(key, yScale.range()[0], cx, cy).y)
			.attr("x2", key => getCoordinates(key, yScale.range()[1], cx, cy).x)
			.attr("y2", key => getCoordinates(key, yScale.range()[1], cx, cy).y)
			.transition(this.services.transitions.getTransition("x-axis-update-enter", animate))
			.attr("stroke", "#dcdcdc");
		xAxesUpdate.exit().remove();

		// blobs
		const blobs = DOMUtils.appendOrSelect(svg, "g.blobs").attr("transform", `translate(${cx}, ${cy})`);
		const blobUpdate = blobs.selectAll("g.blob").data(groupedData, group => group.name);
		blobUpdate
			.enter()
			.append("g")
			.attr("class", "blob")
			.append("path")
			.merge(blobUpdate.selectAll("path"))
			.attr("class", group => `blob-area-${group.name}`)
			.attr("d", group => radialLineGenerator(group.data))
			.transition(this.services.transitions.getTransition("blob-update-enter", animate))
			.attr("stroke", group => colorScale(group.name))
			.attr("stroke-width", 1.5)
			.attr("fill", group => colorScale(group.name))
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
