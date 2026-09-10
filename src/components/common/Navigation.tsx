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
			className="overflow-x-auto bg-[#203548]"
			aria-label="주 메뉴"
		>
			<div className="mx-auto flex min-w-full w-max max-w-[1180px]">
				{navigationItems.map((item) => (
					<NavLink
						key={item.to}
						className={({ isActive }) =>
							`shrink-0 min-w-[132px] px-5 py-2.5 text-center text-sm font-semibold text-white max-[700px]:px-2.5 max-[700px]:text-[13px]${isActive ? ' bg-[#d24e3e]' : ''}`
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

export default Navigation