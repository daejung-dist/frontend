import { Outlet } from 'react-router'

import Footer from '@/shared/components/common/Footer'
import Header from '@/shared/components/common/Header'
import Navigation from '@/shared/components/common/Navigation'

function MainLayout() {
	return (
		<div className="min-h-screen bg-white">
			<Header />
			<Navigation />

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
