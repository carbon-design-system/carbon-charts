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

		g.append("text")
		  .attr("fill", "#586464")
		  .attr("transform", "translate(-80,"+(options.chartSize.height/2)+")rotate(-90)")
		  .attr("dy", "0.71em")
		  .attr("text-anchor", "middle")
		  .attr("class", "y axis-label")
		  .text(options.yDomain.join(", "));
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
		  .attr("fill", "#586464")
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
			.attr("fill", "#959595");
		g.select(".domain")
			.attr("stroke", "#959595")
			.attr("fill", "#959595")
			.attr("stroke-width", 2);

		g.append("text")
		  .attr("class", "x axis-label")
		  .attr("text-anchor", "middle")
		  .attr("fill", "#586464")
		  .attr("transform", "translate("+ (options.chartSize.width/2) +","+ 80 +")")
		  .text(options.xDomain);
	}
}


