// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";
import { Events, ScaleTypes, ZoomBarTypes } from "../../interfaces";
import { DOMUtils } from "../../services";
import * as Configuration from "../../configuration";

// D3 Imports
import { extent } from "d3-array";
import { brushX } from "d3-brush";
import { area, line } from "d3-shape";
import { event } from "d3-selection";

export class ZoomBar extends Component {
	type = "zoom-bar";

	// The minimum selection x range to trigger handler update
	// Smaller number may introduce a handler flash during initialization
	// Bigger number may not trigger handler update while selection area on chart is very small
	MIN_SELECTION_DIFF = 9e-10;

	// needs to match the style in _zoom-bar.scss
	brushSelector = "g.zoom-bar-brush";

	// The max allowed selection range, will be updated soon in render()
	maxSelectionRange: [0, 0];

	// Give every zoomBarClip a distinct ID
	// so they don't interfere the other zoom bars in a page
	clipId = "zoomBarClip-" + Math.floor(Math.random() * 99999999999);

	brush = brushX();
	xScale: any;
	yScale: any;

	init() {
		this.services.events.addEventListener(
			Events.ZoomBar.UPDATE,
			this.render.bind(this)
		);

		// get initZoomDomain
		const initialZoomDomain = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"top",
			"initialZoomDomain"
		);
		if (initialZoomDomain !== null) {
			this.model.set(
				{ zoomDomain: initialZoomDomain },
				{ skipUpdate: true }
			);
		}
	}

	render(animate = true) {
		const svg = this.getContainerSVG();
		const options = this.model.getOptions();

		const isDataLoading = Tools.getProperty(options, "data", "loading");

		const zoombarType = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"top",
			"type"
		);
		const zoombarHeight = Configuration.zoomBar.height[zoombarType];

		const { width } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true
		});

		// get axes margins
		let axesLeftMargin = 0;
		const axesMargins = this.model.get("axesMargins");
		if (axesMargins && axesMargins.left) {
			axesLeftMargin = axesMargins.left;
		}

		const container = DOMUtils.appendOrSelect(svg, "svg.zoom-container")
			.attr("width", "100%")
			.attr("height", zoombarHeight)
			.attr("opacity", 1);

		const spacer = DOMUtils.appendOrSelect(svg, "rect.zoom-spacer")
			.attr("x", 0)
			.attr("y", zoombarHeight)
			.attr("width", "100%")
			.attr("height", Configuration.zoomBar.spacerHeight)
			.attr("opacity", 1)
			.attr("fill", "none");

		if (zoombarType === ZoomBarTypes.GRAPH_VIEW) {
			// Draw zoombar background rectangle
			DOMUtils.appendOrSelect(container, "rect.zoom-bg")
				.attr("x", axesLeftMargin)
				.attr("y", 0)
				.attr("width", width - axesLeftMargin)
				.attr("height", "100%");
		} else if (zoombarType === ZoomBarTypes.SLIDER_VIEW) {
			// Draw zoombar background line
			DOMUtils.appendOrSelect(container, "rect.zoom-slider-bg")
				.attr("x", axesLeftMargin)
				.attr("y", zoombarHeight / 2 - 1)
				.attr("width", width - axesLeftMargin)
				.attr("height", 2);
		}

		if (isDataLoading) {
			// TODO - zoom bar skeleton could be improved in the future
			return;
		}

		const { cartesianScales } = this.services;
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();
		const mainXScaleType = cartesianScales.getMainXScaleType();

		if (mainXScale && mainXScaleType === ScaleTypes.TIME) {
			const zoomBarData = this.services.zoom.getZoomBarData();
			this.xScale = mainXScale.copy();
			this.yScale = mainYScale.copy();

			const defaultDomain = this.services.zoom.getDefaultZoomBarDomain();

			// add value 0 to the extended domain for zoom bar area graph
			this.compensateDataForDefaultDomain(zoomBarData, defaultDomain);

			this.xScale.range([axesLeftMargin, width]).domain(defaultDomain);

			// keep max selection range
			this.maxSelectionRange = this.xScale.range();

			this.yScale
				.range([0, zoombarHeight - 6])
				.domain(extent(zoomBarData, (d: any) => d.value));

			const zoomDomain = this.model.get("zoomDomain");

			if (zoombarType === ZoomBarTypes.GRAPH_VIEW) {
				this.renderZoomBarArea(
					container,
					"path.zoom-graph-area-unselected",
					zoomBarData,
					null
				);
				this.updateClipPath(svg, this.clipId, 0, 0, 0, 0);
				this.renderZoomBarArea(
					container,
					"path.zoom-graph-area",
					zoomBarData,
					this.clipId
				);

				// Draw the zoom base line
				const baselineGenerator = line()([
					[axesLeftMargin, zoombarHeight],
					[width, zoombarHeight]
				]);
				const zoomBaseline = DOMUtils.appendOrSelect(
					container,
					"path.zoom-bg-baseline"
				).attr("d", baselineGenerator);
			}

			// Attach brushing event listeners
			this.addBrushEventListener(zoomDomain, axesLeftMargin, width);

			// Draw the brushing area
			const brushArea = DOMUtils.appendOrSelect(
				svg,
				this.brushSelector
			).call(this.brush);

			if (zoomDomain === undefined) {
				// do nothing, initialization not completed yet
				// don't update brushHandle to avoid flash
			} else if (zoomDomain[0].valueOf() === zoomDomain[1].valueOf()) {
				brushArea.call(this.brush.move, this.xScale.range()); // default to full range
				this.updateBrushHandle(
					this.getContainerSVG(),
					this.xScale.range(),
					this.xScale.domain()
				);
			} else {
				const selected = zoomDomain.map((domain) =>
					this.xScale(domain)
				);
				if (selected[1] - selected[0] < this.MIN_SELECTION_DIFF) {
					// initialization not completed yet
					// don't update brushHandle to avoid flash
				} else {
					brushArea.call(this.brush.move, selected); // set brush to correct position
					this.updateBrushHandle(
						this.getContainerSVG(),
						selected,
						zoomDomain
					);
				}
			}
		}
	}

	addBrushEventListener(zoomDomain, axesLeftMargin, width) {
		const brushEventListener = () => {
			const selection = event.selection;
			// follow d3 behavior: when selection is null, reset default full range
			// select behavior is completed, but nothing selected
			if (selection === null) {
				this.handleBrushedEvent(
					zoomDomain,
					this.xScale,
					this.xScale.range()
				);
			} else if (selection[0] === selection[1]) {
				// select behavior is not completed yet, do nothing
			} else {
				this.handleBrushedEvent(zoomDomain, this.xScale, selection);
			}
		};

		const zoombarType = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"top",
			"type"
		);
		const zoombarHeight = Configuration.zoomBar.height[zoombarType];

		// Initialize the d3 brush
		this.brush
			.extent([
				[axesLeftMargin, 0],
				[width, zoombarHeight]
			])
			.on("start brush end", null) // remove old listener first
			.on("start brush end", brushEventListener);
	}

	// brush event listener
	handleBrushedEvent(zoomDomain, scale, selection) {
		const newDomain = [
			scale.invert(selection[0]),
			scale.invert(selection[1])
		];

		// update brush handle position
		this.updateBrushHandle(this.getContainerSVG(), selection, newDomain);

		// be aware that the value of d3.event changes during an event!
		// update zoomDomain only if the event comes from mouse/touch event
		if (
			event.sourceEvent != null &&
			(event.sourceEvent.type === "mousemove" ||
				event.sourceEvent.type === "mouseup" ||
				event.sourceEvent.type === "mousedown" ||
				event.sourceEvent.type === "touchstart" ||
				event.sourceEvent.type === "touchmove" ||
				event.sourceEvent.type === "touchend")
		) {
			// only if zoomDomain is never set or needs update
			if (
				zoomDomain === undefined ||
				zoomDomain[0] !== newDomain[0] ||
				zoomDomain[1] !== newDomain[1]
			) {
				this.model.set({ zoomDomain: newDomain }, { animate: false });
			}

			// dispatch selection events
			let zoomBarEventType;
			if (event.type === "start") {
				zoomBarEventType = Events.ZoomBar.SELECTION_START;
			} else if (event.type === "brush") {
				zoomBarEventType = Events.ZoomBar.SELECTION_IN_PROGRESS;
			} else if (event.type === "end") {
				zoomBarEventType = Events.ZoomBar.SELECTION_END;
			}
			this.services.events.dispatchEvent(zoomBarEventType, {
				selection,
				newDomain
			});
		}
	}

	updateBrushHandle(svg, selection, domain) {
		const self = this;
		const handleWidth = Configuration.zoomBar.handleWidth;

		const zoombarType = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"top",
			"type"
		);
		const handleHeight = Configuration.zoomBar.height[zoombarType];
		const handleXDiff = -handleWidth / 2;

		const handleBarWidth = Configuration.zoomBar.handleBarWidth;
		const handleBarHeight =
			zoombarType === ZoomBarTypes.GRAPH_VIEW
				? Configuration.zoomBar.handleBarHeight
				: 6;
		const handleBarXDiff = -handleBarWidth / 2;
		const handleYBarDiff = (handleHeight - handleBarHeight) / 2;

		// handle
		svg.select(this.brushSelector)
			.selectAll("rect.handle")
			.data([{ type: "w" }, { type: "e" }])
			.attr("x", function (d) {
				if (d.type === "w") {
					// handle should not exceed zoom bar range
					return Math.max(
						selection[0] + handleXDiff,
						self.maxSelectionRange[0]
					);
				} else if (d.type === "e") {
					// handle should not exceed zoom bar range
					return Math.min(
						selection[1] + handleXDiff,
						self.maxSelectionRange[1] - handleWidth
					);
				}
			})
			.attr("y", 0)
			.attr("width", handleWidth)
			.attr("height", handleHeight)
			.attr("cursor", "ew-resize")
			.style("display", null); // always display

		// handle-bar
		const handleBars = svg
			.select(this.brushSelector)
			.selectAll("rect.handle-bar")
			.data([{ type: "w" }, { type: "e" }]);
		// create rect if not exists
		handleBars
			.enter()
			.append("rect")
			.attr("class", function (d) {
				return "handle-bar handle-bar--" + d.type;
			});
		// update positions
		handleBars
			.attr("x", function (d) {
				if (d.type === "w") {
					return Math.max(
						selection[0] + handleBarXDiff,
						self.maxSelectionRange[0] - handleXDiff + handleBarXDiff
					);
				} else if (d.type === "e") {
					return Math.min(
						selection[1] + handleBarXDiff,
						self.maxSelectionRange[1] + handleXDiff + handleBarXDiff
					);
				}
			})
			.attr("y", handleYBarDiff)
			.attr("width", handleBarWidth)
			.attr("height", handleBarHeight)
			.attr("cursor", "ew-resize");

		// Update slider selected area
		if (zoombarType === ZoomBarTypes.SLIDER_VIEW) {
			this.updateSliderSelectedArea(selection);
		}

		this.updateClipPath(
			svg,
			this.clipId,
			selection[0],
			0,
			selection[1] - selection[0],
			handleHeight
		);
	}

	updateSliderSelectedArea(selection) {
		const zoombarType = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"top",
			"type"
		);
		const zoombarHeight = Configuration.zoomBar.height[zoombarType];

		const { width } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true
		});

		// get axes margins
		let axesLeftMargin = 0;
		const axesMargins = this.model.get("axesMargins");
		if (axesMargins && axesMargins.left) {
			axesLeftMargin = axesMargins.left;
		}

		const svg = this.getContainerSVG();
		const container = svg.select("svg.zoom-container");

		// Draw zoombar background line
		DOMUtils.appendOrSelect(container, "rect.zoom-slider-selected-area")
			.attr("x", selection[0])
			.attr("y", zoombarHeight / 2 - 1)
			.attr("width", selection[1] - selection[0])
			.attr("height", 2);
	}

	renderZoomBarArea(container, querySelector, data, clipId) {
		const { cartesianScales } = this.services;
		const mainXAxisPosition = cartesianScales.getMainXAxisPosition();
		const mainYAxisPosition = cartesianScales.getMainYAxisPosition();
		const mainXScaleType = cartesianScales.getMainXScaleType();
		const mainYScaleType = cartesianScales.getMainYScaleType();

		const accessorFunction = (scale, scaleType, axisPosition) => {
			return (d, i) => {
				return cartesianScales.getValueFromScale(
					scale,
					scaleType,
					axisPosition,
					d,
					i
				);
			};
		};

		const xAccessor = accessorFunction(
			this.xScale,
			mainXScaleType,
			mainXAxisPosition
		);
		const yAccessor = accessorFunction(
			this.yScale,
			mainYScaleType,
			mainYAxisPosition
		);

		const zoombarType = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"top",
			"type"
		);
		const zoombarHeight = Configuration.zoomBar.height[zoombarType];
		const areaGenerator = area()
			.x((d, i) => xAccessor(d, i))
			.y0(zoombarHeight)
			.y1((d, i) => zoombarHeight - yAccessor(d, i));

		const areaGraph = DOMUtils.appendOrSelect(container, querySelector)
			.datum(data)
			.attr("d", areaGenerator);

		if (clipId) {
			areaGraph.attr("clip-path", `url(#${clipId})`);
		}
	}

	updateClipPath(svg, clipId, x, y, width, height) {
		const zoomBarClipPath = DOMUtils.appendOrSelect(svg, `clipPath`).attr(
			"id",
			clipId
		);
		DOMUtils.appendOrSelect(zoomBarClipPath, "rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", width)
			.attr("height", height);
	}

	// assume the domains in data are already sorted
	compensateDataForDefaultDomain(data, defaultDomain) {
		if (!data || data.length < 2) {
			return;
		}

		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

		// if min domain is extended
		if (Number(defaultDomain[0]) < Number(data[0][domainIdentifier])) {
			const newDatum = {};
			newDatum[domainIdentifier] = defaultDomain[0];
			newDatum[rangeIdentifier] = 0;
			data.unshift(newDatum);
		}
		// if max domain is extended
		if (
			Number(defaultDomain[1]) >
			Number(data[data.length - 1][domainIdentifier])
		) {
			const newDatum = {};
			newDatum[domainIdentifier] = defaultDomain[1];
			newDatum[rangeIdentifier] = 0;
			data.push(newDatum);
		}
	}

	destroy() {
		this.brush.on("start brush end", null); // remove event listener
		this.services.events.removeEventListener(
			Events.ZoomBar.UPDATE,
			this.render.bind(this)
		);
	}
}
