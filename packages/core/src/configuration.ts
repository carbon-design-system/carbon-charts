import { enUS as localeObject } from 'date-fns/locale'
import { merge } from 'lodash-es'
import { circlePack } from './configuration-non-customizable'

import type {
	AlluvialChartOptions,
	AreaChartOptions,
	AxisChartOptions,
	BarChartOptions,
	BaseChartOptions,
	BoxplotChartOptions,
	BubbleChartOptions,
	BulletChartOptions,
	ChoroplethChartOptions,
	CirclePackChartOptions,
	ComboChartOptions,
	DonutChartOptions,
	GaugeChartOptions,
	HeatmapChartOptions,
	HistogramChartOptions,
	LollipopChartOptions,
	LineChartOptions,
	MeterChartOptions,
	PieChartOptions,
	ProportionalMeterChartOptions,
	RadarChartOptions,
	ScatterChartOptions,
	StackedBarChartOptions,
	ThematicChartOptions,
	TreeChartOptions,
	TreemapChartOptions,
	WordCloudChartTooltipOptions,
	WordCloudChartOptions
} from '@/interfaces/charts'
import {
	Alignments,
	GaugeTypes,
	LegendPositions,
	TruncationTypes,
	ToolbarControlTypes,
	ZoomBarTypes,
	LegendItemType,
	TreeTypes,
	DividerStatus,
	Projection,
	ChartTheme
} from '@/interfaces/enums'
import type { AxesOptions, AxisOptions, TimeScaleOptions } from '@/interfaces/axis-scales'
import type {
	GridOptions,
	RulerOptions,
	TooltipOptions,
	LegendOptions,
	StackedBarOptions,
	ToolbarOptions,
	ZoomBarsOptions,
	Locale
} from '@/interfaces/components'

/*
 *****************************
 * User configurable options *
 *****************************
 */

/**
 * Default truncation configuration
 */
const standardTruncationOptions = {
	type: TruncationTypes.END_LINE,
	threshold: 16,
	numCharacter: 14
}

/**
 * Locale options
 */
