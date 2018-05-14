import { PieChart } from "./index";
import { createClassyContainer, grabClassyContainer, mainSVGSelector, colors } from "./test-tools";

const chartType = "pie";
describe("Pie Chart", () => {
	beforeEach(() => {
		const classyContainer = createClassyContainer(chartType);
		document.body.appendChild(classyContainer);

		const pieData = [
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

		const pieOptions = {
			legendClickable: true,
			containerResizable: true,
			colors
		};

		// Instantiate chart object & draw on DOM
		const classyPieChart = new PieChart(
			classyContainer,
			Object.assign({}, pieOptions, {type: chartType}),
			pieData
		);
		classyPieChart.drawChart();
	});

	it("Should work", () => {
		const classyContainer = grabClassyContainer(chartType);

		expect(classyContainer.querySelector(mainSVGSelector)).toBeTruthy();
	});
});
