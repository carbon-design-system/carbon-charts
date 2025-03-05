import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import {
	Root,
	ErrorPage,
	Introduction,
	Installation,
	Anatomy,
	Data,
	Options,
	Api,
	AnalyticsInstrumentation,
	Themes,
	Axes,
	Palettes,
	Dashboards,
	Alluvial,
	Area,
	Bar,
	Boxplot,
	Bubble,
	Bullet,
	Choropleth,
	CirclePack,
	Combo,
	Donut,
	EventListeners,
	Gauge,
	Heatmap,
	Histogram,
	Line,
	Lollipop,
	Meter,
	Pie,
	Radar,
	Scatter,
	Tree,
	Treemap,
	WordCloud,
	Diagram,
	Zoombar,
	Truncation,
	Toolbar,
	Highlights,
	Thresholds,
	Locales,
	Legends
} from './routes'

import './index.scss'

const App: React.FC = () => (
	<BrowserRouter>
		<ScrollToTop /> {/* Place ScrollToTop inside BrowserRouter */}
		<Routes>
			<Route path="/" element={<Root />}>
				<Route index element={<Navigate to="/introduction" />} />
				<Route path="introduction" element={<Introduction />} />
				<Route path="installation" element={<Installation />} />
				<Route path="anatomy" element={<Anatomy />} />
				<Route path="data" element={<Data />} />
				<Route path="options" element={<Options />} />
				<Route path="highlights" element={<Highlights />} />
				<Route path="locales" element={<Locales />} />
				<Route path="thresholds" element={<Thresholds />} />
				<Route path="toolbar" element={<Toolbar />} />
				<Route path="truncation" element={<Truncation />} />
				<Route path="zoombar" element={<Zoombar />} />
				<Route path="apidocs" element={<Api />} />
				<Route path="analytics-instrumentation" element={<AnalyticsInstrumentation />} />
				<Route path="event-listeners" element={<EventListeners />} />
				<Route path="themes" element={<Themes />} />
				<Route path="axes" element={<Axes />} />
				<Route path="legends" element={<Legends />} />
				<Route path="palettes" element={<Palettes />} />
				<Route path="dashboards" element={<Dashboards />} />
				<Route path="alluvial" element={<Alluvial />} />
				<Route path="area" element={<Area />} />
				<Route path="bar" element={<Bar />} />
				<Route path="boxplot" element={<Boxplot />} />
				<Route path="bubble" element={<Bubble />} />
				<Route path="bullet" element={<Bullet />} />
				<Route path="choropleth" element={<Choropleth />} />
				<Route path="circlepack" element={<CirclePack />} />
				<Route path="combo" element={<Combo />} />
				<Route path="donut" element={<Donut />} />
				<Route path="gauge" element={<Gauge />} />
				<Route path="heatmap" element={<Heatmap />} />
				<Route path="histogram" element={<Histogram />} />
				<Route path="line" element={<Line />} />
				<Route path="lollipop" element={<Lollipop />} />
				<Route path="meter" element={<Meter />} />
				<Route path="diagram" element={<Diagram />} />
				<Route path="pie" element={<Pie />} />
				<Route path="radar" element={<Radar />} />
				<Route path="scatter" element={<Scatter />} />
				<Route path="tree" element={<Tree />} />
				<Route path="treemap" element={<Treemap />} />
				<Route path="wordcloud" element={<WordCloud />} />

				<Route path="*" element={<ErrorPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
