// Internal Imports
import { Service } from "../service";
import { ModelStateKeys } from "../../interfaces";

// D3 Imports
import { select, Selection } from "d3-selection";
import { Tools } from "../../tools";

// MISC
import ResizeObserver from "resize-observer-polyfill";

export class DOMUtils extends Service {
	private _svg: Element;

	init() {
		// Add width & height to the chart holder if necessary, and add a classname
		this.styleHolderElement();

		this.addSVGElement();

		if (this._model.getOptions().containerResizable) {
			this.addResizeListener();
		}
	}

	styleHolderElement() {
		const holderElement = this._model.get(ModelStateKeys.HOLDER) as HTMLElement;
		const { width, height } = this._model.getOptions();

		// Add class to chart holder
		select(this._model.get(ModelStateKeys.HOLDER)).classed("chart-holder", true);

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
		return this._model.get(ModelStateKeys.HOLDER);
	}

	addSVGElement() {
		const svg = select(this._model.get(ModelStateKeys.HOLDER))
			.append("svg")
			.classed("chart-svg", true)
			.attr("height", "100%")
			.attr("width", "100%");

		this._svg = svg.node();
	}

	getMainSVG() {
		return this._svg;
	}

	addResizeListener() {
		const holder = this._model.get(ModelStateKeys.HOLDER);

		let containerWidth = holder.clientWidth;
		let containerHeight = holder.clientHeight;

		const resizeCallback = this.debounce(15, (entries, observer) => {
			if (Math.abs(containerWidth - holder.clientWidth) > 1
				|| Math.abs(containerHeight - holder.clientHeight) > 1) {
				containerWidth = holder.clientWidth;
				containerHeight = holder.clientHeight;

				this._services.events.dispatchEvent("chart-resize");
			}
		});

		const resizeObserver = new ResizeObserver(resizeCallback);

		resizeObserver.observe(holder);
	}

	getSVGElementSize(svgSelector: Selection<any, any, any, any>, options?: any) {
		const attrDimensions = {
			width: svgSelector.attr("width"),
			height: svgSelector.attr("height")
		};

		const bbox = svgSelector.node().getBBox();
		const bboxDimensions = {
			width: bbox.width,
			height: bbox.height
		};

		const clientDimensions = {
			width: svgSelector.node().clientWidth,
			height: svgSelector.node().clientHeight
		};

		const validateDimensions = dimensions => {
			if (!isNaN(dimensions.height) && !isNaN(dimensions.width) &&
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
		}

		const nativeDimensions = {
			width: Tools.getProperty(svgSelector.node(), "width", "baseVal", "value"),
			height: Tools.getProperty(svgSelector.node(), "height", "baseVal", "value")
		};
		if (validateDimensions(nativeDimensions)) {
			return nativeDimensions;
		}

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

	appendOrSelect(parent, query) {
		const l = query.split(".");
		const elementToAppend = l[0];

		const g = parent.select(query);
		if (g.empty()) {
			return parent.append(elementToAppend)
				.attr("class", l.slice(1).join(" "));
		}

		return g;
	}

	debounce(ms, fn) {
		let timer;

		return function() {
			clearTimeout(timer);
			const args = Array.prototype.slice.call(arguments);
			args.unshift(this);
			timer = setTimeout(fn.bind.apply(fn, args), ms);
		};
	}
}
