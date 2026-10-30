import { NavLink } from 'react-router'

const navigationItems = [
	{ label: '홈', to: '/' },
	{ label: '상품목록', to: '/products' },
	{ label: '회사소개', to: '/about' },
	{ label: '고객문의', to: '/support' },
]

function GlobalNav() {
	return (
		<nav className="border-y border-border-strong bg-brand-sky" aria-label="주 메뉴">
			<div className="page-container flex h-8 items-center divide-x divide-[#a9cddd]">
				{navigationItems.map((item) => (
					<NavLink
						key={item.to}
						className={({ isActive }) =>
							`flex-1 text-center text-[11px] hover:underline ${isActive ? 'font-black text-brand-ocean' : 'font-semibold text-text-primary'}`
						}
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

export default GlobalNav
