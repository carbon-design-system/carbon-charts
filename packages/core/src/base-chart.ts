// D3 Imports
import {
	event,
	mouse,
	select,
	selectAll
} from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import { transition, Transition } from "d3-transition";

// Internal Imports
import * as Configuration from "./configuration";
import { ChartConfig, BaseChartOptions, ChartData } from "./configuration";
import { Tools } from "./tools";
import PatternsService from "./services/patterns";
import { ChartOverlay } from "./components/index";
import { ChartTooltip } from "./components/tooltip";

// Misc
import ResizeObserver from "resize-observer-polyfill";

export class BaseChart {
	static chartCount = 1;

	id = "";
	chartContainerID = "";

	// Chart element references
	container: any;
	holder: Element;
	svg: any;
	innerWrap: any;

	options: BaseChartOptions = Tools.merge({}, Configuration.options.BASE);

	// Data
	data: ChartData;
	displayData: ChartData;
	fixedDataLabels;

	// Fill scales & fill related objects
	patternScale = {};
	colorScale = {};
	patternsService: PatternsService;

	// Event target
	events: any;
	eventHandlers = {
		tooltips: null
	};

	// Misc
	chartOverlay: ChartOverlay;
	tooltip: ChartTooltip;

	constructor(holder: Element, configs: ChartConfig<BaseChartOptions>) {
		this.id = `chart-${BaseChart.chartCount++}`;
		if (configs.options) {
			this.options = Tools.merge({}, this.options, configs.options);
		}

		// Save holder element reference, and initialize it by applying appropriate styling
		this.holder = holder;
		this.styleHolderElement();

		const {chartId, container} = this.setChartIDContainer();
		this.container = container;
		this.chartContainerID = chartId;

		if (this.options.containerResizable) {
			this.resizeWhenContainerChange();
		}

		this.events = document.createDocumentFragment();

		// Initialize charting components
		this.chartOverlay = new ChartOverlay(this.holder, this.options.overlay);
		this.tooltip = new ChartTooltip(this.container.node());

		if (configs.data) {
			this.setData(configs.data);
		}
	}

	styleHolderElement() {
		const holderElement = this.holder as HTMLElement;
		const { width, height } = this.options;

		// Add class to chart holder
		select(this.holder).classed("chart-holder", true);

		// If width exists in options
		if (width) {
			// Apply formatted width attribute to chart
			holderElement.style.width = Tools.formatWidthHeightValues(width);
		}

		// If height exists in options
		if (height) {
			// Apply formatted height attribute to chart
			holderElement.style.height = Tools.formatWidthHeightValues(height);
		}
	}

	dispatchEvent(eventType: string, eventDetail?: object) {
		let newEvent;
		if (eventDetail) {
			newEvent = new CustomEvent(eventType, {
				detail: eventDetail
			});
		} else {
			newEvent = document.createEvent("Event");
			newEvent.initEvent(eventType, false, true);
		}

		this.events.dispatchEvent(newEvent);
	}

	setData(data: any) {
		const initialDraw = !this.innerWrap;
		const newDataIsAPromise = Promise.resolve(data) === data;

		// Dispatch the update event
		this.dispatchEvent("data-change");

		if (initialDraw || newDataIsAPromise) {
			this.chartOverlay.show();
		}

		// Hide current showing tooltip
		if (!initialDraw) {
			this.hideTooltip();
		}

		Promise.resolve(data).then(value => {
			// Dispatch the update event
			this.dispatchEvent("data-load");

			// Process data
			// this.data = this.dataProcessor(Tools.clone(value));
			this.data = Tools.clone(value);

			if (this.data.datasets && this.data.datasets.length > 0) {
				this.displayData = this.dataProcessor(Tools.clone(value));

				const keys = this.getKeysFromData();

				// Grab the old legend items, the keys from the current data
				// Compare the two, if there are any differences (additions/removals)
				// Completely remove the legend and render again
				const oldLegendItems = this.getActiveLegendItems();
				const keysArray = Object.keys(keys);
				const { missing: removedItems, added: newItems } = Tools.arrayDifferences(oldLegendItems, keysArray);

				// Update keys for legend use the latest data keys
				this.options.keys = keys;

				// Set the color scale based on the keys present in the data
				this.setColorScale();

				// Add patterns to page, set pattern scales
				if (this.options.accessibility) {
					this.setPatterns();
				}

				// Perform the draw or update chart
				if (initialDraw) {
					this.initialDraw();
				} else {
					if (removedItems.length > 0 || newItems.length > 0) {
						this.addOrUpdateLegend();
					}

					this.update();
				}
			} else {
				this.chartOverlay.show(Configuration.options.BASE.overlay.types.noData);
			}
		});
	}

