import * as d3 from "d3";

import { ComboChart } from "./index";
import {
	createClassyContainer,
	grabClassyContainer,
	removeChart,
	selectors,
	colors
} from "./test-tools";

const chartType = "combo";
describe("Combo Chart", () => {
	beforeEach(() => {
		// Append the chart container to DOM
		const classyContainer = createClassyContainer(chartType);
		document.body.appendChild(classyContainer);

		const data = [
			{
				"Part number": "2V2N-9KYPM",
				"Total": 100000,
				"Returned": 60000,
				"Defects": 9230,
				"This is an extra long long long legend": 12345,
				"Number of sold products": 90000
			},
			{
				"Part number": "L22I-P66EP",
				"Total": 200000,
				"Returned": 50000,
				"Defects": 9230,
				"This is an extra long long long legend": 12345,
				"Number of sold products": 70000
			},
			{
				"Part number": "JQAI-2M4L1",
				"Total": 100000,
				"Returned": 9000,
				"Defects": 2980,
				"This is an extra long long long legend": 12345,
				"Number of sold products": 6000
			},
			{
				"Part number": "J9DZ-F37AP",
				"Total": 150000,
				"Returned": 8000,
				"Defects": 12230,
				"This is an extra long long long legend": 12345,
				"Number of sold products": 11000
			},
			{
				"Part number": "Q6XK-YEL48",
				"Total": 230000,
				"Returned": 4000,
				"Defects": 8230,
				"This is an extra long long long legend": 12345,
				"Number of sold products": 300000
			},
			{
				"Part number": "773C-XKB5L",
				"Total": 390000,
				"Returned": 35000,
				"Defects": 5230,
				"This is an extra long long long legend": 12345,
				"Number of sold products": 190000
			}
		];

		const options = {
			xDomain: "Part number",
			yDomain: ["Total"],
			y2Domain: ["Returned", "Defects", "This is an extra long long long legend", "Number of sold products"],
			yTicks: 5,
			y2Ticks: 10,
			legendClickable: true,
			containerResizable: true,
			colors
		};

		// Instantiate chart object & draw on DOM
		const classyComboChart = new ComboChart(
			classyContainer,
			Object.assign({}, options, {type: chartType}),
			data
		);
		classyComboChart.drawChart();
	});

	afterEach(() => {
		// Remove the chart resulted from this test case
		removeChart(chartType);
	});

	it("Should work", () => {
		// Grab chart container in DOM
		const classyContainer = grabClassyContainer(chartType);

		// Expect chart container to contain the main chart SVG element
		expect(classyContainer.querySelector(selectors.OUTERSVG)).toBeTruthy();
	});

	it ("Should show tooltips", () => {
		// Grab chart container in DOM
		const classyContainer = grabClassyContainer(chartType);

		// Trigger click on a slice
		d3.select(classyContainer).select(`${selectors.INNERWRAP} rect`).dispatch("click");

		// Make sure the tooltip container exists now
		expect(document.querySelector(selectors.TOOLTIP)).toBeTruthy();
	});
});
