/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { SimpleBarChart as SBC } from "@carbon/charts";
import type {
  BarChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface BarChartSimpleProps
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
  options?: BarChartOptions;

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

export default class BarChartSimple extends SvelteComponentTyped<
  BarChartSimpleProps,
  {
    load: CustomEvent<SBC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: BarChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
