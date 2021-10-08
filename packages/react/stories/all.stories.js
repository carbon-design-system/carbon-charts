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
				storyUtils.addControls(
					demoRef.current,
					demoGroup,
					chartRef.current.chart,
					{
						colorPairingOptions,
					}
				);
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

					<div
						className="bx--snippet bx--snippet--multi bx--snippet--expand marginTop-30"
						data-code-snippet>
						<div
							className="bx--snippet-container"
							aria-label="Code Snippet Text">
							<pre>
								<code>
									<span className="token tag">{`<${demo.chartType.vanilla}`}</span>
									{`
    `}
									<span className="token attr-name">{`data=`}</span>
									<span className="token attr-value">{`{data}`}</span>
									{`
    `}
									<span className="token attr-name">{`options=`}</span>
									<span className="token attr-value">{`{options}`}</span>
									<span className="token tag">{`
/>`}</span>
								</code>
							</pre>
						</div>
					</div>

					<h3 className="marginTop-30">Other versions</h3>
					<div class="bx--row resource-card-group">
						<div class="Grid-module--column--3U35z bx--no-gutter-sm bx--col-md-4 bx--col-lg-4">
							<div class="bx--resource-card">
								<div class="bx--aspect-ratio bx--aspect-ratio--2x1">
									<div class="bx--aspect-ratio--object">
										<a
											href="https://react.carbondesignsystem.com/?path=/story/components-orderedlist--default"
											class="bx--tile bx--tile--clickable">
											<h5 class="bx--resource-card__subtitle">
												React
											</h5>
											<div class="bx--resource-card__icon--img"></div>
											<div class="bx--resource-card__icon--action">
												<svg
													focusable="false"
													preserveAspectRatio="xMidYMid meet"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													aria-label="Open resource"
													width="20"
													height="20"
													viewBox="0 0 32 32"
													role="img">
													<path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"></path>
													<path d="M20 2L20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z"></path>
												</svg>
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="Grid-module--column--3U35z bx--no-gutter-sm bx--col-md-4 bx--col-lg-4">
							<div class="bx--resource-card">
								<div class="bx--aspect-ratio bx--aspect-ratio--2x1">
									<div class="bx--aspect-ratio--object">
										<a
											href="https://angular.carbondesignsystem.com/?path=/story/components-list--basic"
											class="bx--tile bx--tile--clickable">
											<h5 class="bx--resource-card__subtitle">
												Angular (Community)
											</h5>
											<div class="bx--resource-card__icon--img"></div>
											<div class="bx--resource-card__icon--action">
												<svg
													focusable="false"
													preserveAspectRatio="xMidYMid meet"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													aria-label="Open resource"
													width="20"
													height="20"
													viewBox="0 0 32 32"
													role="img">
													<path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"></path>
													<path d="M20 2L20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z"></path>
												</svg>
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="Grid-module--column--3U35z bx--no-gutter-sm bx--col-md-4 bx--col-lg-4">
							<div class="bx--resource-card">
								<div class="bx--aspect-ratio bx--aspect-ratio--2x1">
									<div class="bx--aspect-ratio--object">
										<a
											href="http://vue.carbondesignsystem.com/?path=/story/components-cvlist--default"
											class="bx--tile bx--tile--clickable">
											<h5 class="bx--resource-card__subtitle">
												Vue (Community)
											</h5>
											<div class="bx--resource-card__icon--img"></div>
											<div class="bx--resource-card__icon--action">
												<svg
													focusable="false"
													preserveAspectRatio="xMidYMid meet"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													aria-label="Open resource"
													width="20"
													height="20"
													viewBox="0 0 32 32"
													role="img">
													<path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"></path>
													<path d="M20 2L20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z"></path>
												</svg>
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<ul className="demo-other-versions">
						<li>
							<a
								href={`https://carbon-design-system.github.io/carbon-charts/?path=/story/${demoGroupClassification}-charts-${demo.id}`}
								className="welcome__heading welcome__heading--other">
								vanilla
							</a>
						</li>
						<li>
							<a
								href={`https://carbon-design-system.github.io/carbon-charts/angular/?path=/story/${demoGroupClassification}-charts-${demo.id}`}
								className="welcome__heading welcome__heading--other">
								Angular
							</a>
						</li>
						<li>
							<a
								href={`https://carbon-design-system.github.io/carbon-charts/vue/?path=/story/${demoGroupClassification}-charts-${demo.id}`}
								className="welcome__heading welcome__heading--other">
								Vue
							</a>
						</li>
						<li>
							<a
								href={`https://carbon-design-system.github.io/carbon-charts/svelte/?path=/story/${demoGroupClassification}-charts-${demo.id}`}
								className="welcome__heading welcome__heading--other">
								Svelte
							</a>
						</li>
					</ul>
				</div>
			);
		});
	});
});
