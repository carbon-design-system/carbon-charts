import { storiesOf } from '@storybook/html';

import '../../core/demo/styles.scss';

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
  // container creation
  const container = document.createElement('div');
  container.setAttribute('class', 'container tutorial');

  container.innerHTML = reactGettingStartedTutorial.content;

  container.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });

  return container;
});

// Add tutorial stories
Object.keys(TUTORIALS).forEach((tutorialKey) => {
  const tutorial = TUTORIALS[tutorialKey];

  if (tutorial.type !== 'getting-started' && tutorial.name !== "API") {
    const storiesToAddTo = tutorialStories;

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
  }
});
