import React from 'react'
import type { Chart as BaseChartCore, BaseChartOptions, ChartTabularData } from '@carbon/charts'

interface Props<Options extends BaseChartOptions> {
	options: Options
	data: ChartTabularData
}

const carbonPrefix = 'cds'
const chartsPrefix = 'cc'

export const hasChartBeenInitialized = (chartHolder: HTMLElement) =>
	!!chartHolder.querySelector(`div.${carbonPrefix}--${chartsPrefix}--chart-wrapper`)

export default class BaseChart<Options extends BaseChartOptions = BaseChartOptions> extends React.Component<Props<Options>> {
	data: ChartTabularData
	options: Options
	chart!: BaseChartCore
	chartRef?: HTMLDivElement = undefined

	constructor(props: Props<Options>) {
		super(props)

		this.data = props.data
		this.options = props.options

		Object.assign(this, this.chart)
	}

	// Derived classes must override to create their specific chart
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: Options): BaseChartCore {
		throw new Error('Method not implemented.')
	}

	shouldComponentUpdate(nextProps: Props<Options>) {
		return this.props.data !== nextProps.data || this.props.options !== nextProps.options
	}

	componentDidUpdate() {
		this.chart.model.setData(this.props.data)
		this.chart.model.setOptions(this.props.options)
	}

	componentWillUnmount() {
		this.chart?.destroy()
	}

	componentDidMount() {
		if (this.chartRef && !hasChartBeenInitialized(this.chartRef)) {
			this.chart = this.createChart(this.chartRef, this.props.data, this.props.options)
		}
	}	

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
