import * as d3 from 'd3'
import {Charts} from '../index.ts'

export namespace Pattern {
	export function hashPattern(svg, color) {
		var pattern = svg.append("defs")
			.append("pattern")
				.attr("id", "hash" + color)
				.attr("width", "8")
				.attr("height", "8")
				.attr("patternUnits", "userSpaceOnUse")
				.attr("patternTransform", "rotate(60)")
			.append("rect")
				.attr("width", "4")
				.attr("height", "8")
				.attr("transform", "translate(0, 0)")
				.attr("fill", color);
	}

}
