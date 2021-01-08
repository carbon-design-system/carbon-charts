/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { BubbleChart as BC } from "@carbon/charts";
import type {
  BubbleChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface BubbleChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | BC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: BubbleChartOptions;

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

export default class BubbleChart extends SvelteComponentTyped<
  BubbleChartProps,
  {
    load: CustomEvent<BC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: BubbleChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
