/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { GroupedBarChart as GBC } from "@carbon/charts";
import type {
  BarChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface BarChartGroupedProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | GBC;

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

export default class BarChartGrouped extends SvelteComponentTyped<
  BarChartGroupedProps,
  {
    load: CustomEvent<GBC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: BarChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
