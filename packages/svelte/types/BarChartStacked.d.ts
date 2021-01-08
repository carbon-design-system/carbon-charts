/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { StackedBarChart as SBC } from "@carbon/charts";
import type {
  StackedBarChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface BarChartStackedProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | SBC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: StackedBarChartOptions;

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

export default class BarChartStacked extends SvelteComponentTyped<
  BarChartStackedProps,
  {
    load: CustomEvent<SBC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: StackedBarChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
