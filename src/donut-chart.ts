import * as d3 from "d3";
import { PieChart } from "./pie-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class DonutChart extends PieChart {
	innerRadius: number = 170;
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data, "donut");

		if (options.innerRadius) this.innerRadius = options.innerRadius;
		else console.warn(`Donut Chart - Missing innerRadius, ${this.innerRadius} will be used`);
		
	}

	draw() {
		super.draw(this.innerRadius);
	}

	updateChart() {
		if (this.svg) {
			super.updateChart();
			
			const actualChartSize: any = this.getActualChartSize(this.container)
				, radius: number = Math.min(actualChartSize.width, actualChartSize.height) / 2
				, arc = d3.arc()
							.innerRadius(this.innerRadius * (actualChartSize.width / 516.6))
							.outerRadius(radius);
			
							console.log(actualChartSize.width / 516.6)
			this.svg.selectAll("path")
				.attr("d", arc);
		}
	}
}
