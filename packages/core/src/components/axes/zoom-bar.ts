// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";
import { Events, ScaleTypes } from "../../interfaces";
import { DOMUtils } from "../../services";

// D3 Imports
import { extent } from "d3-array";
import { brushX } from "d3-brush";
import { area, line } from "d3-shape";
import { event, select, selectAll } from "d3-selection";

export class ZoomBar extends Component {
	type = "zoom-bar";

	clipId = "zoomBarClip";

	height = 32;

	ogXScale: any;

	brush = brushX();

	init() {
		this.services.events.addEventListener(Events.ZoomBar.UPDATE, () => {
			this.render();
		});

		// get initZoomDomain
		const zoomBarOptions = this.model.getOptions().zoomBar;
		if (zoomBarOptions.initZoomDomain !== undefined) {
			this.model.set(
				{ zoomDomain: zoomBarOptions.initZoomDomain },
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
		const mainXScaleType = cartesianScales.getScaleTypeByPosition(
			mainXAxisPosition
		);
		const mainYScaleType = cartesianScales.getScaleTypeByPosition(
			mainYAxisPosition
		);

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
			.attr("y", 32)
			.attr("width", "100%")
			.attr("height", 20)
			.attr("opacity", 1)
			.attr("fill", "none");

		const zoomBG = DOMUtils.appendOrSelect(container, "rect.zoom-bg")
			.attr("x", axesLeftMargin)
			.attr("y", 0)
			.attr("width", "100%")
			.attr("height", "100%");

		if (mainXScale) {
			const displayData = this.model.getDisplayData();

			if (mainXScaleType === ScaleTypes.TIME) {
				// Get all date values provided in data
				// TODO - Could be re-used through the model
				let allDates = [];
				displayData.forEach((data) => {
					allDates = allDates.concat(Number(data.date));
				});
				allDates = Tools.removeArrayDuplicates(allDates).sort();

				// Go through all date values
				// And get corresponding data from each dataset
				const stackDataArray = allDates.map((date) => {
					let count = 0;
					let correspondingSum = 0;
					const correspondingData = {};

					displayData.forEach((data) => {
						if (Number(data.date) === Number(date)) {
							++count;
							correspondingSum += data.value;
						}
					});
					correspondingData["date"] = date;
					correspondingData["value"] = correspondingSum;

					return correspondingData;
				});

				if (!this.ogXScale) {
					this.ogXScale = cartesianScales.getDomainScale();
				}
				const xScale = mainXScale.copy();
				if (!this.ogXScale) {
					this.ogXScale = xScale;
				}
				const yScale = mainYScale.copy();

				const { width } = DOMUtils.getSVGElementSize(this.parent, {
					useAttrs: true
				});

				xScale
					.range([axesLeftMargin, width])
					.domain(extent(stackDataArray, (d: any) => d.date));

				yScale
					.range([0, this.height - 6])
					.domain(extent(stackDataArray, (d: any) => d.value));

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
					stackDataArray,
					animate,
					undefined
				);
				this.updateClipPath(svg, this.clipId, 0, 0, 0, 0);
				this.renderZoomBarArea(
					container,
					"path.zoom-graph-area",
					accessorFunc(xScale, mainXScaleType, mainXAxisPosition),
					accessorFunc(yScale, mainYScaleType, mainYAxisPosition),
					stackDataArray,
					animate,
					"zoomBarClip"
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
					// @todo find a better way to handel the situation when selection is null
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

				const brushArea = DOMUtils.appendOrSelect(svg, "g.brush").call(
					this.brush
				);

				if (
					zoomDomain === undefined ||
					zoomDomain[0].valueOf() === zoomDomain[1].valueOf()
				) {
					brushArea.call(this.brush.move, xScale.range()); // default to full range
					this.updateBrushHandle(
						this.getContainerSVG(),
						xScale.range()
					);
				} else {
					const selected = zoomDomain.map((domain) => xScale(domain));
					brushArea.call(this.brush.move, selected); // set brush to correct position
					this.updateBrushHandle(this.getContainerSVG(), selected);
				}
			}
		}
	}

	// could be used by Toolbar
	// zoomIn() {
	// 	const mainXScale = this.services.cartesianScales.getMainXScale();
	// 	console.log("zoom in", mainXScale.domain());
	// }

	// brush event listener
	brushed(zoomDomain, scale, selection) {
		// update brush handle position
		this.updateBrushHandle(this.getContainerSVG(), selection);

		const newDomain = [
			scale.invert(selection[0]),
			scale.invert(selection[1])
		];

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
				this.model.set({ zoomDomain: newDomain }, { animate: false });
			}
		}
		// call external callback
		const zoomBarOptions = this.model.getOptions().zoomBar;
		if (
			zoomBarOptions.selectionStart !== undefined &&
			event.type === "start"
		) {
			zoomBarOptions.selectionStart(selection, newDomain);
		}
		if (
			zoomBarOptions.selectionInProgress !== undefined &&
			event.type === "brush"
		) {
			zoomBarOptions.selectionInProgress(selection, newDomain);
		}
		if (zoomBarOptions.selectionEnd !== undefined && event.type === "end") {
			zoomBarOptions.selectionEnd(selection, newDomain);
		}
	}

	updateBrushHandle(svg, selection) {
		// @todo the handle size, height are calculated by d3 library
		// need to figure out how to override the value
		const handleWidth = 6;
		const handleHeight = 38;
		const handleXDiff = -handleWidth / 2;
		const handleYDiff = -(handleHeight - this.height) / 2;

		const handleBarWidth = 2;
		const handleBarHeight = 12;
		const handleBarXDiff = -handleBarWidth / 2;
		const handleYBarDiff =
			(handleHeight - handleBarHeight) / 2 + handleYDiff;
		// handle
		svg.select("g.brush")
			.selectAll("rect.handle")
			.data([{ type: "w" }, { type: "e" }])
			.attr("x", function (d) {
				if (d.type === "w") {
					return selection[0] + handleXDiff;
				} else if (d.type === "e") {
					return selection[1] + handleXDiff;
				}
			})
			.attr("y", handleYDiff)
			.attr("width", handleWidth)
			.attr("height", handleHeight)
			.style("display", null); // always display
		// handle-bar
		svg.select("g.brush")
			.selectAll("rect.handle-bar")
			.data([{ type: "w" }, { type: "e" }])
			.join("rect")
			.attr("class", function (d) {
				return "handle-bar handle-bar--" + d.type;
			})
			.attr("x", function (d) {
				if (d.type === "w") {
					return selection[0] + handleBarXDiff;
				} else if (d.type === "e") {
					return selection[1] + handleBarXDiff;
				}
			})
			.attr("y", handleYBarDiff)
			.attr("width", handleBarWidth)
			.attr("height", handleBarHeight)
			.attr("cursor", "ew-resize");

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
		datum,
		animate,
		clipId
	) {
		const areaGenerator = area()
			.x((d, i) => xFunc(d, i))
			.y0(this.height)
			.y1((d, i) => this.height - y1Func(d, i));

		const areaGraph = DOMUtils.appendOrSelect(container, querySelector)
			.datum(datum)
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

	destroy() {
		this.brush.on("start brush end", null); // remove event listener
		this.services.events.removeEventListener(Events.ZoomBar.UPDATE, () => {
			this.render();
		});
	}
}
