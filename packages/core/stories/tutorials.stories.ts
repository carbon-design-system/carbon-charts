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

const gettingStartedStories = storiesOf('Tutorials/Getting Started', module);
const tutorialStories = storiesOf('Tutorials', module);

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

		container.innerHTML = tutorial.content;

		container.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});

		return container;
	});
});
