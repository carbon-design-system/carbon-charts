import { type BarChartOptions, type ChartTabularData, ScaleTypes, Alignments } from '@carbon/charts-react'

const vanilla = 'SimpleBarChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-bar-chart',
	vue: `Ccv${vanilla}`
}

const simpleBarOptions: BarChartOptions = {
	title: 'Vertical simple bar (discrete)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		}
	}
}

const simpleBarColorOverrideOptions: BarChartOptions = {
	title: 'Custom colors (simple bar)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'group'
		}
	},
	color: {
		pairing: {
			option: 2
		},
		scale: {
			Qty: '#925699',
			Misc: '#525669'
		}
	}
}

const simpleBarCustomLegendOrderOptions: BarChartOptions = {
	title: 'Custom legend order (simple bar)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		}
	},
	legend: {
		order: ['Restocking', 'Misc', 'Sold', 'Qty', 'More']
	}
}

const simpleBarAdditionalLegendItemsOptions: BarChartOptions = {
	title: 'Additional legend items (simple bar)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		}
	},
	legend: {
		additionalItems: [
			{
				type: 'line',
				name: 'Line'
			},
			{
				type: 'area',
				name: 'Poor area'
			},
			{
				type: 'area',
				name: 'Satisfactory area'
			},
			{
				type: 'area',
				name: 'Great area'
			},
			{
				type: 'quartile',
				name: 'Quartiles'
			},
			{
				type: 'size',
				name: 'Size'
			},
			{
				type: 'radius',
				name: 'Radius'
			}
		]
	}
}

const simpleBarOptionsCustomTicks: BarChartOptions = {
	title: 'Custom ticks (simple bar)',
	axes: {
		left: {
			mapsTo: 'value',
			ticks: {
				values: [0, 1.2, 1.3, 2]
			}
		},
		bottom: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		}
	}
}

const simpleBarCenteredLegendOptions: BarChartOptions = {
	title: 'Centered legend (simple bar)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		}
	},
	legend: {
		alignment: Alignments.CENTER
	}
}

const simpleBarFixedDomainOptions: BarChartOptions = {
	title: 'Custom domain (simple bar)',
	axes: {
		left: {
			mapsTo: 'value',
			domain: [-100000, 100000]
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'group'
		}
	}
}

const simpleHorizontalBarOptions: BarChartOptions = {
	title: 'Horizontal simple bar (discrete)',
	axes: {
		left: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		},
		bottom: {
			mapsTo: 'value'
		}
	}
}

// const simpleHorizontalBarCenteredLegendOptions: BarChartOptions = {
// 	title: 'Horizontal simple bar (centered legend)',
// 	axes: {
// 		left: {
// 			mapsTo: 'group',
// 			scaleType: ScaleTypes.LABELS
// 		},
// 		bottom: {
// 			mapsTo: 'value'
// 		}
// 	},
// 	legend: {
// 		alignment: Alignments.CENTER
// 	}
// }

const simpleHorizontalBarLongLabelOptions: BarChartOptions = {
	title: 'Truncated labels (simple bar)',
	axes: {
		left: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS,
			truncation: {
				type: 'mid_line',
				threshold: 10,
				numCharacter: 14
			}
		},
		bottom: {
			mapsTo: 'value'
		}
	},
	legend: {
		truncation: {
			type: 'mid_line',
			threshold: 15,
			numCharacter: 12
		}
	}
}

const simpleBarTimeSeriesOptions: BarChartOptions = {
	title: 'Vertical simple bar (time series)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		}
	}
}

// More complete in that it reformats everything to Turkish - both axes and tooltip
// const simpleBarTurkishLocaleOptions: BarChartOptions = {
// 	title: 'Turkish locale',
// 	axes: {
// 		left: {
// 			mapsTo: 'value'
// 		},
// 		bottom: {
// 			mapsTo: 'date',
// 			scaleType: ScaleTypes.TIME
// 		}
// 	},
// 	locale: {
// 		code: 'tr-TR'
// 	}
// }

// using locale interface to reformat everything to Arabic
// const simpleBarArabicLocaleOptions: BarChartOptions = {
// 	title: 'Arabic locale',
// 	axes: {
// 		left: {
// 			mapsTo: 'value'
// 		},
// 		bottom: {
// 			mapsTo: 'date',
// 			scaleType: ScaleTypes.TIME
// 		}
// 	},
// 	locale: {
// 		code: 'ar-SA'
// 	}
// }

// using locale interface to reformat everything to Iranian
// const simpleBarIranianLocaleOptions: BarChartOptions = {
// 	title: 'Iranian locale',
// 	axes: {
// 		left: {
// 			mapsTo: 'value'
// 		},
// 		bottom: {
// 			mapsTo: 'date',
// 			scaleType: ScaleTypes.TIME
// 		}
// 	},
// 	locale: {
// 		code: 'fa-IR'
// 	}
// }

