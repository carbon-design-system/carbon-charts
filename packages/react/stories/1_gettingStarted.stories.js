import React from 'react';
import { storiesOf } from '@storybook/react';

// import tutorial MD strings
import { reactGettingStartedTutorial } from './1_gettingStarted_content';
import * as TUTORIALS from '../../core/stories/tutorials/index';

// Syntax highlighting
const hljs = require('highlight.js');
hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));

hljs.registerLanguage(
	'typescript',
	require('highlight.js/lib/languages/typescript')
);

const gettingStartedStories = storiesOf('Docs|Getting Started', module);
const tutorialStories = storiesOf('Docs|Tutorials', module);

gettingStartedStories.add('Instructions', () => {
	const demoRef = React.useRef(null);

	// Add syntax highlighting
	React.useEffect(() => {
		if (demoRef.current) {
			const container = demoRef.current;
			container.querySelectorAll('pre code').forEach((block) => {
				hljs.highlightBlock(block);
			});
		}
	}, [demoRef]);

	return (
		<div
			ref={demoRef}
			className="container tutorial"
			dangerouslySetInnerHTML={{
				__html: `
				<div class="v10-banner">
					This version relies on <b>Carbon v11</b>. If you're using Carbon v10, <a href="https://carbon-charts-0x.netlify.app" target="_blank" rel="noreferrer">see the legacy demo site</a>
				</div>

				${reactGettingStartedTutorial.content}`,
			}}></div>
	);
});

// Add tutorial stories
Object.keys(TUTORIALS).forEach((tutorialKey) => {
	const tutorial = TUTORIALS[tutorialKey];

	if (tutorial.type !== 'getting-started' && tutorial.name !== 'API') {
		const storiesToAddTo = tutorialStories;

		storiesToAddTo.add(tutorial.name, () => {
			const demoRef = React.useRef(null);

			// Add syntax highlighting
			React.useEffect(() => {
				if (demoRef.current) {
					const container = demoRef.current;
					container.querySelectorAll('pre code').forEach((block) => {
						hljs.highlightBlock(block);
					});
				}
			}, [demoRef]);

			return (
				<div
					ref={demoRef}
					className="container tutorial"
					dangerouslySetInnerHTML={{
						__html: `
						<div class="v10-banner">
							This version relies on <b>Carbon v11</b>. If you're using Carbon v10, <a href="https://carbon-charts-0x.netlify.app" target="_blank" rel="noreferrer">see the legacy demo site</a>
						</div>

						${tutorial.content}`,
					}}></div>
			);
		});
	}
});
