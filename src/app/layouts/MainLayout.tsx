import { Outlet } from 'react-router'

import Footer from '@/shared/components/common/Footer'
import Header from '@/shared/components/common/Header'
import GlobalNav from '@/shared/components/common/GlobalNav'

function MainLayout() {
	return (
		<div className="flex min-h-dvh flex-col bg-white">
			<Header />
			<GlobalNav />

			<main className="flex-1">
				<div className="page-container">
					<Outlet />
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default MainLayout
