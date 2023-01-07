// Internal Imports
import { ChartModel } from './model';
import { Tools } from '../tools';
import { getColorScale } from '../services';

/**
 * Base thematic maps chart model layer
 */
export class ChoroplethModel extends ChartModel {
	private _colorScale: any = undefined;

	// Holds a mapping of geometry objects to data objects
	// Allows us to access data faster
	private _matrix = {};

	constructor(services: any) {
		super(services);
	}

	/**
	 * @override
	 * @param value
	 * @returns string
	 */
	getFillColor(value: number) {
		return this._colorScale(value);
	}

	/**
	 * Helper function that will generate a dictionary
	 */
	getCombinedData() {
		if (Tools.isEmpty(this._matrix)) {
			const options = this.getOptions();
			const data = this.getDisplayData();
			if (
				!Tools.isEmpty(data) &&
				!Tools.isEmpty(options.geoData.objects.countries)
			) {
				/**
				 * @todo
				 * We can either use name or id by default to generate this dictionary
				 * Curently id & name are standard in geoJSON. Unfortunately, topojson does not have any standard
				 * so feature objects can have any key. We suggest that they include name or id at the very least
				 *
				 * May need to provide users with the option to pass in keys to create dictionary with
				 */
				options.geoData.objects.countries.geometries.forEach(
					(country) => {
						this._matrix[country.properties.NAME] = country;
					}
				);

				data.forEach((value) => {
					if (this._matrix[value.name]) {
						this._matrix[value.name]['value'] = value.value || null;
					} else {
						console.warn(
							`Data point ${value} is missing geographical data.`
						);
					}
				});
			}
		}

		return this._matrix;
	}

	// Uses quantize scale to return class names
	getColorClassName(configs: { value?: number; originalClassName?: string }) {
		return `${configs.originalClassName} ${this._colorScale(
			configs.value as number
		)}`;
	}

	protected setColorClassNames() {
		const colorOptions = Tools.getProperty(this.getOptions(), 'color');
		this._colorScale = getColorScale(this.getDisplayData(), colorOptions);
	}
}
