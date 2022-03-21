import { storiesOf } from '@storybook/html';
import { object } from '@storybook/addon-knobs';

import '@carbon/charts/demo/styles.scss';
import '@carbon/charts/src/styles/styles-white.scss';

import { MapChart } from '../src/charts/map';

const introStories = storiesOf('Docs|', module);

// Loop through the demos for the group
introStories.add('Welcome', () => {
  // container creation
  const container = document.createElement('div');
  container.setAttribute('class', 'container intro');

  container.innerHTML = `<div class="marginTop-45" id="chart-demo" style="padding: 2rem;"></div>`;

  // Initialize chart
  const chart = new MapChart(container.querySelector('div#chart-demo'), {
    data: object('Data', [
      { group: '2V2N 9KYPM version 1', value: 20000 },
      { group: 'L22I P66EP L22I P66EP L22I P66EP', value: 65000 },
      { group: 'JQAI 2M4L1', value: 75000 },
      { group: 'J9DZ F37AP', value: 1200 },
      { group: 'YEL48 Q6XK YEL48', value: 10000 },
      { group: 'Misc', value: 25000 },
    ]),
    options: object('Options', {
      title: 'Map demo',
      resizable: true,
    }),
  });

  return container;
});
