import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class PieChart extends BaseChart {
	pie: any;
	arc: any;
	path: any;
	color: any;

	constructor(holder: Element, options?: any, data?: any, type: string = "pie") {
		super(holder, options, data);

		this.options.type = type;

		this.color = d3.scaleOrdinal(this.options.colors);

		if (this.options.containerResizable) {
			this.resizeWhenContainerChange();
		}

		if (data) {
			this.setData(data);
		}
	}

	setData(data: any) {
		const { selectors } = Configuration;
		const innerWrapElement = this.holder.querySelector(selectors.INNERWRAP);
		const initialDraw = innerWrapElement === null;

		if (initialDraw) {
			const loadingOverlay = document.createElement("div");
			loadingOverlay.classList.add("chart-overlay");
			loadingOverlay.innerHTML = "<span>loading...</span>";
			this.holder.querySelector(selectors.CHARTWRAPPER).appendChild(loadingOverlay);
		}

		Promise.resolve(data).then(value => {
			// Check for duplicate keys in the data
			const duplicates = Tools.duplicateKeysInData(value);
			if (duplicates.length > 0) {
				console.error(`${Tools.capitalizeFirstLetter(this.options.type)} Chart - You have duplicate keys`, duplicates);
			}

			// Process data
			const keys: any = {};
			this.data = this.sortAndRepartitionData(value);

			// Build out the keys array of objects to represent the legend items
			this.data.forEach(entry => {
				keys[entry.label] = Configuration.legend.items.status.ACTIVE;
			});
			this.options.keys = keys;

			// Perform the draw or update chart
			if (initialDraw) {
				console.log("initialDraw()");

				this.initialDraw();

				const overlayEl = <HTMLElement>this.holder.querySelector("div.chart-overlay");
				overlayEl.style.display = "none";
			} else {
				console.log("update()");
				this.update();
			}
		});
	}

	// Sort data by value (descending)
	// Cap number of slices at a specific number, and group the remaining items into the label "Other"
	sortAndRepartitionData(data: any) {
		let sortedData = data.sort((a, b) => b.value - a.value);
		const stopAt = Configuration.pie.sliceLimit;
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

		return sortedData.map((item, i) => Object.assign(item, { index: i }));
	}

	initialDraw() {
		this.setSVG();

		this.addLegend();
		if (this.options.legendClickable) {
			this.setClickableLegend();
		}

		this.positionLegend();
		this.draw();
		this.addDataPointEventListener();
	}

	interpolateValues(newData: any) {
		console.log("INT VAL NEW DATA", newData);
		// Apply the new data to the slices, and interpolate them
		const arc = this.arc;
		const path = this.svg.selectAll("path").data(this.pie(newData));

		path.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", (d, i) => this.options.colors[d.data.index])
			.attr("stroke", (d, i) => this.options.colors[d.data.index])
			.transition()
			.duration(0)
			.style("opacity", 0)
			.transition()
			.duration(750)
			.style("opacity", 1);

		path
			.exit()
			.attr("d", arc)
			.transition()
			.duration(750)
			.style("opacity", 0)
			.remove();

		path.transition().duration(750).attrTween("d", function (a) {
			return arcTween.bind(this)(a, arc);
		});

		// this.path
		// 	.enter()
		// 	.append("path")
		// 	.attr("d", arc)
		// 	.attr("fill", function(d, i) {
		// 		return this.options.colors[d.data.index];
		// 	}.bind(this))
		// 	.attr("stroke", function(d, i) {
		// 		return this.options.colors[d.data.index];
		// 	}.bind(this))
		// 	.transition()
		// 	.duration(750)
		// 	.attrTween("d", function (a) {
		// 		return arcTween.bind(this)(a, arc);
		// 	})
		// 	.each(function(d) { this._current = d; });

		// Fade out all text labels
		this.svg.selectAll("text.chart-label")
			.transition().duration(375).style("opacity", 0).on("end", function(d) {
				d3.select(this).transition().duration(375).style("opacity", 1);
			});

		// Move text labels to their new location, and fade them in again
		const radius = this.computeRadius();
		setTimeout(() => {
			const { ACTIVE } = Configuration.legend.items.status;
			const text = this.svg.selectAll("text.chart-label").data(this.pie(newData, function(d) { return d; }));

			text
				.enter()
				.append("text")
				.attr("dy", Configuration.pie.label.dy)
				.style("text-anchor", this.deriveTextAnchor)
				.attr("transform", (d) => {
					return this.deriveTransformString(d, radius);
				})
				.text(function(d) {
					return Tools.convertValueToPercentage(d.data.value, newData);
				});

			text
				.exit()
				.remove();

			text
				.attr("dy", Configuration.pie.label.dy)
				.style("text-anchor", this.deriveTextAnchor)
				.attr("transform", (d) => {
					return this.deriveTransformString(d, radius);
				})
				.text(function(d) {
					return Tools.convertValueToPercentage(d.data.value, newData);
				});
		}, 375);

		this.addDataPointEventListener();
		// // Set the new data through the chart component
		// this.data = newData;
	}

	draw() {
		const dataList = this.data;

		const actualChartSize: any = this.getActualChartSize(this.container);
		const diameter = Math.min(actualChartSize.width, actualChartSize.height);
		const radius: number = diameter / 2;

		d3.select(this.holder).select("svg")
			.attr("width", `${diameter}px`)
			.attr("height", `${diameter}px`);

		this.svg
			.attr("class", "inner-wrap")
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
			.value(function(d: any) { return d.value; })
			.sort(null);

		// Draw the slices
		this.path = this.svg.selectAll("path")
			.data(this.pie(dataList))
			.enter()
			.append("path")
			.attr("d", this.arc)
			.attr("fill", function(d, i) {
				return this.options.colors[d.data.index];
			}.bind(this))
			.attr("stroke", function(d, i) {
				return this.options.colors[d.data.index];
			}.bind(this))
			.each(function(d) { this._current = d; });

		// Render the slice labels
		this.svg
			.selectAll("g.inner-wrap")
			.data(this.pie(dataList))
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

		this.svg
			.selectAll("text.chart-label")
			.enter();
	}

	reduceOpacity(exception) {
		this.svg.selectAll("path").attr("stroke-opacity", 0);
		this.svg.selectAll("path").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);

		// Fade out everything except for this element
		d3.select(exception).attr("fill-opacity", false);
		d3.select(exception.parentNode).selectAll("circle").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		d3.select(exception).attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		d3.select(exception).attr("fill", d3.select(exception).attr("stroke"));
	}

	showTooltip(d) {
		this.resetOpacity();

		d3.selectAll(".tooltip").remove();
		const tooltip = d3.select(this.holder).append("div")
			.attr("class", "tooltip chart-tooltip")
			.style("top", d3.mouse(this.holder as SVGSVGElement)[1] - Configuration.tooltip.magicTop2 + "px")
			.style("border-color", this.options.colors[d.data.index]);
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

	addDataPointEventListener() {
		const self = this;
		this.svg.selectAll("path")
			.on("click", function(d) {
				self.showTooltip(d);
				self.reduceOpacity(this);
			})
			.on("mouseover", function(d) {
				const sel = d3.select(this);
				self.moveToFront(sel);

				sel
					.attr("stroke-width", Configuration.pie.mouseover.strokeWidth)
					.attr("stroke-opacity", Configuration.pie.mouseover.strokeOpacity)
					.attr("stroke", self.options.colors[d.data.index]);
			})
			.on("mouseout", function(d) {
				d3.select(this).attr("stroke", "");
			});
	}

	// TODO - Remove
	setSVG() {
		const currentSVG = d3.select(this.holder).select("svg.chart-svg");
		if (currentSVG) {
			currentSVG.remove();
		}

		super.setSVG();
	}

	// update() {
	// 	this.setSVG();
	// 	this.draw();
	// 	this.addDataPointEventListener();
	// }

	update(newData?: any) {
		console.log(newData);
		const oldData = this.data;
		const activeSeries = this.getActiveLegendItems();
		if (!newData) {
			// Get new data by filtering the data based off of the legend
			newData = oldData.filter(dataPoint => {
				// If this datapoint is active on the legend
				const activeSeriesItemIndex = activeSeries.indexOf(dataPoint.label);

				return activeSeriesItemIndex > -1;
			});
		}
		const processedNewData = this.sortAndRepartitionData(newData);


		console.log("processedNewData", activeSeries, newData, processedNewData);

		// console.log("FILTERED DATA", filteredData);

		this.interpolateValues(processedNewData);

		// const oldLegendItems = this.getActiveDataSeries();
		// const { missing: removedItems, added: newItems } = Tools.arrayDifferences(oldLegendItems, keys);
		// console.log(oldLegendItems, keys);
		// console.log("NEW KEYS OR NOT", removedItems, newItems);
		// const currentLegendButtons = Array.prototype.slice.call(this.holder.querySelectorAll(".legend-btn"));
		// currentLegendButtons.forEach((buttonElement, i) => {
		// 	const buttonShouldUpdate = d3.select(buttonElement).select("text").text() !== keys[i];
		// 	if (buttonShouldUpdate) {
		// 		d3.select(buttonElement).select("text").text(keys[i]);
		// 	}
		// });
	}

	getActiveLegendItems() {
		const legendItems = this.getLegendItems();

		return Object.keys(legendItems)
			.filter(legendItemLabel => legendItems[legendItemLabel] === Configuration.legend.items.status.ACTIVE);
	}

	getDisabledLegendItems() {
		const legendItems = this.getLegendItems();

		return Object.keys(legendItems)
			.filter(legendItemLabel => legendItems[legendItemLabel] === Configuration.legend.items.status.DISABLED);
	}

	addLegend() {
		if (this.container.select(".legend-tooltip").nodes().length > 0) {
			return;
		}

		const legend = this.container.select(".legend")
			.attr("font-size", Configuration.legend.fontSize)
			.selectAll("div")
			.data(this.getLegendItemsArray())
			.enter().append("li")
				.attr("class", "legend-btn active");

		legend.append("div")
			.attr("class", "legend-circle")
			.style("background-color", (d, i) => this.options.colors[i]);
		this.addLegendCircleHoverEffect();

		legend.append("text")
			.text(d => d);
	}

	applyLegendFilter(changedLabel: string) {
		const { ACTIVE, DISABLED } = Configuration.legend.items.status;
		const oldStatus = this.options.keys[changedLabel];
		this.options.keys[changedLabel] = oldStatus === ACTIVE ? DISABLED : ACTIVE;

		this.update();
	}

	resizeChart() {
		const { pie: pieConfigs } = Configuration;

		const actualChartSize: any = this.getActualChartSize(this.container);
		const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
		const scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth;
		const radius: number = dimensionToUseForScale / 2;

		// Resize the SVG
		d3.select(this.holder).select("svg")
				.attr("width", `${dimensionToUseForScale}px`)
				.attr("height", `${dimensionToUseForScale}px`);
		this.svg
			.style("transform", `translate(${radius}px,${radius}px)`);

		// Resize the arc
		const marginedRadius = radius - (pieConfigs.label.margin * scaleRatio);
		const arc = d3.arc()
			.innerRadius(this.options.type === "donut" ? (marginedRadius * (2 / 3)) : 0)
			.outerRadius(marginedRadius);

		this.svg.selectAll("path")
			.attr("d", arc);

		this.svg
			.selectAll("text.chart-label")
			.attr("transform", (d) => {
				return this.deriveTransformString(d, radius);
			});

		// Reposition the legend
		this.positionLegend();
	}

	// Helper functions
	private computeRadius() {
		const actualChartSize: any = this.getActualChartSize(this.container);
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
