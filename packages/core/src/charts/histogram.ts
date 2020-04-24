// Internal Imports
import { AxisChart } from "../axis-chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	ScatterChartOptions,
	Events as ChartEvents,
	AggregationTypes
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	Grid,
	Histogram,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	TooltipBar
} from "../components/index";
import { histogram, extent, range } from "d3";
import { defaultBins } from "../configuration";

export class HistogramChart extends AxisChart {
	constructor(holder: Element, chartConfigs: ChartConfig<ScatterChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.histogramChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);

		this.setHistogramData();

		this.update();
	}

	setHistogramData() {
		// Manipulate data for Histogram
		const data = this.model.getData();
		const options = this.model.getOptions();
		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYPos = this.services.cartesianScales.getMainYAxisPosition();
		const mainXPos = this.services.cartesianScales.getMainXAxisPosition();
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();
		const { groupMapsTo } = options.data;
		const axisOptions = options.axes[mainXPos];
		const { aggregation = AggregationTypes.COUNT} = axisOptions;
		const { bins: axisBins = defaultBins } = axisOptions;

		const aggregateByGroup = (bin) => {
			const groups = Tools.groupBy(bin, "group");

			if (aggregation === AggregationTypes.COUNT) {
				Object.keys(groups).map(group => { groups[group] = groups[group].length; });
			}
			if (aggregation === AggregationTypes.SUM) {
				Object.keys(groups).map(group => {
					groups[group] = groups[group].reduce((sum, datum) => sum + datum[rangeIdentifier], 0);
				});
			}
			if (aggregation === AggregationTypes.AVG) {
				Object.keys(groups).map(group => {
					groups[group] = groups[group].reduce((sum, datum) => sum + datum[rangeIdentifier], 0) / groups[group].length;
				});
			}

			return groups;
		};

		// Get Histogram bins
		const binsDomain = extent(data.map(d => d[domainIdentifier])) as [number, number];
		const bins = histogram()
			.value((d) => d[domainIdentifier])
			.domain(binsDomain)
			.thresholds(
				Array.isArray(axisBins)
				? axisBins
				: mainXScale.domain(binsDomain).ticks(axisBins)
			)
			(data);

		// Get all groups
		const groupsKeys = Array.from(new Set(data.map(d => d[groupMapsTo])));

		const histogramData = [];
		// Group data by bin
		bins.forEach(bin => {
			const key = `${bin.x0}-${bin.x1}`;
			const aggregateDataByGroups = aggregateByGroup(bin);

			// const groupsKeys = Object.keys(groups) // For Scale X to change when change displayed datasets
			groupsKeys.forEach((group: string) => {
				// For each dataset put a bin with value 0 if not exist (Scale X won't change)
				histogramData.push({
					group,
					key,
					value: aggregateDataByGroups[group] || 0,
					bin: bin.x0
				});
			});
		});

		// Change chart axes options
		this.model.setOptions({
			...options,
			axes: {
				...options.axes,
				[mainYPos]: {
					...options.axes[mainYPos],
					// Change the range identifier as the aggregator property (aggregate)
					mapsTo: "value"
				},
				[mainXPos]: {
					...options.axes[mainXPos],
					mapsTo: "bin",
					// Change the domain as [first bin value, last bin value]
					domain: [bins.find(bin => bin.length > 0).x0, bins.slice().reverse().find(bin => bin.length > 0).x1]
				}
			}
		});

		console.log(histogramData)

		// Set Histogram data
		this.model.setHistogramBins(bins);
		this.model.setData(histogramData);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Histogram(this.model, this.services)
		];

		const components: any[] = this.getAxisChartComponents(graphFrameComponents);
		components.push(new TooltipBar(this.model, this.services));
		return components;
	}
}
