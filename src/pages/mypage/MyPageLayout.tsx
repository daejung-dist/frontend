import { NavLink, Outlet } from 'react-router'

const menuItems = [
	{ label: '주문목록/배송조회', to: '/mypage/orders' },
	{ label: '개인정보확인/수정', to: '/mypage/profile' },
	{ label: '배송지 관리', to: '/mypage/addresses' },
	{ label: '회원 탈퇴', to: '/mypage/withdraw' },
]

function MyPageLayout() {
	return (
		<div className="flex gap-6 p-6 max-[700px]:flex-col max-[700px]:gap-4 max-[700px]:p-4">
			<nav
				className="w-[180px] shrink-0 self-start border border-border-strong bg-[#f8f8f6] px-5 py-6 max-[700px]:w-full max-[700px]:px-4 max-[700px]:py-4"
				aria-label="마이페이지 메뉴"
			>
				<strong className="text-base font-black text-black">마이페이지</strong>
				<ul className="mt-4 flex flex-col gap-3 text-sm max-[700px]:mt-3 max-[700px]:flex-row max-[700px]:flex-wrap max-[700px]:gap-x-4 max-[700px]:gap-y-2">
					{menuItems.map((item) => (
						<li key={item.to}>
							<NavLink
								className={({ isActive }) =>
									isActive ? 'font-bold text-brand-ocean' : 'text-text-primary hover:text-brand-ocean hover:underline'
								}
								to={item.to}
							>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<div className="min-w-0 flex-1">
				<Outlet />
			</div>
		</div>
	)
}

export default MyPageLayout
