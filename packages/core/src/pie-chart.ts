// D3 Imports
import { select, selectAll, mouse } from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import { pie, arc, Pie, Arc } from "d3-shape";
import { interpolate } from "d3-interpolate";

import { BaseChart } from "./base-chart";
import * as Configuration from "./configuration";
import { ChartConfig, PieChartOptions, ChartType, ChartData } from "./configuration";
import { Tools } from "./tools";

export interface PieDatum {
	label: string;
	value: number;
	items?: Array<PieDatum>;
}

export interface PieDataSet extends Configuration.DataSet {
	data: Array<PieDatum>;
}

export interface PieData {
	labels: Array<string>;
	datasets: Array<PieDataSet>;
}

export class PieChart extends BaseChart {
	pie: Pie<PieChart, any>;
	arc: Arc<PieChart, any>;
	path: any;

	options: PieChartOptions;

	constructor(holder: Element, configs: ChartConfig<PieChartOptions>, type: ChartType.PIE | ChartType.DONUT = ChartType.PIE) {
		super(holder, configs);

		this.options.type = type;

		// Assign colors to each slice using their label
		this.colorScale = scaleOrdinal(this.options.colors);
	}

	// Sort data by value (descending)
	// Cap number of slices at a specific number, and group the remaining items into the label "Other"
	dataProcessor(dataObject: ChartData): PieData {
		// TODO - Support multiple datasets
		// Check for duplicate keys in the data
		const duplicates = Tools.getDuplicateValues(dataObject.labels);
		if (duplicates.length > 0) {
			console.error(`${Tools.capitalizeFirstLetter(this.options.type)} Chart - You have duplicate keys`, duplicates);
		}

		// TODO - Support multiple datasets
		// let sortedData = data.datasets[0];
		const dataList: Array<any> = dataObject.datasets[0].data.map((datum, i) => ({
			label: dataObject.labels[i],
			value: datum,
			// datasetLabel: data.datasets[0].label
		}));

		// Sort data by value
		let sortedData = dataList.sort((a, b) => b.value - a.value);

		// Keep a certain number of slices, and add an "Other" slice for the rest
		const { sliceLimit: stopAt } = Configuration.pie;
		const rest = sortedData.slice(stopAt);
		const restAccumulatedValue = rest.reduce((accum, item) => accum + item.value, 0);

		const otherLabelIndex = sortedData.findIndex(dataPoint => dataPoint.label === "Other");
		if (otherLabelIndex !== -1) {
			sortedData.push(sortedData.splice(otherLabelIndex, 1)[0]);
		} else if (rest.length > 0) {
			sortedData = sortedData.slice(0, stopAt)
				.concat([{
					label: Configuration.pie.label.other,
					value: restAccumulatedValue,
					items: rest
				}]);
		}

		return {
			// Sort labels based on the order made above
			labels: sortedData.map((datum, i) => datum.label),
			datasets: [
				{
					// copy all the relevant properties
					backgroundColors: dataObject.datasets[0].backgroundColors,
					chartType: dataObject.datasets[0].chartType,
					label: dataObject.datasets[0].label,
					// add our sorted data
					data: sortedData
				}
			]
		};

	}

	// If there isn't a chart already drawn in the container
	// This function is called and will do that
	initialDraw() {
		this.setSVG();

		// Add legend
		this.addOrUpdateLegend();

		// Draw slices & labels
		this.draw();

		// Add event listeners to slices
		this.addDataPointEventListener();
	}

	draw() {
		const dataList = this.displayData.datasets[0].data;

		const chartSize = this.getChartSize(this.container);
		const diameter = Math.min(chartSize.width, chartSize.height);
		const radius: number = diameter / 2;

		select(this.holder).select("svg")
			.attr("width", `${diameter}px`)
			.attr("height", `${diameter}px`);

		this.innerWrap
			.style("transform", `translate(${radius}px,${radius}px)`)
			.attr("width", `${diameter}px`)
			.attr("height", `${diameter}px`)
			.attr("preserveAspectRatio", "xMinYMin");

		// Compute the correct inner & outer radius
		const marginedRadius = this.computeRadius();
		this.arc = arc()
				.innerRadius(this.options.type === "donut" ? (marginedRadius * (2 / 3)) : 0)
				.outerRadius(marginedRadius);

		this.pie = pie()
			.value((d: any) => d.value)
			.sort(null);

		// Draw the slices
		this.path = this.innerWrap.selectAll("path")
			.data(this.pie(dataList))
			.enter()
			.append("path")
			.attr("d", this.arc)
			.attr("fill", d => this.getFillColor(this.displayData.datasets[0].label, d.data.label, d.data.value)) // Support multiple datasets
			.attr("stroke", d => this.getStrokeColor(this.displayData.datasets[0].label, d.data.label, d.data.value))
			.attr("stroke-width", Configuration.pie.default.strokeWidth)
			.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0)
			.each(function(d) { this._current = d; });

