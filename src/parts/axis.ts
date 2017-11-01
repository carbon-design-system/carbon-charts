import * as d3 from "d3";
import { Tooltip } from "./tooltip";

export namespace Axis {
	const axisConstants = {
		maxWidthOfAxisLabel: 175,
		maxNumOfAxisLabelLetters: 60,
		maxTickLetNum: 28
	};

	export function drawYAxis(svg, yScale, options) {
		const yAxis = d3.axisLeft(yScale);
		setTickStyle(yAxis, options.yTicks);
		const g = svg.select(".y.axis")
			.attr("transform", `translate(0, 0)`)
			.call(yAxis);
		g.select(".domain").remove();
		if (options.yFormatter && options.yFormatter[options.yDomain[0]]) {
			addUnits(g.selectAll("text"), options.yFormatter[options.yDomain[0]]);
		}
		const tickWidth = getLargestTickWidth(g.selectAll(".tick")) + 25;
		const label = options.yDomain.join(", ");

		appendYAxisLabel(g, svg, -tickWidth, label, options, "y")
			.attr("class", "y axis-label");
	}

	export function drawY2Axis(svg, yScale, options) {
		svg.append("g")
			.attr("class", "y2 axis");
		const yAxis = d3.axisRight(yScale);
		setTickStyle(yAxis, options.y2Ticks);

		const g = svg.select(".y2.axis")
			.attr("transform", "translate(" + options.chartSize.width + ", 0)")
			.call(yAxis);
		g.select(".domain").remove();
		if (options.yFormatter && options.yFormatter[options.y2Domain[0]]) {
			addUnits(g.selectAll("text"), options.yFormatter[options.y2Domain[0]]);
		}
		const tickWidth = getLargestTickWidth(g.selectAll(".tick")) + 15;
		const label = options.y2Domain.join(", ");
		appendYAxisLabel(g, svg, tickWidth, label, options, "y2");
	}

	function appendYAxisLabel(g, svg, tickWidth, label, options, labelNum) {
		const yHeight = options.chartSize.height - svg.select(".x.axis").node().getBBox().height;
		const axisLabel = g.append("text")
			.attr("dy", "0.71em")
			.attr("class", labelNum + " axis-label")
			.attr("text-anchor", "middle")
			.text(label);
		if (axisLabel.node().getBBox().width > axisConstants.maxWidthOfAxisLabel) {
			const marginToTicks = labelNum === "y" ? -10 : 7;
			axisLabel.attr(
				"transform",
				"translate(" + (tickWidth + axisLabel.node().getBBox().height + marginToTicks) + "," + (yHeight / 2) + ")rotate(-90)"
			);
			const wrappedLabel = wrapLabel(axisLabel);
			wrappedLabel.on("click", d => {
				const leftAxis = labelNum === "y";
				Tooltip.showLabelTooltip(svg.node().parentNode.parentNode, label, leftAxis);
			});
		} else {
			axisLabel.attr("transform", "translate(" + tickWidth + "," + (yHeight / 2) + ")rotate(-90)");
		}
		return axisLabel;
	}

	export function drawXAxis(svg, xScale, options) {
		const xAxis = d3.axisBottom(xScale)
			.tickSizeInner(0)
			.tickSizeOuter(0);
		const g = svg.select(".x.axis").call(xAxis);
		g.selectAll("text")
			.attr("y", 9)
			.attr("x", -4)
			.attr("dy", ".35em")
			.attr("transform", "rotate(-45)")
			.style("text-anchor", "end")
			.call(text => wrapTick(text, svg));

		g.select(".domain")
			.attr("stroke", "#959595")
			.attr("fill", "#959595")
			.attr("stroke-width", 2);

		const tickHeight = getLargestTickHeight(g.selectAll(".tick")) + 16;
		g.append("text")
			.attr("class", "x axis-label")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (g.node().getBBox().width / 2) + "," + tickHeight + ")")
			.text(options.xDomain);
		const yHeight = options.chartSize.height - svg.select(".x.axis").node().getBBox().height;
		g.attr("transform", `translate(0, ${yHeight})`);
	}

	function wrapLabel(label) {
		const letNum = axisConstants.maxNumOfAxisLabelLetters;
		const text = label.text();
		const y = label.attr("y");
		label.text("");
		const tspan1 = label.append("tspan")
			.attr("x", 0).attr("y", y).attr("dx", "-1em").attr("dy", "-1em");
		const tspan2 = label.append("tspan")
			.attr("x", 0).attr("y", y).attr("dx", "-1em").attr("dy", "1em");
		if (text.length < axisConstants.maxNumOfAxisLabelLetters) {
			tspan1.text(text.substring(0, text.length / 2));
			tspan2.text(text.substring(text.length / 2 + 1, text.length));
		} else {
			tspan1.text(text.substring(0, letNum / 2));
			tspan2.text(text.substring(letNum / 2, letNum) + "...");
		}
		return label;
	}

	function wrapTick(ticks, svg) {
		const letNum = axisConstants.maxTickLetNum;
		ticks.each(function(t) {
			if (t.length > letNum / 2) {
				const tick = d3.select(this);
				const y = tick.attr("y");
				tick.text("");
				const tspan1 = tick.append("tspan")
					.attr("x", 0).attr("y", y).attr("dx", "-1em").attr("dy", "-0.5em");
				const tspan2 = tick.append("tspan")
					.attr("x", 0).attr("y", y).attr("dx", "-1em").attr("dy", "0.5em");
				if (t.length < letNum - 3) {
					tspan1.text(t.substring(0, t.length / 2));
					tspan2.text(t.substring(t.length / 2 + 1, t.length));
				} else {
					tspan1.text(t.substring(0, letNum / 2));
					tspan2.text(t.substring(letNum / 2, letNum - 3) + "...");
					tick.on("click", dd => {
						Tooltip.showLabelTooltip(svg.node().parentNode.parentNode, dd, true);
					});
				}
			}
		});
	}

	function addUnits(ticks, formatters) {
		ticks.nodes().forEach(t => {
			t.textContent = formatters(t.textContent);
		});
	}

	function getLargestTickHeight(ticks) {
		let largestHeight = 0;
		ticks.each(function() {
			const tickLength = this.getBBox().height;
			if (tickLength > largestHeight) {
				largestHeight = tickLength;
			}
		});
		return largestHeight;
	}

	function getLargestTickWidth(ticks) {
		let largestWidth = 0;
		ticks.each(function() {
			const tickLength = this.getBBox().width;
			if (tickLength > largestWidth) {
				largestWidth = tickLength;
			}
		});
		return largestWidth;
	}

	function setTickStyle(axis, tickNum) {
		axis.tickSizeInner(0)
			.tickSizeOuter(0)
			.tickPadding(10)
			.ticks(tickNum);
	}
}
