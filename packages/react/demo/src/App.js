import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "@peretz/matter/matter.css";

// React router & route components
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Bar from "./_pages/Bar";
import LineAndStep from "./_pages/LineAndStep";
import PieAndDonut from "./_pages/PieAndDonut";

export default class App extends Component {
  render() {
    return (
		<Router>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />

					<ul className="navigation">
						<li>
							<Link to="/pie-donut">Pie & Donut</Link>
						</li>

						<li>
							<Link to="/bar">Bar</Link>
						</li>

						<li>
							<Link to="/line-step">Line & Step</Link>
						</li>
					</ul>
				</header>

				<div className="container">
					<Route exact path="/" component={() => <Redirect to="/pie-donut" />} />
					<Route path="/pie-donut" component={PieAndDonut} />
					<Route path="/bar" component={Bar} />
					<Route path="/line-step" component={LineAndStep} />
				</div>
			</div>
		</Router>
    );
  }
}