const locale: Locale = {
	code: (typeof navigator !== 'undefined' && navigator?.language) || 'en-US', // read from browser's navigator.language
	number: (value, language = navigator?.language || 'en-US') => value?.toLocaleString?.(language), // based on code property if specified
	date: (
		value,
		language = navigator?.language || 'en-US',
		options = {},
		preformattedLocaleValue = null
	) =>
		preformattedLocaleValue ? preformattedLocaleValue : value.toLocaleDateString(language, options), // based on code property if specified
	time: (
		value,
		language = navigator?.language || 'en-US',
		options = {},
		preformattedLocaleValue = null
	) =>
		preformattedLocaleValue ? preformattedLocaleValue : value.toLocaleTimeString(language, options), // based on code property if specified
	optionsObject: {
		'15seconds': {
			primary: {
				'MMM d, pp': {
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: '2-digit',
					second: '2-digit',
					hourCycle: 'h12'
				},
				'MMM d, h:mm:ss.SSS a': {
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: '2-digit',
					fractionalSecondDigits: 3,
					hourCycle: 'h12'
				}
			},
			secondary: {
				pp: {
					hour: 'numeric',
					minute: '2-digit',
					second: '2-digit',
					hourCycle: 'h12'
				},
				'h:mm:ss.SSS a': {
					hour: 'numeric',
					minute: '2-digit',
					fractionalSecondDigits: 3,
					hourCycle: 'h12'
				}
			},
			type: 'time'
		},
		minute: {
			primary: {
				'MMM d, p': {
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: '2-digit',
					hourCycle: 'h12'
				}
			},
			secondary: {
				p: {
					hour: 'numeric',
					minute: '2-digit',
					hourCycle: 'h12'
				}
			},
			type: 'time'
		},
		'30minutes': {
			primary: {
				'MMM d, p': {
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: '2-digit',
					hourCycle: 'h12'
				}
			},
			secondary: {
				p: {
					hour: 'numeric',
					minute: '2-digit',
					hourCycle: 'h12'
				}
			},
			type: 'time'
		},
		hourly: {
			primary: {
				'MMM d, hh a': {
					month: 'short',
					day: 'numeric',
					hour: '2-digit',
					hourCycle: 'h12'
				}
			},
			secondary: {
				'hh a': {
					hour: '2-digit',
					hourCycle: 'h12'
				}
			},
			type: 'time'
		},
		daily: {
			primary: {
				'MMM d': {
					month: 'short',
					day: 'numeric'
				}
			},
			secondary: {
				d: {
					day: 'numeric'
				}
			},
			type: 'date'
		},
		weekly: {
			primary: {
				'eee, MMM d': {
					weekday: 'short',
					month: 'short',
					day: 'numeric'
				}
			},
			secondary: {
				eee: {
					weekday: 'short'
				}
			},
			type: 'date'
		},
		monthly: {
			primary: {
				'MMM yyyy': {
					month: 'short',
					year: 'numeric'
				}
			},
			secondary: {
				MMM: {
					month: 'short'
				}
			},
			type: 'date'
		},
		quarterly: {
			primary: {},
			secondary: {},
			type: 'date'
		},
		yearly: {
			primary: {
				yyyy: {
					year: 'numeric'
				}
			},
			secondary: {
				yyyy: {
					year: 'numeric'
				}
			},
			type: 'date'
		}
	},
	translations: {
		group: 'Group',
		total: 'Total',
		meter: {
			title: '' //default is emply string as meter title is dataset label
		},
		tabularRep: {
			title: 'Tabular representation',
			downloadAsCSV: 'Download as CSV'
		},
		toolbar: {
			exportAsCSV: 'Export to CSV',
			exportAsJPG: 'Export to JPG',
			exportAsPNG: 'Export to PNG',
			zoomIn: 'Zoom in',
			zoomOut: 'Zoom out',
			resetZoom: 'Reset zoom',
			moreOptions: 'More options',
			makeFullScreen: 'Make fullscreen',
			exitFullScreen: 'Exit fullscreen',
			showAsTable: 'Show as table'
		}
	}
}

/**
 * Legend options
 */
const legend: LegendOptions = {
	enabled: true,
	position: LegendPositions.BOTTOM,
	clickable: true,
	truncation: standardTruncationOptions,
	alignment: Alignments.LEFT,
	order: null,
	additionalItems: []
}

/**
 * Grid options
 */
export const grid: GridOptions = {
	x: {
		// set enable to false will not draw grid and stroke of grid backdrop
		enabled: true,
		numberOfTicks: 15,
		alignWithAxisTicks: false
	},
	y: {
		// set enable to false will not draw grid and stroke of grid backdrop
		enabled: true,
		numberOfTicks: 5,
		alignWithAxisTicks: false
	}
}

/**
 * Ruler options
 */
export const ruler: RulerOptions = {
	// enable or disable ruler
	enabled: true
}

/**
 * Tooltip options
 */
export const baseTooltip: TooltipOptions = {
	enabled: true,
	showTotal: true,
	truncation: standardTruncationOptions,
	groupLabel: 'Group'
}

// These options will be managed by merge()
// by removing the ones the user is not providing,
// and by TwoDimensionalAxes.
const axes: AxesOptions<AxisOptions> = {
	top: {
		visible: true,
		includeZero: true,
		truncation: standardTruncationOptions
	},
	bottom: {
		visible: true,
		includeZero: true,
		truncation: standardTruncationOptions
	},
	left: {
		visible: true,
		includeZero: true,
		truncation: standardTruncationOptions
	},
	right: {
		visible: true,
		includeZero: true,
		truncation: standardTruncationOptions
	}
}

