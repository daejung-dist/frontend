import { createBrowserRouter, Navigate } from 'react-router'

import MainLayout from '@/app/layouts/MainLayout'
import ProtectedRoute from '@/features/auth/components/ProtectedRoute'
import AboutPage from '@/pages/about/AboutPage'
import CartPage from '@/pages/cart/CartPage'
import CheckoutPage from '@/pages/checkout/CheckoutPage'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import AddressPage from '@/pages/mypage/addresses/AddressPage'
import MyPageLayout from '@/pages/mypage/MyPageLayout'
import OrderListPage from '@/pages/mypage/orders/OrderListPage'
import ProfilePage from '@/pages/mypage/profile/ProfilePage'
import WithdrawPage from '@/pages/mypage/withdraw/WithdrawPage'
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
						element: <MyPageLayout />,
						children: [
							{
								index: true,
								element: <Navigate to="/mypage/orders" replace />,
							},
							{
								path: 'orders',
								element: <OrderListPage />,
							},
							{
								path: 'profile',
								element: <ProfilePage />,
							},
							{
								path: 'addresses',
								element: <AddressPage />,
							},
							{
								path: 'withdraw',
								element: <WithdrawPage />,
							},
						],
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
