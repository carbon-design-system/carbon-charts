import React from 'react';
import { Chart as BaseChartType } from '@carbon/charts/chart';
import { ChartTabularData, BaseChartOptions } from '@carbon/charts/interfaces';

type Props<Options> = { options?: Options; data?: ChartTabularData };

export default class BaseChart<
	Options = BaseChartOptions
> extends React.Component<Props<Options>> {
	data: ChartTabularData | [];
	options: Options | {};
	props!: Props<Options>;
	chart!: BaseChartType;

	constructor(props: Props<Options>) {
		super(props);

		const { options, data } = props;

		if (!options) {
			console.error('Missing options!');
		}

		if (!data) {
			console.error('Missing data!');
		}

		this.data = props.data || [];
		this.options = props.options || {};

		Object.assign(this, this.chart);
	}

	shouldComponentUpdate(nextProps: Props<Options>) {
		return (
			this.props.data !== nextProps.data ||
			this.props.options !== nextProps.options
		);
	}

	componentDidUpdate() {
		this.chart.model.setData(this.props.data);
		this.chart.model.setOptions(this.props.options);
	}
}
