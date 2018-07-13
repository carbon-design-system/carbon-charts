import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { PieChart } from "./pie-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class DonutChart extends PieChart {
	center: DonutCenter;

	constructor(holder: Element, configs: any) {
		super(holder, configs, "donut");

		// Check if the DonutCenter object is provided
		if (configs.options.center) {
			this.center = configs.options.center;
		}
	}

	draw() {
		super.draw();

		// Draw the center text
		if (this.center && this.center.configs) {
			this.center.draw(this.innerWrap);
		}
	}

	resizeChart() {
		if (this.innerWrap) {
			// Inherit resizing logic from PieChart
			super.resizeChart();

			if (this.center) {
				// Trigger resize on DonutCenter as well
				this.center.resize(this.innerWrap, this.getChartSize(this.container));
			}
		}
	}
}

export class DonutCenter {
	configs: any;
	oldConfigs: any;
	donutSVG: any;

	constructor(configs: any) {
		if (configs) {
			this.configs = configs;

			// Keep track of changes to the configs above
			this.oldConfigs = Object.assign({}, configs);
		} else {
			console.error("Configuration object is missing for DonutCenter");
		}
	}

	draw (innerWrap: any) {
		// Add the number shown in the center of the donut
		innerWrap.append("text")
			.attr("class", "donut-figure")
			.attr("text-anchor", "middle")
			.text(this.configs.number.toLocaleString());

		// Add the label below the number in the center of the donut
		innerWrap.append("text")
			.attr("class", "donut-title")
			.attr("text-anchor", "middle")
			.attr("y", Configuration.donut.centerText.title.y)
			.text(this.configs.label);

		this.donutSVG = innerWrap;
	}

	update() {
		const possiblyNewConfigs = this.configs;
		// If the configs are different from the previous update() call
		if (this.oldConfigs !== possiblyNewConfigs) {
			const newNumber = this.configs.number;
			// Update center number
			this.donutSVG.select("text.donut-figure")
				.transition()
				.duration(Configuration.transitions.default.duration)
				.tween("text", function() {
					return donutCenterNumberTween(d3.select(this), newNumber);
				});

			// Update center label
			this.donutSVG.select("text.donut-title")
				.text(this.configs.label);

			// Set the latest configs in record to keep track of future config updates
			this.oldConfigs = Object.assign({}, this.configs);
		}
	}

	resize(svgElement: any, actualChartSize: any) {
		const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
		const { pie: pieConfigs } = Configuration;
		const scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth;

		// If the dimensions of the chart are smaller than a certain number (e.g. 175x175)
		// Resize the center text sizes
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

function donutCenterNumberTween(d3Ref, newNumber: number) {
	// Remove commas from the current value string, and convert to an int
	const currentValue = parseInt(d3Ref.text().replace(/[, ]+/g, ""), 10);
	const i = d3.interpolateNumber(currentValue, newNumber);

	const formatInterpolatedValue = number => Math.floor(number).toLocaleString();
	console.log(i(0.5));

	return t => {
		d3Ref.text(formatInterpolatedValue(i(t)));
	};
}
