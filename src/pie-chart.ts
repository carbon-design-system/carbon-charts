import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class PieChart extends BaseChart {
	constructor(holder: Element, options?: any, data?: any, type: string = "pie") {
		super(holder, options, data);

		this.options.type = type;

		if (this.options.containerResizable) {
			this.resizeWhenContainerChange();
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
			const keys: any = [];
			this.data = this.sortAndRepartitionData(value);
			this.data.map(entry => {
				keys.push(entry.label);
			});

			this.options.yDomain = keys;

			// Perform the draw or update chart
			if (initialDraw) {
				this.initialDraw();

				const overlayEl = <HTMLElement>this.holder.querySelector("div.chart-overlay");
				overlayEl.style.display = "none";
			} else {
				console.log("updateChart");

				// this.interpolateValues(value);
			}
		});
	}

	// Sort data by value (descending)
	// Cap number of slices at a specific number, and group the remaining items into the label "Other"
	sortAndRepartitionData(data: any) {
		const sortedData = data.sort((a, b) => b.value - a.value);
		const stopAt = Configuration.pie.sliceLimit;
		const rest = sortedData.slice(stopAt);
		const restAccumulatedValue = rest.reduce((accum, item) => accum + item.value, 0);

		return sortedData.slice(0, stopAt)
			.concat([{
				label: Configuration.pie.label.other,
				value: restAccumulatedValue,
				items: rest
			}])
			.map((item, i) => Object.assign(item, { index: i }));
	}

	initialDraw() {
		this.setSVG();

		this.addLegend();
		if (this.options.legendClickable) {
			this.setClickableLegend();
		}

		this.positionLegend();
		this.repositionSVG();
		this.draw();
		this.addDataPointEventListener();
	}

	// interpolateValues(newData: any) {
	// 	const oldData = this.data;

	// 	const pie = d3.pie()
	// 		.value(function(d: any) { return d.value; })
	// 		.sort(null);

	// 	const path = this.svg.datum(newData).selectAll("path")
	// 		.data(pie)
	// 		.enter().append("path")
	// 			.attr("d", arc)
	// 			.attr("fill", function(d, i) {
	// 				return this.options.colors[d.data.index];
	// 			}.bind(this))
	// 			.attr("stroke", function(d, i) {
	// 				return this.options.colors[d.data.index];
	// 			}.bind(this));
	// 			.each(function(d) { this._current = d; });

	// 	this.data = this.sortAndRepartitionData(value);
	// }

	draw() {
		const activeSeries = this.getActiveDataSeries();
		let keys: any = [];
		let dataList = this.data;

		if (activeSeries) {
			keys = activeSeries;

			dataList = dataList.filter(item => keys.indexOf(item.label) > -1);
		} else {
			dataList = dataList.map(entry => {
				keys.push(entry.label);
			});
		}

		this.options.yDomain = keys;

		const actualChartSize: any = this.getActualChartSize(this.container);
		const radius: number = Math.min(actualChartSize.width, actualChartSize.height) / 2;

		d3.select(this.holder).select("svg")
			.attr("width", actualChartSize.width)
			.attr("height", actualChartSize.height);

		this.svg
			.attr("class", "inner-wrap")
			.attr("transform", "translate(" + (actualChartSize.width / 2) +  "," + (actualChartSize.height / 2) + ")")
			.attr("preserveAspectRatio", "xMidYMid meet");

		// Compute the correct inner & outer radius
		const { pie: pieConfigs } = Configuration;
		const marginedRadius = radius - (pieConfigs.label.margin * (actualChartSize.width / pieConfigs.maxWidth));
		const arc = d3.arc()
				.innerRadius(this.options.type === "donut" ? (marginedRadius * (2 / 3)) : 0)
				.outerRadius(marginedRadius);

		const pie = d3.pie()
			.value(function(d: any) { return d.value; })
			.sort(null);

		// Draw the slices
		const path = this.svg.selectAll("path")
			.data(pie(dataList))
			.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", function(d, i) {
				return this.options.colors[d.data.index];
			}.bind(this))
			.attr("stroke", function(d, i) {
				return this.options.colors[d.data.index];
			}.bind(this));

		// Slices labels
		this.svg
			.selectAll("g.inner-wrap")
			.data(pie(dataList))
			.enter()
			.append("text")
			.attr("transform", function(d) {
				const theta = d.endAngle - d.startAngle;

				return "translate(" +
						(radius * Math.sin((theta / 2) + d.startAngle )) +
						"," +
						(-1 * radius * Math.cos((theta / 2) + d.startAngle )) + ")";
			})
			.attr("dy", Configuration.pie.label.dy)
			.style("text-anchor", function(d) {
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
			})
			.text(function(d) {
				return Tools.convertValueToPercentage(d.data.value, dataList);
			});
	}

	reduceOpacity(exception) {
		this.svg.selectAll("rect").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);
		this.svg.selectAll("path").attr("stroke-opacity", this.options.type !== "pie" ? Configuration.charts.reduceOpacity.opacity : 0);
		this.svg.selectAll("path").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);
		this.svg.selectAll("circle").attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
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

	setSVG() {
		const currentSVG = d3.select(this.holder).select("svg.chart-svg");
		if (currentSVG) {
			currentSVG.remove();
		}

		super.setSVG();
	}

	update() {
		this.setSVG();
		this.draw();
		this.addDataPointEventListener();
	}

	updateChart() {
		if (this.svg) {
			// update the root svg
			this.updateSVG();
			this.update();
			this.repositionSVG();
			this.positionLegend();

			// TODO - Finish this for optimized text resizing logic
			// const actualChartSize: any = this.getActualChartSize(this.container)
			// 	, dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height)
			// 	, radius: number = dimensionToUseForScale / 2

			// const { pie: pieConfigs } = Configuration
			// 	, scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth

			// this.svg
			// .selectAll('text')
			// .attr("dy", function(d) {
			// 	if (d) {
			// 		const QUADRANT = Math.PI / 4
			// 			, rads = ((d.endAngle - d.startAngle) / 2) + d.startAngle
			// 			, theta = rads * 180 / Math.PI
			// 		if (d.data.label === '2V2N-9KYPM version 1') {
			// 			console.log(theta / QUADRANT)
			// 		}
			// 		if (rads === 1) {
			// 			return 0.1 + "em"
			// 		} else {
			// 			return 0.9 + "em"
			// 		}
			// 	} else {
			// 		return null
			// 	}
			// });
		}
	}
}
