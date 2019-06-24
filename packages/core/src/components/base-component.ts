// Internal Imports
import { ChartModel } from "../model";
import { ChartEssentials } from "../essentials";
import errorHandler from "../services/error-handling";

// D3 Imports
import { select } from "d3-selection";

export class ChartComponent {
	protected _model: ChartModel;
	protected _essentials: ChartEssentials;

	protected componentHasRendered = false;

	protected _parent: any;

	render() {
		errorHandler.INTERNAL.COMPONENT.MISSING_METHOD("render");
	}

	// Used to pass down information to the components
	setModel(newObj) {
		this._model = newObj;
	}


	// Used to pass down information to the components
	setEssentials(newObj) {
		this._essentials = newObj;

		// Set parent element to shell SVG if no parent exists for component
		if (!this._parent) {
			this.setParent(
				select(this._essentials.domUtils.getSVG())
			);
		}
	}

	setParent(parent) {
		this._parent = parent;
	}
}
