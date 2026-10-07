import { createBrowserRouter } from 'react-router'

import MainLayout from '@/app/layouts/MainLayout'
import HomePage from '@/pages/home/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])

export default router