// using locale interface to reformat everything to Japanese
const simpleBarJapaneseLocaleOptions: BarChartOptions = {
	title: 'Japanese locale',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		}
	},
	locale: {
		code: 'ja-JP'
	}
}

// using locale interface to reformat everything to Hindi
// const simpleBarHindiLocaleOptions: BarChartOptions = {
// 	title: 'Hindi locale',
// 	axes: {
// 		left: {
// 			mapsTo: 'value'
// 		},
// 		bottom: {
// 			mapsTo: 'date',
// 			scaleType: ScaleTypes.TIME
// 		}
// 	},
// 	locale: {
// 		code: 'hi-IN'
// 	}
// }

// using locale interface to reformat everything to Bangla
// const simpleBarBanglaLocaleOptions: BarChartOptions = {
// 	title: 'Bangla locale',
// 	axes: {
// 		left: {
// 			mapsTo: 'value'
// 		},
// 		bottom: {
// 			mapsTo: 'date',
// 			scaleType: ScaleTypes.TIME
// 		}
// 	},
// 	locale: {
// 		code: 'bn-BD'
// 	}
// }

// Horizontal simple time series
const simpleHorizontalBarTimeSeriesOptions: BarChartOptions = {
	title: 'Horizontal simple bar (time series)',
	axes: {
		left: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		bottom: {
			mapsTo: 'value'
		}
	}
}

// Vertical simple time series with dense data
const simpleBarTimeSeriesDenseOptions: BarChartOptions = {
	title: 'Vertical simple bar (time series - dense data, Turkish)',
	axes: {
		left: {
			mapsTo: 'value',
			ticks: {
				formatter: (ticks: number) => ticks.toLocaleString('tr-TR')
			}
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME,
			ticks: {
				formatter: (ticks: Date) =>
					ticks.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })
			}
		}
	},
	tooltip: {
		valueFormatter: (value: any, category: string) => {
			if (category == 'x-value')
				return value.toLocaleDateString('tr-TR', { month: 'long', day: 'numeric' })
			if (category == 'y-value') return value.toLocaleString('tr-TR')
			return value
		}
	},
	bars: { maxWidth: 200 }
}

const floatingHorizontalBarTimeSeriesOptions: BarChartOptions = {
	title: 'Horizontal floating bar (time series)',
	axes: {
		left: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		bottom: {
			mapsTo: 'value'
		}
	}
}

const simpleBarEmptyStateOptions: BarChartOptions = {
	title: 'Vertical simple bar (empty state)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	}
}

const simpleBarSkeletonOptions: BarChartOptions = {
	title: 'Vertical simple bar (skeleton)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	},
	data: {
		loading: true
	}
}

const simpleHorizontalBarEmptyStateOptions: BarChartOptions = {
	title: 'Horizontal simple bar (empty state)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	}
}

const simpleHorizontalBarSkeletonOptions: BarChartOptions = {
	title: 'Horizontal simple bar (skeleton)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	},
	data: {
		loading: true
	}
}

const floatingBarOptions: BarChartOptions = {
	title: 'Floating vertical bar (discrete)',
	axes: {
		left: {
			mapsTo: 'value',
			includeZero: false
		},
		bottom: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		}
	}
}

const floatingHorizontalBarOptions: BarChartOptions = {
	title: 'Floating horizontal bar (discrete)',
	axes: {
		left: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		},
		bottom: {
			mapsTo: 'value',
			includeZero: false
		}
	}
}

// Simple bar
const simpleBarData = [
	{ group: 'Qty', value: 65000 },
	{ group: 'More', value: 29123 },
	{ group: 'Sold', value: 35213 },
	{ group: 'Restocking', value: 51213 },
	{ group: 'Misc', value: 16932 }
]

// Simple bar with custom tick values
const simpleBarDataCustomTicks = [
	{ group: 'Group 1', value: 0.5 },
	{ group: 'Group 2', value: 2 }
]

const noData: ChartTabularData = []

const simpleBarCenteredLegendData: ChartTabularData = simpleBarData

const simpleHorizontalBarData: ChartTabularData = simpleBarData

const simpleHorizontalBarLongLabelData: ChartTabularData = [
	{
		group: '6591DA8668C339B1B39297C61091E320C35391AB7AFC15B469F96B8A2DD0C231',
		value: 65000
	},
	{
		group: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 29123
	},
	{
		group: '232D788298773BB389DBB8FCE44D3FB4E878879BE7AFB0B303BCE0D56EBB92E2',
		value: 35213
	},
	{
		group: '58B01AADFA87E5547A218B3C6CE3AF07B8DF7BAB9E12BF60FD2BBB739C46B86E',
		value: 51213
	},
	{ group: 'Qty', value: 16932 }
]

// const simpleHorizontalBarCenteredLegendData: ChartTabularData = simpleBarData

const simpleBarTimeSeriesData = [
	{ group: 'Qty', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'More', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Sold', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Restocking', date: new Date(2019, 0, 6), value: 49213 },
	{ group: 'Misc', date: new Date(2019, 0, 7), value: 51213 }
]

