// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";

// D3 Imports
import { axisBottom, axisLeft } from "d3-axis";
import { mouse } from "d3-selection";

export class Grid extends Component {
	type = "grid";

	backdrop: any;
	gridlineThreshold: number;

	render() {
		// Draw the backdrop
		this.drawBackdrop();
		DOMUtils.appendOrSelect(this.backdrop, "g.x.grid");
		DOMUtils.appendOrSelect(this.backdrop, "g.y.grid");

		this.drawXGrid();
		this.drawYGrid();

		if (Tools.getProperty(this.model.getOptions(), "tooltip", "gridline")) {
			this.addGridEventListeners();
		}
	}

	drawXGrid() {
		const svg = this.parent;

		const height = this.backdrop.attr("height");

		const mainXScale = this.services.axes.getMainXAxis().getScale();
		const xGrid = axisBottom(mainXScale)
			.tickSizeInner(-height)
			.tickSizeOuter(0);

		// Determine number of ticks
		const numberOfTicks = Tools.getProperty(this.model.getOptions(), "grid", "x", "numberOfTicks") || Configuration.grid.x.numberOfTicks;
		xGrid.ticks(numberOfTicks);

		const g = svg.select(".x.grid")
			.attr("transform", `translate(${-this.backdrop.attr("x")}, ${height})`)
			.call(xGrid);

		this.cleanGrid(g);
	}

	drawYGrid() {
		const svg = this.parent;
		const width = this.backdrop.attr("width");

		const mainXScale = this.services.axes.getMainXAxis().getScale();
		const yGrid = axisLeft(mainXScale)
			.tickSizeInner(-width)
			.tickSizeOuter(0);

		// Determine number of ticks
		const numberOfTicks = Tools.getProperty(this.model.getOptions(), "grid", "y", "numberOfTicks") || Configuration.grid.y.numberOfTicks;
		yGrid.ticks(numberOfTicks);

		const g = svg.select(".y.grid")
			.attr("transform", `translate(0, ${-this.backdrop.attr("y")})`)
			.call(yGrid);

		this.cleanGrid(g);
	}

	/**
	 * Sets the threshold for the gridline tooltips. On resize, the threshold needs to be
	 * updated.
	 */
	setGridlineThreshold() {
		// use the space between axis grid ticks to adjust the threshold for the tooltips
		const svg = this.parent;

		const gridlinesX = svg.selectAll(".x.grid .tick")
		.filter((d, i) => { return i === 0 || i === 1; })._groups[0];

		const line1 = gridlinesX[0];
		const line2 = gridlinesX[1];

		// use this to get the 'step' between chart gridlines
		const lineSpacing = Math.abs(+Tools.getTranslationValues(line1).tx - +Tools.getTranslationValues(line2).tx);

		this.gridlineThreshold = lineSpacing * Configuration.tooltip.axisTooltip.axisThreshold;
	}

	/**
	 * Returns the active gridlines based on the gridline threshold and mouse position.
	 * @param position mouse positon
	 */
	getActiveGridlines(position) {
		const self = this;
		const svg = this.parent;

		const gridlinesX = svg.selectAll(".x.grid .tick")
		.filter(function() {
			const translations = Tools.getTranslationValues(this);

			// threshold for when to display a gridline tooltip
			const bounds = {
				min: +translations.tx - +self.gridlineThreshold,
				max: +translations.tx + +self.gridlineThreshold };

			return bounds.min <= position[0] && position[0] <= bounds.max;
		});

		return gridlinesX;
	}

	/**
	 * Adds the listener on the X grid to trigger multiple point tooltips along the x axis.
	 */
	addGridEventListeners() {
		const self = this;
		const svg = this.parent;
		const grid = DOMUtils.appendOrSelect(svg, "rect.chart-grid-backdrop");


		// move this to on mousemove so it can calculate the threshold between grids of unequal distance
		this.setGridlineThreshold();

		grid
		.on("mousemove", function() {
			const chartContainer = self.services.domUtils.getMainSVG();
			const pos = mouse(chartContainer);

			const allgridlines = svg.selectAll(".x.grid .tick");

			// remove the styling on the lines
			allgridlines.classed("active", false);


			const activeGridlines = self.getActiveGridlines(pos);
			if (activeGridlines.empty()) {
				return;
			}

			// set active class to control dasharray and theme colors
			activeGridlines
			.classed("active", true);

			// get the items that should be highlighted
			let highlightItems;


			activeGridlines.each(function(d) {
				highlightItems = self.model.getDataWithDomain(d);
			});

			self.services.events.dispatchEvent("show-tooltip", {
				multidata: highlightItems
			});
		})
		.on("mouseout", function() {
			svg.selectAll(".x.grid .tick")
			.classed("active", false);
		});
	}

	drawBackdrop() {
		const svg = this.parent;

		const mainXScale = this.services.axes.getMainXAxis().getScale();
		const mainYScale = this.services.axes.getMainYAxis().getScale();

		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		// Get height from the grid
		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-grid-backdrop");
		const backdropRect = DOMUtils.appendOrSelect(this.backdrop, "rect.chart-grid-backdrop");

		this.backdrop.merge(backdropRect)
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart)
			.lower();

		backdropRect.attr("width", "100%")
			.attr("height", "100%");
	}

	cleanGrid(g) {
		const options = this.model.getOptions();
		g.selectAll("line")
			.attr("stroke", options.grid.strokeColor);

		// Remove extra elements
		g.selectAll("text").remove();
		g.select(".domain").remove();
	}
}
