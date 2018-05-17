import * as d3 from "d3";

import { DoubleAxisLineChart } from "./index";
import {
	createClassyContainer,
	grabClassyContainer,
	inputAndProcessedDataMatch,
	removeChart,
	selectors,
	colors
} from "./test-tools";

const chartType = "double-axis-line";
describe("double axis line chart", () => {
	let classyDoubleAxisChart;
	let data;

	beforeEach(() => {
		// Append the chart container to DOM
		const classyContainer = createClassyContainer(chartType);
		document.body.appendChild(classyContainer);

		data = [
			{
				"Day": "Monday",
				"Clicks": 60000,
				"Click rate": 9
			},
			{
				"Day": "Tuesday",
				"Clicks": 50000,
				"Click rate": 76
			},
			{
				"Day": "Wednesday",
				"Clicks": 9000,
				"Click rate": 80
			},
			{
				"Day": "Thursday",
				"Clicks": 8000,
				"Click rate": 1
			},
			{
				"Day": "Friday",
				"Clicks": 4000,
				"Click rate": 30
			},
			{
				"Day": "Saturday",
				"Clicks": 35000,
				"Click rate": 59
			},
				{
					"Day": "Sunday",
					"Clicks": 35000,
					"Click rate": 38
				}
		];

		const options = {
			xDomain: "Day",
			yDomain: ["Clicks"],
			y2Domain: ["Click rate"],
			yFormatter: {
				"Click rate"(value) {
					return value + "%";
				}
			},
			yTicks: 5,
			legendClickable: true,
			containerResizable: true,
			colors
		};

		// Instantiate chart object & draw on DOM
		classyDoubleAxisChart = new DoubleAxisLineChart(
			classyContainer,
			Object.assign({}, options, {type: chartType}),
			data
		);
		classyDoubleAxisChart.drawChart();
	});

	afterEach(() => {
		// Remove the chart resulted from this test case
		removeChart(chartType);
	});

	it("should work", () => {
		// Grab chart container in DOM
		const classyContainer = grabClassyContainer(chartType);

		// Expect chart container to contain the main chart SVG element
		expect(classyContainer.querySelector(selectors.OUTERSVG)).toBeTruthy();
	});

	/*
	 * Events
	 * Testing (data comes in correctly, goes out correctly)
	 */
	it("should not be missing any of the labels or values in the processed data", () => {
		expect(inputAndProcessedDataMatch(classyDoubleAxisChart, data)).toBe(true);
	});

	it ("should show tooltips", () => {
		// Grab chart container in DOM
		const classyContainer = grabClassyContainer(chartType);

		// Trigger click on a slice
		d3.select(classyContainer).select(`${selectors.INNERWRAP} circle`).dispatch("click");

		// Make sure the tooltip container exists now
		expect(document.querySelector(selectors.TOOLTIP)).toBeTruthy();
	});
});
