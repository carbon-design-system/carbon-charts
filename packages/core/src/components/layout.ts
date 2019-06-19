// Internal Imports
import { ChartComponent } from "./base-component";
import { LayoutOptions, LayoutDirection } from "../interfaces/index";

// D3 Imports
import { select } from "d3-selection";
import { hierarchy, treemap, treemapSlice, treemapDice } from "d3-hierarchy";
import { scaleLinear } from "d3-scale";

const sampleRealisticData = {
	"children": [
		{
			"name": "boss1",
			"children": [
				{
					"name": "CHART_FRAME",
					"value": 70,
					"children": [
						{
							"name": "AXIS_X2",
							"value": 10,
						},
						{
							"name": "CHART_FRAME_SUB1",
							"value": 80,
							"children": [
								{
									"name": "AXIS_Y",
									"value": 10,
								},
								{
									"name": "AXIS_GRAPH",
									"value": 80,
								},
								{
									"name": "AXIS_Y2",
									"value": 10,
								},
							]
						},
						{
							"name": "AXIS_X",
							"value": 10,
						},
					]
				},
				{
					"name": "LEGEND",
					"value": 30
				}
			]
		}
	],
	"name": "chart"
};

export class LayoutComponent extends ChartComponent {
	children: any;
	options: LayoutOptions;

	constructor(children: Array<any>, options?: LayoutOptions) {
		super();

		console.log("layout comp", children);

		this.options = options;
		this.children = {
			children: children
		};

		// setInterval(() => {
		// 	this.render();
		// }, 500);
	}

	render() {
		const { width, height } = this._essentials.domUtils.getChartSize();

		// Find chart SVG
		// TODORF - This should be an internal referefce
		const svg = select("#classy-scatter-chart-holder svg");

		// Pass children data to the hierarchy layout
		// And calculate sum of sizes
		const root = hierarchy(this.children)
			.sum((d: any) => d.size)

		const tileType = this.options.direction === LayoutDirection.ROW ? treemapDice : treemapSlice;
		// Compute the position of all elements within the layout
		treemap()
			.tile(tileType)
			.size([width, height])
			.padding(0)
			(root);

		// TODORF - Remove
		const color = scaleLinear()
			.domain([-1, 5])
			.range(["green" as any, "slateblue"]);

		// Add new SVGs to the DOM for each layout child
		svg
			.selectAll("svg")
			.data(root.leaves())
			.enter()
			.append("svg")
				.attr("x", (d: any) => d.x0)
				.attr("y", (d: any) => d.y0)
				.attr("width", (d: any) => d.x1 - d.x0)
				.attr("height", (d: any) => d.y1 - d.y0)
				.append("rect")
					.attr("width", (d: any) => d.x1 - d.x0)
					.attr("height", (d: any) => d.y1 - d.y0)
					.style("stroke", "black")
					.style("stroke-width", 2)
					.style("fill", (d, i) => color(i));

		// svg
		// 	.selectAll("svg")
		// 	.data(root.leaves())
		// 		.attr("x", function (d: any) { return d.x0; })
		// 		.attr("y", function (d: any) { return d.y0; })
		// 		.attr("width", function (d: any) { return d.x1 - d.x0; })
		// 		.attr("height", function (d: any) { return d.y1 - d.y0; })
		// 		.append("rect")
		// 			.attr("width", function (d: any) { return d.x1 - d.x0; })
		// 			.attr("height", function (d: any) { return d.y1 - d.y0; })
		// 			.style("stroke", "black")
		// 			.style("stroke-width", 2)
		// 			.style("fill", (d, i) => color(i));

		// TODORF - Remove
		svg
			.selectAll("text")
			.data(root.leaves())
			.enter()
			.append("text")
			.attr("x", (d: any) => d.x0 + 5)    // +10 to adjust position (more right)
			.attr("y", (d: any) => d.y0 + 20)    // +20 to adjust position (lower)
			.text((d: any) => d.data.component.constructor.name)
			.attr("font-size", "15px")
			.attr("fill", "white");
	}

	update() {
	}
}
