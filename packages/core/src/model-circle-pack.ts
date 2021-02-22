// Internal Imports
import { ColorClassNameTypes } from './interfaces/enums';
import { ChartModel } from './model';

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class CirclePackModel extends ChartModel {
	colorClass;

	constructor(services: any) {
		super(services);
	}

	// For circle packs, only need one color class name since its all one partition of data
	setColorClassNames() {
		// check to see if there is a custom color scale - > if not then assign it to carbon default color
		this.colorClass = `5-1-1`; // temp using purple
	}

	// Return the same color class but with the different name types (fill/stroke, etc)
	getColorClassName(configs: {
		classNameTypes: ColorClassNameTypes[];
		dataGroupName?: string;
		originalClassName?: string;
	}) {
		let className = configs.originalClassName;
		configs.classNameTypes.forEach(
			(type) =>
				(className = configs.originalClassName
					? `${className} ${type}-${this.colorClass}`
					: `${type}-${this.colorClass}`)
		);

		return className;
	}
}
