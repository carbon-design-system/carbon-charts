import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import * as ChartComponents from '../dist/index';
import * as storyUtils from '@carbon/charts/demo/utils';

import { storybookDemoGroups } from '@carbon/charts/demo/data';
import * as Configuration from '@carbon/charts/configuration';
const colorPairingOptions = Configuration.color.pairingOptions;

const introStories = storiesOf('Intro', module).addDecorator(withKnobs);

// Loop through the demos for the group
introStories.add('Welcome', () => (
	<div className="container intro">
		<div
			className="welcome__container"
			style={{
				background: 'url(./welcome.png) no-repeat center center fixed',
				backgroundSize: 'cover',
			}}>
			<div className="welcome__content">
				<h2 className="welcome__heading">Carbon Charts</h2>
				<h4 className="welcome__heading welcome__heading--subtitle">
					(React)
				</h4>
				<h5 className="welcome__heading welcome__heading--other">
					Other versions
				</h5>
				<ul>
					<li>
						<a
							href="https://charts.carbondesignsystem.com"
							className="welcome__heading welcome__heading--other">
							vanilla
						</a>
					</li>
					<li>
						<a
							href="https://charts.carbondesignsystem.com/angular"
							className="welcome__heading welcome__heading--other">
							Angular
						</a>
					</li>
					<li>
						<a
							href="https://charts.carbondesignsystem.com/vue"
							className="welcome__heading welcome__heading--other">
							Vue
						</a>
					</li>
					<li>
						<a
							href="https://charts.carbondesignsystem.com/svelte"
							className="welcome__heading welcome__heading--other">
							Svelte
						</a>
					</li>
				</ul>
				<span className="netlify">
					Deploys by{' '}
					<a href="https://netlify.com" target="_blank">
						Netlify
					</a>
				</span>
			</div>
		</div>
	</div>
));

// Loop through all demo groups
storybookDemoGroups.forEach((demoGroup) => {
	// Create story group for each demo group
	const groupStories = storiesOf(
		`${demoGroup.storyGroupTitle}|${demoGroup.title}`,
		module
	).addDecorator(withKnobs({ escapeHTML: false }));

	const demoGroupClassification = (demoGroup.type || '').replace(
		'-chart',
		''
	);

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
				const chart = chartRef.current.chart

				storyUtils.addControls(
					container,
					demoGroup,
					chart,
					{
						colorPairingOptions,
					}
				);

				storyUtils.addOtherVersions(container, demoGroup, demo, {
					currentVersion: 'react',
				});
			}

			React.useEffect(() => {
				setUpdate(!update);
			}, [demoRef, chartRef]);

			return (
				<div className="container theme--g100" ref={demoRef}>
					<h3>
						<b>Component:</b>
						<span className="bx--tag bx--tag--green component-name">{`<${demo.chartType.vanilla} />`}</span>
					</h3>
					<p className="props">
						<b>Props:</b> data,{' '}
						<a
							href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html"
							target="_blank">
							options
						</a>
					</p>

					<div id="charting-controls"></div>

					<div className="marginTop-30" id="chart-demo">
						<DemoComponent
							data={object('Data', demo.data)}
							options={object('Options', demo.options)}
							ref={chartRef}
						/>
					</div>

					<h3 className="marginTop-30">Code sample</h3>
					<a href={demo.codesandbox.react} target="_blank">
						<img
							src="https://codesandbox.io/static/img/play-codesandbox.svg"
							className="marginTop"
						/>
					</a>

					<h3 class="marginTop-45">Other versions</h3>
					<p style={{ opacity: 0.75 }}>
						(currently on <strong>React</strong>)
					</p>
					<div id="other-versions"></div>
				</div>
			);
		});
	});
});
