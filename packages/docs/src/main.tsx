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
	Diagram
} from './routes'
import './index.scss'

const App: React.FC = () => (
	<Routes>
		<Route path="/" element={<Root />}>
			<Route index element={<Navigate to="/introduction" />} />
			<Route path="introduction" element={<Introduction />} />
			<Route path="installation" element={<Installation />} />
			<Route path="anatomy" element={<Anatomy />} />
			<Route path="data" element={<Data />} />
			<Route path="options" element={<Options />} />
			<Route path="api" element={<Api />} />
			<Route path="themes" element={<Themes />} />
			<Route path="axes" element={<Axes />} />
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
			<Route path="pie" element={<Pie />} />
			<Route path="radar" element={<Radar />} />
			<Route path="scatter" element={<Scatter />} />
			<Route path="tree" element={<Tree />} />
			<Route path="treemap" element={<Treemap />} />
			<Route path="wordcloud" element={<WordCloud />} />
			<Route path="diagram" element={<Diagram />} />
			<Route path="*" element={<ErrorPage />} />
		</Route>
	</Routes>
)

const rootElement = document.getElementById('root')
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<BrowserRouter>
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</React.StrictMode>
	)
}

export default App
