import { Component } from "../component";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";
import { ChartModel } from "../../model";
import { AxisPositions, Events, ScaleTypes } from "../../interfaces";
import { select, mouse } from "d3-selection";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// import the settings for the css prefix
import settings from "carbon-components/src/globals/js/settings";
import { formatTick, computeTimeIntervalName } from "../../services/time-series";

export class Threshold extends Component {
	type = "threshold";

	threshold: any;
	thresholdClass: string;
	thresholdIdentifierClass: string;

	label: any;

	positionService = new Position();

	constructor(model: ChartModel, services: any, configs: any) {
		super(model, services, configs);
	}

	render() {
		const { value, fillColor, axisPosition, index } = this.configs;
		const chartprefix = Tools.getProperty(this.model.getOptions(), "style", "prefix");
		this.thresholdClass = `${settings.prefix}--${chartprefix}--threshold`;
		this.thresholdIdentifierClass = `${axisPosition}-${index}`;

		this.threshold = DOMUtils.appendOrSelect(this.parent, `g.${this.thresholdClass}.${this.thresholdIdentifierClass}`).raise();
		const thresholdRect = DOMUtils.appendOrSelect(this.threshold, `rect.threshold-hoverable-area`);
		const thresholdLine = DOMUtils.appendOrSelect(this.threshold, `line`);

		thresholdLine.style("stroke", fillColor);

		const scale = this.services.cartesianScales.getScaleByPosition(axisPosition);
		const isVertical = [AxisPositions.LEFT, AxisPositions.RIGHT].includes(axisPosition);
		const scaleType = this.services.cartesianScales.getScaleTypeByPosition(axisPosition);
		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYScale = this.services.cartesianScales.getMainYScale();
		const isScaleTypeLabels = scaleType === ScaleTypes.LABELS;
		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		if (isVertical) {
			const y = scale(value) + (isScaleTypeLabels ? (scale.step() / 2) : 0) - yScaleStart;
			this.threshold.attr("transform", `translate(${xScaleStart}, ${y})`);
			thresholdLine.attr("x2", xScaleEnd - xScaleStart);
			thresholdRect.attr("width", xScaleEnd - xScaleStart);
		} else {
			const x = scale(value) + (isScaleTypeLabels ? (scale.step() / 2) : 0);
			this.threshold.attr("transform", `translate(${x}, 0)`);
			thresholdLine.attr("y2", yScaleEnd);
			thresholdRect.attr("width", yScaleEnd - yScaleStart);
			thresholdRect.classed("rotate", true);
		}

		const self = this;
		this.services.events.addEventListener(Events.Threshold.SHOW, e => {
			const hovered = e.detail.hoveredElement.node();
			if (hovered === self.threshold) {
				this.setThresholdLabelPosition();
				this.label.classed("hidden", false);
			}
		});

		this.services.events.addEventListener(Events.Threshold.HIDE, e => {
			this.label.classed("hidden", true);
		});

		this.appendThresholdLabel();

		this.addEventListeners();
	}

	getFormattedValue() {
		const { value, axisPosition } = this.configs;
		const options = Tools.getProperty(this.model.getOptions());
		const scaleType = this.services.cartesianScales.getScaleTypeByPosition(axisPosition);

		if (scaleType === ScaleTypes.TIME) {
			const isVertical = [AxisPositions.LEFT, AxisPositions.RIGHT].includes(axisPosition);
			const mainXScale = this.services.cartesianScales.getMainXScale();
			const mainYScale = this.services.cartesianScales.getMainYScale();
			const scale = isVertical ? mainYScale : mainXScale;

			const timeScaleOptions = Tools.getProperty(options, "timeScale");
			const timeInterval = computeTimeIntervalName(scale.ticks());
			return formatTick(value, 0, timeInterval, timeScaleOptions);
		}

		return value.toLocaleString("en");
	}

	appendThresholdLabel() {
		const { value, valueFormatter, fillColor, label = "Threshold" } = this.configs;
		const holder = select(this.services.domUtils.getHolder());
		const formattedValue = valueFormatter ? valueFormatter(value) : this.getFormattedValue();

		this.label = DOMUtils.appendOrSelect(holder, `div.${this.thresholdClass}--label.${this.thresholdIdentifierClass}`);
		this.label.html(`${label}: ${formattedValue}`)
			.classed("hidden", true)
			.style("background-color", fillColor);
	}

	setThresholdLabelPosition() {
		const holder = this.services.domUtils.getHolder();
		const target = this.label.node();
		const mouseRelativePos = mouse(holder);

		// Find out whether threshold label should be shown on the left or right side
		const bestPlacementOption = this.positionService.findBestPlacementAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1]
			},
			target,
			[
				PLACEMENTS.RIGHT,
				PLACEMENTS.LEFT,
				PLACEMENTS.TOP,
				PLACEMENTS.BOTTOM
			],
			() => ({
				width: holder.offsetWidth,
				height: holder.offsetHeight
			})
		);

		// Get coordinates to where label should be positioned
		const pos = this.positionService.findPositionAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1]
			},
			target,
			bestPlacementOption
		);

		this.positionService.setElement(target, pos);
	}

	addEventListeners() {
		const self = this;

		DOMUtils.appendOrSelect(this.threshold, "rect")
			.on("mouseover mousemove", function() {
					self.threshold.classed("active", true);
					self.services.events.dispatchEvent(Events.Threshold.SHOW, {
						hoveredElement: select(self.threshold)
					});
			})
			.on("mouseout", function() {
					self.threshold.classed("active", false);
					self.services.events.dispatchEvent(Events.Threshold.HIDE, {
						hoveredElement: select(self.threshold)
					});
			});
	}
}
