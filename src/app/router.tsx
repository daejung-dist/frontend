import { createBrowserRouter } from 'react-router'

import MainLayout from '@/app/layouts/MainLayout'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import ProductListPage from '@/pages/product-list/ProductListPage'
import ProductDetailPage from '@/pages/product-detail/ProductDetailPage'
import SignupPage from '@/pages/signup/SignupPage'
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
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/signup',
				element: <SignupPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])

export default router