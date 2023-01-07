import { worldTopoJson } from './topojson-110';

export const data = worldTopoJson.objects.countries.geometries.map(
	(country) => ({
		name: country.properties.NAME,
		id: country.properties.ADM0_ISO,
		value: Math.ceil(Math.random() * 100),
	})
);

export const options = {
	title: 'Geo data',
	geoData: worldTopoJson,
};

export const missingData = data.filter((country) => !(country.id === 'CAN'));
export const missingDataOptions = {
	title: 'Missing data',
	geoData: worldTopoJson,
};