	getKeysFromData() {
		const keys = {};

		if (this.getLegendType() === Configuration.legend.basedOn.LABELS) {
			// Build out the keys array of objects to represent the legend items
			this.displayData.labels.forEach(label => {
				keys[label] = Configuration.legend.items.status.ACTIVE;
			});
		} else {
			this.displayData.datasets.forEach(dataset => {
				keys[dataset.label] = Configuration.legend.items.status.ACTIVE;
			});
		}

		// Apply disabled legend items from previous data
		// That also are applicable to the new data
		const disabledLegendItems = this.getDisabledLegendItems();
		Object.keys(keys).forEach(key => {
			if (disabledLegendItems.indexOf(key) !== -1) {
				keys[key] = Configuration.legend.items.status.DISABLED;
			}
		});

		if (!this.fixedDataLabels) {
			this.fixedDataLabels = this.displayData.labels;
		} else {
			this.displayData.labels.forEach(element => {
				if (this.fixedDataLabels.indexOf(element) === -1) {
					this.fixedDataLabels.push(element);
				}
			});
		}

		return keys;
	}

	getLegendType() {
		const { datasets } = this.displayData;

		// TODO - Support the labels based legend for line chart
		if (datasets.length === 1 && datasets[0].backgroundColors && datasets[0].backgroundColors.length > 1) {
			return Configuration.legend.basedOn.LABELS;
		} else {
			return Configuration.legend.basedOn.SERIES;
		}
	}

	setPatterns() {
		// Accessibility & patterns
		this.patternsService = new PatternsService();
		this.patternsService.addPatternSVGs(this.displayData, this.colorScale, this.chartContainerID, this.getLegendType());

		const patternURLs = this.patternsService.getFillValues();
		Object.keys(patternURLs).forEach(datasetLabel => {
			this.patternScale[datasetLabel] = scaleOrdinal()
				.range(patternURLs[datasetLabel])
				.domain(this.getLegendItemKeys());
		});
	}

	setColorScale() {
		if (this.displayData.datasets[0].backgroundColors) {
			this.displayData.datasets.forEach(dataset => {
				this.colorScale[dataset.label] = scaleOrdinal().range(dataset.backgroundColors).domain(this.fixedDataLabels);
			});
		} else {
			const colors = Configuration.options.BASE.colors;
			this.displayData.datasets.forEach((dataset, i) => {
				this.colorScale[dataset.label] = scaleOrdinal().range([colors[i]]).domain(this.fixedDataLabels);
			});
		}
	}

	getFillColor(datasetLabel: any, label?: any, value?: any) {
		if (this.options.getFillColor && !this.options.accessibility) {
			return this.options.getFillColor(datasetLabel, label, value) || this.getFillScale()[datasetLabel](label);
		} else {
			return this.getFillScale()[datasetLabel](label);
		}
	}

	getStrokeColor(datasetLabel: any, label?: any, value?: any) {
		if (this.options.getStrokeColor) {
			return this.options.getStrokeColor(datasetLabel, label, value) || this.colorScale[datasetLabel](label);
		} else {
			return this.colorScale[datasetLabel](label);
		}
	}

