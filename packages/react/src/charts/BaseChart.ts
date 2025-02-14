import React from 'react'
import type { Chart as BaseChartCore, BaseChartOptions, ChartTabularData } from '@carbon/charts'

interface Props<Options extends BaseChartOptions> {
	options: Options
	data: ChartTabularData
}

// TODO: add abstract keyword once React 16 support no longer needed
export default class BaseChart<
	Options extends BaseChartOptions = BaseChartOptions
> extends React.PureComponent<Props<Options>, unknown> {
	chart?: BaseChartCore
	chartRef = React.createRef<HTMLDivElement>()

	// TODO: add abstract keyword once React 16 support no longer needed then remove the next 3 comments
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: Options): BaseChartCore {
		throw new Error('Method not implemented.')
	}

	componentDidMount() {
		if (this.chartRef.current && !this.chart) {
			this.chart = this.createChart(this.chartRef.current, this.props.data, this.props.options)
		}
	}

	componentDidUpdate(prevProps: Props<Options>) {
		if (this.props.data !== prevProps.data) {
			this.chart?.model.setData(this.props.data)
		}

		if (this.props.options !== prevProps.options) {
			this.chart?.model.setOptions(this.props.options)
		}
	}

	render() {
		return React.createElement('div', { ref: this.chartRef, className: 'chart-holder' })
	}
}
