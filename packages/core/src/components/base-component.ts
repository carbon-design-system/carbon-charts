// Internal Imports
import { ChartModel } from "src/model";
import { ChartEssentials } from "src/essentials";

import errorHandler from "../services/error-handling";

export class ChartComponent {
	protected _model: ChartModel;
	protected _essentials: ChartEssentials;

	protected componentHasRendered = false;

	render() {
		errorHandler.INTERNAL.COMPONENT.MISSING_METHOD("render");
	}

	update() {
		errorHandler.INTERNAL.COMPONENT.MISSING_METHOD("update");
	}

	updateOrInitialize() {
		if (!this.componentHasRendered) {
			this.componentHasRendered = true;

			return this.render();
		} else {
			return this.update();
		}
	}

	// Used to pass down information to the components
	setModel(newObj) {
		this._model = newObj;
	}


	// Used to pass down information to the components
	setEssentials(newObj) {
		this._essentials = newObj;
	}
}
