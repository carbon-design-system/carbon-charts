import * as d3 from "d3";
import { PieChart } from "./pie-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class DonutChart extends PieChart {
	figure: number;
	title: string;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data, "donut");

		// Check if figure & title have been provided
		if (options.figure && options.title) {
			this.figure = options.figure;
			this.title = options.title;
		}
	}

	draw() {
		super.draw();

		// Add the center text (figure & title)
		if (this.figure && this.title) {
			this.svg
				.append("text")
				.attr("class", "donut-figure")
				.attr("text-anchor", "middle")
				.text(this.figure.toLocaleString());

			this.svg
				.append("text")
				.attr("class", "donut-title")
				.attr("text-anchor", "middle")
				.attr("y", Configuration.donut.centerText.title.y)
				.text(this.title);
		}
	}

	updateChart() {
		if (this.svg) {
			super.updateChart();

			const actualChartSize: any = this.getActualChartSize(this.container)
				, dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height)
				, radius: number = dimensionToUseForScale / 2;

			const { pie: pieConfigs } = Configuration
				, scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth
				, marginedRadius = radius - (pieConfigs.label.margin * scaleRatio)
				, arc = d3.arc()
							.innerRadius(marginedRadius * (2 / 3))
							.outerRadius(marginedRadius);

			this.svg.selectAll("path")
				.attr("d", arc);

			// If the dimensions of the chart are smaller than a certain number (e.g. 175x175)
			// Resize the center text sizes
			if (dimensionToUseForScale < Configuration.donut.centerText.breakpoint) {
				this.svg.select("text.donut-figure")
					.style("font-size", 24 * scaleRatio * Configuration.donut.centerText.magicScaleRatio + "px");

				this.svg.select("text.donut-title")
					.style("font-size", 15 * scaleRatio * Configuration.donut.centerText.magicScaleRatio + "px")
					.attr("y", Configuration.donut.centerText.title.y * scaleRatio * Configuration.donut.centerText.magicScaleRatio);
			}
		}
	}
}
