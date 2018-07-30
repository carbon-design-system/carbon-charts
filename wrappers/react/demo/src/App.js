import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { PieChart } from "@peretz/charts-react";

const colors = [
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
];

const pieOptions = {
	accessibility: false,
	legendClickable: true,
	containerResizable: true,
	colors
};

const pieData = {
	labels: ["2V2N-9KYPM version 1", "L22I-P66EP-L22I-P66EP-L22I-P66EP", "JQAI-2M4L1", "J9DZ-F37AP",
		"YEL48-Q6XK-YEL48", "P66EP-L22I-L22I", "Q6XK-YEL48", "XKB5-L6EP", "YEL48-Q6XK", "L22I-P66EP-L22I"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: colors,
			data: [100000, 200000, 600000, 100000, 400000, 450000, 300000, 70000, 20000, 120000]
		}
	]
};

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

		<PieChart
			data={pieData}
			options={pieOptions}
		/>
      </div>
    );
  }
}
