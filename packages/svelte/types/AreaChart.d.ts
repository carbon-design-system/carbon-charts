/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { AreaChart as AC } from "@carbon/charts";
import type {
  AreaChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface AreaChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | AC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: AreaChartOptions;

  /**
   * Specify the id for the chart holder element
   * @default "chart-" + Math.random().toString(36)
   */
  id?: string;

  /**
   * Obtain a reference to the chart holder element
   * @default null
   */
  ref?: null | HTMLDivElement;
}

export default class AreaChart extends SvelteComponentTyped<
  AreaChartProps,
  {
    load: CustomEvent<AC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: AreaChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
