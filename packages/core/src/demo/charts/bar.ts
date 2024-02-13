import { Alignments, ScaleTypes } from '@/interfaces'

export const groupedBarData = [
	{ group: 'Dataset 1', key: 'Qty', value: 65000 },
	{ group: 'Dataset 1', key: 'More', value: -29123 },
	{ group: 'Dataset 1', key: 'Sold', value: -35213 },
	{ group: 'Dataset 1', key: 'Restocking', value: 51213 },
	{ group: 'Dataset 1', key: 'Misc', value: 16932 },
	{ group: 'Dataset 2', key: 'Qty', value: 32432 },
	{ group: 'Dataset 2', key: 'More', value: -21312 },
	{ group: 'Dataset 2', key: 'Sold', value: -56456 },
	{ group: 'Dataset 2', key: 'Restocking', value: -21312 },
	{ group: 'Dataset 2', key: 'Misc', value: 34234 },
	{ group: 'Dataset 3', key: 'Qty', value: -12312 },
	{ group: 'Dataset 3', key: 'More', value: 23232 },
	{ group: 'Dataset 3', key: 'Sold', value: 34232 },
	{ group: 'Dataset 3', key: 'Restocking', value: -12312 },
	{ group: 'Dataset 3', key: 'Misc', value: -34234 },
	{ group: 'Dataset 4', key: 'Qty', value: -32423 },
	{ group: 'Dataset 4', key: 'More', value: 21313 },
	{ group: 'Dataset 4', key: 'Sold', value: 64353 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24134 },
	{ group: 'Dataset 4', key: 'Misc', value: 24134 }
]

export const groupedBarTimeSeriesData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 6), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 7), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1), value: 8000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2), value: 67000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3), value: 15000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 7), value: 45213 }
]

export const groupedBarTimeSeriesDenseData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 6), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 7), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 8), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 9), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 10), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 11), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 12), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 13), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 14), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 15), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 16), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 17), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 18), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 19), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 20), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 21), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 22), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 23), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 24), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 25), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 26), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 27), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 28), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 29), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 30), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 31), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1), value: 8000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2), value: 67000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3), value: 15000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 7), value: 45213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 8), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 9), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 10), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 11), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 12), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 13), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 14), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 16), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 17), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 18), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 19), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 20), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 21), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 22), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 23), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 24), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 25), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 26), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 27), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 28), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 29), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 30), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 31), value: 51213 }
]

export const groupedBarOptions = {
	title: 'Vertical grouped bar (discrete)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		}
	}
}

export const groupedBarSelectedGroupsData = groupedBarData

// Grouped bar with selected groups option
export const groupedBarSelectedGroupsOptions = {
	title: 'Pre-selected groups (grouped bar)',
	data: {
		selectedGroups: ['Dataset 1', 'Dataset 3']
	},
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		}
	}
}

// Horizontal Grouped
export const groupedHorizontalBarData = groupedBarData

export const groupedHorizontalBarOptions = {
	title: 'Horizontal grouped bar (discrete)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		bottom: {
			mapsTo: 'value'
		}
	}
}

