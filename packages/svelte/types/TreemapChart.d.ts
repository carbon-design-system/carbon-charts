/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { TreemapChart as TC } from "@carbon/charts";
import type {
  TreemapChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface TreemapChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | TC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: TreemapChartOptions;

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

export default class TreemapChart extends SvelteComponentTyped<
  TreemapChartProps,
  {
    load: CustomEvent<TC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: TreemapChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