		// Draw the slice labels
		const self = this;
		this.innerWrap
			.selectAll("text.chart-label")
			.data(this.pie(dataList), (d: any) => d.data.label)
			.enter()
			.append("text")
			.classed("chart-label", true)
			.attr("dy", Configuration.pie.label.dy)
			.style("text-anchor", "middle")
			.text(d => Tools.convertValueToPercentage(d.data.value, dataList))
			.attr("transform", function (d) { return self.deriveTransformString(this, d, radius); });

		// Hide overlay
		this.updateOverlay().hide();
	}

	// Interpolated transitions for older data points to reflect the new data changes
	interpolateValues(newData: any) {
		const dataList = newData.datasets[0].data;

		// Apply the new data to the slices, and interpolate them
		const self = this;
		const path = this.innerWrap.selectAll("path").data(this.pie(dataList));

		// Update slices
		path
			.transition()
			.duration(0)
			.attr("stroke", d => this.getStrokeColor(this.displayData.datasets[0].label, d.data.label, d.data.value))
			.attr("stroke-width", Configuration.pie.default.strokeWidth)
			.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0)
			.transition()
			.style("opacity", 1)
			.duration(Configuration.transitions.default.duration)
			.attr("fill", d => this.getFillColor(this.displayData.datasets[0].label, d.data.label, d.data.value))
			.attrTween("d", function (a) {
				return arcTween.bind(this)(a, self.arc);
			});

		path.enter()
			.append("path")
			.attr("d", this.arc)
			.transition()
			.duration(0)
			.style("opacity", 0)
			.attr("stroke", d => this.getStrokeColor(this.displayData.datasets[0].label, d.data.label, d.data.value))
			.attr("stroke-width", Configuration.pie.default.strokeWidth)
			.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0)
			.transition()
			.duration(Configuration.transitions.default.duration)
			.attr("fill", d => this.getFillColor(this.displayData.datasets[0].label, d.data.label, d.data.value))
			.style("opacity", 1)
			.attrTween("d", function (a) {
				return arcTween.bind(this)(a, self.arc);
			});

		path
			.exit()
			.attr("d", this.arc)
			.transition()
			.duration(Configuration.transitions.default.duration)
			.style("opacity", 0)
			.remove();

		// Fade out all text labels
		this.innerWrap.selectAll("text.chart-label")
			.transition()
			.duration(Configuration.transitions.default.duration / 2)
			.style("opacity", 0)
			.on("end", function(d) {
				select(this)
					.transition()
					.duration(Configuration.transitions.default.duration / 2)
					.style("opacity", 1);
			});

		// Move text labels to their new location, and fade them in again
		const radius = this.computeRadius();
		setTimeout(() => {
			const text = this.innerWrap.selectAll("text.chart-label")
				.data(this.pie(dataList), d => d.label );

			text
				.enter()
				.append("text")
				.classed("chart-label", true)
				.attr("dy", Configuration.pie.label.dy)
				.style("text-anchor", "middle")
				.text(d => Tools.convertValueToPercentage(d.data.value, dataList))
				.attr("transform", function (d) { return self.deriveTransformString(this, d, radius); })
				.style("opacity", 0)
				.transition()
				.duration(Configuration.transitions.default.duration / 2)
				.style("opacity", 1);

			text
				.style("text-anchor", "middle")
				.text(d => Tools.convertValueToPercentage(d.data.value, dataList))
				.attr("transform", function (d) { return self.deriveTransformString(this, d, radius); })
				.transition()
				.duration(Configuration.transitions.default.duration / 2)
				.style("opacity", 1);

			text
				.exit()
				.remove();
		}, Configuration.transitions.default.duration / 2);

		// Add slice hover actions, and clear any slice borders present
		this.addDataPointEventListener();
		this.reduceOpacity();

		// Hide the overlay
		this.updateOverlay().hide();
	}

	// TODO - Possible inherits from base-chart
	reduceOpacity(exception?: any) {
		if (exception) {
			// this.innerWrap.selectAll("path").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);

			// Fade everything out except for this element
			select(exception).attr("fill-opacity", false);
			select(exception).attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
			select(exception).attr("fill", (d: any) => this.getFillColor(this.displayData.datasets[0].label, d.data.label, d.data.value));
		}
	}

	// TODO - Should inherit most logic from base-chart
	showTooltip(d) {
		this.resetOpacity();

		selectAll(".tooltip").remove();
		const tooltip = select(this.holder).append("div")
			.attr("class", "tooltip chart-tooltip")
			.style("top", mouse(this.holder as SVGSVGElement)[1] - Configuration.tooltip.magicTop2 + "px");

		const dVal = d.value.toLocaleString();
		const tooltipHTML = this.generateTooltipHTML(d.data.label, dVal);

		tooltip.append("div").attr("class", "text-box").html(tooltipHTML);
		if (mouse(this.holder as SVGSVGElement)[0] + (tooltip.node() as Element).clientWidth > this.holder.clientWidth) {
			tooltip.style(
				"left",
				mouse(this.holder as SVGSVGElement)[0] - (tooltip.node() as Element).clientWidth - Configuration.tooltip.magicLeft1 + "px"
			);
		} else {
			tooltip.style("left", mouse(this.holder as SVGSVGElement)[0] + Configuration.tooltip.magicLeft2 + "px");
		}

		tooltip.style("opacity", 0)
			.transition()
			.duration(Configuration.tooltip.fadeIn.duration)
			.style("opacity", 1);

		this.addTooltipEventListeners(tooltip);
	}

	// TODO - Refactor
	addDataPointEventListener() {
		const self = this;
		const { accessibility } = this.options;

		this.innerWrap.selectAll("path")
			.on("click", function(d) {
				self.dispatchEvent("pie-slice-onClick", d);
			})
			.on("mouseover", function(d) {
				const sliceElement = select(this);
				Tools.moveToFront(sliceElement);

				sliceElement
					.attr("stroke-width", Configuration.pie.mouseover.strokeWidth)
					.attr("stroke-opacity", Configuration.pie.mouseover.strokeOpacity)
					.attr("stroke", self.getStrokeColor(self.displayData.datasets[0].label, d.data.label, d.data.value));

				self.showTooltip(d);
				self.reduceOpacity(this);
			})
			.on("mousemove", function(d) {
				const tooltipRef = select(self.holder).select("div.chart-tooltip");

				const relativeMousePosition = mouse(self.holder as HTMLElement);
				tooltipRef.style("left", relativeMousePosition[0] + Configuration.tooltip.magicLeft2 + "px")
					.style("top", relativeMousePosition[1] + "px");
			})
			.on("mouseout", function(d) {
				select(this)
					.attr("stroke-width", accessibility ? Configuration.pie.default.strokeWidth : Configuration.pie.mouseout.strokeWidth)
					.attr("stroke", accessibility ? self.getStrokeColor(self.displayData.datasets[0].label, d.data.label, d.data.value) : "none")
					.attr("stroke-opacity", Configuration.pie.mouseout.strokeOpacity);

				self.hideTooltip();
			});
	}

	update(newData?: any) {
		const oldData = Tools.clone(this.displayData);
		const activeLegendItems = this.getActiveLegendItems();

		const newDisplayData = Object.assign({}, oldData);
		newDisplayData.datasets[0].data = oldData.datasets[0].data.filter(dataPoint => activeLegendItems.indexOf(dataPoint.label) !== -1);

		newDisplayData.labels = newDisplayData.datasets[0].data.map(datum => datum.label);

		this.interpolateValues(newDisplayData);
	}

	resizeChart() {
		const chartSize: any = this.getChartSize(this.container);
		const dimensionToUseForScale = Math.min(chartSize.width, chartSize.height);
		const radius: number = this.computeRadius();

		// Resize the SVG
		select(this.holder).select("svg")
				.attr("width", `${dimensionToUseForScale}px`)
				.attr("height", `${dimensionToUseForScale}px`);
		this.innerWrap
			.style("transform", `translate(${radius}px,${radius}px)`);

		// Resize the arc
		this.arc = arc()
			.innerRadius(this.options.type === "donut" ? (radius * (2 / 3)) : 0)
			.outerRadius(radius);

		this.innerWrap.selectAll("path")
			.attr("d", this.arc);

		const self = this;
		this.innerWrap
			.selectAll("text.chart-label")
			.attr("transform", function (d) { return self.deriveTransformString(this, d, radius); });

		// Reposition the legend
		this.positionLegend();
	}

	// Helper functions
	private computeRadius() {
		const chartSize: any = this.getChartSize(this.container);
		const radius: number = Math.min(chartSize.width, chartSize.height) / 2;

		return radius;
	}

	/**
	 * Return the css transform string to be used for the slice
	 *
	 * @private
	 * @param {any} d - d3 data item for slice
	 * @param {any} radius - computed radius of the chart
	 * @returns final transform string to be applied to the <text> element
	 * @memberof PieChart
	 */
	private deriveTransformString(element, d, radius) {
		const textLength = element.getComputedTextLength();
		const textOffsetX = textLength / 2;
		const textOffsetY = parseFloat(getComputedStyle(element).fontSize) / 2;

		const marginedRadius = radius + Configuration.pie.label.margin;

		const theta = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
		const xPosition = (textOffsetX + marginedRadius) * Math.sin(theta);
		const yPosition = (textOffsetY + marginedRadius) * -Math.cos(theta);

		return `translate(${xPosition}, ${yPosition})`;
	}
}

// d3 Tween functions
function arcTween(a, arcFunc) {
	const i = interpolate(this._current, a);

	return t => {
		this._current = i(t);

		return arcFunc(this._current);
	};
}
