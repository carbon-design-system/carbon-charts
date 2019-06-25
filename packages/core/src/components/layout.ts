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

	getPrefferedAndFixedSizeSum(): Number {
		const svg = this._parent;
		let sum = 0;

		svg
			.selectAll("svg")
			.filter((d: any) => {
				return d.data.growth && d.data.growth &&
					d.data.growth.x && d.data.growth.x === LayoutGrowth.PREFERRED;
			})
			.each(function(d: any) {
				sum += d.data.size;
			});

		return sum;
	}

	render() {
		console.log("rend 21341")
		const { width, height } = this._essentials.domUtils.getChartSize();

		// Get parent SVG to render inside of
		const svg = this._parent;

		// Pass children data to the hierarchy layout
		// And calculate sum of sizes
		const directionIsReversed = this.options.direction === LayoutDirection.ROW_REVERSE || this.options.direction === LayoutDirection.COLUMN_REVERSE;
		const hierarchyChildren = directionIsReversed ? this.children.reverse() : this.children;
		const root = hierarchy({
				children: hierarchyChildren
			})
			.sum((d: any) => d.size);

		// Grab the correct treemap tile function based on direction
		const tileType = (this.options.direction === LayoutDirection.ROW || this.options.direction === LayoutDirection.ROW_REVERSE)
			? treemapDice : treemapSlice;
		// Compute the position of all elements within the layout
		treemap()
			.tile(tileType)
			.size([width, height])
			.padding(0)
			(root);
console.log("root.leaves()", root.leaves())
		// TODORF - Remove
		const testColors = ["e41a1c", "377eb8", "4daf4a", "984ea3", "ff7f00", "ffff33", "a65628", "f781bf", "999999"]
		// Add new SVGs to the DOM for each layout child
		svg
			.selectAll("svg")
			.data(root.leaves())
			.enter()
			.append("svg")
				.attr("class", (d: any) => d.data.component.constructor.name.toLowerCase())
				.attr("x", (d: any) => d.x0)
				.attr("y", (d: any) => d.y0)
				.attr("width", (d: any) => d.x1 - d.x0)
				.attr("height", (d: any) => d.y1 - d.y0)
				.each(function(d: any) {
					const itemComponent = d.data.component;
					itemComponent._parent = select(this);

					if (d.data.growth && d.data.growth &&
						d.data.growth.x && d.data.growth.x === LayoutGrowth.PREFERRED) {
							console.log("ITEM render", d)
							itemComponent.render();
						}
				});

		const self = this;

		// Run through preferred x-items
		// And calculate relative size to parent SVG
		svg
			.selectAll("svg")
			.filter((d: any) => {
				return d.data.growth && d.data.growth &&
					d.data.growth.x && d.data.growth.x === LayoutGrowth.PREFERRED;
			})
			.each(function(d: any) {
				const matchingSVGWidth = self._essentials.domUtils.getSVGSize(select(this)).width;
				const svgWidth = (svg.node() as any).clientWidth;

				d.data.size = (matchingSVGWidth / svgWidth) * 100;
			});

		// Run through stretch x-items
		this.children
			.filter(child => {
				return child.growth && child.growth &&
					child.growth.x && child.growth.x === LayoutGrowth.STRETCH;
			})
			.forEach((child, i) => {
				child.size = 100 - (this.getPrefferedAndFixedSizeSum() as any);
			});

		console.log("this.children", this.children);

		// Pass children data to the hierarchy layout
		// And calculate sum of sizes
		const root2 = hierarchy({
			children: hierarchyChildren
		})
		.sum((d: any) => d.size)
		console.log("root2.leaves()", root2.leaves())

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
						console.log("item RENDER", d)
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
