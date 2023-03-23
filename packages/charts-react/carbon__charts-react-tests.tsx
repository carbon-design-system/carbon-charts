import * as React from 'react'
import { interfaces } from '@carbon/charts'
import { LineChart, MeterChart } from './src'

const meterOptions: interfaces.MeterChartOptions = {
	title: 'Meter Chart - with statuses',
	meter: {
		peak: 80,
		status: {
			ranges: [
				{ range: [0, 50], status: interfaces.Statuses.SUCCESS },
				{ range: [50, 60], status: interfaces.Statuses.WARNING },
				{ range: [60, 100], status: interfaces.Statuses.DANGER }
			]
		}
	},
	height: '100px'
}

class App extends React.Component {
	ref: React.RefObject<LineChart> = React.createRef()

	state = {
		data: [
			{ group: 'Qty', value: 65000 },
			{ group: 'More', value: 29123 },
			{ group: 'Sold', value: 35213 },
			{ group: 'Restocking', value: 51213 },
			{ group: 'Misc', value: 16932 }
		]
	}

	componentDidMount() {
		this.setState({ data: [] })
	}

	render() {
		if (this.ref != null) {
			console.log(this.ref.current.data)
		}

		return (
			<>
				<LineChart
					ref={this.ref}
					data={this.state.data}
					options={{
						title: 'Line (discrete)',
						axes: {
							bottom: {
								title: '2019 Annual Sales Figures',
								mapsTo: 'key',
								scaleType: interfaces.ScaleTypes.LABELS
							},
							left: {
								mapsTo: 'value',
								title: 'Conversion rate',
								scaleType: interfaces.ScaleTypes.LABELS
							}
						},
						color: {
							scale: {
								'Dataset 1': '#925699',
								'Dataset 2': '#525669',
								'Dataset 3': '#725699',
								'Dataset 4': '#ccc'
							}
						},
						height: '400px'
					}}
				/>
				<MeterChart options={meterOptions} data={[{ group: 'Dataset 1', value: 56 }]} />
			</>
		)
	}
}
