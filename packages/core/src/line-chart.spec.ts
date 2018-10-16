// TODO - Fix d3 stack errors
import * as d3 from "d3";

import { LineChart } from "./index";
import {
	createChartContainer,
	grabChartContainer,
	removeChart,
	inputAndProcessedDataMatch,
	selectors,
} from "./test-tools";

// Data & Options
import { lineData, lineOptions } from "../demo/demo-data/line";

const chartType = "line";
describe("line chart", () => {
	let classyLineChart;

	beforeEach(() => {
		// Append the chart container to DOM
		const classyContainer = createChartContainer(chartType);
		document.body.appendChild(classyContainer);

		// Instantiate chart object & draw on DOM
		classyLineChart = new LineChart(
			classyContainer,
			{
				data: lineData,
				options: Object.assign({}, lineOptions, {type: chartType})
			}
		);
	});

	afterEach(() => {
		// Remove the chart resulted from this test case
		removeChart(chartType);
	});

	it("should work", () => {
		setTimeout(_ => {
            // Grab chart container in DOM
            const classyContainer = grabChartContainer(chartType);

            // Expect chart container to contain the main chart SVG element
            expect(classyContainer.querySelector(selectors.OUTERSVG)).toBeTruthy();
        });
	});

	/*
	 * Events
	 * Testing (data comes in correctly, goes out correctly)
	 */
	// it("should not be missing any of the labels or values in the processed data", () => {
    //     setTimeout(_ => {
    //         expect(inputAndProcessedDataMatch(classyLineChart, lineData)).toBeTruthy();
    //     });
	// });

	// it ("should show tooltips", () => {
	// 	setTimeout(_ => {
    //         // Grab chart container in DOM
    //         const classyContainer = grabChartContainer(chartType);

    //         // Trigger click on a slice
    //         d3.select(classyContainer).select(`${selectors.INNERWRAP} circle`).dispatch("click");

    //         // Make sure the tooltip container exists now
    //         expect(classyContainer.querySelector(selectors.TOOLTIP)).toBeTruthy();
    //     });
	// });
});
