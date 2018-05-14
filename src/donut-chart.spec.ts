import { DonutChart, DonutCenter } from "./index";
import { createClassyContainer, grabClassyContainer, mainSVGSelector, colors } from "./test-tools";

const chartType = "donut";
describe("Donut Chart", () => {
	beforeEach(() => {
		// Append the chart container to DOM
		const classyContainer = createClassyContainer(chartType);
		document.body.appendChild(classyContainer);

		const data = [
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
		const classyDonutChart = new DonutChart(
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
		expect(classyContainer.querySelector(mainSVGSelector)).toBeTruthy();
	});
});
