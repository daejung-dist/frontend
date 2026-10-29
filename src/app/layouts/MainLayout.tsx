import { Outlet } from 'react-router'

import Footer from '@/shared/components/common/Footer'
import Header from '@/shared/components/common/Header'
import GlobalNav from '@/shared/components/common/GlobalNav'

function MainLayout() {
	return (
		<div className="min-h-dvh bg-white">
			<Header />
			<GlobalNav />

			<main className="min-h-130 max-[700px]:min-h-105">
				<div className="page-container">
					<Outlet />
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default MainLayout
