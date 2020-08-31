// Internal Imports
import { Service } from "../service";
import { DOMUtils } from "../";

export class GradientUtils extends Service {
	static appendLinearGradient(svg, id, x1, x2, y1, y2, stopAttrList) {
		const lg = svg
			.append("defs")
			.append("linearGradient")
			.attr("id", id)
			.attr("x1", x1)
			.attr("x2", x2)
			.attr("y1", y1)
			.attr("y2", y2);
		for (const stopAttr of stopAttrList) {
			console.log("!!! stopAttr: ", stopAttr);
			lg.append("stop")
				.attr("offset", stopAttr.offset)
				.style("stop-color", stopAttr.color)
				.style("stop-opacity", stopAttr.opacity);
		}
		/*
		lg.append("stop")
			.attr("offset", "0%")
			.style("stop-color", "red")
			.style("stop-opacity", 1)

		lg.append("stop")
			.attr("offset", "100%")
			.style("stop-color", "red")
			.style("stop-opacity", 0)
		*/
	}

	static constainNegativeAndPositiveDomainValue(domain) {
		if(domain[0] < 0 && domain[1] > 0)
		return true;
	}

	static getOffsetRatio(dataset) {
		console.log("!!! dataset: ", dataset);
		const domain = [Math.min.apply(Math, dataset.map(function(o) { return o.value; })), Math.max.apply(Math, dataset.map(function(o) { return o.value; }))]
		console.log("!!! domain: ", domain);
		const offsetRatio = [
			(Math.abs(domain[1])*100/Math.abs(domain[0]- domain[1])).toFixed(2)+"%",
			((Math.abs(domain[0]))*100/Math.abs(domain[0]- domain[1])-15).toFixed(2)+"%",
		]
		return offsetRatio;
	}



}
