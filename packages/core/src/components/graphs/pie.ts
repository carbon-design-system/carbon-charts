// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

// D3 Imports
import { select } from "d3-selection";
import { arc, pie } from "d3-shape";

export class Pie extends Component {
	type = "pie";

	arc: any;
	hoverArc: any;
	pie: any;
	path: any;

	init() {

	}

	getDataList() {
		const displayData = this.model.getDisplayData();
		return displayData.datasets[0].data.map((datum, i) => ({
			label: displayData.labels[i],
			value: datum,
		}));
	}

	render(animate = true) {
		const svg = this.getContainerSVG();
		const options = this.model.getOptions();

		const dataList = this.getDataList();

		// Compute the correct inner & outer radius
		const radius = this.computeRadius();
		this.arc = arc()
			.innerRadius(2)
			.outerRadius(radius);

		this.hoverArc = arc()
			.innerRadius(2)
			.outerRadius(radius + 3);

		this.pie = pie()
			.value((d: any) => d.value)
			.sort(function(a: any, b: any) {
				return b.value - a.value;
			})
			.padAngle(0.007);

		// Draw the slices
		this.path = svg.selectAll("path.slice")
			.data(this.pie(dataList))
			.enter()
			.append("path")
			.classed("slice", true)
			.attr("d", this.arc)
			.attr("fill", d => {
				const datasetLabel = this.model.getDisplayData().datasets[0].label;
				return this.model.getFillScale()[datasetLabel](d.data.label);
			})
			.each(function (d) { this._current = d; });

		// Draw the slice labels
		const self = this;
		svg.selectAll("text.chart-label")
			.data(this.pie(dataList), (d: any) => d.data.label)
			.enter()
			.append("text")
			.classed("chart-label", true)
			// .attr("dy", Configuration.pie.label.dy)
			.style("text-anchor", "middle")
			.text(d => self.getSliceLabelText(d.data.value, dataList))
			.attr("transform", function (d) { return self.getChartLabelTranslateString(this, d, radius, dataList.length); });

		// Position Pie
		const { width, height } = DOMUtils.getSVGElementSize(svg, { useBBox: true });
		svg.attr("transform", `translate(${width / 2}, ${height / 2 + 5})`);

		this.addEventListeners();
	}

	addEventListeners() {
		const self = this;
		this.parent.selectAll("path.slice")
			.on("mouseover", function() {
				const hoveredElement = select(this);

				hoveredElement.classed("hovered", true)
					.transition(self.services.transitions.getTransition("pie_slice_hover"))
					.attr("d", self.hoverArc);

				// Dispatch mouse event
				self.services.events.dispatchEvent("pie-slice-mouseover", hoveredElement);

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement
				});
			})
			.on("mouseout", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false)
					.transition(self.services.transitions.getTransition("pie_slice_hover"))
					.attr("d", self.arc);

				// Dispatch mouse event
				self.services.events.dispatchEvent("pie-slice-mouseout", hoveredElement);

				// Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", {
					hoveredElement
				});
			})
			.on("click", d => self.services.events.dispatchEvent("pie-slice-click", d));
	}

	// Helper functions
	protected computeRadius() {
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
		const radius: number = Math.min(width, height) / 2;
		return radius - 15;
	}

	/**
	 * Returns the string for the slice labels.
	 * @param datapoint data value to get the percentage
	 * @param dataset dataset containing all data values
	 */
	protected getSliceLabelText(datapoint, dataset) {
		return Tools.convertValueToPercentage(datapoint, dataset) + "%";
	}

	/**
	 * Returns the translate string for the calculated position of the slice labels.
	 * @param element the text label element
	 * @param d the d3 slice object
	 * @param radius the radius of the pie or donut chart
	 * @param totalSlices total number of slices rendered
	 */
	protected getChartLabelTranslateString(element, d, radius, totalSlices?) {
		const textLength = element.getComputedTextLength();
		const textOffsetX = textLength / 2;
		const textOffsetY = parseFloat(getComputedStyle(element).fontSize) / 2;

		const marginedRadius = radius + 2;
		// const marginedRadius = radius + Configuration.pie.label.margin;

		const theta = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
		const sliceAngleDeg = (d.endAngle - d.startAngle) * (180 / Math.PI);

		const xPosition = (textOffsetX + marginedRadius) * Math.sin(theta);
		const yPosition = (textOffsetY + marginedRadius) * -Math.cos(theta);

		if (!totalSlices) {
			return `translate(${xPosition}, ${yPosition})`;
		}
		// // check if last 2 slices (or just last) are < the threshold
		// if (d.index === totalSlices - 1) {
		// 	if (sliceAngleDeg < Configuration.pie.callout.sliceDegreeThreshold) {
		// 		// start at the same location as a non-called out label
		// 		const startPos = {
		// 			x: xPosition,
		// 			y: yPosition + textOffsetY
		// 		};

		// 		// end position for the callout line
		// 		const endPos = {
		// 			x: xPosition + Configuration.pie.callout.calloutOffsetX,
		// 			y: yPosition - Configuration.pie.callout.calloutOffsetY + textOffsetY
		// 		};

		// 		// last slice always gets callout to the right side
		// 		this.drawCallout(startPos, endPos, Configuration.pie.callout.direction.RIGHT);
		// 		return `translate(${endPos.x + Configuration.pie.callout.calloutTextMargin + textOffsetX},
		// 			${yPosition - Configuration.pie.callout.calloutOffsetY})`;
		// 	}
		// 	// remove any unneeded callout for last slice
		// 	this.removeCallout(Configuration.pie.callout.direction.RIGHT);
		// }
		// if (d.index === totalSlices - 2) {
		// 	if (sliceAngleDeg < Configuration.pie.callout.sliceDegreeThreshold) {
		// 		// start position for the callout line
		// 		const startPos = {
		// 			x: xPosition,
		// 			y: yPosition + textOffsetY
		// 		};

		// 		// end position for the callout line should be bottom aligned to the title
		// 		const endPos = {
		// 			x: xPosition - Configuration.pie.callout.calloutOffsetX,
		// 			y: yPosition - Configuration.pie.callout.calloutOffsetY + textOffsetY
		// 		};

		// 		this.drawCallout(startPos, endPos, Configuration.pie.callout.direction.LEFT);
		// 		return `translate(${endPos.x - textOffsetX - Configuration.pie.callout.calloutTextMargin},
		// 			${yPosition - Configuration.pie.callout.calloutOffsetY})`;
		// 	}
		// 	// remove any leftover unneeded callout
		// 	this.removeCallout(Configuration.pie.callout.direction.LEFT);
		// }
		return `translate(${xPosition}, ${yPosition})`;
	}
}
