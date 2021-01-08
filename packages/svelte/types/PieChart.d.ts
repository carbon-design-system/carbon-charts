/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { PieChart as PC } from "@carbon/charts";
import type {
  PieChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface PieChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | PC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: PieChartOptions;

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

export default class PieChart extends SvelteComponentTyped<
  PieChartProps,
  {
    load: CustomEvent<PC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: PieChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
