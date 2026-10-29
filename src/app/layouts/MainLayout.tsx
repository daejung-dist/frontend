import { Outlet } from 'react-router'

import CanonicalLink from '@/shared/components/common/CanonicalLink'
import Footer from '@/shared/components/common/Footer'
import Header from '@/shared/components/common/Header'
import GlobalNav from '@/shared/components/common/GlobalNav'

function MainLayout() {
	return (
		<div className="flex min-h-dvh flex-col bg-white">
			<CanonicalLink />
			<Header />
			<GlobalNav />

			<main className="flex-1">
				{/* UtilityBar 외곽선을 좌우로 이어 붙인다. 안쪽 밝은 선은 페이지 배경에 가려지지 않도록 위에 겹친다. */}
				<div className="page-container relative border-x border-brand-ocean-deep p-1 after:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_1px_0_0_rgba(255,255,255,0.35)]">
					<Outlet />
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default MainLayout
