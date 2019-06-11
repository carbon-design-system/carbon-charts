// Internal Imports
import * as Configuration from "../configuration";
import { Tools } from "../tools";
import { BaseChartOptions } from "../configuration";
import errorHandler from "../services/error-handling";
import { ChartModel } from "src/model";

export class ChartComponent {
	protected model: ChartModel;

	protected componentHasRendered = false;

	render() {
		errorHandler.INTERNAL.CHART.MISSING_METHOD("render");
	}

	update() {
		errorHandler.INTERNAL.CHART.MISSING_METHOD("update");
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
	setModel(newModel) {
		this.model = newModel;
	}
}