// Vertical Grouped Time Series
export const groupedBarTimeSeriesOptions = {
	title: 'Vertical grouped bar (time series)',
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

// Horizontal Grouped Time Series
export const groupedBarHorizontalTimeSeriesOptions = {
	title: 'Horizontal grouped bar (time series)',
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

// Vertical Grouped time series with dense data
export const groupedBarTimeSeriesDenseOptions = {
	title: 'Vertical grouped bar (time series - dense data)',
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

// Simple bar
export const simpleBarData = [
	{ group: 'Qty', value: 65000 },
	{ group: 'More', value: 29123 },
	{ group: 'Sold', value: 35213 },
	{ group: 'Restocking', value: 51213 },
	{ group: 'Misc', value: 16932 }
]

export const simpleBarOptions = {
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

export const simpleBarColorOverrideOptions = {
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

export const simpleBarCustomLegendOrderOptions = {
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

export const simpleBarAdditionalLegendItemsOptions = {
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

// Simple bar with custom tick values
export const simpleBarDataCustomTicks = [
	{ group: 'Group 1', value: 0.5 },
	{ group: 'Group 2', value: 2 }
]

export const simpleBarOptionsCustomTicks = {
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

export const simpleBarCenteredLegendData = simpleBarData

export const simpleBarCenteredLegendOptions = {
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

export const simpleBarFixedDomainOptions = {
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

// Horizontal Simple
export const simpleHorizontalBarData = simpleBarData
export const simpleHorizontalBarLongLabelData = [
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

export const simpleHorizontalBarOptions = {
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

export const simpleHorizontalBarCenteredLegendData = simpleBarData

export const simpleHorizontalBarCenteredLegendOptions = {
	title: 'Horizontal simple bar (centered legend)',
	axes: {
		left: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		},
		bottom: {
			mapsTo: 'value'
		}
	},
	legend: {
		alignment: Alignments.CENTER
	}
}

export const simpleHorizontalBarLongLabelOptions = {
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

export const simpleBarTimeSeriesData = [
	{ group: 'Qty', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'More', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Sold', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Restocking', date: new Date(2019, 0, 6), value: 49213 },
	{ group: 'Misc', date: new Date(2019, 0, 7), value: 51213 }
]

export const simpleBarTimeSeriesDenseData = [
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

export const simpleBarTimeSeriesOptions = {
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

export const simpleBarTurkishLocaleData = simpleBarTimeSeriesData

// More complete in that it reformats everything to Turkish - both axes and tooltip
export const simpleBarTurkishLocaleOptions = {
	title: 'Turkish locale',
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
		code: 'tr-TR'
	}
}

//using locale interface to reformat everything to Arabic
export const simpleBarArabicLocaleOptions = {
	title: 'Arabic locale',
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
		code: 'ar-SA'
	}
}

//using locale interface to reformat everything to Iranian
export const simpleBarIranianLocaleOptions = {
	title: 'Iranian locale',
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
		code: 'fa-IR'
	}
}

//using locale interface to reformat everything to Japanese
export const simpleBarJapaneseLocaleOptions = {
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

//using locale interface to reformat everything to Hindi
export const simpleBarHindiLocaleOptions = {
	title: 'Hindi locale',
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
		code: 'hi-IN'
	}
}

//using locale interface to reformat everything to Bangla
export const simpleBarBanglaLocaleOptions = {
	title: 'Bangla locale',
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
		code: 'bn-BD'
	}
}

// Horizontal simple time series
export const simpleHorizontalBarTimeSeriesOptions = {
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
export const simpleBarTimeSeriesDenseOptions = {
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

export const simpleHorizontalBarTimeSeriesData = simpleBarTimeSeriesData

// Horizontal floating time series
export const floatingHorizontalBarTimeSeriesData = [
	{ group: 'Qty', date: new Date(2019, 0, 1), value: [10000, 41000] },
	{ group: 'More', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Sold', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Restocking', date: new Date(2019, 0, 6), value: [22000, 69213] },
	{ group: 'Misc', date: new Date(2019, 0, 7), value: [3500, 71213] }
]

export const floatingHorizontalBarTimeSeriesOptions = {
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

// Stacked bar
export const stackedBarData = [
	{ group: 'Dataset 1', key: 'Qty', value: 65000 },
	{ group: 'Dataset 1', key: 'More', value: 29123 },
	{ group: 'Dataset 1', key: 'Sold', value: 35213 },
	{ group: 'Dataset 1', key: 'Restocking', value: 51213 },
	{ group: 'Dataset 1', key: 'Misc', value: 16932 },
	{ group: 'Dataset 2', key: 'Qty', value: 32432 },
	{ group: 'Dataset 2', key: 'More', value: 21312 },
	{ group: 'Dataset 2', key: 'Sold', value: 56456 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21312 },
	{ group: 'Dataset 2', key: 'Misc', value: 34234 },
	{ group: 'Dataset 3', key: 'Qty', value: 12312 },
	{ group: 'Dataset 3', key: 'More', value: 23232 },
	{ group: 'Dataset 3', key: 'Sold', value: 34232 },
	{ group: 'Dataset 3', key: 'Restocking', value: 12312 },
	{ group: 'Dataset 3', key: 'Misc', value: 34234 },
	{ group: 'Dataset 4', key: 'Qty', value: 32423 },
	{ group: 'Dataset 4', key: 'More', value: 21313 },
	{ group: 'Dataset 4', key: 'Sold', value: 64353 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24134 },
	{ group: 'Dataset 4', key: 'Misc', value: 32423 }
]

export const stackedBarOptions = {
	title: 'Vertical stacked bar (discrete)',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		}
	}
}

export const stackedBarNegativeData = [
	{ group: 'Dataset 1', key: 'Qty', value: 65000 },
	{ group: 'Dataset 1', key: 'More', value: 29123 },
	{ group: 'Dataset 1', key: 'Sold', value: 35213 },
	{ group: 'Dataset 1', key: 'Restocking', value: 51213 },
	{ group: 'Dataset 1', key: 'Misc', value: 16932 },
	{ group: 'Dataset 2', key: 'Qty', value: 32432 },
	{ group: 'Dataset 2', key: 'More', value: 21312 },
	{ group: 'Dataset 2', key: 'Sold', value: 56456 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21312 },
	{ group: 'Dataset 2', key: 'Misc', value: 34234 },
	{ group: 'Dataset 3', key: 'Qty', value: 12312 },
	{ group: 'Dataset 3', key: 'More', value: 23232 },
	{ group: 'Dataset 3', key: 'Sold', value: 34232 },
	{ group: 'Dataset 3', key: 'Restocking', value: 12312 },
	{ group: 'Dataset 3', key: 'Misc', value: 34234 },
	{ group: 'Dataset 4', key: 'Qty', value: -32423 },
	{ group: 'Dataset 4', key: 'More', value: -21313 },
	{ group: 'Dataset 4', key: 'Sold', value: -64353 },
	{ group: 'Dataset 4', key: 'Restocking', value: -24134 },
	{ group: 'Dataset 4', key: 'Misc', value: -32423 }
]

export const stackedBarNegativeOptions = Object.assign({}, stackedBarOptions, {
	title: 'Vertical stacked bar (divergent)'
})

// horizontal stacked bar
export const stackedHorizontalBarData = stackedBarData

export const stackedHorizontalBarOptions = {
	title: 'Horizontal stacked bar (discrete)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {
			stacked: true
		}
	}
}

export const stackedBarTimeSeriesData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 5), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 8), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 13), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 17), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3), value: 75000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 57312 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 8), value: 21432 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15), value: 70323 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 19), value: 21300 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1), value: 50000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 5), value: 15000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 8), value: 20000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 13), value: 39213 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 17), value: 61213 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 2), value: 10 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 6), value: 37312 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 8), value: 51432 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 15), value: 40323 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 19), value: 31300 }
]

