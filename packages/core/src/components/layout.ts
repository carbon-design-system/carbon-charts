// Internal Imports
import { ChartComponent } from "./base-component";
import { LayoutOptions, LayoutDirection, LayoutGrowth, LayoutComponentChild } from "../interfaces/index";

// D3 Imports
import { select } from "d3-selection";
import { hierarchy, treemap, treemapSlice, treemapDice } from "d3-hierarchy";

export class LayoutComponent extends ChartComponent {
	children: Array<LayoutComponentChild>;
	options: LayoutOptions;

	constructor(children: Array<LayoutComponentChild>, options?: LayoutOptions) {
		super();

		this.options = options;
		this.children = children;

		// setInterval(() => {
		// 	this.render();
		// }, 500);
	}

	render() {
		console.log("rend")
		const { width, height } = this._essentials.domUtils.getChartSize();

		// Find chart SVG
		// TODORF - This should be an internal referefce
		const svg = this._parent;

		// Pass children data to the hierarchy layout
		// And calculate sum of sizes
		const reversedDirection = this.options.direction === LayoutDirection.ROW_REVERSE || this.options.direction === LayoutDirection.COLUMN_REVERSE;
		const root = hierarchy({
				children: reversedDirection ? this.children.reverse() : this.children
			})
			.sum((d: any) => d.size)

		const tileType = this.options.direction === LayoutDirection.ROW ? treemapDice : treemapSlice;
		// Compute the position of all elements within the layout
		treemap()
			.tile(tileType)
			.size([width, height])
			.padding(0)
			(root);

		// TODORF - Remove
		const testColors = ["e41a1c", "377eb8", "4daf4a", "984ea3", "ff7f00", "ffff33", "a65628", "f781bf", "999999"]
		// Add new SVGs to the DOM for each layout child
		svg
			.selectAll("svg")
			.data(root.leaves())
			.enter()
			.append("svg")
				.attr("x", (d: any) => d.x0)
				.attr("y", (d: any) => d.y0)
				.attr("width", (d: any) => d.x1 - d.x0)
				.attr("height", (d: any) => d.y1 - d.y0)
				.each(function(d: any) {
					const itemComponent = d.data.component;
					itemComponent._parent = select(this);

					if (d.data.growth && d.data.growth &&
						d.data.growth.x && d.data.growth.x === LayoutGrowth.PREFERRED) {
							itemComponent.render();
						}
				});

		const self = this;

		// Run through preferred x-items
		this.children
			.filter(child => {
				return child.growth && child.growth &&
					child.growth.x && child.growth.x === LayoutGrowth.PREFERRED;
			})
			.map((child, i) => {
				const matchingSVG = svg.selectAll("svg").nodes()[1];
				
				const matchingSVGWidth = self._essentials.domUtils.getSVGSize(select(matchingSVG)).width;
				const svgWidth = (svg.node() as any).clientWidth;

				child.size = (matchingSVGWidth / svgWidth) * 100;
			});

		svg
			.selectAll("svg")
			.attr("width", null)
			.attr("height", null)
			.each(function() {
				// console.log(self._essentials.domUtils.getSVGSize(select(this)));
			});

		// Run through stretch x-items
		this.children
		.filter(child => {
			return child.growth && child.growth &&
				child.growth.x && child.growth.x === LayoutGrowth.STRETCH;
		})
		.forEach((child, i) => {
			child.size = 100 - (this.children[1].size as any);
		});

		console.log(this.children);

		// Pass children data to the hierarchy layout
		// And calculate sum of sizes
		const root2 = hierarchy({
			children: this.children
		})
		.sum((d: any) => d.size)

		// Compute the position of all elements within the layout
		treemap()
			.tile(tileType)
			.size([width, height])
			.padding(0)
			(root2);

		// Add new SVGs to the DOM for each layout child
		svg
			.selectAll("svg")
			.data(root2.leaves())
			.attr("x", (d: any) => d.x0)
			.attr("y", (d: any) => d.y0)
			.attr("width", (d: any) => d.x1 - d.x0)
			.attr("height", (d: any) => d.y1 - d.y0)
			.each(function(d: any) {
				const itemComponent = d.data.component;
				itemComponent.setParent(select(this));

				if (d.data.growth && d.data.growth &&
					d.data.growth.x && d.data.growth.x === LayoutGrowth.STRETCH) {
						itemComponent.render();
					}
			})
			.append("rect")
				.attr("width", (d: any) => d.x1 - d.x0)
				.attr("height", (d: any) => d.y1 - d.y0)
				.style("stroke", (d, i) => testColors[i])
				.style("stroke-width", 2)
				.style("fill-opacity", 0.2)
				.style("fill", (d, i) => testColors[i])
				.lower();
		// svg
		// 	.selectAll("svg")
		// 	.data(root.leaves())
		// 		.attr("x", function (d: any) { return d.x0; })
		// 		.attr("y", function (d: any) { return d.y0; })
		// 		.attr("width", function (d: any) { return d.x1 - d.x0; })
		// 		.attr("height", function (d: any) { return d.y1 - d.y0; })
		// 		.append("rect")
		// 			.attr("width", function (d: any) { return d.x1 - d.x0; })
		// 			.attr("height", function (d: any) { return d.y1 - d.y0; })
		// 			.style("stroke", "black")
		// 			.style("stroke-width", 2)
		// 			.style("fill", (d, i) => color(i));

		// TODORF - Remove
		// svg
		// 	.selectAll("text")
		// 	.data(root.leaves())
		// 	.enter()
		// 	.append("text")
		// 	.attr("x", (d: any) => d.x0 + 5)    // +10 to adjust position (more right)
		// 	.attr("y", (d: any) => d.y0 + 20)    // +20 to adjust position (lower)
		// 	.text((d: any) => d.data.component.constructor.name)
		// 	.attr("font-size", "15px")
		// 	.attr("fill", "white");
	}

	setModel(newObj) {
		super.setModel(newObj);

		this.children.forEach(child => {
			child.component.setModel(newObj);
		});
	}

	setEssentials(newObj) {
		super.setEssentials(newObj);

		this.children.forEach(child => {
			child.component.setEssentials(newObj);
		});
	}
}
