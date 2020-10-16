// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";
import { Events } from "../../interfaces";

// D3 Imports
import { hierarchy as d3Hierarchy, treemap as d3Treemap } from "d3-hierarchy";
import { sum } from "d3-array";
import { hsl, color } from "d3-color";
import { select } from "d3-selection";

var count = 0;

const domUID = function (name) {
	return new Id("O-" + (name == null ? "" : name + "-") + ++count);
};

function Id(id) {
	this.id = id;
	this.href = new URL(`#${id}`, location as any) + "";
}

Id.prototype.toString = function () {
	return "url(" + this.href + ")";
};

export class Treemap extends Component {
	type = "treemap";

	init() {
		const { events } = this.services;
		// Highlight correct circle on legend item hovers
		events.addEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);
		// Un-highlight circles on legend item mouseouts
		events.addEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}

	render(animate = true) {
		const svg = this.getContainerSVG();

		const allData = this.model.getData();
		const displayData = this.model.getDisplayData();
		const options = this.model.getOptions();
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true
		});

		const hierarchy = d3Hierarchy({
			name: options.title || "Treemap",
			children: displayData
		})
			.sum((d: any) => d.value)
			.sort((a, b) => b.value - a.value);

		const total = sum(allData, (d: any) =>
			sum(d.children, (child: any) => child.value)
		);

		const root = d3Treemap()
			.size([width, height])
			.paddingInner(1)
			.paddingOuter(0)
			.round(true)(hierarchy);
		const { transitions } = this.services;

		const leafGroups = svg
			.selectAll("g[data-name='leaf']")
			.data(root.leaves(), (leaf) => leaf.data.name);

		// Remove leaf groups that need to be removed
		leafGroups
			.exit()
			.transition(
				transitions.getTransition("treemap-group-exit", animate)
			)
			.attr("opacity", 0)
			.remove();

		// Add the leaf groups that need to be introduced
		const enteringLeafGroups = leafGroups
			.enter()
			.append("g")
			.attr("data-name", "leaf")
			.attr("opacity", 0);

		const rects = enteringLeafGroups
			.merge(leafGroups)
			.attr("data-name", "leaf")
			.attr("transform", (d) => `translate(${d.x0},${d.y0})`)
			.attr("opacity", 1)
			.selectAll("rect.leaf")
			.data((d) => [d]);

		rects.exit().attr("opacity", 0).remove();

		const enteringRects = rects
			.enter()
			.append("rect")
			.classed("leaf", true)
			.attr("opacity", 0);

		enteringRects
			.merge(rects)
			.attr("width", 0)
			.attr("height", 0)
			.transition(
				this.services.transitions.getTransition(
					"treemap-leaf-update-enter",
					animate
				)
			)
			// .attr("id", (d) => (d.leafUid = domUID("leaf")).id)
			.attr("fill", (d) => {
				while (d.depth > 1) d = d.parent;

				return this.model.getFillColor(d.data.name);
			})
			.attr("width", (d) => d.x1 - d.x0)
			.attr("height", (d) => d.y1 - d.y0)
			.attr("opacity", 1);

		// Update all titles
		enteringLeafGroups
			.merge(leafGroups)
			.selectAll("title")
			.data(
				(d) => [
					`${d
						.ancestors()
						.reverse()
						.map((d) => d.data.name)
						.join("/")}\n${d.value}`
				],
				(d) => d
			)
			.join(
				(enter) => enter.append("title").text((d) => d),
				(update) => update.text((d) => d)
			);

		// Update all titles
		enteringLeafGroups
			.merge(leafGroups)
			.selectAll("text")
			.data(
				(d) => {
					if (d.data.showLabel === false) {
						return [];
					}

					let parent = d;
					while (parent.depth > 1) parent = parent.parent;
					const color = hsl(
						this.model.getFillColor(parent.data.name)
					);
					return [
						{
							text: d.data.name,
							color: color.l < 0.5 ? "white" : "black"
						}
					];
				},
				(d) => d
			)
			.join(
				(enter) =>
					enter
						.append("text")
						.text((d) => d.text)
						.style("fill", (d) => d.color)
						.attr("x", 7)
						.attr("y", 18),
				(update) =>
					update.text((d) => d.text).style("fill", (d) => d.color)
			);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	addEventListeners() {
		const self = this;
		this.parent
			.selectAll("rect.leaf")
			.on("mouseover", function (datum) {
				const hoveredElement = select(this);

				let parent = datum;
				while (parent.depth > 1) parent = parent.parent;

				hoveredElement
					.transition(
						self.services.transitions.getTransition(
							"graph_element_mouseover_fill_update"
						)
					)
					.attr("fill", (d: any) =>
						color(hoveredElement.attr("fill"))
							.darker(0.7)
							.toString()
					);

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					hoveredElement,
					items: [
						{
							color: hoveredElement.attr("fill"),
							label: parent.data.name,
							bold: true
						},
						{
							label: datum.data.name,
							value: datum.data.value
						}
					]
				});

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Treemap.LEAF_MOUSEOVER,
					{
						element: hoveredElement,
						datum
					}
				);
			})
			.on("mousemove", function (datum) {
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Treemap.LEAF_MOUSEMOVE,
					{
						element: hoveredElement,
						datum
					}
				);

				self.services.events.dispatchEvent(Events.Tooltip.MOVE);
			})
			.on("click", function (datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Treemap.LEAF_CLICK, {
					element: select(this),
					datum
				});
			})
			.on("mouseout", function (datum) {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				let parent = datum;
				while (parent.depth > 1) parent = parent.parent;

				hoveredElement
					.transition(
						self.services.transitions.getTransition(
							"graph_element_mouseout_fill_update"
						)
					)
					.attr("fill", (d: any) =>
						self.model.getFillColor(parent.data.name)
					);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Treemap.LEAF_MOUSEOUT,
					{
						element: hoveredElement,
						datum
					}
				);

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement
				});
			});
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent
			.selectAll("g[data-name='leaf']")
			.transition(
				this.services.transitions.getTransition("legend-hover-treemap")
			)
			.attr("opacity", (d) =>
				d.parent.data.name === hoveredElement.datum()["name"] ? 1 : 0.3
			);
	};

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll("g[data-name='leaf']")
			.transition(
				this.services.transitions.getTransition(
					"legend-mouseout-treemap"
				)
			)
			.attr("opacity", 1);
	};
}
