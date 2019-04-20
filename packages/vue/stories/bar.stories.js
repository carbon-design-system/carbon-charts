import { storiesOf } from '@storybook/vue';

import CcvBarChart from '../src/ccv-bar-chart';
import {
  groupedBarData,
  groupedBarOptions,
  simpleBarData,
  simpleBarOptions,
  stackedBarData,
  stackedBarOptions
} from './bar-demo-data';

const barStories = storiesOf("Bar", module);

barStories.add("Label-based legend", () => ({
    components: { CcvBarChart },
	data() { return { simpleBarData, simpleBarOptions }; },
    template: '<ccv-bar-chart :data="simpleBarData" :options="simpleBarOptions"></ccv-bar-chart>',
  })
);

barStories.add("Label-based legend (Accessible)", () => ({
    components: { CcvBarChart },
	data() { return { simpleBarData, simpleBarOptions }; },
    template: '<ccv-bar-chart :data="simpleBarData" :options="Object.assign({}, simpleBarOptions, {accessibility: true})"></ccv-bar-chart>',
  })
);

barStories.add("Grouped", () => ({
    components: { CcvBarChart },
	data() { return { groupedBarData, groupedBarOptions }; },
    template: '<ccv-bar-chart :data="groupedBarData" :options="groupedBarOptions"></ccv-bar-chart>',
  })
);

barStories.add("Grouped (Accessible)", () => ({
    components: { CcvBarChart },
	data() { return { groupedBarData, groupedBarOptions }; },
    template: '<ccv-bar-chart :data="groupedBarData" :options="Object.assign({}, groupedBarOptions, {accessibility: true})"></ccv-bar-chart>',
  })
);

barStories.add("Stacked", () => ({
    components: { CcvBarChart },
	data() { return { stackedBarData, stackedBarOptions }; },
    template: '<ccv-bar-chart :data="stackedBarData" :options="stackedBarOptions"></ccv-bar-chart>',
  })
);

barStories.add("Stacked (Accessible)", () => ({
    components: { CcvBarChart },
	data() { return { stackedBarData, stackedBarOptions }; },
    template: '<ccv-bar-chart :data="stackedBarData" :options="Object.assign({}, stackedBarOptions, {accessibility: true})"></ccv-bar-chart>',
  })
);
