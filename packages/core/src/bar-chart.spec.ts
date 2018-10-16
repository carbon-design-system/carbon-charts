import * as d3 from "d3";

import { BarChart } from "./index";
import {
	createChartContainer,
	grabChartContainer,
	inputAndProcessedDataMatch,
	selectors,
} from "./test-tools";

// Data & Options
import { groupedBarData, groupedBarOptions } from "../demo/demo-data/bar";

const chartType = "bar";
// TODO - Include other types of bar chart as well
describe("bar Chart", () => {
	let barChart;

	beforeEach(() => {
		// Append the chart container to DOM
		const chartContainer = createChartContainer(chartType);
		document.body.appendChild(chartContainer);

		// Instantiate chart object & draw on DOM
		barChart = new BarChart(
			chartContainer,
			{
				data: groupedBarData,
				options: Object.assign({}, groupedBarOptions, {type: chartType})
			}
		);
	});

	it("should work", () => {
		// Grab chart container in DOM
		const chartContainer = grabChartContainer(chartType);

		setTimeout(() => {
			// Expect chart container to contain the main chart SVG element
			expect(chartContainer.querySelector(selectors.OUTERSVG)).toBeTruthy();
		});
	});

	/*
	 * Events
	 * Testing (data comes in correctly, goes out correctly)
	 */
	// it("should not be missing any of the labels or values in the processed data", () => {
	// 	setTimeout(() => {
	// 		expect(inputAndProcessedDataMatch(barChart, groupedBarData)).toBe(true);
	// 	});
	// });

	/*
	 * Functionality
	 * Testing
	 */
	it ("should show tooltips", () => {
		setTimeout(_ => {
			// Grab chart container in DOM
			const chartContainer = grabChartContainer(chartType);

			// Trigger click on a slice
			d3.select(chartContainer).select(`${selectors.INNERWRAP} rect`).dispatch("click");

			// Make sure the tooltip container exists now
			expect(chartContainer.querySelector(selectors.TOOLTIP)).toBeTruthy();
		});
	});
});
