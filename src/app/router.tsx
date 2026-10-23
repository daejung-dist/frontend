import { createBrowserRouter } from 'react-router'

import MainLayout from '@/app/layouts/MainLayout'
import ProtectedRoute from '@/features/auth/components/ProtectedRoute'
import AboutPage from '@/pages/about/AboutPage'
import CartPage from '@/pages/cart/CartPage'
import CheckoutPage from '@/pages/checkout/CheckoutPage'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import MyPage from '@/pages/mypage/MyPage'
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
				path: '/about',
				element: <AboutPage />,
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
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: '/mypage',
						element: <MyPage />,
					},
					{
						path: '/cart',
						element: <CartPage />,
					},
					{
						path: '/checkout',
						element: <CheckoutPage />,
					},
				],
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])

export default router
