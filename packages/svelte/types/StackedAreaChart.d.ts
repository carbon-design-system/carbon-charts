/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { StackedAreaChart as SAC } from "@carbon/charts";
import type {
  StackedAreaChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface StackedAreaChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | SAC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: StackedAreaChartOptions;

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

export default class StackedAreaChart extends SvelteComponentTyped<
  StackedAreaChartProps,
  {
    load: CustomEvent<SAC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: StackedAreaChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
