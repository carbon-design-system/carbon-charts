import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import * as ChartComponents from '../dist/index';
import * as storyUtils from '@carbon/charts/demo/utils';

import { storybookDemoGroups } from '@carbon/charts/demo/data';
import * as Configuration from '@carbon/charts/configuration';
const colorPairingOptions = Configuration.color.pairingOptions;

// Loop through all demo groups
storybookDemoGroups.forEach((demoGroup) => {
	// Create story group for each demo group
	const groupStories = storiesOf(
		`${demoGroup.storyGroupTitle}|${demoGroup.title}`,
		module
	);

	if(!demoGroup.disableProps){
		groupStories.addDecorator(withKnobs({ escapeHTML: false }));
	}

	// Loop through the demos for the group
	demoGroup.demos.forEach((demo) => {
		if (demo.isHighScale) {
			return;
		}
		const DemoComponent = ChartComponents[demo.chartType.vanilla];
		groupStories.add(demo.title, () => {
			/* Storybook seems to be skipping re-render when chartRef starts
			 * populating, adding this as a quick hack */
			const [update, setUpdate] = React.useState(false);

			const demoRef = React.useRef(null);
			const chartRef = React.useRef(null);

			if (demoRef.current && chartRef.current) {
				const container = demoRef.current;
				const chart = chartRef.current.chart;

				storyUtils.addControls(container, demoGroup, chart, {
					colorPairingOptions,
				});

				storyUtils.addOtherVersions(container, demoGroup, demo, {
					currentVersion: 'react',
				});
			}

			React.useEffect(() => {
				setUpdate(!update);
			}, [demoRef, chartRef]);

			return (
				<div className="container theme--g100" ref={demoRef}>
					<div className="v10-banner">
						This version relies on <b>Carbon v11</b>.
						If you're using Carbon v10,{' '}
						<a
							href="https://carbon-charts-0x.netlify.app"
							target="_blank"
							rel="noreferrer">
							see the legacy demo site
						</a>
					</div>

					<h3>
						<b>Component:</b>
						<span className="cds--tag cds--tag--green component-name">{`<${demo.chartType.vanilla} />`}</span>
					</h3>

					<p className="props">
						<b>Props:</b>{' '}
						<a href="/?path=/story/docs-tutorials--tabular-data-format">
							data
						</a>
						,{' '}
						<a
							href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html"
							target="_blank">
							options
						</a>
					</p>

					<div id="charting-controls"></div>

					<div className="marginTop-30" id="chart-demo">
						<DemoComponent
							// Only using object knob when chart is NOT choropleth, otherwise props will show even when 'disabled'
							// This approach is used to bypass storybook bug
							data={demoGroup.disableProps ? demo.data : object('Data', demo.data)}
							options={demoGroup.disableProps ? demo.options: object('Options', demo.options)}
							ref={chartRef}
						/>
					</div>

					<h3 className="marginTop-30">Code sample</h3>
					<a href={demo.codesandbox.react} target="_blank">
						<img
							src="https://codesandbox.io/static/img/play-codesandbox.svg"
							className="marginTop"
							alt="Edit on Codesandbox"
						/>
					</a>

					<h3 className="marginTop-45">Other versions</h3>
					<p style={{ opacity: 0.75 }}>
						(currently on <strong>React</strong>)
					</p>
					<div id="other-versions"></div>
				</div>
			);
		});
	});
});
