// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";
import { Events } from "../../interfaces";

// D3 Imports
import { hierarchy as d3Hierarchy, treemap as d3Treemap } from "d3-hierarchy";
import { sum } from "d3-array";

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

		// svg.html("");

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
			// .tile(tile)
			.size([width, height])
			.padding(1)
			.round(true)(hierarchy);
		const { transitions } = this.services;

		console.log(
			"this.model.getDataGroupNames()",
			this.model.getDataGroupNames(),
			root.descendants()
		);
		const leafGroupData = this.model
			.getDataGroupNames()
			.map((dataGroup) => {
				const correspondingLeaf = root
					.descendants()
					.find((leaf: any) => leaf.data.name === dataGroup);

				return correspondingLeaf;
			});
		const leafGroups = svg
			.selectAll("g[data-name='leaf']")
			.data(leafGroupData, (d) => d);

		// Remove leaf groups that need to be removed
		leafGroups.exit().attr("opacity", 0).remove();

		// Add the dot groups that need to be introduced
		const enteringLeafGroups = leafGroups
			.enter()
			.append("g")
			.attr("data-name", "leaf")
			.attr("opacity", 0);

		const rects = enteringLeafGroups
			.merge(leafGroups)
			// .transition(transitions.getTransition("treemap-update", animate))
			.attr("data-name", "leaf")
			.each(function (d) {
				console.log("d", d);
				this.dataGroupName = d;
			})
			.attr("transform", (d) => `translate(${d.x0},${d.y0})`)
			.attr("opacity", 1)
			.selectAll("rect.leaf")
			.data(function (d) {
				return root.leaves().filter((leaf: any) => {
					while (leaf.depth > 1) leaf = leaf.parent;

					return leaf.data.name === d.data.name;
				});
			});

		rects.exit().attr("opacity", 0).remove();

		const enteringRects = rects
			.enter()
			.append("rect")
			.classed("leaf", true)
			.attr("opacity", 0);

		enteringRects
			.merge(rects)
			.transition(
				this.services.transitions.getTransition(
					"treemap-leaf-update-enter",
					animate
				)
			)
			// .attr("id", (d) => (d.leafUid = domUID("leaf")).id)
			.attr("fill", (d) => {
				while (d.depth > 1) d = d.parent;

				console.log(
					"fill",
					d.data.name,
					this.model.getFillColor(d.data.name)
				);

				return this.model.getFillColor(d.data.name);
			})
			.attr("width", (d) => d.x1 - d.x0)
			.attr("height", (d) => d.y1 - d.y0)
			.attr("opacity", 1);

		const texts = enteringRects
			.append("text")
			.attr("x", 7)
			.attr("y", (d, i, nodes) => {
				return `${0.5 + 1.1 + i * 1.2}em`;
			})
			.attr("fill", "white")
			.text((d) => {
				if (!d.noLabel) return d;
			});

		// enteringLeafs.append("title").text(
		// 	(d) =>
		// 		`${d
		// 			.ancestors()
		// 			.reverse()
		// 			.map((d) => d.data.name)
		// 			.join("/")}\n${d.value}`
		// );

		// const rects = svg.selectAll("g[data-name='leaf'] rect");

		// const enteringRects = enteringLeafs.enter().append("rect");

		// enteringRects
		// 	// .merge(leafs.selectAll("rect"))
		// 	.each(() => {
		// 		console.log("Rect");
		// 	})
		// 	.attr("id", (d) => (d.leafUid = domUID("leaf")).id)
		// 	.attr("fill", (d) => {
		// 		while (d.depth > 1) d = d.parent;
		// 		return this.model.getFillColor(d.data.name);
		// 	})
		// 	.attr("width", (d) => d.x1 - d.x0)
		// 	.attr("height", (d) => d.y1 - d.y0);

		// enteringLeafs
		// 	.append("clipPath")
		// 	.attr("id", (d) => (d.clipUid = domUID("clip")).id)
		// 	.append("use");
		// // .attr("xlink:href", (d) => d.leafUid.href);

		// enteringLeafs
		// 	.append("text")
		// 	.attr("clip-path", (d) => d.clipUid)
		// 	.selectAll("tspan")
		// 	.data((d) => {
		// 		if (!d.data.name) return "";
		// 		return `${d.data.name}
		// 		${((d.data.value / total) * 100).toPrecision(2)}%`.split(/(?=[A-Z][a-z])|\s+/g);
		// 	})
		// 	.join("tspan")
		// 	.attr("x", 7)
		// 	.attr("y", (d, i, nodes) => {
		// 		return `${0.5 + 1.1 + i * 1.2}em`;
		// 	})
		// 	.text((d) => {
		// 		if (!d.noLabel) return d;
		// 	})
		// 	.attr("fill", (d) => {
		// 		// console.log("d", d)
		// 		return "white";
		// 	});
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		const { groupMapsTo } = this.model.getOptions().data;

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
