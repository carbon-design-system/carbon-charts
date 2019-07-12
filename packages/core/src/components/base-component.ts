// Internal Imports
import { ChartModel } from "../model";
import errorHandler from "../services/error-handling";

// D3 Imports
import { select } from "d3-selection";

export class ChartComponent {
	protected _parent: any;

	protected _model: ChartModel;
	protected _services: any;

	render() {
		errorHandler.INTERNAL.COMPONENT.MISSING_METHOD("render");
	}

	// Used to pass down information to the components
	setModel(newObj) {
		this._model = newObj;
	}

	// Used to pass down information to the components
	setServices(newObj) {
		this._services = newObj;

		// Set parent element to shell SVG if no parent exists for component
		if (!this._parent) {
			this.setParent(
				select(this._services.domUtils.getSVG())
			);
		}
	}

	setParent(parent) {
		this._parent = parent;
	}
}
