// Internal Imports
import { Component } from "@carbon/charts/src/components/component";

import mapboxgl from "mapbox-gl";

export class Map extends Component {
	type = "title";

	render() {
		console.log("RENDER TITLE");

		mapboxgl.accessToken = 'pk.eyJ1IjoiaWxpYWRtIiwiYSI6ImNrNGJwM2wxdTBmdmgzZmp6Z2ppcmxnaWYifQ.-nuo76OMryoLcs2dPbGfUQ';
		const map = new mapboxgl.Map({
			container: 'classy-tiled-map-chart-holder',
			style: 'mapbox://styles/iliadm/ck4bsqmax0sms1cpcr7zucb8x'
		});
	}
}
