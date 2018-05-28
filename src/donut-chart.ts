import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { PieChart } from "./pie-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class DonutChart extends PieChart {
	center: DonutCenter;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data, "donut");

		// Check if the DonutCenter object is provided
		if (options.center) {
			this.center = options.center;
		}
	}

	draw() {
		super.draw();

		// Draw the center text
		if (this.center && this.center.configs) {
			this.center.draw(this.svg);
		}
	}

	resizeChart() {
		if (this.svg) {
			// Inherit resizing logic from PieChart
			super.resizeChart();

			if (this.center) {
				// Trigger resize on DonutCenter as well
				this.center.resize(this.svg, this.getActualChartSize(this.container));
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

	update() {

	}

	resize(svgElement: any, actualChartSize: any) {
		// If the dimensions of the chart are smaller than a certain number (e.g. 175x175)
		// Resize the center text sizes
		const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
		const { pie: pieConfigs } = Configuration;
		const scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth;
		if (dimensionToUseForScale < Configuration.donut.centerText.breakpoint) {
			svgElement.select("text.donut-figure")
				.style("font-size",
					Configuration.donut.centerText.numberFontSize * scaleRatio * Configuration.donut.centerText.magicScaleRatio + "px"
				);

			svgElement.select("text.donut-title")
				.style("font-size", Configuration.donut.centerText.titleFontSize * scaleRatio * Configuration.donut.centerText.magicScaleRatio + "px")
				.attr("y", Configuration.donut.centerText.title.y * scaleRatio * Configuration.donut.centerText.magicScaleRatio);
		}
	}
}