export const stackedBarTimeSeriesOptions = {
	title: 'Vertical stacked bar (time series)',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		}
	}
}

export const stackedBarShortIntervalTimeSeriesData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 111), value: 0 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 222), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 333), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 444), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 555), value: 0 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 111), value: 0 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 222), value: 57312 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 333), value: 21432 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 444), value: 70323 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 555), value: 0 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 111), value: 0 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 222), value: 15000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 333), value: 20000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 444), value: 39213 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 555), value: 0 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 111), value: 0 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 222), value: 37312 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 333), value: 51432 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 444), value: 40323 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 555), value: 0 }
]

export const stackedBarShortIntervalTimeSeriesOptions = {
	title: 'Vertical stacked bar (short interval time series)',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		}
	}
}

// demo with custom ticks
export const stackedBarTimeSeriesDataCustomTicks = stackedBarTimeSeriesData

export const stackedBarTimeSeriesOptionsCustomTicks = {
	title: 'Custom ticks (stacked bar)',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME,
			ticks: {
				values: [new Date(2019, 0, 17)]
			}
		}
	}
}

// Stacked horizontal bar (time series)
export const stackedHorizontalBarTimeSeriesOptions = {
	title: 'Horizontal stacked bar (time series)',
	axes: {
		left: {
			scaleType: ScaleTypes.TIME
		},
		bottom: {
			stacked: true
		}
	}
}

