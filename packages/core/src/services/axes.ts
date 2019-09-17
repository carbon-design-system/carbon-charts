// Internal Imports
import { Service } from "./service";
import { AxisPositions, AxisTypes } from "../interfaces";

export class Axes extends Service {
	// Find the main x-axis out of the 2 x-axis on the chart (when 2D axis is used)
	getMainXAxis() {
		const primaryAxis = this.model.get(AxisTypes.PRIMARY);
		const secondaryAxis = this.model.get(AxisTypes.SECONDARY);

		if (primaryAxis === this.model.get(AxisPositions.TOP) || primaryAxis === this.model.get(AxisPositions.BOTTOM)) {
			return primaryAxis;
		} else if (secondaryAxis === this.model.get(AxisPositions.TOP) || secondaryAxis === this.model.get(AxisPositions.BOTTOM)) {
			return secondaryAxis;
		}
	}

	// Find the main y-axis out of the 2 x-axis on the chart (when 2D axis is used)
	getMainYAxis() {
		const primaryAxis = this.model.get(AxisTypes.PRIMARY);
		const secondaryAxis = this.model.get(AxisTypes.SECONDARY);

		if (primaryAxis === this.model.get(AxisPositions.LEFT) || primaryAxis === this.model.get(AxisPositions.RIGHT)) {
			return primaryAxis;
		} else if (secondaryAxis === this.model.get(AxisPositions.LEFT) || secondaryAxis === this.model.get(AxisPositions.RIGHT)) {
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
