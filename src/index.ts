import * as d3 from 'd3'
import {ibmD3} from './ibmD3/main.ts'
let container = d3.select('.chart-holder')
const chartTypes = [
	{
		id: 'bar',
		name: 'Bar',
		avail: true
	},
	{
		id: 'line',
		name: 'Line',
		avail: true
	},
	{
		id: 'stackedBar',
		name: 'Stacked Bar',
		avail: true
	},
	{
		id: 'doubleAxis',
		name: 'Double Axis',
		avail: false
	},
	{
		id: 'combo',
		name: 'Combo',
		avail: false
	}
];

let typeSelections = d3.select('body').append('ul').classed('chart-type-selection', true);
chartTypes.forEach(type => {
	d3.select('.chart-type-selection').append('li').attr('id', type.id).text(type.name)

	d3.select("#" + type.id)
		.classed("disabled", !type.avail)
		.on('click', () => {
			let btn = d3.select("#" + type.id)
			if (!btn.classed("disabled")) {
				d3.selectAll(".chart-type-selection li")
				  .classed("active", false);
				btn.classed("active", !btn.classed("active"));
			}
			if (btn.classed('active')) {
				ibmD3.removeChart(container)
				options.type = d3.select(".chart-type-selection .active").attr("id");
				ibmD3.renderChart(data, container, options)
			}
		})
})

d3.select(".chart-type-selection #bar").classed("active", true)

let options = {
	type: 'bar',
	width: 600,
	height: 400,
	xDomain: "Part Number",
	yDomain: ["Sold", "More", "Qty"],
	yTicks: 5,
	legendClickable: true,
	colors: [
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



ibmD3.renderChart(data, container, options)


