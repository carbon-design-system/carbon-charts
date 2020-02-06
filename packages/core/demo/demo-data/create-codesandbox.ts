import { getParameters } from "codesandbox/lib/api/define";

export const createChartSandbox = (chartTemplate: any) => {
	const files = {};

	Object.keys(chartTemplate)
		.forEach(filePath => files[filePath] = { content: chartTemplate[filePath] });

	return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${getParameters({ files })}`;
};

export const createReactChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t');
	const chartOptions = JSON.stringify(demo.options, null, '\t');
	const chartComponent = demo.chartType.vanilla;

	const indexHtml = `<div id='root'></div>
  `;
	const indexJs =
`import React from 'react';
import ReactDOM from 'react-dom';
import { ${chartComponent} } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
// Or
// import '@carbon/charts/styles/styles.scss';

class App extends React.Component {
	state = {
		data: ${chartData},
		options: ${chartOptions}
	};

	render = () => (
		<${chartComponent}
			data={this.state.data}
			options={this.state.options}>
		</${chartComponent}>
	);
}
ReactDOM.render(<App />, document.getElementById('root'));
  `;
	const packageJson = {
		dependencies: {
			'@carbon/charts': '0.20.1',
			'@carbon/charts-react': '0.20.1',
			d3: '5.12.0',
			react: '16.12.0',
			'react-dom': '16.12.0',
			'react-scripts': '3.0.1'
		}
	};

	return {
		'src/index.html': indexHtml,
		'src/index.js': indexJs,
		'package.json': packageJson
	};
}
