import * as d3 from 'd3'
import {Tooltip} from './tooltip.ts'

export namespace Axis {
	const axisConstants = {
		maxWidthOfAxisLabel: 175,
		maxNumOfAxisLabelLetters: 60,
		maxTickLetNum: 28
	}

  export function drawYAxis(svg, yScale, options, data) {
		let maxWidth = 0;
		const yAxis = d3.axisLeft(yScale)
		setTickStyle(yAxis, options.yTicks)
		let g = svg.select(".y.axis")
			.attr("transform", `translate(0, 0)`)
			.call(yAxis);
		g.select(".domain").remove();
		if (options.yFormatter && options.yFormatter[options.yDomain[0]]) {
			addUnits(g.selectAll('text'), options.yFormatter[options.yDomain[0]]);
		}
		const tickWidth = getLargestTickWidth(g.selectAll('.tick')) + 17;
		const label = options.yDomain.join(", ");

		let axisLabel = appendYAxisLabel(g, svg, -tickWidth, label, options, "y")
		  .attr("class", "y axis-label")
	}

  export function drawY2Axis(svg, yScale, options, data) {
  	svg.append("g")
  		.attr("class", "y2 axis")
		let maxWidth = 0;
		const yAxis = d3.axisRight(yScale)
		setTickStyle(yAxis, options.y2Ticks)

		let g = svg.select(".y2.axis")
			.attr("transform", "translate("+ options.chartSize.width + ", 0)")
			.call(yAxis);
		g.select(".domain").remove();
		if (options.yFormatter && options.yFormatter[options.y2Domain[0]]) {
			addUnits(g.selectAll('text'), options.yFormatter[options.y2Domain[0]]);
		}
		const tickWidth = getLargestTickWidth(g.selectAll('.tick')) + 12;
		const label = options.y2Domain.join(", ");
		let axisLabel = appendYAxisLabel(g, svg, tickWidth, label, options, "y2")
	}

	function appendYAxisLabel(g, svg, tickWidth, label, options, labelNum) {
		const axisLabel = g.append("text")
		  .attr("transform", "translate(" + tickWidth + ","+(options.chartSize.height/2)+")rotate(-90)")
		  .attr("dy", "0.71em")
		  .attr("class", labelNum + " axis-label")
		  .attr("text-anchor", "middle")
		  .text(label)
	  if (axisLabel.node().getBBox().width > axisConstants.maxWidthOfAxisLabel) {
			const wrappedLabel = wrapLabel(axisLabel);
			wrappedLabel.on('click', d => {
				const leftAxis = labelNum === "y"
				Tooltip.showLabelTooltip(svg.node().parentNode.parentNode, label, leftAxis)
			})
		}
		return axisLabel;
	}

  export function drawXAxis(svg, xScale, options, data) {
		let xAxis = d3.axisBottom(xScale)
			.tickSizeInner(0)
			.tickSizeOuter(0);
		let g = svg.select(".x.axis").call(xAxis);
		g.selectAll("text")
			.attr("y", 9)
			.attr("x", -4)
			.attr("dy", ".35em")
			.attr("transform", "rotate(-45)")
			.style("text-anchor", "end")
			.call(t => wrapTick(t, svg))

		g.select(".domain")
			.attr("stroke", "#959595")
			.attr("fill", "#959595")
			.attr("stroke-width", 2);

		const tickHeight = getLargestTickHeight(g.selectAll('.tick')) + 16;
		g.append("text")
		  .attr("class", "x axis-label")
		  .attr("text-anchor", "middle")
		  .attr("transform", "translate("+ (options.chartSize.width/2) +","+ tickHeight +")")
		  .text(options.xDomain);
	}

	function wrapLabel(label) {
		const letNum = axisConstants.maxNumOfAxisLabelLetters;
		const text = label.text();
		const y = label.attr("y");
		label.text('');
		const tspan1 = label.append('tspan')
			.attr('x', 0).attr('y', y).attr('dx', '-1em').attr('dy', '-1em');
		const tspan2 = label.append('tspan')
			.attr('x', 0).attr('y', y).attr('dx', '-1em').attr('dy', '1em');
		if (text.length < axisConstants.maxNumOfAxisLabelLetters) {
			tspan1.text(text.substring(0, text.length/2))
			tspan2.text(text.substring(text.length/2 + 1, text.length))
		} else {
			tspan1.text(text.substring(0, letNum/2))
			tspan2.text(text.substring(letNum/2, letNum) + '...')
		}
		return label;
	}

	function wrapTick(t, svg) {
		const letNum = axisConstants.maxTickLetNum;
		t.each(function(d) {
			if (d.length > letNum/2) {
				let tick = d3.select(this);
				const y = tick.attr("y");
				tick.text('');
				const tspan1 = tick.append('tspan')
					.attr('x', 0).attr('y', y).attr('dx', '-1em').attr('dy', '-0.5em');
				const tspan2 = tick.append('tspan')
					.attr('x', 0).attr('y', y).attr('dx', '-1em').attr('dy', '0.5em');
				if (d.length < letNum - 3) {
					tspan1.text(d.substring(0, d.length/2))
					tspan2.text(d.substring(d.length/2 + 1, d.length))
				} else {
					tspan1.text(d.substring(0, letNum/2))
					tspan2.text(d.substring(letNum/2, letNum - 3) + '...')
					tick.on('click', d => {
						Tooltip.showLabelTooltip(svg.node().parentNode.parentNode, d, true)
					})
				}
			}
		})
	}

	function addUnits(ticks, formatters) {
		ticks.nodes().forEach(t => {
			t.textContent = formatters(t.textContent);
		})
	}

	function getLargestTickHeight(ticks) {
		let largestHeight = 0;
		ticks.each(function(t) {
			const tickLength = this.getBBox().width;
			if (tickLength > largestHeight) {
				largestHeight = tickLength;
			}
		})
		return largestHeight;
	}

	function getLargestTickWidth(ticks) {
		let largestWidth = 0;
		ticks.each(function(t) {
			const tickLength = this.getBBox().width;
			if (tickLength > largestWidth) {
				largestWidth = tickLength;
			}
		})
		return largestWidth;
	}

	function setTickStyle(axis, tickNum) {
		axis.tickSizeInner(0)
			.tickSizeOuter(0)
			.tickPadding(10)
			.ticks(tickNum);
	}
}


