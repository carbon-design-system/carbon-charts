// Internal Imports
import { Component } from "../component";
import { LayoutDirection, LayoutGrowth, LayoutComponentChild, LayoutConfigs } from "../../interfaces/index";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";

// D3 Imports
import { select } from "d3-selection";
import { hierarchy, treemap, treemapSlice, treemapDice } from "d3-hierarchy";
import { ChartModel } from "src/model";


// TODORF - Remove
const testColors = ["e41a1c", "377eb8", "4daf4a", "984ea3", "ff7f00", "ffff33", "a65628", "f781bf", "999999"];
window["testColors"] = Tools.clone(testColors);
window["ccount"] = 0;

// TODO - What if there is no "growth" object?
export class LayoutComponent extends Component {
	// Give every layout component a distinct ID
	// so they don't interfere when querying elements
	static instanceCount = Math.floor(Math.random() * 99999999999);

	type = "layout";

	children: Array<LayoutComponentChild>;

	private _instanceCount: number;

	constructor(model: ChartModel, services: any, children: Array<LayoutComponentChild>, configs?: LayoutConfigs) {
		super(model, services, configs);

		this.configs = configs;
		this.children = children;

		this._instanceCount = LayoutComponent.instanceCount++;
	}

	init() {
		this.children.forEach(child => {
			child.components.forEach(component => {
				component.init();
			});
		});
	}

	getPrefferedAndFixedSizeSum(): number {
		const svg = this.parent;
		let sum = 0;

		svg.selectAll(`svg.layout-child-${this._instanceCount}`)
			.filter((d: any) => {
				const growth = Tools.getProperty(d, "data", "growth", "x");
				return growth === LayoutGrowth.PREFERRED || growth === LayoutGrowth.FIXED;
			})
			.each(function(d: any) {
				sum += d.data.size;
			});

		return sum;
	}

	getNumOfStretchChildren(): number {
		const svg = this.parent;

		return svg.selectAll(`svg.layout-child-${this._instanceCount}`)
			.filter((d: any) => {
				const growth = Tools.getProperty(d, "data", "growth", "x");
				return growth === LayoutGrowth.STRETCH;
			})
			.size();
	}

