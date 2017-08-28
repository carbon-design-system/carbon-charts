import * as d3 from 'd3'
import {Charts} from '../src/charts/index.ts'
import {Combo} from '../src/charts/types/combo.ts'
import {DoubleAxis} from '../src/charts/types/doubleAxis.ts'
import {Bars} from '../src/charts/parts/bars.ts'
import {Lines} from '../src/charts/parts/lines.ts'
import {StackedBars} from '../src/charts/parts/stackedBars.ts'

let colors = [
		"#009BEF",
		"#95D13C",
		"#785EF0",
		"#F87EAC",
		"#FFB000",
		"#00B6CB",
		"#FF5C49",
		"#047CC0",
		"#FE8500",
		"#5A3EC8",
		"#40D5BB",
		"#FF509E"
	]
let options = {
	width: 600,
	height: 400,
	xDomain: "Part Number",
	yDomain: ["Sold", "More", "Qty"],
	yTicks: 5,
	legendClickable: true,
	colors
}

let doubleYAxisOptions = {
	width: 600,
	height: 400,
	xDomain: "Part Number",
	yDomain: ["Qty"],
	y2Domain: ["Sold", "More"],
	yTicks: 5,
	y2Ticks: 10,
	legendClickable: true,
	colors
}

const data = [
	{
		"Part Number": "2V2N-9KYPM",
		"Qty": 100000,
		"More": 60000,
		"Sold": 90000
	},
	{
		"Part Number": "L22I-P66EP",
		"Qty": 200000,
		"More": 50000,
		"Sold": 70000
	},
	{
		"Part Number": "JQAI-2M4L1",
		"Qty": 600000,
		"More": 9000,
		"Sold": 6000
	},
	{
		"Part Number": "J9DZ-F37AP",
		"Qty": 100000,
		"More": 8000,
		"Sold": 11000
	},
	{
		"Part Number": "Q6XK-YEL48",
		"Qty": 400000,
		"More": 4000,
		"Sold": 300000
	},
	{
		"Part Number": "773C-XKB5L",
		"Qty": 800000,
		"More": 35000,
		"Sold": 390000
	}
];


const chartTypes = [
	{
		id: 'bar',
		name: 'Bar',
		avail: true,
		options,
		data
	},
	{
		id: 'line',
		name: 'Line',
		avail: true,
		options,
		data
	},
	{
		id: 'stackedBar',
		name: 'Stacked Bar',
		avail: true,
		options,
		data
	},
	{
		id: 'doubleAxis',
		name: 'Double Axis',
		avail: true,
		options: doubleYAxisOptions,
		data
	},
	{
		id: 'combo',
		name: 'Combo',
		avail: true,
		options: doubleYAxisOptions,
		data
	}
];

// let typeSelections = d3.select('body').insert('ul', 'div').classed('chart-type-selection', true);
// chartTypes.forEach(type => {
// 	d3.select('.chart-type-selection').append('li').attr('id', type.id).text(type.name)

// 	d3.select("#" + type.id)
// 		.classed("disabled", !type.avail)
// 		.on('click', () => {
// 			let btn = d3.select("#" + type.id)
// 			if (!btn.classed("disabled")) {
// 				d3.selectAll(".chart-type-selection li")
// 				  .classed("active", false);
// 				btn.classed("active", !btn.classed("active"));
// 			}
// 			if (btn.classed('active')) {
// 				Charts.removeChart(container)
// 				options.type = d3.select(".chart-type-selection .active").attr("id");
// 				// Charts.renderChart(data, container, options)
// 				switch (type.id) {
// 					case "bar":
// 						Bars.drawChart(data, container, options);
// 						break;
// 					case "stackedBar":
// 						StackedBars.drawChart(data, container, options);
// 						break;
// 					case "line":
// 						Lines.drawChart(data, container, options);
// 						break;
// 					case "doubleAxis":
// 						renderDoubleAxis(data, container, doubleYAxisOptions, "line");
// 						break;
// 					case "combo":
// 						renderCombo(data, container, doubleYAxisOptions);
// 						break;
// 					default:
// 						Bars.drawChart(data, container, options);
// 						break;
// 				}
// 			}
// 		})
// })Object.assign({}, options, {yDomain: [options.yDomain[0]]});

chartTypes.forEach(type => {
	let container = d3.select('#' + type.id + '-chart-holder');
	container.append('h3').text(type.name)

	switch (type.id) {
		case "bar":
			Bars.drawChart(type.data, container, Object.assign({}, type.options, {type: type.id}));
			break;
		case "stackedBar":
			StackedBars.drawChart(type.data, container, Object.assign({}, type.options, {type: type.id}));
			break;
		case "line":
			Lines.drawChart(type.data, container, Object.assign({}, type.options, {type: type.id}));
			break;
		case "doubleAxis":
			DoubleAxis.drawChart(type.data, container, Object.assign({}, type.options, {type: type.id}));
			break;
		case "combo":
			Combo.drawChart(type.data, container, Object.assign({}, type.options, {type: type.id}));
			break;
		default:
			Bars.drawChart(type.data, container, Object.assign({}, type.options, {type: type.id}));
			break;
	}
})
