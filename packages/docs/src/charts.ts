// Consolidate chart types, options and data for tests for the other packages
import { chartTypes as alluvialTypes, examples as alluvialExamples } from './lib/alluvial'
import { chartTypes as areaTypes, examples as areaExamples } from './lib/area'
import {
	chartTypesStacked as areaStackedTypes,
	examplesStacked as areaStackedExamples
} from './lib/area/examplesStacked'
import { chartTypes as barTypes, examples as barExamples } from './lib/bar'
import {
	chartTypesGrouped as barGroupedTypes,
	examplesGrouped as barGroupedExamples
} from './lib/bar/examplesGrouped'
import {
	chartTypesStacked as barStackedTypes,
	examplesStacked as barStackedExamples
} from './lib/bar/examplesStacked'
import { chartTypes as boxplotTypes, examples as boxplotExamples } from './lib/boxplot'
import { chartTypes as bubbleTypes, examples as bubbleExamples } from './lib/bubble'
import { chartTypes as bulletTypes, examples as bulletExamples } from './lib/bullet'
import { chartTypes as choroplethTypes, examples as choroplethExamples } from './lib/choropleth'
import { chartTypes as circlepackTypes, examples as circlepackExamples } from './lib/circlepack'
import { chartTypes as comboTypes, examples as comboExamples } from './lib/combo'
import { chartTypes as donutTypes, examples as donutExamples } from './lib/donut'
import { chartTypes as gaugeTypes, examples as gaugeExamples } from './lib/gauge'
import { chartTypes as heatmapTypes, examples as heatmapExamples } from './lib/heatmap'
import { chartTypes as histogramTypes, examples as histogramExamples } from './lib/histogram'
import { chartTypes as lineTypes, examples as lineExamples } from './lib/line'
import { chartTypes as lollipopTypes, examples as lollipopExamples } from './lib/lollipop'
import { chartTypes as meterTypes, examples as meterExamples } from './lib/meter'
import { chartTypes as pieTypes, examples as pieExamples } from './lib/pie'
import { chartTypes as radarTypes, examples as radarExamples } from './lib/radar'
import { chartTypes as scatterTypes, examples as scatterExamples } from './lib/scatter'
import { chartTypes as treeTypes, examples as treeExamples } from './lib/tree'
import { chartTypes as treemapTypes, examples as treemapExamples } from './lib/treemap'
import { chartTypes as wordcloudTypes, examples as wordcloudExamples } from './lib/wordcloud'

const charts = [
	{
		types: alluvialTypes,
		examples: alluvialExamples
	},
	{
		types: areaTypes,
		examples: areaExamples
	},
	{
		types: areaStackedTypes,
		examples: areaStackedExamples
	},
	{
		types: barTypes,
		examples: barExamples
	},
	{
		types: barGroupedTypes,
		examples: barGroupedExamples
	},
	{
		types: barStackedTypes,
		examples: barStackedExamples
	},
	{
		types: boxplotTypes,
		examples: boxplotExamples
	},
	{
		types: bubbleTypes,
		examples: bubbleExamples
	},
	{
		types: bulletTypes,
		examples: bulletExamples
	},
	{
		types: choroplethTypes,
		examples: choroplethExamples
	},
	{
		types: circlepackTypes,
		examples: circlepackExamples
	},
	{
		types: comboTypes,
		examples: comboExamples
	},
	{
		types: donutTypes,
		examples: donutExamples
	},
	{
		types: gaugeTypes,
		examples: gaugeExamples
	},
	{
		types: heatmapTypes,
		examples: heatmapExamples
	},
	{
		types: histogramTypes,
		examples: histogramExamples
	},
	{
		types: lineTypes,
		examples: lineExamples
	},
	{
		types: lollipopTypes,
		examples: lollipopExamples
	},
	{
		types: meterTypes,
		examples: meterExamples
	},
	{
		types: pieTypes,
		examples: pieExamples
	},
	{
		types: radarTypes,
		examples: radarExamples
	},
	{
		types: scatterTypes,
		examples: scatterExamples
	},
	{
		types: treeTypes,
		examples: treeExamples
	},
	{
		types: treemapTypes,
		examples: treemapExamples
	},
	{
		types: wordcloudTypes,
		examples: wordcloudExamples
	}
]

export default charts

export function filterByTag(tag: string) {
	return charts
		.map(chart => ({
			...chart,
			examples: chart.examples.filter(example => example.tags && example.tags.includes(tag))
		}))
		.filter(chart => chart.examples.length > 0)
}