	// TODO - Refactor
	getChartSize(container = this.container) {
		let ratio, marginForLegendTop;
		if (container.node().clientWidth > Configuration.charts.widthBreak) {
			ratio = Configuration.charts.magicRatio;
			marginForLegendTop = 0;
		} else {
			marginForLegendTop = Configuration.charts.marginForLegendTop;
			ratio = 1;
		}

		// Store computed actual size, to be considered for change if chart does not support axis
		const marginsToExclude = 0;
		const computedChartSize = {
			height: container.node().clientHeight - marginForLegendTop,
			width: (container.node().clientWidth - marginsToExclude) * ratio
		};

		// If chart is of type pie or donut, width and height should equal to the min of the width and height computed
		let maxSizePossible = Math.min(computedChartSize.height, computedChartSize.width);
		maxSizePossible = Math.max(maxSizePossible, Configuration.charts.minWidth);

		return {
			height: maxSizePossible,
			width: maxSizePossible
		};
	}

	/*
	 * removes the chart and any tooltips
	 */
	removeChart() {
		// this.holder.remove();
		this.holder.querySelector("div.chart-wrapper").parentNode.removeChild(this.holder.querySelector("div.chart-wrapper"));

	}

	setSVG(): any {
		const chartSize = this.getChartSize();
		this.svg = this.container.append("svg")
			.classed("chart-svg " + this.options.type, true);

		this.innerWrap = this.svg.append("g")
			.classed("inner-wrap", true);

		return this.svg;
	}

	// Default fallback when no data processing is needed
	dataProcessor(data: ChartData): any {
		return data;
	}

	/*
	 * called when the chart needs to be drawn initially
	 */
	initialDraw() {
		console.warn("You should implement your own `initialDraw()` function.");
	}

	updateChart() {
		console.warn("You should implement your own `updateChart()` function.");
	}

	resizeChart() {
		console.warn("You should implement your own `resizeChart()` function.");
	}

	update(value?: any) {
		console.warn("You should implement your own `update()` function.");
	}

	resizeWhenContainerChange() {
		let containerWidth = this.holder.clientWidth;
		let containerHeight = this.holder.clientHeight;

		const resizeObserver = new ResizeObserver((entries, observer) => {
			for (const entry of entries) {
				if (Math.abs(containerWidth - this.holder.clientWidth) > 1
					|| Math.abs(containerHeight - this.holder.clientHeight) > 1) {
					containerWidth = this.holder.clientWidth;
					containerHeight = this.holder.clientHeight;

					selectAll(".legend-tooltip").style("display", "none");

					this.hideTooltip();

					this.resizeChart();
				}
			}
		});

		resizeObserver.observe(this.holder);
	}

	setClickableLegend() {
		const self = this;
		const c = select(this.holder);

		if (this.getActiveLegendItems().length === 1) {
			c.selectAll(".legend-btn.active").classed("not-allowed", true);
		}

		// Add hover effect for legend item circles
		self.addLegendCircleHoverEffect();

		c.selectAll(".legend-btn").each(function() {
			select(this).classed("clickable", true);

			select(this).on("click", function() {
				c.selectAll(".chart-tooltip").remove();
				c.selectAll(".label-tooltip").remove();

				// Only apply legend filters if there are more than 1 active legend items
				const activeLegendItems = self.getActiveLegendItems();
				const legendButton = select(this);
				const enabling = !legendButton.classed("active");

				// If there are more than 1 active legend items & one is getting toggled on
				if (activeLegendItems.length > 1 || enabling) {
					self.updateLegend(this);
					self.applyLegendFilter(legendButton.select("text").text());
				}
				// If there are 2 active legend items & one is getting toggled off
				if (activeLegendItems.length === 2 && !enabling) {
					c.selectAll(".legend-btn.active").classed("not-allowed", true);
				}

				if (activeLegendItems.length === 1 && enabling) {
					c.selectAll(".legend-btn.not-allowed").classed("not-allowed", false);
				}
			});
		});
	}

