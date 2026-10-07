import { createBrowserRouter } from 'react-router'

import MainLayout from '@/app/layouts/MainLayout'
import HomePage from '@/pages/home/HomePage'
import ProductListPage from '@/pages/product-list/ProductListPage'
import ProductDetailPage from '@/pages/product-detail/ProductDetailPage'
import NotFoundPage from '@/pages/NotFoundPage'

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/products',
				element: <ProductListPage />,
			},
			{
				path: '/products/:id',
				element: <ProductDetailPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])

export default router