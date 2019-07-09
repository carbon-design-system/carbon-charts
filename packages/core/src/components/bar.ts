// Internal Imports
import * as Configuration from "../configuration";

import { ChartComponent } from "./base-component";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { timeParse } from "d3-time-format";

export class Bar extends ChartComponent {
	render() {
		const svg = this._parent;

		const margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom,
			g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
			'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
			'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
			'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
			'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
			'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
			'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
			'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
			'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
			'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

		const data = [
			{
				"Expt": 1,
				"Run": 1,
				"Speed": 850
			},
			{
				"Expt": 1,
				"Run": 2,
				"Speed": 740
			},
			{
				"Expt": 1,
				"Run": 3,
				"Speed": 900
			},
			{
				"Expt": 1,
				"Run": 4,
				"Speed": 1070
			},
			{
				"Expt": 1,
				"Run": 5,
				"Speed": 930
			},
			{
				"Expt": 1,
				"Run": 6,
				"Speed": 850
			},
			{
				"Expt": 1,
				"Run": 7,
				"Speed": 950
			},
			{
				"Expt": 1,
				"Run": 8,
				"Speed": 980
			},
			{
				"Expt": 1,
				"Run": 9,
				"Speed": 980
			},
			{
				"Expt": 1,
				"Run": 10,
				"Speed": 880
			},
			{
				"Expt": 1,
				"Run": 11,
				"Speed": 1050
			},
			{
				"Expt": 1,
				"Run": 12,
				"Speed": 980
			},
			{
				"Expt": 1,
				"Run": 13,
				"Speed": 930
			},
			{
				"Expt": 1,
				"Run": 14,
				"Speed": 650
			},
			{
				"Expt": 1,
				"Run": 15,
				"Speed": 760
			},
			{
				"Expt": 1,
				"Run": 16,
				"Speed": 810
			},
			{
				"Expt": 1,
				"Run": 17,
				"Speed": 1000
			},
			{
				"Expt": 1,
				"Run": 18,
				"Speed": 1040
			},
			{
				"Expt": 1,
				"Run": 19,
				"Speed": 960
			},
			{
				"Expt": 1,
				"Run": 20,
				"Speed": 960
			}
		];

		var x = scaleBand()
			.rangeRound([0, width])
			.padding(0.1);

		var y = scaleLinear()
			.rangeRound([height, 0]);

		x.domain(data.map(function (d) {
			return d.Run;
		}) as any);
		y.domain([0, max(data, function (d) {
			return Number(d.Speed);
		})]);

		g.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function (d) {
				return x(d.Run);
			})
			.attr("y", function (d) {
				return y(Number(d.Speed));
			})
			.attr("width", x.bandwidth())
			.attr("height", function (d) {
				return height - y(Number(d.Speed));
			})
			.attr("fill", (d, i) => colorArray[i]);
	}

	update() {
		this.render();
	}
}
