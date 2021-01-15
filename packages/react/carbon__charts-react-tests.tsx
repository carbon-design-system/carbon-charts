import * as React from 'react';
import { ScaleTypes } from '@carbon/charts/interfaces';
import { LineChart } from './src';

class App extends React.Component {
	ref: React.RefObject<LineChart> = React.createRef();

	state = {
		data: [
			{ group: 'Qty', value: 65000 },
			{ group: 'More', value: 29123 },
			{ group: 'Sold', value: 35213 },
			{ group: 'Restocking', value: 51213 },
			{ group: 'Misc', value: 16932 },
		],
	};

	componentDidMount() {
		this.setState({ data: [] });
	}

	render() {
		if (this.ref != null) {
			console.log(this.ref.current.data);
		}

		return (
			<LineChart
				ref={this.ref}
				data={this.state.data}
				options={{
					title: 'Line (discrete)',
					axes: {
						bottom: {
							title: '2019 Annual Sales Figures',
							mapsTo: 'key',
							scaleType: ScaleTypes.LABELS,
						},
						left: {
							mapsTo: 'value',
							title: 'Conversion rate',
							scaleType: ScaleTypes.LABELS,
						},
					},
					color: {
						scale: {
							'Dataset 1': '#925699',
							'Dataset 2': '#525669',
							'Dataset 3': '#725699',
							'Dataset 4': '#ccc',
						},
					},
					height: '400px',
				}}
			/>
		);
	}
}
