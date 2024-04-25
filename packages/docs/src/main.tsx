import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

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

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Navigate to="/introduction" />
			},
			{
				path: 'introduction',
				element: <Introduction />
			},
			{
				path: 'installation',
				element: <Installation />
			},
			{
				path: 'anatomy',
				element: <Anatomy />
			},
			{
				path: 'data',
				element: <Data />
			},
			{
				path: 'options',
				element: <Options />
			},
			{
				path: 'api',
				element: <Api />
			},
			{
				path: 'themes',
				element: <Themes />
			},
			{
				path: 'axes',
				element: <Axes />
			},
			{
				path: 'palettes',
				element: <Palettes />
			},
			{
				path: 'dashboards',
				element: <Dashboards />
			},
			{
				path: 'alluvial',
				element: <Alluvial />
			},
			{
				path: 'area',
				element: <Area />
			},
			{
				path: 'bar',
				element: <Bar />
			},
			{
				path: 'boxplot',
				element: <Boxplot />
			},
			{
				path: 'bubble',
				element: <Bubble />
			},
			{
				path: 'bullet',
				element: <Bullet />
			},
			{
				path: 'choropleth',
				element: <Choropleth />
			},
			{
				path: 'circlepack',
				element: <CirclePack />
			},
			{
				path: 'combo',
				element: <Combo />
			},
			{
				path: 'donut',
				element: <Donut />
			},
			{
				path: 'gauge',
				element: <Gauge />
			},
			{
				path: 'heatmap',
				element: <Heatmap />
			},
			{
				path: 'histogram',
				element: <Histogram />
			},
			{
				path: 'line',
				element: <Line />
			},
			{
				path: 'lollipop',
				element: <Lollipop />
			},
			{
				path: 'meter',
				element: <Meter />
			},
			{
				path: 'pie',
				element: <Pie />
			},
			{
				path: 'radar',
				element: <Radar />
			},
			{
				path: 'scatter',
				element: <Scatter />
			},
			{
				path: 'tree',
				element: <Tree />
			},
			{
				path: 'treemap',
				element: <Treemap />
			},
			{
				path: 'wordcloud',
				element: <WordCloud />
			},
			{
				path: 'diagram',
				element: <Diagram />
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
