import type {
	LayoutGrowth,
	LegendOrientations,
	LegendPositions,
	Alignments,
	ToolbarControlTypes,
	ZoomBarTypes
} from './enums'
import type { Component } from '../components'
import type { TruncationOptions } from './truncation'

/**
 *Locale Options Interface
 */
export interface Locale {
	code?: string // BCP 47 language tag
	number?: (value: number, language: string) => string
	date?: (
		value: Date,
		language: string,
		options: Intl.DateTimeFormatOptions,
		preformattedLocaleValue?: string
	) => string
	time?: (
		value: Date,
		language: string,
		options: Intl.DateTimeFormatOptions,
		preformattedLocaleValue?: string
	) => string
	optionsObject?: {
		'15seconds'?: LocaleTimeScaleOptions
		minute?: LocaleTimeScaleOptions
		'30minutes'?: LocaleTimeScaleOptions
		hourly?: LocaleTimeScaleOptions
		daily?: LocaleTimeScaleOptions
		weekly?: LocaleTimeScaleOptions
		monthly?: LocaleTimeScaleOptions
		quarterly?: LocaleTimeScaleOptions
		yearly?: LocaleTimeScaleOptions
	}
	translations?: {
		group?: string // used by Tooltip and Toolbar / Tabular Representation
		total?: string // ditto
		meter?: {
			title?: string
		}
		tabularRep?: {
			title?: string
			downloadAsCSV?: string
		}
		toolbar?: {
			exportAsCSV?: string
			exportAsJPG?: string
			exportAsPNG?: string
			zoomIn?: string
			zoomOut?: string
			resetZoom?: string
			moreOptions?: string
			makeFullScreen?: string
			exitFullScreen?: string
			showAsTable?: string
		}
	}
}

export interface LocaleTimeScaleOptions {
	primary?: Record<
		string,
		{
			month?: string
			day?: string
			hour?: string
			minute?: string
			second?: string
			fractionalSecondDigits?: number
			weekday?: string
			year?: string
			hourCycle?: string
			hour12?: boolean
			dayPeriod?: string
		}
	>
	secondary?: Record<
		string,
		{
			month?: string
			day?: string
			hour?: string
			minute?: string
			second?: string
			fractionalSecondDigits?: number
			weekday?: string
			year?: string
			hourCycle?: string
			hour12?: boolean
			dayPeriod?: string
		}
	>
	type?: string
}

/**
 * customize the overlay contents
 */
export interface LayoutComponentChild {
	id: string
	/**
	 * the component that'll be rendered inside layout child
	 */
	components: Component[]
	/**
	 * size of the layout child
	 */
	size?: number
	/**
	 * how the layout child will grow or shrink
	 */
	growth: LayoutGrowth | string
}

/**
 * customize the legend component
 */
export interface LegendOptions {
	enabled?: boolean
	position?: LegendPositions | string
	/**
	 * the clickability of legend items
	 */
	clickable?: boolean
	truncation?: TruncationOptions
	alignment?: Alignments | string
	order?: string[]
	/**
	 * customized legend items
	 */
	additionalItems?: LegendItem[]
	orientation?: LegendOrientations
}

/**
 * customize the legend item
 */
export interface LegendItem {
	type: string
	name: string
	fill?: string
	stroke?: string
}

export interface TooltipOptions {
	/**
	 * enable or disable tooltip
	 */
	enabled?: boolean
	/**
	 * a function to format the tooltip values
	 */
	valueFormatter?: (value: any, label: string) => string
	/**
	 * custom function for returning tooltip HTML
	 * passed an array or object with the data, the default tooltip markup
	 * and the corresponding datum of the hovered element
	 */
	customHTML?: (data: any, defaultHTML: string, datum: any) => string
	/**
	 * customizes the `Group` label shown inside tooltips
	 */
	groupLabel?: string
	/**
	 * show total of items
	 */
	showTotal?: boolean
	/**
	 * customizes the `Total` label shown inside tooltips
	 */
	totalLabel?: string
	truncation?: TruncationOptions
}

