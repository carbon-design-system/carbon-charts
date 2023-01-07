// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { Tools } from '../../tools';
import { RenderTypes, Projection } from '../../interfaces';

// D3 imports
import { geoPath } from 'd3';
import { feature } from 'topojson-client';
import {
	// Azimuthal Projections - project the sphere directly on to the plane
	geoEqualEarth,
	// Conic projections - project the sphere onto a cone & unroll into the plane
	geoAlbers,
	geoConicEqualArea,
	geoConicEquidistant,
	// Cylindrical projections - project the sphere onto a containing cylinder & unroll onto the plane
	geoEquirectangular,
	geoMercator,
	geoNaturalEarth1,
} from 'd3-geo';

export class GeoProjection extends Component {
	type = 'geo';
	renderType = RenderTypes.SVG;

	render() {
		const svg = this.getComponentContainer({ withinChartClip: true });
		const { width, height } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true,
		});

		// Because of a Firefox bug with regards to sizing & d3 packs,
		// rather than checking if height or width aren't 0,
		// we have to make sure they're not smaller than 1
		if (width < 1 || height < 1) {
			return;
		}

		const options = this.model.getOptions();

		// Get users projection
		const projection = this.getProjection();

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
		const json = feature(
			options.geoData,
			options.geoData.objects.countries
		);

		// Depending on the projection selected, we will need to scale/translate accordingly
		const projectionScale = projection.fitSize([width, height], json);
		const geo = geoPath().projection(projectionScale);

		const borders = DOMUtils.appendOrSelect(svg, 'g.geo');
		borders
			.selectAll('path')
			.data(json.features)
			.join('path')
			.attr('d', geo);
	}

	/**
	 * @info
	 * Depending on projection, we may need to provide additional configuration
	 * e.g. sizing
	 *
	 * In such case, function can be refactored so that
	 * projection should return an object with the configuraiton & function
	 */
	getProjection() {
		let projection = null;
		const projectionSelected = Tools.getProperty(
			this.getOptions(),
			'thematic',
			'projection'
		);

		switch (projectionSelected) {
			// Azimuthal Projections
			case Projection.geoEqualEarth:
				projection = geoEqualEarth();
				break;
			// Conic Projections
			case Projection.geoAlbers:
				projection = geoAlbers();
				break;
			case Projection.geoConicEqualArea:
				projection = geoConicEqualArea();
				break;
			case Projection.geoConicEquidistant:
				projection = geoConicEquidistant();
				break;
			// Cyndrical projections
			case Projection.geoEquirectangular:
				projection = geoEquirectangular();
				break;
			case Projection.geoMercator:
				projection = geoMercator();
				break;
			case Projection.geoNaturalEarth1:
				projection = geoNaturalEarth1();
				break;
			default:
				// Projection is missing or an unsupported projection value is passed
				throw new Error('Projection is not supported.');
				break;
		}

		return projection;
	}
}
