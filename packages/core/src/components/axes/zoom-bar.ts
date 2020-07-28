// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";
import { Events, ScaleTypes } from "../../interfaces";
import { DOMUtils } from "../../services";
import {
	computeTimeIntervalName,
	formatTick
} from "../../services/time-series";

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

	brushSelector = "g.zoom-bar-brush"; // needs to match the style in _zoom-bar.scss

	// Give every zoomBarClip a distinct ID
	// so they don't interfere the other zoom bars in a page
	clipId = "zoomBarClip-" + Math.floor(Math.random() * 99999999999);

	height = 32;

	spacerHeight = 20;

	brush = brushX();

	// The max allowed selection ragne, will be updated soon in render()
	maxSelectionRange: [0, 0];

	init() {
		this.services.events.addEventListener(Events.ZoomBar.UPDATE, () => {
			this.render();
		});

		// get initZoomDomain
		const initialZoomDomain = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
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
		const { cartesianScales } = this.services;
		const mainXAxisPosition = cartesianScales.getMainXAxisPosition();
		const mainYAxisPosition = cartesianScales.getMainYAxisPosition();
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();
		const mainXScaleType = cartesianScales.getMainXScaleType();
		const mainYScaleType = cartesianScales.getMainYScaleType();

		// get axes margins
		let axesLeftMargin = 0;
		const axesMargins = this.model.get("axesMargins");
		if (axesMargins && axesMargins.left) {
			axesLeftMargin = axesMargins.left;
		}

		const container = DOMUtils.appendOrSelect(svg, "svg.zoom-container")
			.attr("width", "100%")
			.attr("height", this.height)
			.attr("opacity", 1);

		const spacer = DOMUtils.appendOrSelect(svg, "rect.zoom-spacer")
			.attr("x", 0)
			.attr("y", this.height)
			.attr("width", "100%")
			.attr("height", this.spacerHeight)
			.attr("opacity", 1)
			.attr("fill", "none");

		const zoomBG = DOMUtils.appendOrSelect(container, "rect.zoom-bg")
			.attr("x", axesLeftMargin)
			.attr("y", 0)
			.attr("width", "100%")
			.attr("height", "100%");

		if (mainXScale && mainXScaleType === ScaleTypes.TIME) {
			const zoomBarData = this.model.getZoomBarData();
			const xScale = mainXScale.copy();
			const yScale = mainYScale.copy();

			const { width } = DOMUtils.getSVGElementSize(this.parent, {
				useAttrs: true
			});

			const defaultDomain = this.model.getDefaultZoomBarDomain();
			// add value 0 to the extended domain for zoom bar area graph
			this.compensateDataForDefaultDomain(zoomBarData, defaultDomain, 0);

			xScale.range([axesLeftMargin, width]).domain(defaultDomain);
			// keep max selection range
			this.maxSelectionRange = xScale.range();

			yScale
				.range([0, this.height - 6])
				.domain(extent(zoomBarData, (d: any) => d.value));

			const zoomDomain = this.model.get("zoomDomain");

			// D3 line generator function
			const lineGenerator = line()
				.x((d, i) =>
					cartesianScales.getValueFromScale(
						xScale,
						mainXScaleType,
						mainXAxisPosition,
						d,
						i
					)
				)
				.y(
					(d, i) =>
						this.height -
						cartesianScales.getValueFromScale(
							yScale,
							mainYScaleType,
							mainYAxisPosition,
							d,
							i
						)
				)
				.curve(this.services.curves.getD3Curve());
			const accessorFunc = (scale, scaleType, axisPosition) => {
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
			this.renderZoomBarArea(
				container,
				"path.zoom-graph-area-unselected",
				accessorFunc(xScale, mainXScaleType, mainXAxisPosition),
				accessorFunc(yScale, mainYScaleType, mainYAxisPosition),
				zoomBarData,
				animate,
				undefined
			);
			this.updateClipPath(svg, this.clipId, 0, 0, 0, 0);
			this.renderZoomBarArea(
				container,
				"path.zoom-graph-area",
				accessorFunc(xScale, mainXScaleType, mainXAxisPosition),
				accessorFunc(yScale, mainYScaleType, mainYAxisPosition),
				zoomBarData,
				animate,
				this.clipId
			);
			const baselineGenerator = line()([
				[axesLeftMargin, this.height],
				[width, this.height]
			]);
			const zoomBaseline = DOMUtils.appendOrSelect(
				container,
				"path.zoom-bg-baseline"
			).attr("d", baselineGenerator);

			const brushEventListener = () => {
				const selection = event.selection;
				// follow d3 behavior: when selection is null, reset default full range
				// select behavior is completed, but nothing selected
				if (selection === null) {
					this.brushed(zoomDomain, xScale, xScale.range());
				} else if (selection[0] === selection[1]) {
					// select behavior is not completed yet, do nothing
				} else {
					this.brushed(zoomDomain, xScale, selection);
				}
			};

			this.brush
				.extent([
					[axesLeftMargin, 0],
					[width, this.height]
				])
				.on("start brush end", null) // remove old listener first
				.on("start brush end", brushEventListener);

			const brushArea = DOMUtils.appendOrSelect(
				svg,
				this.brushSelector
			).call(this.brush);

			if (zoomDomain === undefined) {
				// do nothing, initialization not completed yet
				// don't update brushHandle to avoid flash
			} else if (zoomDomain[0].valueOf() === zoomDomain[1].valueOf()) {
				brushArea.call(this.brush.move, xScale.range()); // default to full range
				this.updateBrushHandle(
					this.getContainerSVG(),
					xScale.range(),
					xScale.domain()
				);
			} else {
				const selected = zoomDomain.map((domain) => xScale(domain));
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

	// brush event listener
	brushed(zoomDomain, scale, selection) {
		const newDomain = [
			scale.invert(selection[0]),
			scale.invert(selection[1])
		];

		// update brush handle position
		this.updateBrushHandle(this.getContainerSVG(), selection, newDomain);

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
				this.model.set({ zoomDomain: newDomain, selectionRange: selection }, { animate: false });
			}

			// dispatch selection events
			let zoomBarEventType;
			if (event.type === "start") {
				zoomBarEventType = Events.ZoomBar.SELECTION_START;
			} else if (event.type === "brush") {
				zoomBarEventType = Events.ZoomBar.SELECTION_IN_PROGRESS;
			} else if (event.type === "end") {
				zoomBarEventType = Events.ZoomDomain.CHANGE;
			}
			this.services.events.dispatchEvent(zoomBarEventType, {
				selection,
				newDomain
			});
		}
	}

	updateBrushHandleTooltip(svg, domain, timeScaleOptions) {
		// remove old handle tooltip
		svg.select("title").remove();

		// if domain is undefined, do nothing
		if (!domain) {
			return;
		}

		const timeInterval = computeTimeIntervalName(domain);
		// add new handle tooltip
		svg.append("title").text((d) => {
			if (d.type === "w") {
				return formatTick(domain[0], 0, timeInterval, timeScaleOptions);
			} else if (d.type === "e") {
				return formatTick(domain[1], 0, timeInterval, timeScaleOptions);
			}
		});
	}

	updateBrushHandle(svg, selection, domain) {
		const self = this;
		const timeScaleOptions = Tools.getProperty(
			this.model.getOptions(),
			"timeScale"
		);
		const handleWidth = 5;
		const handleHeight = this.height;
		const handleXDiff = -handleWidth / 2;

		const handleBarWidth = 1;
		const handleBarHeight = 12;
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
			.attr("cursor", "pointer")
			.style("display", null) // always display
			.call(this.updateBrushHandleTooltip, domain, timeScaleOptions);

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
			.call(this.updateBrushHandleTooltip, domain, timeScaleOptions);

		this.updateClipPath(
			svg,
			this.clipId,
			selection[0],
			0,
			selection[1] - selection[0],
			this.height
		);
	}

	renderZoomBarArea(
		container,
		querySelector,
		xFunc,
		y1Func,
		data,
		animate,
		clipId
	) {
		const areaGenerator = area()
			.x((d, i) => xFunc(d, i))
			.y0(this.height)
			.y1((d, i) => this.height - y1Func(d, i));

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
	compensateDataForDefaultDomain(data, defaultDomain, value) {
		if (!data || data.length < 2) {
			return;
		}
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();
		// if min domain is extended
		if (Number(defaultDomain[0]) < Number(data[0][domainIdentifier])) {
			const newDatum = {};
			newDatum[domainIdentifier] = defaultDomain[0];
			newDatum[rangeIdentifier] = value;
			data.unshift(newDatum);
		}
		// if max domain is extended
		if (
			Number(defaultDomain[1]) >
			Number(data[data.length - 1][domainIdentifier])
		) {
			const newDatum = {};
			newDatum[domainIdentifier] = defaultDomain[1];
			newDatum[rangeIdentifier] = value;
			data.push(newDatum);
		}
	}

	destroy() {
		this.brush.on("start brush end", null); // remove event listener
		this.services.events.removeEventListener(Events.ZoomBar.UPDATE, () => {
			this.render();
		});
	}
}
