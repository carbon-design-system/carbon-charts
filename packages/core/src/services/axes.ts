// Internal Imports
import { Service } from "./service";
import { AxisPositions, AxisTypes } from "../interfaces";

export class Axes extends Service {
	getMainXAxis() {
		const primaryAxis = this._model.get(AxisTypes.PRIMARY);
		const secondaryAxis = this._model.get(AxisTypes.SECONDARY);

		if (primaryAxis === this._model.get(AxisPositions.TOP) || primaryAxis === this._model.get(AxisPositions.BOTTOM)) {
			return primaryAxis;
		} else if (secondaryAxis === this._model.get(AxisPositions.TOP) || secondaryAxis === this._model.get(AxisPositions.BOTTOM)) {
			return secondaryAxis;
		}
	}

	getMainYAxis() {
		const primaryAxis = this._model.get(AxisTypes.PRIMARY);
		const secondaryAxis = this._model.get(AxisTypes.SECONDARY);

		if (primaryAxis === this._model.get(AxisPositions.LEFT) || primaryAxis === this._model.get(AxisPositions.RIGHT)) {
			return primaryAxis;
		} else if (secondaryAxis === this._model.get(AxisPositions.LEFT) || secondaryAxis === this._model.get(AxisPositions.RIGHT)) {
			return secondaryAxis;
		}
	}

	getXValue(d, i) {
		return this.getMainXAxis().getValueFromScale(d, i);
	}

	getYValue(d, i) {
		return this.getMainYAxis().getValueFromScale(d, i);
	}
}