	setChartIDContainer() {
		const parent = select(this.holder);
		let chartId, container;
		if (parent.select(".chart-wrapper").nodes().length > 0) {
			container = parent.select(".chart-wrapper");
			chartId = container.attr("chart-id");

			container.selectAll(".chart-svg").remove();
		} else {
			chartId = this.id;
			container = parent.append("div");
			container.attr("chart-id", chartId)
				.classed("chart-wrapper", true)
				.classed(`carbon--theme--${this.options.theme}`, true);
			if (container.select(".legend-wrapper").nodes().length === 0) {
				const legendWrapper = container.append("div")
					.attr("class", "legend-wrapper")
					.attr("role", "region")
					.attr("aria-label", `Chart ${chartId} Legend`);

				legendWrapper.append("ul")
					.attr("class", "legend");
			}
		}
		return {chartId, container};
	}

	resetOpacity() {
		const svg = selectAll("svg.chart-svg");
		svg.selectAll("rect")
			.attr("fill-opacity", Configuration.charts.resetOpacity.opacity)
			.attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
	}

	reduceOpacity(exception) {
		const exceptedElement = select(exception);
		const exceptedElementData = exceptedElement.datum() as any;
		select(exception).attr("fill-opacity", false);
		select(exception).attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
		select(exception).attr("fill", (d: any) => this.getFillColor(d.datasetLabel, exceptedElementData.label, exceptedElementData.value));
	}

	// ================================================================================
	// Legend
	// ================================================================================
	getLegendItems() {
		let legendItems = {};
		if (this.options.keys) {
			legendItems = this.options.keys;
		}

		return legendItems;
	}

	getLegendItemArray() {
		const legendItems = this.getLegendItems();
		const legendItemKeys = Object.keys(legendItems);

		return legendItemKeys.map(key => ({
			key,
			value: legendItems[key]
		}));
	}

	getLegendItemKeys() {
		return Object.keys(this.getLegendItems());
	}

	getDisabledLegendItems() {
		const legendItems = this.getLegendItems();
		const legendItemKeys = Object.keys(legendItems);

		return legendItemKeys.filter(itemKey => legendItems[itemKey] === Configuration.legend.items.status.DISABLED);
	}

	getActiveLegendItems() {
		const legendItems = this.getLegendItems();
		const legendItemKeys = Object.keys(legendItems);

		return legendItemKeys.filter(itemKey => legendItems[itemKey] === Configuration.legend.items.status.ACTIVE);
	}

	updateLegend(legend) {
		const thisLegend = select(legend);
		const circle = select(legend).select(".legend-circle");

		thisLegend.classed("active", !thisLegend.classed("active"));
		if (thisLegend.classed("active")) {
			circle.style("background-color", circle.style("border-color"))
				.style("border-color", Configuration.legend.active.borderColor)
				.style("border-style", Configuration.legend.active.borderStyle)
				.style("border-width", Configuration.legend.active.borderWidth);
		} else {
			circle.style("border-color", circle.style("background-color"))
				.style("background-color", Configuration.legend.inactive.backgroundColor)
				.style("border-style", Configuration.legend.inactive.borderStyle)
				.style("border-width", Configuration.legend.inactive.borderWidth);
		}
	}

	addLegend() {
		if (this.container.select(".legend-tooltip").nodes().length > 0) {
			return;
		}

		const legendItemsArray = this.getLegendItemArray();
		const legendItems = this.container.select(".legend")
			.attr("font-size", Configuration.legend.fontSize)
			.selectAll("li.legend-btn")
			.data(legendItemsArray, d => d.key);

		legendItems.exit()
			.remove();

		const legendEnter = legendItems.enter()
			.append("li")
			.attr("class", "legend-btn active");

		legendEnter.append("div")
			.attr("class", "legend-circle");

		legendEnter.append("text");

		legendEnter.selectAll("text")
			.merge(legendItems.selectAll("text"))
			.text(d => d.key);

		legendEnter.select("div")
			.merge(legendItems.selectAll("div"))
			.style("background-color", (d, i) => {
				if (this.getLegendType() === Configuration.legend.basedOn.LABELS && d.value === Configuration.legend.items.status.ACTIVE) {
					return this.getStrokeColor(this.displayData.datasets[0].label, d.key, d.value);
				} else if (d.value === Configuration.legend.items.status.ACTIVE) {
					return this.getStrokeColor(d.key);
				}

				return "white";
			});
	}

