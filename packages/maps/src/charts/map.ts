// Internal Imports
import * as Configuration from '@carbon/charts/src/configuration';
import { Chart } from '@carbon/charts/src/chart';
import { ChartConfig } from '@carbon/charts/src/interfaces';
import { Tools } from '@carbon/charts/src/tools';

// Components
import { Map } from '../components/index';

export class MapChart extends Chart {
  constructor(holder: Element, chartConfigs: ChartConfig<any>) {
    super(holder, chartConfigs);

    // Merge the default options for this chart
    // With the user provided options
    this.model.setOptions(
      Tools.mergeDefaultChartOptions(
        Configuration.options.pieChart,
        chartConfigs.options
      )
    );

    // Initialize data, services, components etc.
    this.init(holder, chartConfigs);
  }

  getComponents() {
    // Specify what to render inside the graph-frame
    const graphFrameComponents: any[] = [
      new Map(this.model as any, this.services),
    ];

    // get the base chart components and export with tooltip
    const components: any[] = this.getChartComponents(graphFrameComponents);
    return components;
  }
}
