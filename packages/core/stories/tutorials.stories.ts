import { storiesOf } from '@storybook/html';

import '../demo/styles.scss';

// import tutorial MD strings
import * as TUTORIALS from './tutorials/index';

// Syntax highlighting
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));

hljs.registerLanguage(
	'typescript',
	require('highlight.js/lib/languages/typescript')
);

const gettingStartedStories = storiesOf('Docs|Getting Started', module);
const tutorialStories = storiesOf('Docs|Tutorials', module);

Object.keys(TUTORIALS).forEach((tutorialKey) => {
	const tutorial = TUTORIALS[tutorialKey];

	const storiesToAddTo =
		tutorial.type === 'getting-started'
			? gettingStartedStories
			: tutorialStories;

	storiesToAddTo.add(tutorial.name, () => {
		// container creation
		const container = document.createElement('div');
		container.setAttribute('class', 'container tutorial');

		container.innerHTML = `
		<div class="v10-banner">
			This version relies on <b>Carbon v11</b>. If you're using Carbon v10, <a href="https://carbon-charts-0x.netlify.app" target="_blank" rel="noreferrer">see the legacy demo site</a>
		</div>

		${tutorial.content}`;

		container.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});

		return container;
	});
});
