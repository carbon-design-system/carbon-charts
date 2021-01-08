/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { LollipopChart as LC } from "@carbon/charts";
import type {
  LollipopChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface LollipopChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | LC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: LollipopChartOptions;

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

export default class LollipopChart extends SvelteComponentTyped<
  LollipopChartProps,
  {
    load: CustomEvent<LC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: LollipopChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
