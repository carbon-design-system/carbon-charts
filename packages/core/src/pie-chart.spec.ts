// TODO - Fix d3 stack errors
// import * as d3 from "d3";

// import { PieChart } from "./index";
// import {
// 	createClassyContainer,
// 	grabClassyContainer,
// 	removeChart,
// 	inputAndProcessedDataMatch,
// 	selectors,
// 	colors
// } from "./test-tools";

// // Data & Options
// import { pieData, pieOptions } from './../demo/demo-data/pie-donut';

// // Global chart configs
// import { Configuration } from "./configuration";

// // Variables
// const chartType = "pie";

// // Functions
// const getNumberOfSlices = classyContainer => classyContainer.querySelectorAll(`${selectors.INNERWRAP} ${selectors.pie.SLICE}`).length;

// describe("pie chart", () => {
// 	let classyPieChart;

// 	beforeEach(() => {
// 		// Remove the chart from the previous test case
// 		const oldClassyContainer = grabClassyContainer(chartType);
// 		if (oldClassyContainer) {
// 			oldClassyContainer.parentNode.removeChild(oldClassyContainer);
// 		}

// 		// Append the chart container to DOM
// 		const classyContainer = createClassyContainer(chartType);
// 		document.body.appendChild(classyContainer);

// 		// Instantiate chart object & draw on DOM
// 		classyPieChart = new PieChart(
// 			classyContainer,
// 			{
// 				data: pieData,
// 				options: Object.assign({}, pieOptions, {type: chartType}),
// 			}
// 		);
// 	});

// 	afterEach(() => {
// 		// Remove the chart resulted from this test case
// 		removeChart(chartType);
// 	});

// 	it("should work", () => {
// 		// Grab chart container in DOM
// 		const classyContainer = grabClassyContainer(chartType);

// 		setTimeout(() => {
// 			// Expect chart container to contain the main chart SVG element
// 			expect(classyContainer.querySelector(selectors.OUTERSVG)).toBeTruthy();
// 		});
// 	});

// 	/*
// 	 * Events
// 	 * Testing (data comes in correctly, goes out correctly)
// 	 */
// 	it(`should show a maximum of ${(Configuration.pie.sliceLimit + 1)} slices`, () => {
// 		// Grab chart container in DOM & # of current slices
// 		const classyContainer = grabClassyContainer(chartType);

		// setTimeout(() => {
			//     // (Configuration.pie.sliceLimit + 1) because of the auto-generated
			//     // "Other" slice when (# of datapoints > Configuration.pie.sliceLimit)
// 			expect(getNumberOfSlices(classyContainer)).toBeLessThanOrEqual(Configuration.pie.sliceLimit + 1);
// 		});
// 	});

// 	it("should not be missing any of the labels or values in the processed data", () => {
// 		setTimeout(() => {
// 			expect(inputAndProcessedDataMatch(classyPieChart, pieData)).toBe(true);
// 		});
// 	});

// 	/*
// 	 * Functionality
// 	 * Testing
// 	 */
// 	it("should show tooltips", () => {
// 		// Grab chart container in DOM
// 		const classyContainer = grabClassyContainer(chartType);

// 		setTimeout(() => {
// 			// Trigger click on a slice
// 			d3.select(classyContainer).select(`${selectors.INNERWRAP} ${selectors.pie.SLICE}`).dispatch("click");

// 			// Make sure the tooltip container exists now
// 			expect(document.querySelector(selectors.TOOLTIP)).toBeTruthy();
// 		});
// 	});

// 	it("should filter results", () => {
// 		// Grab chart container in DOM & # of current slices
// 		const classyContainer = grabClassyContainer(chartType);
// 		const numberOfSlices = getNumberOfSlices(classyContainer);

// 		setTimeout(() => {
// 			// Click on the first legend item
// 			d3.select(classyContainer).select(selectors.LEGEND_BTN).dispatch("click");

// 			expect(getNumberOfSlices(classyContainer)).toBe(numberOfSlices - 1);
// 		});
// 	});
// });
