import * as d3 from "d3";

import { DonutChart, DonutCenter } from "./index";
import {
	createChartContainer,
	grabChartContainer,
	removeChart,
	inputAndProcessedDataMatch,
	selectors,
} from "./test-tools";

import { pieData, donutOptions } from "../demo/demo-data/pie-donut";

// Global chart configs
import * as Configuration from "./configuration";

// Variables
const chartType = "donut";

// Functions
const getNumberOfSlices = classyContainer => classyContainer.querySelectorAll(`${selectors.INNERWRAP} ${selectors.pie.SLICE}`).length;

describe("donut Chart", () => {
	let classyDonutChart;

	beforeEach(() => {
		// Append the chart container to DOM
		const classyContainer = createChartContainer(chartType);
		document.body.appendChild(classyContainer);

		// Instantiate chart object & draw on DOM
		classyDonutChart = new DonutChart(
			classyContainer,
			{
				data: pieData,
				options: Object.assign({}, donutOptions, {type: chartType})
			}
		);
	});

	afterEach(() => {
		// Remove the chart resulted from this test case
		removeChart(chartType);
	});

	it("should work", () => {
		// Grab chart container in DOM
		const classyContainer = grabChartContainer(chartType);

		setTimeout(() => {
			// Expect chart container to contain the main chart SVG element
			expect(classyContainer.querySelector(selectors.OUTERSVG)).toBeTruthy();
		});
	});

	/*
	 * Events
	 * Testing (data comes in correctly, goes out correctly)
	 */
	it(`should show a maximum of ${(Configuration.pie.sliceLimit + 1)} slices`, () => {
		// Grab chart container in DOM & # of current slices
		const classyContainer = grabChartContainer(chartType);

		// (Configuration.pie.sliceLimit + 1) because of the auto-generated "Other" slice when (# of datapoints > Configuration.pie.sliceLimit)
		expect(getNumberOfSlices(classyContainer)).toBeLessThanOrEqual(Configuration.pie.sliceLimit + 1);
	});

	it("should not be missing any of the labels or values in the processed data", () => {
		setTimeout(() => {
			expect(inputAndProcessedDataMatch(classyDonutChart, pieData)).toBe(true);
		});
	});

	/*
	 * Functionality
	 * Testing
	 */
	it ("should show tooltips", () => {
		setTimeout(_ => {
            // Grab chart container in DOM
            const classyContainer = grabChartContainer(chartType);

            // Trigger click on a slice
            d3.select(classyContainer).select(`${selectors.INNERWRAP} path`).dispatch("click");

            // Make sure the tooltip container exists now
            expect(classyContainer.querySelector(selectors.TOOLTIP)).toBeTruthy();
        });
	});

	// it("should filter results", () => {
	// 	// Grab chart container in DOM & # of current slices
	// 	const classyContainer = grabChartContainer(chartType);
	// 	const numberOfSlices = getNumberOfSlices(classyContainer);

	// 	setTimeout(() => {
	// 		// Click on the first legend item
	// 		d3.select(classyContainer).select(selectors.LEGEND_BTN).dispatch("click");

	// 		expect(getNumberOfSlices(classyContainer)).toBe(numberOfSlices - 1);
	// 	});
	// });
});
