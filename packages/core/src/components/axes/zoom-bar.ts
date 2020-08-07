// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";
import { Events, ScaleTypes } from "../../interfaces";
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

	// keep the initial zoomBar domain to avoid the incorrect domain due to data changes
	defaultZoomBarDomain: any;

	zoomService = this.services.zoom;

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

		const zoomBarData = this.zoomService.getZoomBarData();

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
			.attr("height", Configuration.zoomBar.height)
			.attr("opacity", 1);

		const spacer = DOMUtils.appendOrSelect(svg, "rect.zoom-spacer")
			.attr("x", 0)
			.attr("y", Configuration.zoomBar.height)
			.attr("width", "100%")
			.attr("height", Configuration.zoomBar.spacerHeight)
			.attr("opacity", 1)
			.attr("fill", "none");

		const zoomBG = DOMUtils.appendOrSelect(container, "rect.zoom-bg")
			.attr("x", axesLeftMargin)
			.attr("y", 0)
			.attr("width", width - axesLeftMargin)
			.attr("height", "100%");

		// loading or empty state
		if (
			this.zoomService.isDataLoading() ||
			this.zoomService.isEmptyState()
		) {
			this.renderSkeleton(container, axesLeftMargin, width);
			return;
		}

		const { cartesianScales } = this.services;
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();
		const mainXScaleType = cartesianScales.getMainXScaleType();

		if (mainXScale && mainXScaleType === ScaleTypes.TIME) {
			this.xScale = mainXScale.copy();
			this.yScale = mainYScale.copy();

			const defaultDomain = this.zoomService.getDefaultZoomBarDomain();
			// if defaultZoomBarDomain is still undefined,
			// probably chart is still loading or data is not ready yet
			if (!defaultDomain) {
				return;
			}
			// save defaultZoomBarDomain if not set yet
			if (!this.defaultZoomBarDomain) {
				this.defaultZoomBarDomain = defaultDomain;
			}

			// add value 0 to the extended domain for zoom bar area graph
			this.compensateDataForDefaultDomain(
				zoomBarData,
				this.defaultZoomBarDomain
			);

			this.xScale
				.range([axesLeftMargin, width])
				.domain(this.defaultZoomBarDomain);

			// keep max selection range
			this.maxSelectionRange = this.xScale.range();

			this.yScale
				.range([0, Configuration.zoomBar.height - 6])
				.domain(extent(zoomBarData, (d: any) => d.value));

			const zoomDomain = this.model.get("zoomDomain");

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

			// Draw the zoom bar base line
			this.renderZoomBarBaseline(container, axesLeftMargin, width);

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
					this.xScale.range()
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
					this.updateBrushHandle(this.getContainerSVG(), selected);
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

		// Initialize the d3 brush
		this.brush
			.extent([
				[axesLeftMargin, 0],
				[width, Configuration.zoomBar.height]
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
		this.updateBrushHandle(this.getContainerSVG(), selection);

		// be aware that the value of d3.event changes during an event!
		// update zoomDomain only if the event comes from mouse event
		if (
			event.sourceEvent != null &&
			(event.sourceEvent.type === "mousemove" ||
				event.sourceEvent.type === "mouseup" ||
				event.sourceEvent.type === "mousedown")
		) {
			// only if zoomDomain is never set or needs update
			if (
				zoomDomain === undefined ||
				zoomDomain[0] !== newDomain[0] ||
				zoomDomain[1] !== newDomain[1]
			) {
				this.model.set(
					{ zoomDomain: newDomain, selectionRange: selection },
					{ animate: false }
				);
			}

			// dispatch selection events
			let zoomBarEventType;
			if (event.type === "start") {
				zoomBarEventType = Events.ZoomBar.SELECTION_START;
			} else if (event.type === "brush") {
				zoomBarEventType = Events.ZoomBar.SELECTION_IN_PROGRESS;
			} else if (event.type === "end") {
				zoomBarEventType = Events.ZoomBar.SELECTION_END;
				// only dispatch zoom domain change event for triggering api call when event type equales to end
				this.services.events.dispatchEvent(Events.ZoomDomain.CHANGE, {
					selection,
					newDomain
				});
			}
			this.services.events.dispatchEvent(zoomBarEventType, {
				selection,
				newDomain
			});
		}
	}

	updateBrushHandle(svg, selection) {
		const isDataLoading = Tools.getProperty(
			this.model.getOptions(),
			"data",
			"loading"
		);
		const self = this;
		const handleWidth = 5;
		const handleHeight = Configuration.zoomBar.height;
		const handleXDiff = -handleWidth / 2;

		const handleBarWidth = 1;
		const handleBarHeight = 12;
		const handleBarXDiff = -handleBarWidth / 2;
		const handleYBarDiff = (handleHeight - handleBarHeight) / 2;

		const displayStyle =
			isDataLoading || isNaN(selection[0]) || isNaN(selection[1])
				? "none"
				: null;

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
			.attr("cursor", "pointer")
			.style("display", displayStyle);

		// handle-bar
		svg.select(this.brushSelector)
			.selectAll("rect.handle-bar")
			.data([{ type: "w" }, { type: "e" }])
			.join("rect")
			.attr("class", function (d) {
				return "handle-bar handle-bar--" + d.type;
			})
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
			.attr("cursor", "pointer")
			.style("display", displayStyle);

		this.updateClipPath(
			svg,
			this.clipId,
			selection[0],
			0,
			selection[1] - selection[0],
			Configuration.zoomBar.height
		);
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
		const areaGenerator = area()
			.x((d, i) => xAccessor(d, i))
			.y0(Configuration.zoomBar.height)
			.y1((d, i) => Configuration.zoomBar.height - yAccessor(d, i));

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

	renderZoomBarBaseline(container, startX, endX) {
		const baselineGenerator = line()([
			[startX, Configuration.zoomBar.height],
			[endX, Configuration.zoomBar.height]
		]);
		DOMUtils.appendOrSelect(container, "path.zoom-bg-baseline").attr(
			"d",
			baselineGenerator
		);
	}
	// assume the domains in data are already sorted
	compensateDataForDefaultDomain(data, defaultDomain) {
		if (!data || data.length < 1) {
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

	// TODO - zoom bar skeleton could be improved in the future
	renderSkeleton(container, startX, endX) {
		// need to clear current zoom bar area
		this.renderZoomBarArea(
			container,
			"path.zoom-graph-area-unselected",
			[],
			null
		);
		this.renderZoomBarArea(
			container,
			"path.zoom-graph-area",
			[],
			this.clipId
		);
		// remove brush listener
		this.brush.on("start brush end", null);
		// clear d3 brush
		DOMUtils.appendOrSelect(
			this.getContainerSVG(),
			this.brushSelector
		).html(null);
		// re-render baseline
		this.renderZoomBarBaseline(container, startX, endX);
	}

	destroy() {
		this.brush.on("start brush end", null); // remove event listener
		this.services.events.removeEventListener(
			Events.ZoomBar.UPDATE,
			Events.ZoomDomain.CHANGE,
			this.render.bind(this)
		);
	}
}
