import { addZoomBarToOptions } from './zoom-bar'
import { boundedAreaTimeSeriesData } from './area'
import { ScaleTypes } from '@/interfaces'

export const highlightBoundedAreaTimeSeriesData = boundedAreaTimeSeriesData

export const boundedAreaTimeSeriesWithHighlightsOptions = {
	title: 'Bounded area (time series - natural curve)',
	legend: {
		enabled: false
	},
	bounds: {
		upperBoundMapsTo: 'max',
		lowerBoundMapsTo: 'min'
	},
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME,
			highlights: {
				highlightStartMapsTo: 'startHighlight',
				highlightEndMapsTo: 'endHighlight',
				labelMapsTo: 'label',
				data: [
					{
						startHighlight: new Date(2019, 0, 3),
						label: 'Custom formatter',
						endHighlight: new Date(2019, 0, 8)
					},
					{
						startHighlight: new Date(2019, 0, 13),
						label: 'Custom formatter',
						endHighlight: new Date(2019, 0, 14)
					}
				]
			}
		},
		left: {
			mapsTo: 'value',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveNatural'
}

export const boundedAreaTimeSeriesWithHighlightsZoomOptions = addZoomBarToOptions(
	Object.assign({}, boundedAreaTimeSeriesWithHighlightsOptions)
)
