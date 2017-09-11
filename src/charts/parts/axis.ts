import * as d3 from 'd3'

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

		let label = options.yDomain.map(val => val.length > 15 ? val.substring(0, 15) + '...' : val).join(", ")
		console.log(label.length)
		if (label.length > 70) {
			label
		}
		g.append("text")
		  .attr("transform", "translate(-80,"+(options.chartSize.height/2)+")rotate(-90)")
		  .attr("dy", "0.71em")
		  .attr("text-anchor", "middle")
		  .attr("class", "y axis-label")
		  .text(label);
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

		g.append("text")
		  .attr("transform", "translate(80,"+(options.chartSize.height/2)+")rotate(90)")
		  .attr("dy", "0.71em")
		  .attr("text-anchor", "middle")
		  .attr("class", "y2 axis-label")
		  .text(options.y2Domain.join(", "));
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
			.call(wrapTick)
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

	function wrapTick(t) {
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
				}
			}
		})
	}
}