export const timeScale: TimeScaleOptions = {
	addSpaceOnEdges: 1,
	showDayName: false,
	localeObject,
	timeIntervalFormats: {
		'15seconds': { primary: 'MMM d, pp', secondary: 'pp' },
		minute: { primary: 'MMM d, p', secondary: 'p' },
		'30minutes': { primary: 'MMM d, p', secondary: 'p' },
		hourly: { primary: 'MMM d, hh a', secondary: 'hh a' },
		daily: { primary: 'MMM d', secondary: 'd' },
		weekly: { primary: 'eee, MMM d', secondary: 'eee' },
		monthly: { primary: 'MMM yyyy', secondary: 'MMM' },
		quarterly: { primary: "QQQ ''yy", secondary: 'QQQ' },
		yearly: { primary: 'yyyy', secondary: 'yyyy' }
	}
}

let isFullScreenEnabled = false

try {
	isFullScreenEnabled =
		typeof document !== 'undefined' &&
		(document['fullscreenEnabled'] ||
			document['webkitFullscreenEnabled'] ||
			document['mozFullScreenEnabled'] ||
			document['msFullscreenEnabled'])
} catch (e) {
	// some environments block access to fullscreenEnabled
	console.warn('Fullscreen capabilities check failed: ', e.message)
}

/**
 * Base chart options common to any chart
 */
const chart: BaseChartOptions = {
	width: null,
	height: null,
	resizable: true,
	theme: ChartTheme.WHITE,
	tooltip: baseTooltip,
	legend,
	locale,
	style: {
		prefix: 'cc'
	},
	data: {
		groupMapsTo: 'group',
		loading: false,
		selectedGroups: []
	},
	color: {
		scale: null,
		pairing: {
			numberOfVariants: null,
			option: 1
		},
		gradient: {
			enabled: false
		}
	},
	toolbar: {
		enabled: true,
		numberOfIcons: 3,
		controls: [
			{
				type: ToolbarControlTypes.SHOW_AS_DATATABLE
			},
			...(isFullScreenEnabled
				? [
						{
							type: ToolbarControlTypes.MAKE_FULLSCREEN
						}
					]
				: []),
			{
				type: ToolbarControlTypes.EXPORT_CSV
			},
			{
				type: ToolbarControlTypes.EXPORT_PNG
			},
			{
				type: ToolbarControlTypes.EXPORT_JPG
			}
		]
	} as ToolbarOptions
}

/**
 * Options common to any thematic chart
 */
const thematicChart: ThematicChartOptions = merge({}, chart, {
	thematic: {
		projection: Projection.geoNaturalEarth1
	}
})

/**
 * Options common to any chart with an axis
 */
const axisChart: AxisChartOptions = merge({}, chart, {
	axes,
	timeScale,
	grid,
	ruler,
	zoomBar: {
		zoomRatio: 0.4,
		minZoomRatio: 0.01,
		top: {
			enabled: false,
			type: ZoomBarTypes.GRAPH_VIEW
		}
	} as ZoomBarsOptions
} as AxisChartOptions)

/**
 * options specific to simple bar charts
 */
const baseBarChart: BarChartOptions = merge({}, axisChart, {
	bars: {
		maxWidth: 16,
		spacingFactor: 0.25
	},
	timeScale: merge(timeScale, {
		addSpaceOnEdges: 1
	} as TimeScaleOptions)
} as BarChartOptions)

/**
 * options specific to simple bar charts
 */
const simpleBarChart: BarChartOptions = merge({}, baseBarChart, {} as BarChartOptions)

/**
 * options specific to simple bar charts
 */
const groupedBarChart: BarChartOptions = merge({}, baseBarChart, {} as BarChartOptions)

/**
 * options specific to stacked bar charts
 */
const stackedBarChart: StackedBarChartOptions = merge({}, baseBarChart, {
	bars: merge({}, baseBarChart.bars, {
		dividerSize: 1.5
	} as StackedBarOptions)
} as BarChartOptions)

/**
 * options specific to boxplot charts
 */
const boxplotChart: BoxplotChartOptions = merge({}, baseBarChart, {} as BarChartOptions)

/**
 * options specific to scatter charts
 */
const scatterChart: ScatterChartOptions = merge({}, axisChart, {
	points: {
		// default point radius to 4
		radius: 4,
		fillOpacity: 0.3,
		filled: true,
		enabled: true
	}
} as ScatterChartOptions)

