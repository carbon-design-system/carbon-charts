import * as d3 from "d3";
import { Tooltip } from "./tooltip";
import { Configuration } from "../configuration";

export namespace Axis {
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
		const tickWidth = getLargestTickWidth(g.selectAll(".tick")) + Configuration.axis.tick.widthAdditionY;
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
			.attr("transform", `translate(${options.chartSize.width}, 0)`)
			.call(yAxis);
		g.select(".domain").remove();
		if (options.yFormatter && options.yFormatter[options.y2Domain[0]]) {
			addUnits(g.selectAll("text"), options.yFormatter[options.y2Domain[0]]);
		}
		const tickWidth = getLargestTickWidth(g.selectAll(".tick")) + Configuration.axis.tick.widthAdditionY2;
		const label = options.y2Domain.join(", ");
		appendYAxisLabel(g, svg, tickWidth, label, options, "y2");
	}

	function appendYAxisLabel(g, svg, tickWidth, label, options, labelNum) {
		const yHeight = options.chartSize.height - svg.select(".x.axis").node().getBBox().height;
		const axisLabel = g.append("text")
			.attr("dy", Configuration.axis.magicDy1)
			.attr("class", `${labelNum} axis-label`)
			.attr("text-anchor", "middle")
			.text(label);
		if (axisLabel.node().getBBox().width > Configuration.axis.maxWidthOfAxisLabel) {
			const marginToTicks = labelNum === "y" ? -10 : 7;
			axisLabel.attr(
				"transform",
				`translate(${tickWidth + axisLabel.node().getBBox().height + marginToTicks}, ${yHeight / 2})rotate(${Configuration.axis.yAxisAngle})`
			);
			const wrappedLabel = wrapLabel(axisLabel);
			wrappedLabel.on("click", d => {
				const leftAxis = labelNum === "y";
				Tooltip.showLabelTooltip(svg.node().parentNode.parentNode, label, leftAxis);
			});
		} else {
			axisLabel.attr("transform", `translate(${tickWidth}, ${yHeight / 2})rotate(${Configuration.axis.yAxisAngle})`);
		}
		return axisLabel;
	}

	export function drawXAxis(svg, xScale, options) {
		const xAxis = d3.axisBottom(xScale)
			.tickSizeInner(0)
			.tickSizeOuter(0);
		const g = svg.select(".x.axis").call(xAxis);
		g.selectAll("text")
			.attr("y", Configuration.axis.magicY1)
			.attr("x", Configuration.axis.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.axis.xAxisAngle})`)
			.style("text-anchor", "end")
			.call(text => wrapTick(text, svg));

		g.select(".domain")
			.attr("stroke", Configuration.axis.domain.color)
			.attr("fill", Configuration.axis.domain.color)
			.attr("stroke-width", Configuration.axis.domain.strokeWidth);

		const tickHeight = getLargestTickHeight(g.selectAll(".tick")) + Configuration.axis.tick.heightAddition;
		g.append("text")
			.attr("class", "x axis-label")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (g.node().getBBox().width / 2) + "," + tickHeight + ")")
			.text(options.xDomain);
		const yHeight = options.chartSize.height - svg.select(".x.axis").node().getBBox().height;
		g.attr("transform", `translate(0, ${yHeight})`);
	}

	function wrapLabel(label) {
		const letNum = Configuration.axis.maxNumOfAxisLabelLetters;
		const text = label.text();
		const y = label.attr("y");
		label.text("");
		const tspan1 = label.append("tspan")
			.attr("x", 0).attr("y", y).attr("dx", Configuration.axis.dx).attr("dy", `-${Configuration.axis.label.dy}`);
		const tspan2 = label.append("tspan")
			.attr("x", 0).attr("y", y).attr("dx", Configuration.axis.dx).attr("dy", Configuration.axis.label.dy);
		if (text.length < Configuration.axis.maxNumOfAxisLabelLetters) {
			tspan1.text(text.substring(0, text.length / 2));
			tspan2.text(text.substring(text.length / 2 + 1, text.length));
		} else {
			tspan1.text(text.substring(0, letNum / 2));
			tspan2.text(text.substring(letNum / 2, letNum) + "...");
		}
		return label;
	}

	function wrapTick(ticks, svg) {
		const letNum = Configuration.axis.tick.maxLetNum;
		ticks.each(function(t) {
			if (t.length > letNum / 2) {
				const tick = d3.select(this);
				const y = tick.attr("y");
				tick.text("");
				const tspan1 = tick.append("tspan")
					.attr("x", 0).attr("y", y).attr("dx", Configuration.axis.dx).attr("dy", `-${Configuration.axis.tick.dy}`);
				const tspan2 = tick.append("tspan")
					.attr("x", 0).attr("y", y).attr("dx", Configuration.axis.dx).attr("dy", Configuration.axis.tick.dy);
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
