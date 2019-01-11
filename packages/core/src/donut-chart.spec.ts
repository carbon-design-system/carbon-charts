// import { select, selectAll } from "d3";

// import { DonutChart, DonutCenter } from "./index";
// import {
// 	createClassyContainer,
// 	grabClassyContainer,
// 	removeChart,
// 	inputAndProcessedDataMatch,
// 	selectors,
// } from "./test-tools";

// import { pieData, donutOptions } from "../demo/demo-data/pie-donut";

// // Global chart configs
// import * as Configuration from "./configuration";

// // Variables
// const chartType = "donut";

// // Functions
// const getNumberOfSlices = classyContainer => {
// 	return select(classyContainer)
// 		.selectAll(`${selectors.INNERWRAP} ${selectors.pie.SLICE}`)
// 		.nodes().length;
// };

// describe("donut Chart", () => {
// 	let classyDonutChart;

// 	beforeEach(() => {
// 		// Append the chart container to DOM
// 		const classyContainer = createClassyContainer(chartType);
// 		document.body.appendChild(classyContainer);

// 		// Instantiate chart object & draw on DOM
// 		classyDonutChart = new DonutChart(
// 			classyContainer,
// 			{
// 				data: pieData,
// 				options: Object.assign({}, donutOptions, { type: chartType })
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

// 		classyDonutChart.events.addEventListener("load", e => {
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

// 		// (Configuration.pie.sliceLimit + 1) because of the auto-generated "Other" slice when (# of datapoints > Configuration.pie.sliceLimit)
// 		expect(getNumberOfSlices(classyContainer)).toBeLessThanOrEqual(Configuration.pie.sliceLimit + 1);
// 	});

// 	it("should not be missing any of the labels or values in the processed data", () => {
// 		setTimeout(() => {
// 			expect(inputAndProcessedDataMatch(classyDonutChart, pieData)).toBe(true);
// 		});
// 	});

// 	// /*
// 	//  * Functionality
// 	//  * Testing
// 	//  */
// 	// it ("should show tooltips", () => {
// 	// 	// Grab chart container in DOM
// 	// 	const classyContainer = grabClassyContainer(chartType);

// 	// 	// Trigger click on a slice
// 	// 	d3.select(classyContainer).select(`${selectors.INNERWRAP} path`).dispatch("click");

// 	// 	// Make sure the tooltip container exists now
// 	// 	expect(document.querySelector(selectors.TOOLTIP)).toBeTruthy();
// 	// });

// 	it("should filter results", () => {
// 		// Grab chart container in DOM & # of current slices
// 		const classyContainer = grabClassyContainer(chartType);
// 		const numberOfSlices = getNumberOfSlices(classyContainer);

// 		classyDonutChart.events.addEventListener("load", e => {
// 			// Click on the first legend item
// 			select(classyContainer).select(selectors.LEGEND_BTN).dispatch("click");

// 			expect(getNumberOfSlices(classyContainer)).toBe(numberOfSlices - 1);
// 		});
// 	});
// });
