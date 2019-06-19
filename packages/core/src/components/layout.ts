// Internal Imports
import { ChartComponent } from "./base-component";
import { LayoutOptions, LayoutDirection } from "../interfaces/index";

// D3 Imports
import { select } from "d3-selection";
import { hierarchy, treemap, treemapSlice, treemapDice } from "d3-hierarchy";
import { scaleLinear } from "d3-scale";

const sampleData = {
	"children": [
		{
			"name": "boss1",
			"children": [
				{
					"name": "mister_a",
					"group": "A",
					"value": 28,
				},
				{
					"name": "mister_b",
					"group": "A",
					"value": 19,
				},
				{
					"name": "mister_c",
					"group": "C",
					"value": 18,
				},
				{
					"name": "mister_d",
					"group": "C",
					"value": 19,
				}
			]
		},
		{
			"name": "boss2",
			"children": [
				{
					"name": "mister_e",
					"group": "C",
					"value": 14,
					"colname": "level3"
				},
				{
					"name": "mister_f",
					"group": "A",
					"value": 11,
					"colname": "level3"
				},
				{
					"name": "mister_g",
					"group": "B",
					"value": 15,
					"colname": "level3"
				},
				{
					"name": "mister_h",
					"group": "B",
					"value": 16,
					"colname": "level3"
				}
			],
			"colname": "level2"
		},
		{
			"name": "boss3",
			"children": [
				{
					"name": "mister_i",
					"group": "B",
					"value": 10,
					"colname": "level3"
				},
				{
					"name": "mister_j",
					"group": "A",
					"value": 13,
					"colname": "level3"
				},
				{
					"name": "mister_k",
					"group": "A",
					"value": 13,
					"colname": "level3"
				},
				{
					"name": "mister_l",
					"group": "D",
					"value": 25,
					"colname": "level3"
				},
				{
					"name": "mister_m",
					"group": "D",
					"value": 16,
					"colname": "level3"
				},
				{
					"name": "mister_n",
					"group": "D",
					"value": 28,
					"colname": "level3"
				}
			],
			"colname": "level2"
		}
	],
	"name": "CEO"
};

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
	}

	render() {
		// set the dimensions and margins of the graph
		const margin = {top: 10, right: 10, bottom: 10, left: 10},
		chartSize = this._essentials.domUtils.getChartSize(),
		width = chartSize.width,
		height = chartSize.height;

		// append the svg object to the body of the page
		const svg = select("#classy-scatter-chart-holder svg");
			// .append("g");

		// Give the data to this cluster layout:
		const root = hierarchy(this.children)
			.sum(function(d: any) {
				return d.size;
			}); // Here the size of each leave is given in the "value" field in input data

		// Then d3.treemap computes the position of each element of the hierarchy
		treemap()
			.tile(this.options.direction === LayoutDirection.ROW ? treemapDice : treemapSlice)
			.size([width, height])
			.padding(0)
			(root);

		const color = scaleLinear()
			.domain([-1, 5])
			.range(["green" as any, "slateblue"]);

		// use this information to add rectangles:
		svg
			.selectAll("svg")
			.data(root.leaves())
			.enter()
			.append("svg")
				.attr("x", function (d: any) { return d.x0; })
				.attr("y", function (d: any) { return d.y0; })
				.attr("width", function (d: any) { return d.x1 - d.x0; })
				.attr("height", function (d: any) { return d.y1 - d.y0; })
				.append("rect")
					.attr("width", function (d: any) { return d.x1 - d.x0; })
					.attr("height", function (d: any) { return d.y1 - d.y0; })
					.style("stroke", "black")
					.style("stroke-width", 2)
					.style("fill", (d, i) => color(i));

		// and to add the text labels
		svg
			.selectAll("text")
			.data(root.leaves())
			.enter()
			.append("text")
			.attr("x", function(d: any) { return d.x0 + 5; })    // +10 to adjust position (more right)
			.attr("y", function(d: any) { return d.y0 + 20; })    // +20 to adjust position (lower)
			// .style("transform", "rotate(90deg)")
			.text(function(d: any) {
				// return d.data.name;

				return d.data.component.constructor.name;
			})
			.attr("font-size", "15px")
			.attr("fill", "white");
	}

	update() {

	}
}
