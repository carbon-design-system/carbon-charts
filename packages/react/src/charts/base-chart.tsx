import React from 'react'
import type { Chart as BaseChartCore, BaseChartOptions, ChartTabularData } from '@carbon/charts'

interface Props<Options> {
	options?: Options
	data?: ChartTabularData
}

export default class BaseChart<Options = BaseChartOptions> extends React.Component<Props<Options>> {
	data: ChartTabularData | [] = []
	options: Options | {} = {}
	chart!: BaseChartCore

	constructor(props: Props<Options>) {
		super(props)

		this.data = props.data || []
		this.options = props.options || {}

		Object.assign(this, this.chart)
	}

	shouldComponentUpdate(nextProps: Props<Options>) {
		return this.props.data !== nextProps.data || this.props.options !== nextProps.options
	}

	componentDidUpdate() {
		this.chart.model.setData(this.props.data)
		this.chart.model.setOptions(this.props.options)
	}

	componentWillUnmount() {
		this.chart.destroy()
  }
}