/**
 * options specific to lollipop charts
 */
const lollipopChart: LollipopChartOptions = scatterChart as LollipopChartOptions

/**
 * options specific to line charts
 */
const lineChart: LineChartOptions = merge({}, scatterChart, {
	points: {
		// default point radius to 3
		radius: 3,
		filled: false,
		enabled: true
	}
} as LineChartOptions)

/**
 * options specific to area charts
 */
const areaChart: AreaChartOptions = merge({}, lineChart, {
	timeScale: merge(timeScale, {
		addSpaceOnEdges: 0
	} as TimeScaleOptions)
} as LineChartOptions)

/**
 * options specific to stacked area charts
 */
const stackedAreaChart = areaChart

/**
 * options specific to bubble charts
 */
const bubbleChart: BubbleChartOptions = merge({}, axisChart, {
	bubble: {
		radiusMapsTo: 'radius',
		radiusLabel: 'Radius',
		radiusRange: (chartSize: any) => {
			const smallerChartDimension = Math.min(chartSize.width, chartSize.height)
			return [(smallerChartDimension * 3) / 400, (smallerChartDimension * 25) / 400]
		},
		fillOpacity: 0.2,
		enabled: true
	},
	points: {
		filled: true
	},
	legend: {
		additionalItems: [
			{
				type: LegendItemType.RADIUS,
				name: 'Radius'
			}
		]
	}
} as BubbleChartOptions)

/**
 * options specific to bullet charts
 */
const bulletChart: BulletChartOptions = merge({}, axisChart, {
	bullet: {
		performanceAreaTitles: ['Poor', 'Satisfactory', 'Great']
	},
	grid: {
		x: {
			enabled: false
		},
		y: {
			enabled: false
		}
	},
	legend: {
		additionalItems: [
			{
				type: LegendItemType.AREA,
				name: 'Poor area'
			},
			{
				type: LegendItemType.AREA,
				name: 'Satisfactory area'
			},
			{
				type: LegendItemType.AREA,
				name: 'Great area'
			},
			{
				type: LegendItemType.QUARTILE,
				name: 'Quartiles'
			}
		]
	}
} as BulletChartOptions)

/**
 * options specific to stacked bar charts
 */
const histogramChart: HistogramChartOptions = merge({}, baseBarChart, {
	bars: {
		dividerSize: 1.5
	} as StackedBarOptions,
	timeScale: merge(timeScale, {
		addSpaceOnEdges: 0
	} as TimeScaleOptions)
} as BarChartOptions)

/*
 * options specific to word cloud charts
 */
const wordCloudChart: WordCloudChartOptions = merge({}, chart, {
	tooltip: merge({}, baseTooltip, {
		wordLabel: 'Word',
		valueLabel: 'Value'
	}) as WordCloudChartTooltipOptions,
	wordCloud: {
		fontSizeMapsTo: 'value',
		fontSizeRange: (chartSize: any) => {
			const smallerChartDimension = Math.min(chartSize.width, chartSize.height)
			return [(smallerChartDimension * 20) / 400, (smallerChartDimension * 75) / 400]
		},
		wordMapsTo: 'word'
	}
} as WordCloudChartOptions)

/**
 * options specific to pie charts
 */
const pieChart: PieChartOptions = merge({}, chart, {
	pie: {
		labels: {
			formatter: null,
			enabled: true
		},
		alignment: Alignments.LEFT,
		sortFunction: null,
		valueMapsTo: 'value'
	}
} as PieChartOptions)

/**
 * options specific to gauge charts
 */
const gaugeChart: GaugeChartOptions = merge({}, chart, {
	legend: {
		enabled: false
	},
	gauge: {
		type: GaugeTypes.SEMI,
		arcWidth: 16,
		deltaArrow: {
			size: (radius: number) => radius / 8,
			enabled: true
		},
		showPercentageSymbol: true,
		status: null,
		numberSpacing: 10,
		deltaFontSize: (radius: number) => radius / 8,
		valueFontSize: (radius: number) => radius / 2.5,
		alignment: Alignments.LEFT
	}
} as GaugeChartOptions)

