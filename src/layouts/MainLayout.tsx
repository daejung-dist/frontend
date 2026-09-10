import { Outlet } from 'react-router'

import Footer from '../components/common/Footer'
import Header from '../components/common/Header'

function MainLayout() {
	return (
		<div className="min-h-screen bg-white">
			<Header />

			<main className="min-h-130 max-[700px]:min-h-105">
				<Outlet />
			</main>

			<Footer />
		</div>
	)
}

export default MainLayout
