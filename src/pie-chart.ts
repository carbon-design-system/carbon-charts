import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class PieChart extends BaseChart {
	constructor(holder: Element, options?: any, data?: any, type: string = "pie") {
		super(holder, options, data);

		this.options.type = type;
		const keys: any = [];

		// Check for duplicate keys
		const duplicates = Tools.duplicateKeysInData(this.data);
		if (duplicates.length > 0) {
			console.error(`${Tools.capitalizeFirstLetter(this.options.type)} Chart - You have duplicate keys`, duplicates);
		}
		
		// Process data, and generate keys for legend
		this.sortAndRepartitionData();
		this.data.map((entry) => {
			keys.push(entry.label)
		});

		this.options.yDomain = keys;

		if (this.options.containerResizable) {
			this.resizeWhenContainerChange();
		}
	}

	// Sort data by value (descending)
	// Cap number of slices at a specific number, and group the remaining items into the label "Other"
	sortAndRepartitionData() {
		const sortedData = this.data.sort((a, b) => b.value - a.value)
			, rest = sortedData.slice(7)
			, restAccumulatedValue = rest.reduce((accum, item) => accum + item.value, 0)
		
		this.data = sortedData.slice(0, 7)
			.concat([{
				label: "Other",
				value: restAccumulatedValue
			}])
			.map((item, i) => Object.assign(item, { index: i }));
	}

	drawChart(data?: any) {
		if (data) {
			this.data = data;
		}

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

	draw() {
		const activeSeries = this.getActiveDataSeries()
		let keys: any = []
		  , dataList = this.data;
		
		if (activeSeries) {
			keys = activeSeries;

			dataList = dataList.filter(item => keys.indexOf(item.label) > -1)
		} else {
			dataList = dataList.map((entry) => {
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

		const arc = d3.arc()
			.innerRadius(this.options.type === 'donut' ? (radius * (2/3)) : 0)
			.outerRadius(radius);

		const pie = d3.pie()
			.value(function(d: any) { return d.value; })
			.sort(null);

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
				this.resetOpacity();
				d3.selectAll(".tooltip").remove();
			});

		const dVal = d.value.toLocaleString();
		const tooltipHTML = "<p class='bignum'>" + dVal + "</p><p>" + d.data.label + "</p>";
		tooltip.append("div").attr("class", "text-box").html(tooltipHTML);
		if (d3.mouse(this.holder as SVGSVGElement)[0] + (tooltip.node() as Element).clientWidth > this.holder.clientWidth) {
			tooltip.style(
				"left",
				d3.mouse(this.holder as SVGSVGElement)[0] - (tooltip.node() as Element).clientWidth - Configuration.tooltip.magicLeft1 + "px"
			);
			tooltip.append("div").attr("class", "arrow arrow-right");
		} else {
			tooltip.style("left", d3.mouse(this.holder as SVGSVGElement)[0] + Configuration.tooltip.magicLeft2 + "px");
			tooltip.append("div").attr("class", "arrow arrow-left");
		}
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
				d3.select(this)
					.attr("stroke", "");
			});
	}

	setSVG() {
		const currentSVG = d3.select(this.holder).select('svg.chart-svg')
		if (currentSVG) {
			currentSVG.remove();
		}

		super.setSVG();
	}

	update(data?: any) {
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
		}
	}
}
