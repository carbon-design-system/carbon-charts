import * as d3 from 'd3'
import {Tooltip} from './tooltip.ts'

export namespace Axis {
  export function drawYAxis(svg, yScale, options, data) {
		let maxWidth = 0;
		const yAxis = d3.axisLeft(yScale)
			.tickSizeInner(0)
			.tickSizeOuter(0)
			.tickPadding(10)
			.ticks(options.yTicks);
		let g = svg.select(".y.axis")
			.attr("transform", `translate(0, 0)`)
			.call(yAxis);
		g.select(".domain").remove();
		if (options.yFormatter && options.yFormatter[options.yDomain[0]]) {
			addUnits(g.selectAll('text'), options.yFormatter[options.yDomain[0]]);
		}
		const tickWidth = getLargestTickWidth(g.selectAll('.tick')) + 17;
		const label = options.yDomain.join(", ");
		const textBox = g.append("text")
		  .attr("transform", "translate(-" + tickWidth + "," +(options.chartSize.height/2)+")rotate(-90)")
		  .attr("dy", "0.71em")
		  .attr("text-anchor", "middle")
		  .attr("class", "y axis-label")
		  .text(label);
		if (textBox.node().getBBox().width > 175) {
			const wrappedLabel = wrapLabel(textBox);
			wrappedLabel.on('click', d => {
				Tooltip.showLabelTooltip(svg.node().parentNode.parentNode, label, true)
			})
		}
	}

  export function drawY2Axis(svg, yScale, options, data) {
  	svg.append("g")
  		.attr("class", "y2 axis")
		let maxWidth = 0;
		const yAxis = d3.axisRight(yScale)
			.tickSizeInner(0)
			.tickSizeOuter(0)
			.tickPadding(10)
			.ticks(options.y2Ticks);

		let g = svg.select(".y2.axis")
			.attr("transform", "translate("+ options.chartSize.width + ", 0)")
			.call(yAxis);
		g.select(".domain").remove();
		if (options.yFormatter && options.yFormatter[options.y2Domain[0]]) {
			addUnits(g.selectAll('text'), options.yFormatter[options.y2Domain[0]]);
		}

		const tickWidth = getLargestTickWidth(g.selectAll('.tick')) + 12;
		const label = options.y2Domain.join(", ");
		const textBox = g.append("text")
		  .attr("transform", "translate(" + tickWidth + ","+(options.chartSize.height/2)+")rotate(-90)")
		  .attr("dy", "0.71em")
		  .attr("text-anchor", "middle")
		  .attr("class", "y2 axis-label")
		  .text(label)
	  if (textBox.node().getBBox().width > 175) {
			const wrappedLabel = wrapLabel(textBox);
			wrappedLabel.on('click', d => {
				Tooltip.showLabelTooltip(svg.node().parentNode.parentNode, label, false)
			})
		}
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

		g.append("text")
		  .attr("class", "x axis-label")
		  .attr("text-anchor", "middle")
		  .attr("transform", "translate("+ (options.chartSize.width/2) +","+ 80 +")")
		  .text(options.xDomain);
	}

	function wrapLabel(label) {
		const text = label.text();
		const y = label.attr("y");
		label.text('');
		const tspan1 = label.append('tspan')
			.attr('x', 0).attr('y', y).attr('dx', '-1em').attr('dy', '-1em');
		const tspan2 = label.append('tspan')
			.attr('x', 0).attr('y', y).attr('dx', '-1em').attr('dy', '1em');
		if (text.length < 60) {
			tspan1.text(text.substring(0, text.length/2))
			tspan2.text(text.substring(text.length/2 + 1, text.length))
		} else {
			tspan1.text(text.substring(0, 32))
			tspan2.text(text.substring(32, 60) + '...')
		}
		return label;
	}

	function wrapTick(t, svg) {
		t.each(function(d) {
			if (d.length > 14) {
				let tick = d3.select(this);
				const y = tick.attr("y");
				tick.text('');
				const tspan1 = tick.append('tspan')
					.attr('x', 0).attr('y', y).attr('dx', '-1em').attr('dy', '-0.5em');
				const tspan2 = tick.append('tspan')
					.attr('x', 0).attr('y', y).attr('dx', '-1em').attr('dy', '0.5em');
				if (d.length < 25) {
					tspan1.text(d.substring(0, d.length/2))
					tspan2.text(d.substring(d.length/2 + 1, d.length))
				} else {
					tspan1.text(d.substring(0, 14))
					tspan2.text(d.substring(14, 25) + '...')
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
}


