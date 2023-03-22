import React from 'react'
import type { BaseChart as BaseChartCore, interfaces } from '@carbon/charts'

type Props<Options> = { options?: Options; data?: interfaces.ChartTabularData }

export default class BaseChart<Options = interfaces.BaseChartOptions> extends React.Component<
	Props<Options>
> {
	data: interfaces.ChartTabularData | []
	options: Options | {}
	declare props: Props<Options>
	chart!: BaseChartCore

	constructor(props: Props<Options>) {
		super(props)

		const { options, data } = props

		if (!options) {
			console.error('Missing options!')
		}

		if (!data) {
			console.error('Missing data!')
		}

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
}
