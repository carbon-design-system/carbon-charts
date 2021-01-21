import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import * as ChartComponents from '../dist/index';

import { storybookDemoGroups } from '@carbon/charts/demo/data';

// Loop through all demo groups
storybookDemoGroups.forEach((demoGroup) => {
	// Create story group for each demo group
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(
		withKnobs({ escapeHTML: false })
	);

	// Loop through the demos for the group
	demoGroup.demos.forEach((demo) => {
		if (demo.isHighScale) {
			return;
		}
		const DemoComponent = ChartComponents[demo.chartType.vanilla];
		groupStories.add(demo.title, () => (
			<div className="container theme--white">
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

				<div className="marginTop-30">
					<DemoComponent
						data={object('Data', demo.data)}
						options={object('Options', demo.options)}
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
			</div>
		));
	});
});
