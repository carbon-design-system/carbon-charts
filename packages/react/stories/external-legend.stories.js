import { donutData, donutData2, donutOptions } from "@carbon/charts/demo/data";
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from "@storybook/addon-knobs";
import { merge } from "lodash";

import { LegendChart, DonutChart } from "../src/index";

class ExternalLegendStory extends Component {

	legendRef = React.createRef();

	state = {
		data: donutData,

		data2: donutData2,

		legendData: donutData.concat(donutData2),

		legendOptions: {
			axes: {},
			height: "50px",
		},

		options1: null,
		options2: null,
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const legendExternal = {
			legend: {
				external: {
					reference: this.legendRef.chart,
				},
			},
		};

		const newDonutOptions = merge(donutOptions, legendExternal);
		newDonutOptions.height = "400px";

		this.setState({
			options1: newDonutOptions,
			options2: newDonutOptions
		});
	}

	render() {
		return (
			<div>
				<LegendChart
				data={object("Legend Data", this.state.legendData)}
				options={object("Legend Options", this.state.legendOptions)}
				ref={el => this.legendRef = el }
			/>

			{this.state.options1 ? (
				<DonutChart
				data={object("Donut Data 1", this.state.data)}
				options={object("Donut Options 1", this.state.options1)}
			/>
			): null}

			{this.state.options2 ? (
				<DonutChart
				data={object("Donut Data 2", this.state.data2)}
				options={object("Donut Options 2", this.state.options2)}
			/>
			): null}
			</div>
		);
	}
}

var legendRef = React.createRef();

storiesOf("External Legend", module)
    .addDecorator(
        withKnobs({ escapeHTML: false })
    )
    .add("Multiple charts with same legend", () => (
        <div className="container theme--white">
				<h3>
					<b>Component:</b>
					<span className="bx--tag bx--tag--green component-name">{`<ExternalLegend />`}</span>
				</h3>
				<p className="props"><b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></p>

				<div className="marginTop-30">
					<ExternalLegendStory/>
				</div>
        </div>
    ));
