// Internal Imports
import { Service } from "../service";

// D3 Imports
import { select, Selection } from "d3-selection";
import { Tools } from "../../tools";

// import the settings for the css prefix
import settings from "carbon-components/src/globals/js/settings";

// MISC
import ResizeObserver from "resize-observer-polyfill";

export class DOMUtils extends Service {
	static getSVGElementSize(svgSelector: Selection<any, any, any, any>, options?: any) {
		if (!svgSelector.attr) {
			svgSelector = select(svgSelector as any);
		}

		const attrDimensions = {
			width: svgSelector.attr("width"),
			height: svgSelector.attr("height")
		};

		let bbox, bboxDimensions, boundingRect, boundingRectDimensions;
		// In many versions of Firefox
		// getBBox will cause an "NSFailure" error
		try {
			bbox = svgSelector.node().getBBox();
			bboxDimensions = {
				width: bbox.width,
				height: bbox.height
			};
		} catch (e) {}

		try {
			boundingRect = svgSelector.node().getBoundingClientRect();
			boundingRectDimensions = {
				width: boundingRect.width,
				height: boundingRect.height
			};
		} catch (e) {}

		const clientDimensions = {
			width: svgSelector.node().clientWidth,
			height: svgSelector.node().clientHeight
		};

		const validateDimensions = dimensions => {
			if (dimensions && dimensions.width && dimensions.height &&
				!isNaN(dimensions.height) && !isNaN(dimensions.width) &&
				("" + dimensions.width + dimensions.height).indexOf("%") === -1 &&
				dimensions.width > 0 && dimensions.height > 0) {
				return true;
			}

			return false;
		};

		// If both attribute values are numbers
		// And not percentages or NaN
		if (options) {
			if (options.useAttrs && validateDimensions(attrDimensions)) {
				return attrDimensions;
			}

			if (options.useClientDimensions && validateDimensions(clientDimensions)) {
				return clientDimensions;
			}

			if (options.useBBox && validateDimensions(bboxDimensions)) {
				return bboxDimensions;
			}

			if (options.useBoundingRect && validateDimensions(boundingRectDimensions)) {
				return boundingRectDimensions;
			}
		}

		try {
			const nativeDimensions = {
				width: Tools.getProperty(svgSelector.node(), "width", "baseVal", "value"),
				height: Tools.getProperty(svgSelector.node(), "height", "baseVal", "value")
			};
			if (validateDimensions(nativeDimensions)) {
				return nativeDimensions;
			}
		} catch (e) {
			if (validateDimensions(clientDimensions)) {
				return clientDimensions;
			}

			if (validateDimensions(bboxDimensions)) {
				return bboxDimensions;
			}

			if (validateDimensions(attrDimensions)) {
				return attrDimensions;
			}
		}

		return {
			width: 0,
			height: 0
		};
	}

	static appendOrSelect(parent, query) {
		const querySections = query.split(".");
		const elementToAppend = querySections[0];

		const selection = parent.select(query);
		if (selection.empty()) {
			return parent.append(elementToAppend)
				.attr("class", querySections.slice(1).join(" "));
		}

		return selection;
	}

	protected svg: Element;

	init() {
		// Add width & height to the chart holder if necessary, and add a classname
		this.styleHolderElement();

		// Add main SVG
		this.addSVGElement();

		if (this.model.getOptions().resizable) {
			this.addResizeListener();
		}
	}

	styleHolderElement() {
		const holderElement = this.getHolder() as HTMLElement;
		const { width, height } = this.model.getOptions();

		// Add class to chart holder
		select(this.getHolder()).classed(`${settings.prefix}--chart-holder`, true);

		// If width exists in options
		if (width) {
			// Apply formatted width attribute to chart
			holderElement.style.width = Tools.formatWidthHeightValues(width);
		}

		// If height exists in options
		if (height) {
			// Apply formatted height attribute to chart
			holderElement.style.height = Tools.formatWidthHeightValues(height);
		}
	}

	getHolder() {
		return this.model.get("holder");
	}

	addSVGElement() {
		const chartsprefix = Tools.getProperty(this.model.getOptions(), "style", "prefix");
		const svg = select(this.getHolder())
			.append("svg")
			.classed(`${settings.prefix}--${chartsprefix}--chart-svg`, true)
			.attr("height", "100%")
			.attr("width", "100%");

		this.svg = svg.node();
	}

	getMainSVG() {
		return this.svg;
	}

	addResizeListener() {
		const holder = this.getHolder();

		if (!holder) {
			return;
		}

		// Grab current dimensions of the chart holder
		let containerWidth = holder.clientWidth;
		let containerHeight = holder.clientHeight;

		// The resize callback function
		const resizeCallback = Tools.debounce((entries, observer) => {
			if (!holder) {
				return;
			}

			if (Math.abs(containerWidth - holder.clientWidth) > 1
				|| Math.abs(containerHeight - holder.clientHeight) > 1) {
				containerWidth = holder.clientWidth;
				containerHeight = holder.clientHeight;

				this.services.events.dispatchEvent("chart-resize");
			}
		}, 12.5);

		// Observe the behaviour of resizing on the holder
		const resizeObserver = new ResizeObserver(resizeCallback);
		resizeObserver.observe(holder);
	}
}
