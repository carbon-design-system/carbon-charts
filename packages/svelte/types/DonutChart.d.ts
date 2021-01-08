/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { DonutChart as DC } from "@carbon/charts";
import type {
  DonutChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface DonutChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | DC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: DonutChartOptions;

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

export default class DonutChart extends SvelteComponentTyped<
  DonutChartProps,
  {
    load: CustomEvent<DC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: DonutChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
