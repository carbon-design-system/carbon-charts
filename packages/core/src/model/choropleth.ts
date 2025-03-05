// External Imports
import { isEmpty } from 'lodash-es'

// Internal Imports
import { ChartModel } from './model'
import { getProperty } from '@/tools'
import { getColorScale } from '@/services/color-scale-utils'

/**
 * Base thematic maps chart model layer
 */
export class ChoroplethModel extends ChartModel {
	private _colorScale: any = undefined

	// Holds a mapping of geometry objects to data objects
	// Allows us to access data faster
	private _matrix = {}

	constructor(services: any) {
		super(services)
	}

	/**
	 * @override
	 * @param value
	 * @returns string
	 */
	getFillColor(value: number) {
		return this._colorScale(value)
	}

	/**
	 * Helper function that will generate a dictionary
	 */
	getCombinedData() {
		if (isEmpty(this._matrix)) {
			const options = this.getOptions()
			const data = this.getDisplayData()
			if (!isEmpty(data) && !isEmpty(options.geoData.objects.countries)) {
				/**
				 * @todo
				 * We can either use name or id by default to generate this dictionary
				 * Curently id & name are standard in geoJSON. Unfortunately, topojson does not have any standard
				 * so feature objects can have any key. We suggest that they include name or id at the very least
				 *
				 * May need to provide users with the option to pass in keys to create dictionary with
				 */
				options.geoData.objects.countries.geometries.forEach(country => {
					this._matrix[country.properties.NAME] = country
				})

				data.forEach(value => {
					if (this._matrix[value.name]) {
						this._matrix[value.name]['value'] = value.value || null
					} else {
						console.warn(`Data point ${value} is missing geographical data.`)
					}
				})
			}
		}

		return this._matrix
	}

	/**
	 * Generate tabular data from display data
	 * @returns Array<Object>
	 */
	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')

		const headers = ['Country ID', 'Country Name', 'Value']
		const cells = [
			...displayData.map(datum => [
				datum['id'] === null ? '&ndash;' : datum['id'],
				datum['name'],
				datum['value'] === null ? '&ndash;' : numberFormatter(datum['value'], localeCode)
			])
		]

		return super.formatTable({ headers, cells })
	}

	// Uses quantize scale to return class names
	getColorClassName(configs: { value?: number; originalClassName?: string }) {
		return `${configs.originalClassName || ''} ${this._colorScale(configs.value as number)}`
	}

	protected setColorClassNames() {
		const colorOptions = getProperty(this.getOptions(), 'color')
		this._colorScale = getColorScale(this.getDisplayData(), colorOptions)
	}
}
