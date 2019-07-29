// D3 Imports
import { select } from "d3-selection";
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
	hoverArc: Arc<PieChart, any>;
	path: any;

	options: PieChartOptions;

	constructor(holder: Element, configs: ChartConfig<PieChartOptions>, type: ChartType.PIE | ChartType.DONUT = ChartType.PIE) {
		super(holder, configs);

		this.options.type = type;

		// Assign colors to each slice using their label
		this.colorScale = scaleOrdinal(this.options.colors);
	}

	// Sort data by value (descending)
	dataProcessor(dataObject: ChartData): PieData {
		// TODO - Support multiple datasets
		if (dataObject.datasets.length > 1) {
			console.warn(`Currently the Pie & Donut charts support a single dataset,
				you appear to have more than that. Will only use your first provided dataset.`);
		}

		// Check for duplicate keys in the data
		const duplicates = Tools.getDuplicateValues(dataObject.labels);
		if (duplicates.length > 0) {
			console.error(`${Tools.capitalizeFirstLetter(this.options.type)} Chart - You have duplicate keys`, duplicates);
		}

		// TODO - Support multiple datasets
		const dataList: Array<any> = dataObject.datasets[0].data.map((datum, i) => ({
			label: dataObject.labels[i],
			value: datum,
			// datasetLabel: data.datasets[0].label
		}));

		// Sort data by value
		const sortedData = dataList.sort((a, b) => b.value - a.value);

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
			.attr("transform", `translate(${radius},${radius})`)
			.attr("width", `${diameter}px`)
			.attr("height", `${diameter}px`)
			.attr("preserveAspectRatio", "xMinYMin");

		// Compute the correct inner & outer radius
		const marginedRadius = this.computeRadius();
		this.arc = arc()
				.innerRadius(this.options.type === "donut" ? (marginedRadius * (3 / 4)) : 2)
				.outerRadius(marginedRadius);

		this.hoverArc = arc()
				.innerRadius(this.options.type === "donut" ? (marginedRadius * (3 / 4)) : 2)
				.outerRadius(marginedRadius + 3);

		this.pie = pie()
			.value((d: any) => d.value)
			.sort(null)
			.padAngle(0.007);

		// Draw the slices
		this.path = this.innerWrap.selectAll("path")
			.data(this.pie(dataList))
			.enter()
			.append("path")
			.attr("d", this.arc)
			.attr("fill", d => this.getFillColor(this.displayData.datasets[0].label, d.data.label, d.data.value)) // Support multiple datasets
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
			.attr("transform", function (d) { return self.getChartLabelPosition(this, d, radius, dataList.length); });

		// Hide overlay
		this.chartOverlay.hide();
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

		// fade out left callout
		this.innerWrap.select("g.callout-lines-left")
			.transition()
			.duration(Configuration.transitions.default.duration / 2)
			.style("opacity", 0)
			.on("end", function(d) {
				select(this)
					.transition()
					.duration(Configuration.transitions.default.duration / 2)
					.style("opacity", 1);
		});

		// fade out right callout
		this.innerWrap.select("g.callout-lines-right")
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
				.attr("transform", function (d) { return self.getChartLabelPosition(this, d, radius, dataList.length); })
				.style("opacity", 0)
				.transition()
				.duration(Configuration.transitions.default.duration / 2)
				.style("opacity", 1);

			text
				.style("text-anchor", "middle")
				.text(d => Tools.convertValueToPercentage(d.data.value, dataList))
				.attr("transform", function (d) { return self.getChartLabelPosition(this, d, radius); })
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
		this.chartOverlay.hide();
	}

	// TODO - Possible inherits from base-chart
	reduceOpacity(exception?: any) {
		if (exception) {
			// this.innerWrap.selectAll("path").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);

			// Fade everything out except for this element
			select(exception).attr("fill-opacity", false);
			select(exception).attr("fill", (d: any) => this.getFillColor(this.displayData.datasets[0].label, d.data.label, d.data.value));
		}
	}

	getTooltipHTML = d => this.generateTooltipHTML(d.data.label, d.value.toLocaleString());

	// TODO - Refactor
	addDataPointEventListener() {
		const self = this;

		this.innerWrap.selectAll("path")
			.on("click", d => self.dispatchEvent("pie-slice-onClick", d))
			.on("mouseover", function(d) {
				const sliceElement = select(this);
				Tools.moveToFront(sliceElement);

				sliceElement.transition(self.getDefaultTransition("pie_slice_hover"))
					.attr("d", self.hoverArc);

				self.showTooltip(d);
				self.reduceOpacity(this);
			})
			.on("mousemove", d => self.tooltip.positionTooltip())
			.on("mouseout", function(d) {
				select(this).transition(self.getDefaultTransition("pie_slice_hover"))
					.attr("d", self.arc);

				self.hideTooltip();
			});
	}

	update(newData?: any) {
		const oldData = Tools.clone(this.displayData);
		const activeLegendItems = this.getActiveLegendItems();

		// TODO - Support multiple datasets
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

		// Resize the arcs
		this.arc = arc()
			.innerRadius(this.options.type === "donut" ? (radius * (3 / 4)) : 2)
			.outerRadius(radius);

		// Resize the arc
		this.hoverArc = arc()
			.innerRadius(this.options.type === "donut" ? (radius * (3 / 4)) : 2)
			.outerRadius(radius + 3);

		this.innerWrap.selectAll("path")
			.attr("d", this.arc);

		const self = this;
		// not using the actual data in case "Other" category functionality is present
		const totalSlices = this.innerWrap.selectAll("text.chart-label").size();

		this.innerWrap
			.selectAll("text.chart-label")
			.attr("transform", function (d) { return self.getChartLabelPosition(this, d, radius, totalSlices); });

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
	 * Returns the calculated position for the slice labels
	 * @param element the text label element
	 * @param d the d3 slice object
	 * @param radius the radius of the pie or donut chart
	 * @param totalSlices total number of slices rendered
	 */
	private getChartLabelPosition(element, d, radius, totalSlices?) {
		const textLength = element.getComputedTextLength();
		const textOffsetX = textLength / 2;
		const textOffsetY = parseFloat(getComputedStyle(element).fontSize) / 2;

		const marginedRadius = radius + Configuration.pie.label.margin;

		const theta = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
		const sliceAngleDeg = (d.endAngle - d.startAngle) * (180 / Math.PI);

		const xPosition = (textOffsetX + marginedRadius) * Math.sin(theta);
		const yPosition = (textOffsetY + marginedRadius) * -Math.cos(theta);

		if (!totalSlices) {
			return `translate(${xPosition}, ${yPosition})`;
		}
		// check if last 2 slices (or just last) are < 3 degrees
		if (d.index === totalSlices - 1) {
			if (sliceAngleDeg < Configuration.pie.label.sliceDegreeThreshold) {
				// start at the same location as a non-called out label
				const startPos = {
					x: xPosition,
					y: yPosition + textOffsetY
				};
				// end position for the callout line
				const endPos = {
					x: xPosition + Configuration.pie.label.calloutOffsetX - textOffsetX - Configuration.pie.label.calloutTextMargin,
					y: yPosition - Configuration.pie.label.calloutOffsetY
				};
				// last slice always gets callout to the right side
				this.drawCallout(startPos, endPos, "right");
				return `translate(${xPosition + Configuration.pie.label.calloutOffsetX}, ${yPosition - Configuration.pie.label.calloutOffsetY})`;
			}
			// remove any unneeded callout for last slice
			this.removeCallout("right");
		}
		if (d.index === totalSlices - 2) {
			if (sliceAngleDeg < Configuration.pie.label.sliceDegreeThreshold) {
				// start position for the callout line
				const startPos = {
					x: xPosition,
					y: yPosition + textOffsetY
				};
				// end position for the callout line
				const endPos = {
					x: xPosition - Configuration.pie.label.calloutOffsetX + textOffsetX + Configuration.pie.label.calloutTextMargin,
					y: yPosition - Configuration.pie.label.calloutOffsetY
				};
				this.drawCallout(startPos, endPos, "left");
				return `translate(${xPosition - Configuration.pie.label.calloutOffsetX}, ${yPosition - Configuration.pie.label.calloutOffsetY})`;
			}
			// remove any leftover unneeded callout
			this.removeCallout("left");
		}
		return `translate(${xPosition}, ${yPosition})`;
	}

	/**
	 * Removes the callout with the specified direction.
	 * @param dir callout direction "right" or "left"
	 */
	private removeCallout(dir) {
		this.innerWrap.select(`g.callout-lines-${dir}`).remove();
	}

	/**
	 * Draws a line to the text label associated with the slice.
	 * @param startPos x,y coordinate to start the callout line
	 * @param endPos x,y coordinate to end the callout line
	 * @param dir direction of callout (right/left)
	 */
	private drawCallout(startPos, endPos, dir) {
		// Clean up the label callouts
		const callout = Tools.appendOrSelect(this.innerWrap, `g.callout-lines-${dir}`);
		const midpointX = (endPos.x + startPos.x) / 2 ;

		// draw vertical line
		const verticalLine = Tools.appendOrSelect(callout, "line.vertical-line");
		verticalLine
		.style("stroke-width", "1px")
			.attr("x1", startPos.x)
			.attr("y1", startPos.y)
			.attr("x2", midpointX)
			.attr("y2", endPos.y);

		// draw horizontal line
		const horizontalLine = Tools.appendOrSelect(callout, "line.horizontal-line");
		horizontalLine
		.style("stroke-width", "1px")
			.attr("x1", midpointX)
			.attr("y1", endPos.y)
			.attr("x2", endPos.x)
			.attr("y2", endPos.y);
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