const simpleBarTimeSeriesDenseData: ChartTabularData = [
	{ group: 'data', date: new Date(2019, 1, 1, 10, 10, 0), value: 10000 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 12, 4), value: 20001 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 14, 8), value: 10002 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 15, 8), value: 10062 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 17, 12), value: 30003 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 18, 16), value: 20004 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 19, 20), value: 10005 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 22, 24), value: 50006 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 24, 24), value: 20006 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 26, 28), value: 40007 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 27, 32), value: 30008 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 30, 36), value: 10000 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 32, 36), value: 10000 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 35, 40), value: 20000 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 36, 44), value: 10000 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 37, 48), value: 30000 },
	{ group: 'data', date: new Date(2019, 1, 1, 10, 40, 52), value: 10000 }
]

const simpleBarLocaleData: ChartTabularData = simpleBarTimeSeriesData

const simpleHorizontalBarTimeSeriesData: ChartTabularData = simpleBarTimeSeriesData

// Horizontal floating time series
const floatingHorizontalBarTimeSeriesData: ChartTabularData = [
	{ group: 'Qty', date: new Date(2019, 0, 1), value: [10000, 41000] },
	{ group: 'More', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Sold', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Restocking', date: new Date(2019, 0, 6), value: [22000, 69213] },
	{ group: 'Misc', date: new Date(2019, 0, 7), value: [3500, 71213] }
]

// floating bars
const floatingBarData: ChartTabularData = [
	{ group: 'Qty', value: [30000, 65000] },
	{ group: 'More', value: [15000, 29123] },
	{ group: 'Sold', value: [22000, 35213] },
	{ group: 'Restocking', value: [28000, 51213] },
	{ group: 'Misc', value: [3000, 16932] }
]

const floatingHorizontalBarData: ChartTabularData = [
	{ group: 'Qty', value: [30000, 65000] },
	{ group: 'More', value: [15000, 29123] },
	{ group: 'Sold', value: [22000, 35213] },
	{ group: 'Restocking', value: [28000, 51213] },
	{ group: 'Misc', value: [3000, 36932] }
]

export const examples = [
  {
    options: simpleBarOptions,
    data: simpleBarData
  },
  {
    options: simpleBarTimeSeriesOptions,
    data: simpleBarTimeSeriesData
  },
  {
    options: simpleBarTimeSeriesDenseOptions,
    data: simpleBarTimeSeriesDenseData
  },
  {
    options: simpleBarSkeletonOptions,
    data: noData
  },
  {
    options: simpleBarEmptyStateOptions,
    data: noData
  },
  {
    options: simpleHorizontalBarOptions,
    data: simpleHorizontalBarData
  },
  {
    options: simpleHorizontalBarTimeSeriesOptions,
    data: simpleHorizontalBarTimeSeriesData
  },
  // {
  //   options: simpleHorizontalBarEmptyStateOptions,
  //   data: noData
  // },
  // {
  //   options: simpleHorizontalBarSkeletonOptions,
  //   data: noData
  // },
  {
    options: floatingHorizontalBarTimeSeriesOptions,
    data: floatingHorizontalBarTimeSeriesData
  },
  {
    options: floatingBarOptions,
    data: floatingBarData
  },
  {
    options: floatingHorizontalBarOptions,
    data: floatingHorizontalBarData
  },
	{
		data: simpleBarDataCustomTicks,
		options: simpleBarOptionsCustomTicks
	},
  {
    data: simpleBarData,
    options: simpleBarFixedDomainOptions
  },
  {
    data: simpleBarData,
    options: simpleBarColorOverrideOptions
  },
  {
    data: simpleBarCenteredLegendData,
    options: simpleBarCenteredLegendOptions
  },
  {
    data: simpleBarData,
    options: simpleBarCustomLegendOrderOptions
  },
  {
    options: simpleBarAdditionalLegendItemsOptions,
    data: simpleBarData
  },
  // {
  //   options: simpleBarTurkishLocaleOptions,
  //   data: simpleBarLocaleData
  // },
  // {
  //   options: simpleBarArabicLocaleOptions,
  //   data: simpleBarLocaleData
  // },
  // {
  //   options: simpleBarIranianLocaleOptions,
  //   data: simpleBarLocaleData
  // },
  {
    options: simpleBarJapaneseLocaleOptions,
    data: simpleBarLocaleData
  },
  // {
  //   options: simpleBarHindiLocaleOptions,
  //   data: simpleBarLocaleData
  // },
  // {
  //   options: simpleBarBanglaLocaleOptions,
  //   data: simpleBarLocaleData
  // },
  {
    options: simpleHorizontalBarLongLabelOptions,
    data: simpleHorizontalBarLongLabelData
  },
  {
    options: simpleHorizontalBarEmptyStateOptions,
    data: noData
  },
  {
    options: simpleHorizontalBarSkeletonOptions,
    data: noData
  }
]