	positionLegend() {
		if (this.container.select(".legend-tooltip").nodes().length > 0
			&& this.container.select(".legend-tooltip").node().style.display === "block") { return; }

		this.container.selectAll(".legend-btn").style("display", "inline-block");
		const svgWidth = this.container.select("g.inner-wrap").node().getBBox().width;
		if (this.isLegendOnRight()) {
			this.container.selectAll(".expand-btn").remove();
			this.container.select(".legend-wrapper").style("height", 0);
			const containerWidth = this.container.node().clientWidth;
			const legendWidth = containerWidth - svgWidth;
			this.container.select(".legend").classed("right-legend", true)
				.style("width", legendWidth + "px");
		} else {
			this.container.select(".legend-wrapper").style("height", Configuration.legend.wrapperHeight);
		}

		if (this.hasLegendExpandBtn()) {
			this.container.select(".legend").classed("right-legend", false)
				.style("width", null);
			const btns = this.container.selectAll(".legend-btn").nodes();
			let btnsWidth = 0;
			btns.forEach(btn => {
				if ((btnsWidth + btn.clientWidth + Configuration.legend.widthTolerance) > svgWidth) {
					select(btn).style("display", "none");
				} else {
					btnsWidth += btn.clientWidth;
				}
			});
			if (this.container.select(".expand-btn").nodes().length === 0) {
				this.addTooltipOpenButtonToLegend();
			}
		}
	}

	addOrUpdateLegend() {
		this.addLegend();

		if (this.options.legendClickable) {
			this.setClickableLegend();
		}

		this.positionLegend();
	}

	addLegendCircleHoverEffect() {
		this.container.selectAll("li.legend-btn")
			.on("mouseover", function() {
				const circleRef = select(this).select("div.legend-circle");
				const color = (circleRef.node() as HTMLElement).style.backgroundColor.substring(4,
					(circleRef.node() as HTMLElement).style.backgroundColor.length - 1);

				circleRef.style(
					"box-shadow",
					`0 0 0 ${Configuration.legend.hoverShadowSize} rgba(${color}, ${Configuration.legend.hoverShadowTransparency})`
				);
			})
			.on("mouseout", function() {
				select(this).select("div.legend-circle").style("box-shadow", "none");
			});
	}

	hasLegendExpandBtn() {
		return (
			this.container.node().clientWidth < Configuration.charts.widthBreak ||
				this.container.node().clientHeight < this.container.select("ul.legend").node().clientHeight

			// && this.getLegendItems().length > Configuration.legend.countBreak
		);
	}

	isLegendOnRight() {
		return (
			this.container.node().clientWidth > Configuration.charts.widthBreak &&
				this.container.node().clientHeight > this.container.select("ul.legend").node().clientHeight

			// && this.getLegendItems().length > Configuration.legend.countBreak
		);
	}

	/**
	 *
	 * When a legend item is clicked, apply/remove the appropriate filter
	 * @param {string} changedLabel The label of the legend element the user clicked on
	 * @memberof PieChart
	 */
	applyLegendFilter(changedLabel: string) {
		const { ACTIVE, DISABLED } = Configuration.legend.items.status;
		const oldStatus = this.options.keys[changedLabel];

		this.options.keys[changedLabel] = (oldStatus === ACTIVE ? DISABLED : ACTIVE);

		this.update();
	}

	setClickableLegendInTooltip() {
		const self = this;
		const c = select(this.container);
		const tooltip = c.select(".legend-tooltip-content");
		tooltip.selectAll(".legend-btn").each(function() {
			select(this).on("click", function() {
				self.updateLegend(this);

				// TODO - setClickableLegendInTooltip()
			});
		});
	}

