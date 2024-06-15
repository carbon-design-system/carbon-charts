import {
	geoPath,
	line,
	// Azimuthal Projections - project the sphere directly on to the plane
	geoEqualEarth,
	// Conic projections - project the sphere onto a cone & unroll into the plane
	geoAlbers,
	geoConicEqualArea,
	geoConicEquidistant,
	// Cylindrical projections - project the sphere onto a containing cylinder & unroll onto the plane
	geoEquirectangular,
	geoMercator,
	geoNaturalEarth1
} from 'd3'
import { feature, merge } from 'topojson-client'
import type { GeometryObject } from 'topojson-specification'
import { Component } from '@/components'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { getProperty } from '@/tools'
import { RenderTypes, Projection } from '@/interfaces/enums'
import { ChoroplethModel } from '@/model'

export class GeoProjection extends Component {
	type = 'geo'
	renderType = RenderTypes.SVG

	render() {
		const svg = this.getComponentContainer({ withinChartClip: true })
		const { width, height } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true
		})

		// Because of a Firefox bug with regard to sizing & d3 packs,
		// rather than checking if height or width aren't 0,
		// we have to make sure they're not smaller than 1
		if (width < 1 || height < 1) {
			return
		}

		// Get users projection
		const projection = this.getProjection()

		const geoData = getProperty(this.getOptions(), 'geoData')

		const data = (this.model as ChoroplethModel).getCombinedData()

		// Separate countries that have data & countries with missing data
		const withData = {}
		const withoutData = {}
		Object.keys(data).forEach(element => {
			if (typeof data[element].value === 'number') {
				withData[element] = data[element]
			} else {
				withoutData[element] = data[element]
			}
		})

		// Merge all without data
		const withoutDataMerge = merge(geoData, Object.values(withoutData))

		/**
		 * @todo - Currently only topojson is supported
		 *
		 * Unlike geojson, topojson does not have a standard format
		 * So data must be nested in the following format:
		 * options : {
		 * 	geoData: {
		 *  	objects: {
		 * 			...
		 * 		}
		 *  }
		 * }
		 */
		// Convert from topojson to geojson
		const json = feature(geoData, {
			// We need to specify that we are converting geometry collections
			type: 'GeometryCollection',
			geometries: Object.values(withData) as GeometryObject<{ [name: string]: any }>[]
		})

		// Depending on the projection selected, we will need to scale/translate accordingly
		const projectionScale = projection.fitSize([width, height], json)
		const geo = geoPath().projection(projectionScale)

		const borders = DOMUtils.appendOrSelect(svg, 'g.geo')
		borders.selectAll('path').data(json.features).join('path').attr('d', geo)

		const patternID = this.services.domUtils.generateElementIDString(`geo-pattern-stripes`)

		// Create a striped pattern for missing data
		const defs = DOMUtils.appendOrSelect(svg, 'defs')
		DOMUtils.appendOrSelect(defs, 'pattern')
			.attr('id', patternID)
			.attr('width', 5)
			.attr('height', 10)
			.attr('patternUnits', 'userSpaceOnUse')
			.attr('patternTransform', 'rotate(45)')
			.append('path')
			.classed('pattern-fill', true)
			.attr(
				'd',
				line()([
					[0, 0],
					[0, 10]
				])
			)

		const missingBorders = DOMUtils.appendOrSelect(svg, 'g.missing-data')
		DOMUtils.appendOrSelect(missingBorders, 'path')
			.datum(withoutDataMerge)
			.attr('d', geo)
			.style('fill', `url(#${patternID})`)
	}

	/**
	 * Retrieves the D3 geographic projection based on the options provided.
	 *
	 * This method selects a geographic projection from the available D3 projections
	 * based on the `projection` property in the `thematic` options. If the projection
	 * is not supported or is missing, an error is thrown.
	 *
	 * @returns {d3.GeoProjection} - The D3 geographic projection corresponding to the selected option.
	 * @throws {Error} If the projection is not supported or is missing.
	 */
	getProjection() {
		let projection = null
		const projectionSelected = getProperty(this.getOptions(), 'thematic', 'projection')

		switch (projectionSelected) {
			// Azimuthal Projections
			case Projection.geoEqualEarth:
				projection = geoEqualEarth()
				break
			// Conic Projections
			case Projection.geoAlbers:
				projection = geoAlbers()
				break
			case Projection.geoConicEqualArea:
				projection = geoConicEqualArea()
				break
			case Projection.geoConicEquidistant:
				projection = geoConicEquidistant()
				break
			// Cyndrical projections
			case Projection.geoEquirectangular:
				projection = geoEquirectangular()
				break
			case Projection.geoMercator:
				projection = geoMercator()
				break
			case Projection.geoNaturalEarth1:
				projection = geoNaturalEarth1()
				break
			default:
				// Projection is missing or an unsupported projection value is passed
				throw new Error('Projection is not supported.')
				break
		}

		return projection
	}
}
