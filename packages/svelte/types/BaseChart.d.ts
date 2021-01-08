/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { Chart as BC } from "@carbon/charts/chart";
import type {
  BaseChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface BaseChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Provide a Carbon chart class to instantiate
   * @default undefined
   */
  Chart?: BC;

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

export default class BaseChart extends SvelteComponentTyped<
  BaseChartProps,
  {
    load: CustomEvent<BC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: BaseChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