	// ================================================================================
	// Tooltips
	// ================================================================================
	addTooltipOpenButtonToLegend() {
		const self = this;
		const thisLegend = this.container.select(".legend");
		thisLegend.append("div")
			.attr("class", "expand-btn")
			.style("cursor", "pointer")
			.on("click", function() {
				self.openLegendTooltip(this);
			});
	}

	// TODO - Refactor
	openLegendTooltip(target) {
		selectAll(".legend-tooltip").remove();
		const mouseXPoint = mouse(this.container.node())[0];
		const windowXPoint = event.x;
		let tooltip;
		if (this.container.select(".legend-tooltip").nodes().length > 0) {
			tooltip = selectAll(".legend-tooltip").style("display", "block");
			tooltip.select("arrow").remove();
		} else {
			tooltip = this.container.append("div")
				.attr("class", "tooltip chart-tooltip legend-tooltip")
				.style("display", "block")
				.style("top", (mouse(this.container.node())[1] - Configuration.legend.margin.top) + "px");
			tooltip.append("p").text("Legend")
				.attr("class", "legend-tooltip-header");
			tooltip.append("ul")
				.attr("class", "legend-tooltip-content")
				.attr("font-size", Configuration.legend.fontSize);
			Tools.addCloseBtn(tooltip, "md", "white")
				.on("click", () => {
					selectAll(".legend-tooltip").style("display", "none");
				});

			const activeLegendItems = this.getActiveLegendItems();
			const legendContent = select(".legend-tooltip-content")
				.attr("font-size", Configuration.legend.fontSize)
				.selectAll("div")
				.data(this.getLegendItemArray(), (d: any) => d.key)
				.enter()
					.append("li")
					.classed("legend-btn", true)
					.classed("clickable", this.options.legendClickable)
					.classed("active", d => d.value === Configuration.legend.items.status.ACTIVE)
					.classed("not-allowed", d => activeLegendItems.length === 1 && d.value === Configuration.legend.items.status.ACTIVE)
					.on("click", (clickedItem, e) => {
						if (!this.options.legendClickable) {
							return;
						}

						const legendButton = select(event.currentTarget);
						const enabling = !legendButton.classed("active");

						if (activeLegendItems.length > 1 || enabling) {
							this.updateLegend(event.currentTarget);

							this.applyLegendFilter(clickedItem.key);

							this.container.selectAll("ul.legend li.legend-btn")
								.data(this.getLegendItemArray(), (d: any) => d.key)
								.classed("active", d => d.value === Configuration.legend.items.status.ACTIVE)
								.select("div.legend-circle")
								.style("background-color", (d, i) => {
									if (this.getLegendType() === Configuration.legend.basedOn.LABELS && d.value === Configuration.legend.items.status.ACTIVE) {
										return this.getStrokeColor(this.displayData.datasets[0].label, d.key, d.value);
									} else if (d.value === Configuration.legend.items.status.ACTIVE) {
										return this.getStrokeColor(d.key);
									}

									return "white";
								})
								.style("border-color", d => {
									if (this.getLegendType() === Configuration.legend.basedOn.LABELS) {
										return this.getStrokeColor(this.displayData.datasets[0].label, d.key, d.value);
									} else {
										return this.getStrokeColor(d.key);
									}
								})
								.style("border-style", Configuration.legend.inactive.borderStyle)
								.style("border-width", Configuration.legend.inactive.borderWidth);
						}

						// If there are 2 active legend items & one is getting toggled off
						if (activeLegendItems.length === 2 && !enabling) {
							this.container.selectAll(".legend-btn.active").classed("not-allowed", true);
						}

						if (activeLegendItems.length === 1 && enabling) {
							this.container.selectAll(".legend-btn.not-allowed").classed("not-allowed", false);
						}
					});

			legendContent.append("div")
				.attr("class", "legend-circle")
				.style("background-color", (d, i) => {
					if (this.getLegendType() === Configuration.legend.basedOn.LABELS && d.value === Configuration.legend.items.status.ACTIVE) {
						return this.getStrokeColor(this.displayData.datasets[0].label, d.key, d.value);
					} else if (d.value === Configuration.legend.items.status.ACTIVE) {
						return this.getStrokeColor(d.key);
					}

					return "white";
				})
				.style("border-color", d => {
					if (this.getLegendType() === Configuration.legend.basedOn.LABELS) {
						return this.getStrokeColor(this.displayData.datasets[0].label, d.key, d.value);
					} else {
						return this.getStrokeColor(d.key);
					}
				})
				.style("border-style", Configuration.legend.inactive.borderStyle)
				.style("border-width", Configuration.legend.inactive.borderWidth);

			legendContent.append("text")
				.text(d => d.key);
		}

		// Position the tooltip
		tooltip.classed("arrow-right", true);
		tooltip.append("div").attr("class", "arrow");
		tooltip.style("left", `${mouseXPoint - Configuration.tooltip.width - Configuration.tooltip.arrowWidth}px`);

		if (this.options.legendClickable) {
			this.addLegendCircleHoverEffect();
		}
	}

