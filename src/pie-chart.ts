import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class PieChart extends BaseChart {
	pie: any;
	arc: any;
	path: any;

	// Used to assign colors to each slice by their label
	colorScale: any;

	constructor(holder: Element, configs: any, type: string = "pie") {
		super(holder, configs);

		this.options.type = type;

		// Assign colors to each slice using their label
		this.colorScale = d3.scaleOrdinal(this.options.colors);
	}

	// Sort data by value (descending)
	// Cap number of slices at a specific number, and group the remaining items into the label "Other"
	dataProcessor(dataObject: any) {
		// TODO - Support multiple datasets
		// Check for duplicate keys in the data
		const duplicates = Tools.getDuplicateValues(dataObject.labels);
		if (duplicates.length > 0) {
			console.error(`${Tools.capitalizeFirstLetter(this.options.type)} Chart - You have duplicate keys`, duplicates);
		}

		// TODO - Support multiple datasets
		// let sortedData = data.datasets[0];
		const dataList = dataObject.datasets[0].data.map((datum, i) => {
			return {
				label: dataObject.labels[i],
				value: datum,
				// datasetLabel: data.datasets[0].label
			};
		});

		// Sort data by value
		let sortedData = dataList.sort((a, b) => b.value - a.value);

		// Keep a certain number of slices, and add an "Other" slice for the rest
		const { sliceLimit: stopAt } = Configuration.pie;
		const rest = sortedData.slice(stopAt);
		const restAccumulatedValue = rest.reduce((accum, item) => accum + item.value, 0);

		const otherLabelIndex = sortedData.findIndex(dataPoint => dataPoint.label === "Other");
		if (otherLabelIndex > -1) {
			sortedData.push(sortedData.splice(otherLabelIndex, 1)[0]);
		} else {
			if (rest.length > 0) {
				sortedData = sortedData.slice(0, stopAt)
					.concat([{
						label: Configuration.pie.label.other,
						value: restAccumulatedValue,
						items: rest
					}]);
			}
		}

		// Sort labels based on the order made above
		dataObject.labels = sortedData.map((datum, i) => datum.label);

		dataObject.datasets[0].data = sortedData;

		return dataObject;
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

		const actualChartSize: any = this.getChartSize(this.container);
		const diameter = Math.min(actualChartSize.width, actualChartSize.height);
		const radius: number = diameter / 2;

		d3.select(this.holder).select("svg")
			.attr("width", `${diameter}px`)
			.attr("height", `${diameter}px`);

		this.innerWrap
			.style("transform", `translate(${radius}px,${radius}px)`)
			.attr("width", `${diameter}px`)
			.attr("height", `${diameter}px`)
			.attr("preserveAspectRatio", "xMinYMin");

		// Compute the correct inner & outer radius
		const { pie: pieConfigs } = Configuration;
		const marginedRadius = radius - (pieConfigs.label.margin * (actualChartSize.width / pieConfigs.maxWidth));
		this.arc = d3.arc()
				.innerRadius(this.options.type === "donut" ? (marginedRadius * (2 / 3)) : 0)
				.outerRadius(marginedRadius);

		this.pie = d3.pie()
			.value((d: any) => d.value)
			.sort(null);

		// Draw the slices
		this.path = this.innerWrap.selectAll("path")
			.data(this.pie(dataList))
			.enter()
			.append("path")
			.attr("d", this.arc)
			.attr("fill", d => this.getFillScale()[this.displayData.datasets[0].label](d.data.label)) // Support multiple datasets
			.attr("stroke", d => this.colorScale[this.displayData.datasets[0].label](d.data.label))
			.attr("stroke-width", Configuration.pie.default.strokeWidth)
			.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0)
			.each(function(d) { this._current = d; });

		// Draw the slice labels
		this.innerWrap
			.selectAll("text.chart-label")
			.data(this.pie(dataList), (d: any) => d.data.label)
			.enter()
			.append("text")
			.classed("chart-label", true)
			.attr("dy", Configuration.pie.label.dy)
			.style("text-anchor", this.deriveTextAnchor)
			.attr("transform", (d) => {
				return this.deriveTransformString(d, radius);
			})
			.text(function(d) {
				return Tools.convertValueToPercentage(d.data.value, dataList);
			});

		// Hide overlay
		this.updateOverlay().hide();
	}

	// Interpolated transitions for older data points to reflect the new data changes
	interpolateValues(newData: any) {
		const dataList = newData.datasets[0].data;

		// Apply the new data to the slices, and interpolate them
		const arc = this.arc;
		const path = this.innerWrap.selectAll("path").data(this.pie(dataList));

		// Update slices
		path
			.transition()
			.duration(0)
			.attr("stroke", d => this.colorScale[this.displayData.datasets[0].label](d.data.label))
			.attr("stroke-width", Configuration.pie.default.strokeWidth)
			.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0)
			.transition()
			.duration(750)
			.attr("fill", d => this.getFillScale()[this.displayData.datasets[0].label](d.data.label))
			.attrTween("d", function (a) {
				return arcTween.bind(this)(a, arc);
			});

		path.enter()
			.append("path")
			.attr("d", arc)
			.transition()
			.duration(0)
			.style("opacity", 0)
			.attr("stroke", d => this.colorScale[this.displayData.datasets[0].label](d.data.label))
			.attr("stroke-width", Configuration.pie.default.strokeWidth)
			.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0)
			.transition()
			.duration(750)
			.attr("fill", d => this.getFillScale()[this.displayData.datasets[0].label](d.data.label))
			.style("opacity", 1)
			.attrTween("d", function (a) {
				return arcTween.bind(this)(a, arc);
			});

		path
			.exit()
			.attr("d", arc)
			.transition()
			.duration(750)
			.style("opacity", 0)
			.remove();

		// Fade out all text labels
		this.innerWrap.selectAll("text.chart-label")
			.transition().duration(375).style("opacity", 0).on("end", function(d) {
				d3.select(this).transition().duration(375).style("opacity", 1);
			});

		// Move text labels to their new location, and fade them in again
		const radius = this.computeRadius();
		setTimeout(() => {
			const text = this.innerWrap.selectAll("text.chart-label").data(this.pie(dataList), function(d) { return d.label; });
			text
				.enter()
				.append("text")
				.classed("chart-label", true)
				.attr("dy", Configuration.pie.label.dy)
				.style("text-anchor", this.deriveTextAnchor)
				.attr("transform", (d) => {
					return this.deriveTransformString(d, radius);
				})
				.text(function(d) {
					return Tools.convertValueToPercentage(d.data.value, dataList);
				})
				.style("opacity", 0)
				.transition()
				.duration(375)
				.style("opacity", 1);

			text
				.attr("dy", Configuration.pie.label.dy)
				.style("text-anchor", this.deriveTextAnchor)
				.attr("transform", (d) => {
					return this.deriveTransformString(d, radius);
				})
				.text(function(d) {
					return Tools.convertValueToPercentage(d.data.value, dataList);
				})
				.transition()
				.duration(375)
				.style("opacity", 1);

			text
				.exit()
				.remove();
		}, 375);

		// Add slice hover actions, and clear any slice borders present
		this.addDataPointEventListener();
		this.reduceOpacity();

		// Hide the overlay
		this.updateOverlay().hide();
	}

	resetOpacity() {
		this.innerWrap.selectAll("path").attr("stroke-opacity", 0);

		super.resetOpacity();
	}

	// TODO - Possible inherits from base-chart
	reduceOpacity(exception?: any) {
		this.innerWrap.selectAll("path").attr("stroke-opacity", 0);

		if (exception) {
			this.innerWrap.selectAll("path").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);

			// Fade everything out except for this element
			d3.select(exception).attr("fill-opacity", false);
			d3.select(exception).attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
			d3.select(exception).attr("fill", (d: any) => this.getFillScale()[this.displayData.datasets[0].label](d.data.label));
		}
	}

	// TODO - Should inherit most logic from base-chart
	showTooltip(d) {
		this.resetOpacity();

		d3.selectAll(".tooltip").remove();
		const tooltip = d3.select(this.holder).append("div")
			.attr("class", "tooltip chart-tooltip")
			.style("top", d3.mouse(this.holder as SVGSVGElement)[1] - Configuration.tooltip.magicTop2 + "px")
			.style("border-color", this.colorScale[this.displayData.datasets[0].label](d.data.label)); // TODO - Support multiple datasets
		Tools.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				this.hideTooltip();
			});

		const dVal = d.value.toLocaleString();
		let tooltipHTML = `
			<p class='bignum'>${dVal}</p>
			<p>${d.data.label}</p>
		`;

		if (d.data.label === Configuration.pie.label.other) {
			const { items } = d.data;

			items.map(item => {
				tooltipHTML += `
					<p>${item.label}: ${item.value.toLocaleString()}</p>
				`;
			});
		}

		tooltip.append("div").attr("class", "text-box").html(tooltipHTML);
		if (d3.mouse(this.holder as SVGSVGElement)[0] + (tooltip.node() as Element).clientWidth > this.holder.clientWidth) {
			tooltip.classed("arrow-right", true);
			tooltip.style(
				"left",
				d3.mouse(this.holder as SVGSVGElement)[0] - (tooltip.node() as Element).clientWidth - Configuration.tooltip.magicLeft1 + "px"
			);
			tooltip.append("div").attr("class", "arrow");
		} else {
			tooltip.classed("arrow-left", true);
			tooltip.style("left", d3.mouse(this.holder as SVGSVGElement)[0] + Configuration.tooltip.magicLeft2 + "px");
			tooltip.append("div").attr("class", "arrow");
		}

		this.addTooltipEventListeners(tooltip);
	}

	// TODO - Refactor
	addDataPointEventListener() {
		const self = this;
		const { accessibility } = this.options;

		this.innerWrap.selectAll("path")
			.on("click", function(d) {
				self.showTooltip(d);
				self.reduceOpacity(this);
			})
			.on("mouseover", function(d) {
				const sliceElement = d3.select(this);
				Tools.moveToFront(sliceElement);

				sliceElement
					.attr("stroke-width", Configuration.pie.mouseover.strokeWidth)
					.attr("stroke-opacity", Configuration.pie.mouseover.strokeOpacity)
					.attr("stroke", self.colorScale[self.displayData.datasets[0].label](d.data.label));
			})
			.on("mouseout", function(d) {
				d3.select(this)
					.attr("stroke-width", accessibility ? 2 : Configuration.pie.mouseout.strokeWidth)
					.attr("stroke", accessibility ? self.colorScale[self.displayData.datasets[0].label](d.data.label) : "none")
					.attr("stroke-opacity", Configuration.pie.mouseout.strokeOpacity);
			});
	}

	update(newData?: any) {
		const oldData = Tools.passObjectByValue(this.displayData);
		const activeLegendItems = this.getActiveLegendItems();

		const newDisplayData = Object.assign({}, oldData);
		newDisplayData.datasets[0].data = oldData.datasets[0].data.filter(dataPoint => {
			// If this datapoint is active on the legend
			const activeSeriesItemIndex = activeLegendItems.indexOf(dataPoint.label);

			return activeSeriesItemIndex > -1;
		});

		newDisplayData.labels = newDisplayData.datasets[0].data.map(datum => datum.label);

		this.interpolateValues(newDisplayData);
	}

	addLegend() {
		if (this.container.select(".legend-tooltip").nodes().length > 0) {
			return;
		}

		this.container.select(".legend")
			.selectAll("*").remove();

		const legend = this.container.select(".legend")
			.attr("font-size", Configuration.legend.fontSize)
			.selectAll("div")
			.data(this.getLegendItemKeys())
			.enter().append("li")
				.attr("class", "legend-btn active");

		legend.append("div")
			.attr("class", "legend-circle")
			.style("background-color", (d, i) => this.colorScale(d));

		legend.append("text")
			.text(d => d);

		this.addLegendCircleHoverEffect();
	}

	resizeChart() {
		const { pie: pieConfigs } = Configuration;

		const actualChartSize: any = this.getChartSize(this.container);
		const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
		const scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth;
		const radius: number = dimensionToUseForScale / 2;

		// Resize the SVG
		d3.select(this.holder).select("svg")
				.attr("width", `${dimensionToUseForScale}px`)
				.attr("height", `${dimensionToUseForScale}px`);
		this.innerWrap
			.style("transform", `translate(${radius}px,${radius}px)`);

		// Resize the arc
		const marginedRadius = radius - (pieConfigs.label.margin * scaleRatio);
		this.arc = d3.arc()
			.innerRadius(this.options.type === "donut" ? (marginedRadius * (2 / 3)) : 0)
			.outerRadius(marginedRadius);

		this.innerWrap.selectAll("path")
			.attr("d", this.arc);

		this.innerWrap
			.selectAll("text.chart-label")
			.attr("transform", (d) => {
				return this.deriveTransformString(d, radius);
			});

		// Reposition the legend
		this.positionLegend();
	}

	// Helper functions
	private computeRadius() {
		const actualChartSize: any = this.getChartSize(this.container);
		const radius: number = Math.min(actualChartSize.width, actualChartSize.height) / 2;

		return radius;
	}

	/**
	 *
	 *
	 * @private
	 * @param {any} d - d3 data item for slice
	 * @param {any} radius - computed radius of the chart
	 * @returns final transform string to be applied to the <text> element
	 * @memberof PieChart
	 */
	private deriveTransformString(d, radius) {
		const theta = d.endAngle - d.startAngle;
		const xPosition = radius * Math.sin((theta / 2) + d.startAngle);
		const yPosition = (-1 * radius * Math.cos((theta / 2) + d.startAngle ));

		return `translate(${xPosition},${yPosition})`;
	}

	/**
	 *
	 *
	 * @private
	 * @param {any} d - d3 data item for slice
	 * @returns computed decision on what the text-anchor string should be
	 * @memberof PieChart
	 */
	private deriveTextAnchor(d) {
		const QUADRANT = Math.PI / 4;
		const rads = ((d.endAngle - d.startAngle) / 2) + d.startAngle;

		if (rads >= QUADRANT && rads <= 3 * QUADRANT) {
			return "start";
		} else if ((rads > 7 * QUADRANT && rads < QUADRANT) || (rads > 3 * QUADRANT && rads < 5 * QUADRANT)) {
			return "middle";
		} else if (rads >= 5 * QUADRANT && rads <= 7 * QUADRANT) {
			return "end";
		} else {
			return "middle";
		}
	}
}

// d3 Tween functions
function arcTween(a, arc) {
	const i = d3.interpolate(this._current, a);
	const self = this;

	return function(t) {
		self._current = i(t);

		return arc(self._current);
	};
}
