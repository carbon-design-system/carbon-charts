import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import * as ChartComponents from '../dist/index';

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

			const [theme, setTheme] = React.useState('g100');
			const chartRef = React.useRef(null);

			const radioOnChangeHandler = ({ target }) => {
				if (target.checked === true) {
					setTheme(target.value);
				}
			};

			let chart = null;
			let chartOptions = null;

			let onlyCategoricalPaletteIsApplicable = false;
			let numberOfChartDataGroups = 0;
			let numberOfVariants = 0;
			let selectedColorPalette = null;
			if (chartRef.current !== null) {
				chart = chartRef.current.chart;
				chartOptions = chart.model.getOptions();

				const {
					numberOfVariants: variants,
					option,
				} = chartOptions.color.pairing;

				numberOfChartDataGroups = chart.model.getAllDataGroupsNames()
					.length;
				numberOfVariants = variants || numberOfChartDataGroups;

				if (numberOfChartDataGroups > 5) {
					onlyCategoricalPaletteIsApplicable = true;
				}

				selectedColorPalette = `${numberOfVariants}-${option}`;
			}

			React.useEffect(() => {
				setUpdate(!update);
			}, [chartRef]);

			return (
				<div className={`container theme--${theme}`}>
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

					<div id="charting-controls">
						<div id="theme-picker">
							<fieldset className="bx--fieldset marginTop-30">
								<div className="bx--form-item">
									<div className="bx--radio-button-group ">
										<div className="bx--radio-button-wrapper">
											<input
												id="radio-button-abfeuherm2f-1"
												className="bx--radio-button"
												type="radio"
												value="white"
												name="radio-button"
												tabindex="0"
												checked={theme === 'white'}
												onChange={radioOnChangeHandler}
											/>
											<label
												htmlFor="radio-button-abfeuherm2f-1"
												className="bx--radio-button__label">
												<span className="bx--radio-button__appearance"></span>
												<span className="bx--radio-button__label-text">
													White
												</span>
											</label>
										</div>
										<div className="bx--radio-button-wrapper">
											<input
												id="radio-button-abfeuherm2f-2"
												className="bx--radio-button"
												type="radio"
												value="g10"
												name="radio-button"
												tabindex="0"
												checked={theme === 'g10'}
												onChange={radioOnChangeHandler}
											/>
											<label
												htmlFor="radio-button-abfeuherm2f-2"
												className="bx--radio-button__label">
												<span className="bx--radio-button__appearance"></span>
												<span className="bx--radio-button__label-text">
													G10
												</span>
											</label>
										</div>
										<div className="bx--radio-button-wrapper">
											<input
												id="radio-button-abfeuherm2f-3"
												className="bx--radio-button"
												type="radio"
												value="g90"
												name="radio-button"
												tabindex="0"
												checked={theme === 'g90'}
												onChange={radioOnChangeHandler}
											/>
											<label
												htmlFor="radio-button-abfeuherm2f-3"
												className="bx--radio-button__label">
												<span className="bx--radio-button__appearance"></span>
												<span className="bx--radio-button__label-text">
													G90
												</span>
											</label>
										</div>
										<div className="bx--radio-button-wrapper">
											<input
												id="radio-button-abfeuherm2f-4"
												className="bx--radio-button"
												type="radio"
												value="g100"
												name="radio-button"
												tabindex="0"
												checked={theme === 'g100'}
												onChange={radioOnChangeHandler}
											/>
											<label
												htmlFor="radio-button-abfeuherm2f-4"
												className="bx--radio-button__label">
												<span className="bx--radio-button__appearance"></span>
												<span className="bx--radio-button__label-text">
													G100
												</span>
											</label>
										</div>
									</div>
								</div>
							</fieldset>
						</div>

						<div className="bx--form-item">
							<div className="bx--select">
								<label
									htmlFor="select-id"
									className="bx--label">
									Color palette
								</label>
								<div className="bx--select-input__wrapper">
									<select
										id="color-palette-select"
										className="bx--select-input"
										onChange={(e) => {
											const { value } = e.target;
											const [
												numberOfVariants,
												pairingOption,
											] = value.split('-color-option-');

											chartOptions.color.pairing.numberOfVariants = numberOfVariants;

											chartOptions.color.pairing.option = parseInt(
												pairingOption
											);
											chart.model.setOptions(
												chartOptions
											);
										}}>
										<option
											className="bx--select-option"
											value=""
											disabled
											selected
											hidden>
											Choose an option
										</option>

										{numberOfVariants !== 14 &&
											Object.keys(
												colorPairingOptions
											).map((colorGroup) => {
												const optionsCount =
													colorPairingOptions[
														colorGroup
													];

												const numberOfVariants = parseInt(
													colorGroup
												);

												const selectOptions = [];
												for (
													let i = 1;
													i <= optionsCount;
													i++
												) {
													selectOptions.push(
														<option
															className={`bx--select-option" ${
																onlyCategoricalPaletteIsApplicable ||
																numberOfVariants <
																	numberOfChartDataGroups
																	? 'disabled'
																	: ''
															}`}
															value={`${colorGroup}-option-${i}" ${
																selectedColorPalette ===
																`${numberOfVariants}-${i}`
																	? 'selected'
																	: ''
															}`}>
															{numberOfVariants}
															-color groups,
															option {i}
														</option>
													);
												}

												return (
													<React.Fragment>
														<optgroup
															className="bx--select-optgroup"
															label={`${colorGroup} groups`}>
															{selectOptions}
														</optgroup>
													</React.Fragment>
												);
											})}

										{numberOfVariants === 14 && (
											<option
												className="bx--select-option"
												value="14-color-option-1"
												selected={
													selectedColorPalette ===
														`14-1` ||
													onlyCategoricalPaletteIsApplicable
												}>
												Categorical palette
											</option>
										)}
									</select>

									<svg
										focusable="false"
										preserveAspectRatio="xMidYMid meet"
										style={{ willChange: 'transform' }}
										xmlns="http://www.w3.org/2000/svg"
										className="bx--select__arrow"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										aria-hidden="true">
										<path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
									</svg>
								</div>
							</div>
						</div>
					</div>

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
