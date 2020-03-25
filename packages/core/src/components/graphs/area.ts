// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { Roles, ScaleTypes } from "../../interfaces";

// D3 Imports
import { area, stack } from "d3-shape";
import { Tools } from "../../tools";

export class Area extends Component {
	type = "area";

	areaGenerator: any;

	// TODORF - Remove these listeners in destroy()
	init() {
		// Highlight correct scatter on legend item hovers
		this.services.events.addEventListener("legend-item-onhover", e => {
			const { hoveredElement } = e.detail;

			this.parent
				.selectAll("g.areas")
				.transition(
					this.services.transitions.getTransition("legend-hover-area")
				)
				.attr("opacity", d => {
					if (d.key !== hoveredElement.datum()["key"]) {
						return Configuration.areas.opacity.unselected;
					}

					return Configuration.areas.opacity.selected;
				});
		});

		// Un-highlight areas on legend item mouseouts
		this.services.events.addEventListener("legend-item-onmouseout", e => {
			this.parent
				.selectAll("g.areas")
				.transition(
					this.services.transitions.getTransition(
						"legend-mouseout-area"
					)
				)
				.attr("opacity", Configuration.areas.opacity.selected);
		});
	}

	getStackedData() {
		const datasets = this.model.getDisplayData().datasets;
		const keys: string[] = datasets.map(d => d.label);

		const flattenedData: [] = datasets.flatMap(d =>
			d.data.map(datum => ({
				[d.label]: datum.value,
				xValue: datum.date
			}))
		);

		const preStackData: { [key: string]: number }[] = flattenedData.reduce(
			(acc, cur: any) => {
				const index = acc.findIndex(o =>
					Tools.compareNumeric(o.xValue, cur.xValue)
				);

				if (index > -1) {
					acc[index] = { ...acc[index], ...cur };
				} else {
					acc.push({ ...cur });
				}

				return acc;
			},
			[]
		);

		return stack().keys(keys)(preStackData);
	}

	render(animate = true) {
		const svg = this.getContainerSVG();

		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYScale = this.services.cartesianScales.getMainYScale();

		const domainAxisPosition = this.services.cartesianScales.getDomainAxisPosition();
		const domainScaleType = this.services.cartesianScales.getScaleTypeByPosition(
			domainAxisPosition
		);
		const isTimeSeries = domainScaleType === ScaleTypes.TIME;

		if (!isTimeSeries) {
			return;
		}

		const stackedData = this.getStackedData();

		const areaGroups = svg
			.selectAll("g.areas")
			.data(stackedData, d => d.key);

		// D3 area generator function
		this.areaGenerator = area()
			// @ts-ignore
			.x(d => mainXScale(d.data.xValue))
			.y0(d => {
				return mainYScale(d[0]);
			})
			.y1(d => mainYScale(d[1]))
			.curve(this.services.curves.getD3Curve());

		areaGroups
			.exit()
			.attr("opacity", 0)
			.remove();

		const enteringAreaGroups = areaGroups
			.enter()
			.append("g")
			.classed("areas", true);

		const self = this;

		const enteringPaths = enteringAreaGroups
			.append("path")
			.attr("opacity", 0);

		enteringPaths
			.merge(svg.selectAll("g.areas path"))
			.attr("stroke", d => self.model.getStrokeColor(d.key))
			.attr("fill", d => self.model.getFillColor(d.key))
			// .datum(function(d) {
			// 	this._datasetLabel = d.key;
			// 	return d.data;
			// })
			.attr("role", Roles.GRAPHICS_SYMBOL)
			.attr("aria-roledescription", "area")
			// .attr("aria-label", d => (
			// d.map(datum => datum.value || datum).join(",")
			// )
			.transition(
				this.services.transitions.getTransition(
					"area-update-enter",
					animate
				)
			)
			.attr("opacity", 1)
			.attr("class", "area")
			.attr("d", this.areaGenerator);
	}
}
