import { NavLink } from 'react-router'

const navigationItems = [
	{ label: '홈', to: '/' },
	{ label: '상품', to: '/products' },
	{ label: '회사소개', to: '/about' },
	{ label: '고객센터', to: '/support' },
]

function Navigation() {
	return (
		<nav
			id="site-navigation"
			className="border-y-2 border-[#8dbbd0] bg-brand-sky shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(38,105,133,0.25)]"
			aria-label="주 메뉴"
		>
			<div className="mx-auto flex h-8 w-240 items-center divide-x divide-[#a9cddd] max-[700px]:w-full">
				{navigationItems.map((item) => (
					<NavLink
						key={item.to}
						className="flex-1 text-center text-[11px] font-semibold text-text-primary hover:underline"
						end={item.to === '/'}
						to={item.to}
					>
						{item.label}
					</NavLink>
				))}
			</div>
		</nav>
	)
}

export default Navigation