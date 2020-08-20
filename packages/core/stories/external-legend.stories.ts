import { ScatterChart, DonutChart } from "../src/charts";
import { TabularChartData, DonutChartOptions } from "../src/interfaces";
import { LegendChart } from "../src/charts";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/html";
import { donutData, donutData2, donutOptions, chartTypes } from "../demo/data";
import * as storyUtils from "./utils";

storiesOf("External Legend", module)
	.addDecorator(withKnobs)
	.add("Multiple charts with same legend", () => {
		const container = document.createElement("div");
		container.setAttribute("class", "container theme--g100");

		container.innerHTML = `
${storyUtils.generateStoryHeader(chartTypes.LegendChart.vanilla, false)}
${storyUtils.generateThemePickerHTML()}
`;

		container.innerHTML += `
        <div class="marginTop-30">
            <div id="legend-demo"></div>
            <div id="chart-demo"></div>
            <div id="chart-demo2"></div>
        </div>
        `;

		storyUtils.addRadioButtonEventListeners(container);

		const legendData: TabularChartData = donutData.concat(donutData2);

		const legendChartOptions = {};

		const legendChart = new LegendChart(
			container.querySelector("div#legend-demo"),
			{
				data: legendData,
				options: legendChartOptions
			}
		);

		const legendOptions = {
			external: {
				reference: legendChart
			}
		};

		const options1 = donutOptions as DonutChartOptions;
		const options2 = donutData as DonutChartOptions;

		options1.legend = legendOptions;
		options2.legend = legendOptions;
		options1.height = "400px";
		options2.height = "400px";

		const chart = new DonutChart(
			container.querySelector("div#chart-demo"),
			{
				data: donutData as TabularChartData,
				options: options1
			}
		);

		const chart2 = new DonutChart(
			container.querySelector("div#chart-demo2"),
			{
				data: donutData2 as TabularChartData,
				options: options2
			}
		);

		return container;
	});
