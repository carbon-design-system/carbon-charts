import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Root, ErrorPage, Introduction, Installation, Anatomy, Bar } from './routes'
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
				path: 'bar',
				element: <Bar />
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
