import * as d3 from "d3";

import { DonutChart, DonutCenter } from "./index";
import {
	createClassyContainer,
	grabClassyContainer,
	arraysHaveSameValues,
	selectors,
	colors
} from "./test-tools";

// Global chart configs
import { Configuration } from "./configuration";

// Variables
const chartType = "donut";

// Functions
const getNumberOfSlices = (classyContainer) => classyContainer.querySelectorAll(`${selectors.INNERWRAP} path`).length;

describe("Donut Chart", () => {
	let classyDonutChart;
	let data;
	beforeEach(() => {
		// Remove the chart from the previous test case
		const oldClassyContainer = grabClassyContainer(chartType);
		if (oldClassyContainer) {
			oldClassyContainer.parentNode.removeChild(oldClassyContainer);
		}

		// Append the chart container to DOM
		const classyContainer = createClassyContainer(chartType);
		document.body.appendChild(classyContainer);

		data = [
			{ label: "2V2N-9KYPM version 1", value: 100000 },
			{ label: "L22I-P66EP-L22I-P66EP-L22I-P66EP", value: 200000 },
			{ label: "JQAI-2M4L1", value: 600000 },
			{ label: "J9DZ-F37AP", value: 100000 },
			{ label: "YEL48-Q6XK-YEL48", value: 400000 },
			{ label: "P66EP-L22I-L22I", value: 450000 },
			{ label: "Q6XK-YEL48", value: 300000 },
			{ label: "XKB5-L6EP", value: 70000 },
			{ label: "YEL48-Q6XK", value: 20000 },
			{ label: "L22I-P66EP-L22I", value: 120000 }
		];

		const options = {
			legendClickable: true,
			containerResizable: true,
			colors,
			center: new DonutCenter({
				number: 25423,
				label: "Browsers"
			})
		};

		// Instantiate chart object & draw on DOM
		classyDonutChart = new DonutChart(
			classyContainer,
			Object.assign({}, options, {type: chartType}),
			data
		);
		classyDonutChart.drawChart();
	});

	it("Should work", () => {
		// Grab chart container in DOM
		const classyContainer = grabClassyContainer(chartType);

		// Expect chart container to contain the main chart SVG element
		expect(classyContainer.querySelector(selectors.OUTERSVG)).toBeTruthy();
	});

	/*
	 * Events
	 * Testing (data comes in correctly, goes out correctly)
	 */
	it(`Should show a maximum of ${(Configuration.pie.sliceLimit + 1)} slices`, () => {
		// Grab chart container in DOM & # of current slices
		const classyContainer = grabClassyContainer(chartType);

		// (Configuration.pie.sliceLimit + 1) because of the auto-generated "Other" slice when (# of slices > Configuration.pie.sliceLimit)
		expect(classyContainer.querySelectorAll(selectors.pie.SLICE).length).toBeLessThanOrEqual(Configuration.pie.sliceLimit + 1);
	});

	it("Should not be missing any of the labels in the processed data", () => {
		const { data: processedData } = classyDonutChart;

		// Input data labels
		const dataLabels = data.reduce((result, dataPoint) => {
			result.push(dataPoint.label);
			return result;
		}, []);

		// Charts processed data labels
		const processedLabels = processedData.reduce((result, dataPoint) => {
			if (dataPoint.items) {
				// this is the "Other" label
				dataPoint.items.map(item => result.push(item.label));

				return result;
			}

			result.push(dataPoint.label);
			return result;
		}, []);

		expect(arraysHaveSameValues(dataLabels, processedLabels)).toBe(true);
	});

	it("Should not be missing any of the values in the processed data", () => {
		const { data: processedData } = classyDonutChart;

		// Input data labels
		const dataValues = data.reduce((result, dataPoint) => {
			result.push(dataPoint.value);
			return result;
		}, []);

		// Charts processed data labels
		const processedValues = processedData.reduce((result, dataPoint) => {
			if (dataPoint.items) {
				// this is the "Other" label
				dataPoint.items.map(item => result.push(item.value));

				return result;
			}

			result.push(dataPoint.value);
			return result;
		}, []);

		expect(arraysHaveSameValues(dataValues, processedValues)).toBe(true);
	});

	/*
	 * Functionality
	 * Testing
	 */
	it ("Should show tooltips", () => {
		// Grab chart container in DOM
		const classyContainer = grabClassyContainer(chartType);

		// Trigger click on a slice
		d3.select(classyContainer).select(`${selectors.INNERWRAP} path`).dispatch("click");

		// Make sure the tooltip container exists now
		expect(document.querySelector(selectors.TOOLTIP)).toBeTruthy();
	});

	it("Should filter results", () => {
		// Grab chart container in DOM & # of current slices
		const classyContainer = grabClassyContainer(chartType);
		const numberOfSlices = getNumberOfSlices(classyContainer);

		// Click on the first legend item
		d3.select(classyContainer).select(selectors.LEGEND_BTN).dispatch("click");

		expect(getNumberOfSlices(classyContainer)).toBe(numberOfSlices - 1);
	});
});
