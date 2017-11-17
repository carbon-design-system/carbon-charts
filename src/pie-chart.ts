import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class PieChart extends BaseChart {
	color: any;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "pie";
		let keys: any = [];
		this.data.map((entry) => keys.push(entry.label));
		this.options.yDomain = keys;

		this.color = d3.scaleOrdinal()
			.range(this.options.colors);
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
		if (this.options.containerResizable) {
			this.setResizeWhenContainerChange();
		}
	}

	draw(activeSeries = this.getActiveDataSeries()) {
		let keys: any = [];
		let dataList = this.data;
		dataList.map((entry) => {
			console.log(entry.label);
			keys.push(entry.label);
		});
		this.options.yDomain = keys;
		console.log(this.options);

		const actualChartSize: any = this.getActualChartSize(this.container);
		const radius: number = Math.min(actualChartSize.width, actualChartSize.height) / 2;

		d3.select(this.holder).select("svg")
			.attr("width", actualChartSize.width)
			.attr("height", actualChartSize.height);

		this.svg
			.attr("transform", "translate(" + (actualChartSize.width / 2) +  "," + (actualChartSize.height / 2) + ")");

		const arc = d3.arc()
			.innerRadius(0)
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
				return this.color(d.data.label);
			}.bind(this))
			.attr("stroke", function(d, i) {
				return this.color(d.data.label);
			}.bind(this));
			// .datum(function (d, i) { return Object.assign(d, {color: color(d.data.label)}); });
	}

	reduceOpacity(exception) {
		this.svg.selectAll("rect").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);
		this.svg.selectAll("path").attr("stroke-opacity", this.options.type !== "pie" ? Configuration.charts.reduceOpacity.opacity : 0);
		this.svg.selectAll("path").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);
		this.svg.selectAll("circle").attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
		d3.select(exception).attr("fill-opacity", false);
		if (this.options.type !== "pie") {
			d3.select(exception.parentNode).select("path").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		}
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
			.style("border-color", this.color(d.data.label));
		Tools.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				this.resetOpacity();
				d3.selectAll(".tooltip").remove();
			});

		const dVal = d.value.toLocaleString();
		let tooltipHTML = "<p class='bignum'>" + dVal + "</p><p>" + d.data.label + "</p>";
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
			self.svg.append("circle").attr("class", Configuration.lines.mouseover.class)
				.attr("r", Configuration.lines.mouseover.r)
				.attr("fill", Configuration.lines.mouseover.fill)
				.attr("stroke-width", Configuration.lines.mouseover.strokeWidth)
				.attr("stroke", d.color)
				.attr("stroke-opacity", Configuration.lines.mouseover.strokeOpacity);
				// .attr("cx", this.cx.baseVal.value)
				// .attr("cy", this.cy.baseVal.value);
		})
		.on("mouseout", function() {
			self.svg.selectAll(`.${Configuration.lines.mouseover.class}`).remove();
		});
	}
}
