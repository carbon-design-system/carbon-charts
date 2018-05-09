import * as d3 from "d3";
import { PieChart } from "./pie-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class DonutChart extends PieChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data, "donut");
	}

	updateChart() {
		if (this.svg) {
			super.updateChart();
			
			const actualChartSize: any = this.getActualChartSize(this.container)
				, radius: number = Math.min(actualChartSize.width, actualChartSize.height) / 2
			
			const { pie: pieConfigs } = Configuration
				, marginedRadius = radius - (pieConfigs.label.margin * (actualChartSize.width / pieConfigs.maxWidth))
				, arc = d3.arc()
							.innerRadius(marginedRadius * (2/3))
							.outerRadius(marginedRadius);
			
			this.svg.selectAll("path")
				.attr("d", arc);
		}
	}
}
