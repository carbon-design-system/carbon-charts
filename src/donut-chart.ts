import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { PieChart } from "./pie-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class DonutChart extends PieChart {
	donutCenter: DonutCenter;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data, "donut");

		// Check if the DonutCenter object is provided
		if (options.center) {
			this.donutCenter = options.center;
		}
	}

	draw() {
		super.draw();

		// Draw the center text
		if (this.donutCenter && this.donutCenter.configs) {
			this.donutCenter.draw(this.svg);
		}
	}

	updateChart() {
		if (this.svg) {
			super.updateChart();

			const actualChartSize: any = this.getActualChartSize(this.container);
			const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
			const radius: number = dimensionToUseForScale / 2;

			const { pie: pieConfigs } = Configuration;
			const scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth;
			const marginedRadius = radius - (pieConfigs.label.margin * scaleRatio);
			const arc = d3.arc()
				.innerRadius(marginedRadius * (2 / 3))
				.outerRadius(marginedRadius);

			this.svg.selectAll("path")
				.attr("d", arc);

			// If the dimensions of the chart are smaller than a certain number (e.g. 175x175)
			// Resize the center text sizes
			if (dimensionToUseForScale < Configuration.donut.centerText.breakpoint) {
				this.svg.select("text.donut-figure")
					.style("font-size",
						Configuration.donut.centerText.numberFontSize * scaleRatio * Configuration.donut.centerText.magicScaleRatio + "px"
					);

				this.svg.select("text.donut-title")
					.style("font-size", Configuration.donut.centerText.titleFontSize * scaleRatio * Configuration.donut.centerText.magicScaleRatio + "px")
					.attr("y", Configuration.donut.centerText.title.y * scaleRatio * Configuration.donut.centerText.magicScaleRatio);
			}
		}
	}
}

export class DonutCenter {
	configs: any;

	constructor(configs: any) {
		if (configs) {
			this.configs = configs;
		} else {
			console.error("Configuration object is missing for DonutCenter");
		}
	}

	draw (svg: any) {
		// Add the number shown in the center of the donut
		svg.append("text")
			.attr("class", "donut-figure")
			.attr("text-anchor", "middle")
			.text(this.configs.number.toLocaleString());

		// Add the label below the number in the center of the donut
		svg.append("text")
			.attr("class", "donut-title")
			.attr("text-anchor", "middle")
			.attr("y", Configuration.donut.centerText.title.y)
			.text(this.configs.label);
	}
}
