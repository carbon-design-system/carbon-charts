// D3 Imports
import { select } from "d3-selection";
import { interpolateNumber } from "d3-interpolate";

import { PieChart } from "./pie-chart";
import * as Configuration from "./configuration";
import { ChartConfig, DonutChartOptions, ChartType } from "./configuration";
import { Tools } from "./tools";

export class DonutCenter {
	configs: any;
	oldConfigs: any;
	donutSVG: any;

	constructor(configs: any) {
		if (configs) {
			this.configs = configs;

			// Keep track of changes to the configs above
			this.oldConfigs = Tools.merge({}, configs);
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
					return donutCenterNumberTween(select(this), newNumber);
				});

			// Update center label
			this.donutSVG.select("text.donut-title")
				.text(this.configs.label);

			// Set the latest configs in record to keep track of future config updates
			this.oldConfigs = Tools.merge({}, this.configs);
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

export class DonutChart extends PieChart {
	center: DonutCenter;

	options: DonutChartOptions;

	constructor(holder: Element, configs: ChartConfig<DonutChartOptions>) {
		super(holder, configs, ChartType.DONUT);
		// Check if the DonutCenter object is provided
		// in the chart configurations
		const { center, centerLabel, centerNumber } = configs.options;

		// TODO 1.0 - Remove deprecated API
		if (center || centerLabel || centerNumber) {
			// Set donut center configs
			// And instantiate the DonutCenter object
			const donutCenterConfigs = this.getSuppliedCenterConfigs();
			this.center = new DonutCenter(donutCenterConfigs);
		}
	}

	draw() {
		super.draw();

		// Draw the center text
		if (this.center) {
			// Set donut center configs
			this.setCenterConfigs();

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

	update() {
		super.update();

		if (this.center) {
			// Set donut center configs
			this.setCenterConfigs();

			// Update donut center
			this.center.update();
		}
	}

	getSuppliedCenterConfigs() {
		// TODO 1.0 - Remove deprecated API
		const { center, centerLabel, centerNumber } = this.options;
		const label = center ? center.label : centerLabel;
		let number = center ? center.number : centerNumber;

		// TODO 1.0 - Remove deprecated API
		// Warn developer about deprecation
		if (centerLabel || centerNumber) {
			console.warn(
				"`centerLabel` & `centerNumber` are deprecated and will be removed in v1.0, you should switch to",
				{
					center: {
						label: "test",
						number: 10
					}
				}
			);
		}

		// If a number for donut center has not been provided
		// Use the sum of datapoints
		if (!number && this.displayData) {
			const sumOfDatapoints = this.displayData.datasets[0].data.reduce((accum, currVal) => accum + currVal.value, 0);
			number = sumOfDatapoints;
		}

		return {
			label,
			number
		};
	}

	setCenterConfigs() {
		this.center.configs = this.getSuppliedCenterConfigs();
	}
}

function donutCenterNumberTween(d3Ref, newNumber: number) {
	// Remove commas from the current value string, and convert to an int
	const currentValue = parseInt(d3Ref.text().replace(/[, ]+/g, ""), 10);
	const i = interpolateNumber(currentValue, newNumber);

	const formatInterpolatedValue = number => Math.floor(number).toLocaleString();

	return t => {
		d3Ref.text(formatInterpolatedValue(i(t)));
	};
}