/**
 * options specific to donut charts
 */
const donutChart: DonutChartOptions = merge({}, pieChart, {
	donut: {
		center: {
			numberFontSize: radius => `${Math.min((radius / 100) * 24, 24)}px`,
			titleFontSize: radius => `${Math.min((radius / 100) * 15, 15)}px`,
			titleYPosition: radius => Math.min((radius / 80) * 20, 20)
		},
		alignment: Alignments.LEFT
	}
} as DonutChartOptions)

const meterChart: MeterChartOptions = merge({}, chart, {
	legend: {
		enabled: false,
		clickable: false
	},
	meter: {
		showLabels: true,
		proportional: null,
		statusBar: {
			percentageIndicator: {
				enabled: true
			}
		}
	}
} as MeterChartOptions)

const proportionalMeterChart: ProportionalMeterChartOptions = merge({}, meterChart, {
	legend: {
		enabled: true
	}
} as MeterChartOptions)

/**
 * options specific to radar charts
 */
const radarChart: RadarChartOptions = merge({}, chart, {
	radar: {
		axes: {
			angle: 'key',
			value: 'value'
		},
		alignment: Alignments.LEFT
	},
	tooltip: {
		gridline: {
			enabled: true
		}
	}
} as RadarChartOptions)

/**
 * options specific to combo charts
 */
const comboChart: ComboChartOptions = merge({}, baseBarChart, {
	comboChartTypes: []
} as ComboChartOptions)

/*
 * options specific to tree charts
 */
const treeChart: TreeChartOptions = merge(
	{
		tree: {
			type: TreeTypes.TREE
		}
	},
	chart,
	{} as TreeChartOptions
)

/*
 * options specific to treemap charts
 */
const treemapChart: TreemapChartOptions = merge({}, chart, {
	data: merge(chart.data, {
		groupMapsTo: 'name'
	})
} as TreemapChartOptions)

/*
 * options specific to circle pack charts
 */
const circlePackChart: CirclePackChartOptions = merge({}, chart, circlePack, {
	data: merge(chart.data, {
		groupMapsTo: 'name'
	})
} as CirclePackChartOptions)

const alluvialChart: AlluvialChartOptions = merge({}, chart, {
	alluvial: {
		data: merge(chart.data, {
			groupMapsTo: 'source'
		}),
		nodeAlignment: Alignments.CENTER,
		nodePadding: 24,
		monochrome: false,
		nodes: []
	}
} as AlluvialChartOptions)

const heatmapChart: HeatmapChartOptions = merge({}, chart, {
	axes,
	heatmap: {
		divider: {
			state: DividerStatus.AUTO
		},
		colorLegend: {
			type: 'linear'
		}
	}
} as HeatmapChartOptions)

const choroplethChart: ChoroplethChartOptions = merge({}, thematicChart, {
	choropleth: {
		colorLegend: {
			type: 'linear'
		}
	}
} as ChoroplethChartOptions)

export const options = {
	alluvialChart,
	areaChart,
	axisChart,
	boxplotChart,
	bubbleChart,
	bulletChart,
	chart,
	circlePackChart,
	choroplethChart,
	comboChart,
	donutChart,
	gaugeChart,
	groupedBarChart,
	heatmapChart,
	histogramChart,
	lineChart,
	lollipopChart,
	meterChart,
	pieChart,
	proportionalMeterChart,
	radarChart,
	scatterChart,
	simpleBarChart,
	stackedAreaChart,
	stackedBarChart,
	thematicChart,
	treeChart,
	treemapChart,
	wordCloudChart
}

export {
	alluvial,
	area,
	axis,
	boxplot,
	canvasZoomSettings,
	carbonPrefix,
	circlePack,
	color,
	defaultLegendAdditionalItems,
	heatmap,
	histogram,
	legend,
	lines,
	meter,
	pie,
	radar,
	spacers,
	tooltips,
	transitions,
	toolbar,
	zoomBar
} from './configuration-non-customizable'