/**
 * Threshold options
 */
export interface ThresholdOptions {
	/**
	 * threshold value
	 */
	value: number | Date
	/**
	 * a function to format the threshold values
	 */
	valueFormatter?: (value: any) => string
	/**
	 * hex threshold line color
	 */
	fillColor?: string
	/**
	 * threshold label
	 */
	label?: string
}

export interface GridOptions {
	y?: {
		enabled?: boolean
		numberOfTicks?: number
		alignWithAxisTicks?: boolean
	}
	x?: {
		enabled?: boolean
		numberOfTicks?: number
		alignWithAxisTicks?: boolean
	}
}

/**
 * Ruler options
 */
export interface RulerOptions {
	enabled?: boolean
}

export interface BarOptions {
	width?: number
	maxWidth?: number
	/*
	 * can be used to manually modify spacing between bars
	 * @default 0.25
	 */
	spacingFactor?: number
}

export interface StackedBarOptions extends BarOptions {
	dividerSize?: number
}

/**
 * customize the Toolbar component
 */
export interface ToolbarOptions {
	/**
	 * is the toolbar visible or not
	 */
	enabled?: boolean
	/**
	 * the maximum toolbar controls to be displayed as icons
	 * controls more than this number will appear in the overflow menu
	 * minimum is 1. (all toolbar controls are in overflow menu)
	 */
	numberOfIcons?: number
	/**
	 * toolbar controls which will be displayed following the array order
	 */
	controls?: ToolbarControl[]
}

/**
 * options for each toolbar control
 */
export interface ToolbarControl {
	/**
	 * the toolbar control type
	 */
	type: ToolbarControlTypes | string
	/**
	 * used as aria-label for toolbar control
	 */
	title?: string
	/**
	 * the text to display (if this control is displayed in overflow menu)
	 * type value will be displayed if text is not available
	 */
	text?: string
	/**
	 * custom id for button
	 */
	id?: string
	/**
	 * SVG HTML element
	 */
	iconSVG?: {
		content?: string
		height?: string
		width?: string
	}
	shouldBeDisabled?: () => boolean
	/**
	 * function to execute on button click
	 * alternatively, users can choose to not pass in a function and can
	 * listen for events to execute asynchronously
	 */
	clickFunction?: () => void
}

/**
 * customize the ZoomBars in a chart
 */
export interface ZoomBarsOptions {
	/**
	 * a variable to handle default zoom in ratio (0 ~ 1.0)
	 * ex: shift click zoom in ratio
	 */
	zoomRatio?: number
	/**
	 * a variable to define the minimum zoom ratio (0 ~ 1.0)
	 * If  ( zoom domain / max domain ) < minZoomRatio, zoom-in functions will be disabled
	 */
	minZoomRatio?: number
	/**
	 * currently only the top position is supported
	 */
	top?: ZoomBarOptions
	/**
	 * whether keep updating range axis in real time while zoom domain is changing
	 */
	updateRangeAxis?: boolean
}

/**
 * customize the ZoomBar component
 */
export interface ZoomBarOptions {
	/**
	 * is the zoom-bar visible or not
	 */
	enabled?: boolean
	/**
	 * is the zoom-bar in loading state
	 */
	loading?: boolean
	/**
	 * is the zoom-bar in locked state
	 */
	locked?: boolean
	/**
	 * whether the zoom bar is showing a slider view or a graph view etc.
	 */
	type?: ZoomBarTypes | string
	/**
	 * an two element array which represents the initial zoom domain
	 */
	initialZoomDomain?: object[]
	/**
	 * options related to zoom bar data
	 */
	data?: object[]
}

/**
 * customize the Tabular Data
 */
export interface TabularRepCustomizationOptions {
	/**
	 * option to customize the Table Headers
	 */
	tableHeadingFormatter?: (headings: string[]) => string[]
	/**
	 * option to customize the Table Cells
	 */
	tableCellFormatter?: (cells: string[][]) => string[][]
}
