import { GaugeChart as GC } from "@carbon/charts";
import type { GaugeChartOptions } from "@carbon/charts/interfaces";
import BaseChart from "./BaseChart";

export default class GaugeChart extends BaseChart<GC, GaugeChartOptions> {}
