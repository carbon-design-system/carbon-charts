import { select } from "d3";

import { BarChart } from "./index";
import {
	createClassyContainer,
	grabClassyContainer,
	inputAndProcessedDataMatch,
	selectors,
} from "./test-tools";

// Data & Options
import { groupedBarData, groupedBarOptions } from "../demo/demo-data/bar";

const chartType = "bar";
// TODO - Include other types of bar chart as well
describe("bar Chart", () => {
	let classyBarChart;

	beforeEach(() => {
		// Append the chart container to DOM
		const classyContainer = createClassyContainer(chartType);
		document.body.appendChild(classyContainer);

		// Instantiate chart object & draw on DOM
		classyBarChart = new BarChart(
			classyContainer,
			{
				data: groupedBarData,
				options: Object.assign({}, groupedBarOptions, {type: chartType})
			}
		);
	});

	afterEach(() => {
		classyBarChart.removeChart();
	});

	it("should work", () => {
		// Grab chart container in DOM
		const classyContainer = grabClassyContainer(chartType);

		// Expect chart container to contain the main chart SVG element
		classyBarChart.events.addEventListener("load", e => {
			expect(classyContainer.querySelector(selectors.OUTERSVG)).toBeTruthy();
		}, false);
	});

	/*
	 * Events
	 * Testing (data comes in correctly, goes out correctly)
	 */
	it("should not be missing any of the labels or values in the processed data", () => {
		classyBarChart.events.addEventListener("load", e => {
			expect(inputAndProcessedDataMatch(classyBarChart, groupedBarData)).toBe(true);
		});
	});

	/*
	 * Functionality
	 * Testing
	 */
	// it ("should show tooltips", () => {
	// 	// Grab chart container in DOM
	// 	const classyContainer = grabClassyContainer(chartType);

	// 	classyBarChart.events.addEventListener("load", e => {
	// 		// Trigger click on a slice
	// 		select(classyContainer)
	// 			.select(`${selectors.INNERWRAP} rect`).dispatch("click");

	// 		// Make sure the tooltip container exists now
	// 		expect(document.querySelector(selectors.TOOLTIP)).toBeTruthy();
	// 	});
	// });
});