export const stackedHorizontalBarTimeSeriesData = stackedBarTimeSeriesData

// simple bar - empty state
export const simpleBarEmptyStateData: any[] = []
export const simpleBarEmptyStateOptions = {
	title: 'Vertical simple bar (empty state)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	}
}

// simple bar - skeleton
export const simpleBarSkeletonData: any[] = []
export const simpleBarSkeletonOptions = {
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

// grouped bar - empty state
export const groupedBarEmptyStateData: any[] = []
export const groupedBarEmptyStateOptions = {
	title: 'Vertical grouped bar (empty state)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	}
}

// grouped bar - skeleton
export const groupedBarSkeletonData: any[] = []
export const groupedBarSkeletonOptions = {
	title: 'Vertical grouped bar (skeleton)',
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

// stacked bar - empty state
export const stackedBarEmptyStateData: any[] = []
export const stackedBarEmptyStateOptions = {
	title: 'Vertical stacked bar (empty state)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	}
}

// stacked bar - skeleton
export const stackedBarSkeletonData: any[] = []
export const stackedBarSkeletonOptions = {
	title: 'Vertical stacked bar (skeleton)',
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

// simple horizontal bar - empty state
export const simpleHorizontalBarEmptyStateData: any[] = []
export const simpleHorizontalBarEmptyStateOptions = {
	title: 'Horizontal simple bar (empty state)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	}
}

// simple horizontal bar - skeleton
export const simpleHorizontalBarSkeletonData: any[] = []
export const simpleHorizontalBarSkeletonOptions = {
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

// grouped horizontal bar - empty state
export const groupedHorizontalBarEmptyStateData: any[] = []
export const groupedHorizontalBarEmptyStateOptions = {
	title: 'Horizontal grouped bar (empty state)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	}
}

// grouped horizontal bar - skeleton
export const groupedHorizontalBarSkeletonData: any[] = []
export const groupedHorizontalBarSkeletonOptions = {
	title: 'Horizontal grouped bar (skeleton)',
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

// stacked horizontal bar - empty state
export const stackedHorizontalBarEmptyStateData: any[] = []
export const stackedHorizontalBarEmptyStateOptions = {
	title: 'Horizontal stacked bar (empty state)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	}
}

// stacked horizontal bar - skeleton
export const stackedHorizontalBarSkeletonData: any[] = []
export const stackedHorizontalBarSkeletonOptions = {
	title: 'Horizontal stacked bar (skeleton)',
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

// floating bars
export const floatingBarData = [
	{ group: 'Qty', value: [30000, 65000] },
	{ group: 'More', value: [15000, 29123] },
	{ group: 'Sold', value: [22000, 35213] },
	{ group: 'Restocking', value: [28000, 51213] },
	{ group: 'Misc', value: [3000, 16932] }
]

export const floatingBarOptions = {
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

export const floatingHorizontalBarData = [
	{ group: 'Qty', value: [30000, 65000] },
	{ group: 'More', value: [15000, 29123] },
	{ group: 'Sold', value: [22000, 35213] },
	{ group: 'Restocking', value: [28000, 51213] },
	{ group: 'Misc', value: [3000, 36932] }
]

export const floatingHorizontalBarOptions = {
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
