import { Component, Input, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core'
import type { BaseChartOptions, ChartTabularData, Charts } from '@carbon/charts'

/**
 * Wrapper around `BaseChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-base-chart',
	template: ``
})
export class BaseChartComponent implements AfterViewInit, OnInit {
	/**
	 * Data passed to charts library for displaying
	 */
	@Input() set data(newData: ChartTabularData) {
		// If data already exists, that means the chart has been initialized
		const dataExistsAlready = !!this._data

		this._data = newData

		if (dataExistsAlready) {
			this.chart?.model.setData(newData)
		}
	}

	get data(): ChartTabularData {
		return this._data
	}

	/**
	 * Options passed to charts library
	 */
	@Input() set options(newOptions: BaseChartOptions) {
		// If data already exists, that means the chart has been initialized
		const optionsExistAlready = !!this._options

		this._options = newOptions

		if (optionsExistAlready) {
			this.chart?.model.setOptions(newOptions)
		}
	}

	get options() {
		return this._options
	}

	/**
	 * Chart width
	 */
	@Input() width?: string

	/**
	 * Chart height
	 */
	@Input() height?: string

	/**
	 * Chart container element ref
	 */
	@ViewChild('chartRef') chartRef!: ElementRef<HTMLElement>

	/**
	 * Chart object instance
	 *
	 * You can use this to do whatever you would normally do with a chart if you used
	 * charts library directly.
	 */
	chart!: Charts

	private _data!: ChartTabularData
	private _options!: BaseChartOptions

	constructor(protected elementRef: ElementRef) {}

	ngOnInit() {
		// Width prop is mandatory for the wrappers
		if (this.width) {
			this.options.width = this.width
		}

		// Height prop is mandatory for the wrappers
		if (this.height) {
			this.options.height = this.height
		}
	}

	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 */
	ngAfterViewInit() {
		console.log('Class that extended BaseChartComponent did not implement ngAfterViewInit().')
	}
}