	showLabelTooltip(d, leftSide) {
		selectAll(".label-tooltip").remove();
		const mouseXPoint = mouse(this.holder as SVGSVGElement)[0] + Configuration.tooltip.arrowWidth;
		const tooltip = this.container.append("div")
			.attr("class", "tooltip label-tooltip")
			.style("top", mouse(this.holder as SVGSVGElement)[1] - Configuration.tooltip.magicTop1 + "px");
		Tools.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				this.resetOpacity();
				selectAll(".tooltip").remove();
			});
		tooltip.append("p").text(d);

		if (leftSide) {
			tooltip.classed("arrow-left", true)
					.style("left", mouseXPoint + "px")
					.append("div").attr("class", "arrow");
		} else {
			tooltip.classed("arrow-right", true);

			const xPoint = mouseXPoint - (tooltip.node() as Element).clientWidth - Configuration.tooltip.magicXPoint2;
			tooltip.style("left", xPoint + "px")
					.append("div").attr("class", "arrow");
		}
	}

	hideTooltip() {
		this.resetOpacity();

		this.tooltip.hide();
	}

	generateTooltipHTML(label, value) {
		if (this.options.tooltip.size === Configuration.tooltip.size.COMPACT) {
			return `<b>${label}:</b> ${value}<br/>`;
		} else {
			return `
				<p class='bignum'>${label}</p>
				<p>${value}</p>
			`;
		}
	}

	getTooltipHTML = d => {
		const formattedValue = this.options.tooltip.formatter ? this.options.tooltip.formatter(d.value) : d.value.toLocaleString("en");
		if (this.getLegendType() === Configuration.legend.basedOn.LABELS) {
			return this.generateTooltipHTML(d.label, formattedValue);
		}

		return this.generateTooltipHTML(d.datasetLabel, formattedValue);
	}

	showTooltip(d, clickedElement?: Element) {
		// Reset opacity of all elements in the chart
		this.resetOpacity();

		const { customHTML } = this.options.tooltip;
		let contentHTML;
		if (customHTML) {
			contentHTML = customHTML;
		} else {
			contentHTML = this.getTooltipHTML(d);
		}

		this.tooltip.show(contentHTML);
	}

	getFillScale() {
		return this.options.accessibility ? this.patternScale : this.colorScale;
	}

	getDefaultTransition(): Transition<any, any, any, any> {
		if (this.options.animations === false) {
			return this.getInstantTransition();
		}

		return transition().duration(Configuration.transitions.default.duration);
	}

	getInstantTransition(): Transition<any, any, any, any>  {
		return transition().duration(0);
	}

	// Used to determine whether to use a transition for updating fill attributes in charting elements
	// Will disable the transition if in accessibility mode
	getFillTransition(animate?: boolean): Transition<any, any, any, any>  {
		if (this.options.animations === false) {
			return this.getInstantTransition();
		}

		return transition().duration(animate === false ? 0 : Configuration.transitions.default.duration);
	}

	getBBox(selector: any) {
		return this.innerWrap.select(selector).node().getBBox();
	}
}
