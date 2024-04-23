import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Root, ErrorPage, Introduction, Installation, Anatomy, Data, Options, Api, Themes, Axes, Palettes, Dashboards, Alluvial, Area, Bar, Boxplot } from './routes'
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
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
