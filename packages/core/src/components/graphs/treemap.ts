// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";
import { CalloutDirections, Roles, Events, Alignments } from "../../interfaces";
import { colorPalettes } from "../../index";

// D3 Imports
import { hierarchy, treemap as d3Treemap } from "d3-hierarchy";
import { scaleOrdinal } from "d3-scale";

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

const defaultColors = colorPalettes.DEFAULT;
const colorScale = scaleOrdinal()
	.domain(["Asia", "Africa", "America", "Europe", "Middle east", "Oceania"])
	.range(defaultColors as any);

const data = {
	name: "flare",
	children: [
		{
			name: "Oceania",
			children: [
				{ name: "", value: 800, noLabel: false },
				{ name: "", value: 200, noLabel: false },
				{ name: "", value: 100, noLabel: false },
				{ name: "", value: 900, noLabel: false }
			]
		},
		{
			name: "Europe",
			// value: 14000,
			children: [
				{ name: "France", value: 2800 },
				{ name: "", value: 1000, noLabel: false },
				{ name: "", value: 100, noLabel: false },
				{ name: "", value: 500, noLabel: false },
				{ name: "", value: 500, noLabel: false },
				{ name: "", value: 400, noLabel: false },
				{ name: "", value: 600, noLabel: false },
				{ name: "", value: 200, noLabel: false },
				{ name: "", value: 800, noLabel: false },
				{ name: "", value: 900, noLabel: false },
				{ name: "", value: 100, noLabel: false },
				{ name: "", value: 900, noLabel: false },
				{ name: "", value: 1000, noLabel: false },
				{ name: "", value: 1800, noLabel: false },
				{ name: "", value: 1400, noLabel: false },
				{ name: "", value: 400, noLabel: false },
				{ name: "", value: 600, noLabel: false }
			]
		},
		{
			name: "America",
			// value: 14000,
			children: [
				{ name: "U.S.", value: 3500 },
				{ name: "Brazil", value: 3000 },
				{ name: "Mexico", value: 1500 },
				{ name: "", value: 1000, noLabel: false },
				{ name: "", value: 100, noLabel: false },
				{ name: "", value: 500, noLabel: false },
				{ name: "", value: 500, noLabel: false },
				{ name: "", value: 400, noLabel: false },
				{ name: "", value: 600, noLabel: false },
				{ name: "", value: 200, noLabel: false },
				{ name: "", value: 800, noLabel: false },
				{ name: "", value: 900, noLabel: false },
				{ name: "", value: 100, noLabel: false },
				{ name: "", value: 900, noLabel: false }
			]
		},
		{
			name: "Middle east",
			// value: 8000,
			children: [
				{ name: "Iran", value: 2000 },
				{ name: "", value: 400, noLabel: false },
				{ name: "", value: 500, noLabel: false },
				{ name: "", value: 100, noLabel: false },
				{ name: "", value: 1000, noLabel: false },
				{ name: "", value: 800, noLabel: false },
				{ name: "", value: 700, noLabel: false },
				{ name: "", value: 200, noLabel: false },
				{ name: "", value: 300, noLabel: false }
			]
		},
		{
			name: "Africa",
			// value: 14000,
			children: [
				{ name: "Nigeria", value: 2300 },
				{ name: "", value: 2000, noLabel: false },
				{ name: "", value: 500, noLabel: false },
				{ name: "", value: 1200, noLabel: false },
				{ name: "", value: 2000, noLabel: false },
				{ name: "", value: 800, noLabel: false },
				{ name: "", value: 2000, noLabel: false },
				{ name: "", value: 500, noLabel: false },
				{ name: "", value: 1200, noLabel: false },
				{ name: "", value: 1500, noLabel: false }
			]
		},
		{
			name: "Asia",
			// value: 50000,
			children: [
				{
					name: "China",
					value: 17500
				},
				{
					name: "India",
					value: 17500
				},
				{
					name: "Indonesia",
					value: 7500
				},
				{
					name: "Mianmar",
					value: 7500
				}
			]
		}
	]
};

export class Treemap extends Component {
	type = "treemap";

	render(animate = true) {
		const svg = this.getContainerSVG();

		svg.html("");

		const { width, height } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true
		});
		const treemap = (data) =>
			d3Treemap()
				// .tile(tile)
				.size([width, height])
				.padding(1)
				.round(true)(
				hierarchy(data)
					.sum((d) => d.value)
					.sort((a, b) => b.value - a.value)
			);

		const root = treemap(data);

		const leaf = svg
			.selectAll("g")
			.data(root.leaves())
			.join("g")
			.attr("transform", (d) => `translate(${d.x0},${d.y0})`);

		leaf.append("title").text(
			(d) =>
				`${d
					.ancestors()
					.reverse()
					.map((d) => d.data.name)
					.join("/")}\n${d.value}`
		);

		leaf.append("rect")
			.attr("id", (d) => (d.leafUid = domUID("leaf")).id)
			.attr("fill", (d) => {
				while (d.depth > 1) d = d.parent;
				return colorScale(d.data.name);
			})
			// .attr("fill-opacity", 0.6)
			.attr("width", (d) => d.x1 - d.x0)
			.attr("height", (d) => d.y1 - d.y0);

		leaf.append("clipPath")
			.attr("id", (d) => (d.clipUid = domUID("clip")).id)
			.append("use")
			.attr("xlink:href", (d) => d.leafUid.href);

		leaf.append("text")
			.attr("clip-path", (d) => d.clipUid)
			.selectAll("tspan")
			.data((d) => {
				if (!d.data.name) return "";
				return d.data.name.split(/(?=[A-Z][a-z])|\s+/g);
				// .concat(d.value)
			})
			.join("tspan")
			.attr("x", 7)
			.attr("y", (d, i, nodes) => {
				return `${0.5 + 1.1 + i * 0.9}em`;
			})
			.attr("fill-opacity", (d, i, nodes) =>
				i === nodes.length - 1 ? 0.7 : null
			)
			.text((d) => {
				if (!d.noLabel) return d;
			})
			.attr("fill", (d) => {
				if (d === "Iran" || d === "Nigeria") {
					return "black";
				}

				return "white";
			});
	}
}