	render(animate = true) {
		// Get parent SVG to render inside of
		const svg = this.parent;
		const { width, height } = DOMUtils.getSVGElementSize(svg, { useAttrs: true });

		// Pass children data to the hierarchy layout
		// And calculate sum of sizes
		const directionIsReversed = (this.configs.direction === LayoutDirection.ROW_REVERSE) ||
			(this.configs.direction === LayoutDirection.COLUMN_REVERSE);
		const hierarchyChildren = directionIsReversed ? this.children.reverse() : this.children;
		let root = hierarchy({
			children: hierarchyChildren
		})
			.sum((d: any) => d.size);

		// Grab the correct treemap tile function based on direction
		const tileType = (this.configs.direction === LayoutDirection.ROW || this.configs.direction === LayoutDirection.ROW_REVERSE)
			? treemapDice : treemapSlice;

		// Compute the position of all elements within the layout
		treemap()
			.tile(tileType)
			.size([width, height])
			(root);

		// TODORF - Remove
		const horizontal = (this.configs.direction === LayoutDirection.ROW || this.configs.direction === LayoutDirection.ROW_REVERSE);

		// Add new SVGs to the DOM for each layout child
		const updatedSVGs = svg.selectAll(`svg.layout-child-${this._instanceCount}`)
			.data(root.leaves(), (d: any) => d.data.id);

		updatedSVGs
			.attr("width", (d: any) => d.x1 - d.x0)
			.attr("height", (d: any) => d.y1 - d.y0);

		const enteringSVGs = updatedSVGs
			.enter()
			.append("svg")
				.attr("class", (d: any) => `layout-child layout-child-${this._instanceCount} ${+new Date()} ${d.data.id}`)
				.attr("x", (d: any) => d.x0)
				.attr("y", (d: any) => d.y0);

		enteringSVGs.merge(svg.selectAll(`svg.layout-child-${this._instanceCount}`))
			.each(function(d: any) {
				// Set parent component for each child
				d.data.components.forEach(itemComponent => {
					itemComponent.setParent(select(this));

					// Render preffered & fixed items
					const growth = Tools.getProperty(d, "data", "growth", "x");
					if (growth === LayoutGrowth.PREFERRED || growth === LayoutGrowth.FIXED) {
						itemComponent.render(animate);
						console.log("RENDER", ++window["ccount"]);
					}
				});
			});

		svg.selectAll(`svg.layout-child-${this._instanceCount}`)
		.each(function(d: any) {
			// Calculate preffered children sizes after internal rendering
			const growth = Tools.getProperty(d, "data", "growth", "x");
			const matchingSVGDimensions = DOMUtils.getSVGElementSize(select(this), { useBBox: true });
			if (growth === LayoutGrowth.PREFERRED) {
				const matchingSVGWidth = horizontal ? matchingSVGDimensions.width : matchingSVGDimensions.height;
				const svgWidth = horizontal ? width : height;

				d.data.size = (matchingSVGWidth / svgWidth) * 100;
			}
		});

		updatedSVGs
			.exit()
			.remove();

		// Run through stretch x-items
		this.children
			.filter(child => {
				const growth = Tools.getProperty(child, "growth", "x");
				return growth === LayoutGrowth.STRETCH;
			})
			.forEach((child, i) => {
				child.size = (100 - (+this.getPrefferedAndFixedSizeSum())) / (+this.getNumOfStretchChildren());
			});

		setTimeout(() => {
			// Pass children data to the hierarchy layout
			// And calculate sum of sizes
			root = hierarchy({
				children: hierarchyChildren
			})
			.sum((d: any) => d.size);

			// Compute the position of all elements within the layout
			treemap()
				.tile(tileType)
				.size([width, height])
				.padding(0)
				(root);

			// Add new SVGs to the DOM for each layout child
			svg
				.selectAll(`svg.layout-child-${this._instanceCount}`)
				.data(root.leaves(), (d: any) => d.data.id)
				.attr("x", (d: any) => d.x0)
				.attr("y", (d: any) => d.y0)
				.attr("width", (d: any) => d.x1 - d.x0)
				.attr("height", (d: any) => d.y1 - d.y0)
				.each(function(d: any, i) {
					d.data.components.forEach(itemComponent => {
						const growth = Tools.getProperty(d, "data", "growth", "x");
						if (growth === LayoutGrowth.STRETCH) {
							itemComponent.render(animate);
							console.log("RENDER", ++window["ccount"]);
						}
					});

					// const bgRect = DOMUtils.appendOrSelect(select(this), "rect.bg");
					// bgRect
					// 	.classed("bg", true)
					// 	.attr("width", "100%")
					// 	.attr("height", "100%")
					// 	.lower();

					// if (!bgRect.attr("fill")) {
					// 	bgRect.attr("fill-opacity", 0.2)
					// 	.attr("fill", d => {
					// 		if (window["testColors"].length === 0) {
					// 			window["testColors"] = Tools.clone(testColors);
					// 		}

					// 		const col = window["testColors"].shift();

					// 		return `#${col}`;
					// 	})
					// }
				});
		}, 0);
	}

	// Pass on model to children as well
	setModel(newObj) {
		super.setModel(newObj);

		this.children.forEach(child => {
			child.components.forEach(component => component.setModel(newObj));
		});
	}

	// Pass on essentials to children as well
	setServices(newObj) {
		super.setServices(newObj);

		this.children.forEach(child => {
			child.components.map(component => component.setServices(newObj));
		});
	}

	destroy() {
		this.children.forEach(child => {
			child.components.forEach(component => {
				component.destroy();
			});
		});
	}
}
