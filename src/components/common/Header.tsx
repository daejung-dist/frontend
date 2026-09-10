import { Search, ShoppingCart, UserRound } from 'lucide-react'
import { NavLink } from 'react-router'

import Navigation from './Navigation'

function Header() {
	return (
		<header>
			<div className="border-b border-[#edf0f2] text-xs text-[#66717c] max-[700px]:hidden">
				<div className="mx-auto flex min-h-[34px] w-[calc(100%-48px)] max-w-[1180px] items-center justify-between">
					<span>신선한 상품을 정직하게 전합니다</span>
					<div className="flex gap-[18px]">
						<NavLink className="hover:text-[#d24e3e]" to="/login">로그인</NavLink>
						<NavLink className="hover:text-[#d24e3e]" to="/signup">회원가입</NavLink>
					</div>
				</div>
			</div>

			<div className="relative mx-auto flex min-h-[88px] w-[calc(100%-48px)] max-w-[1180px] items-center justify-between max-[700px]:min-h-[58px]">
				<NavLink className="inline-flex items-baseline gap-2.5" to="/">
					<span className="text-[26px] font-black tracking-[-1.5px] text-[#182b3d] max-[700px]:text-xl">대정유통</span>
					<span className="text-[11px] font-bold text-[#d24e3e] max-[700px]:text-[9px]">신선함을 담다</span>
				</NavLink>

				<div className="flex items-center gap-[18px] text-[#43505c] max-[700px]:ml-auto max-[700px]:gap-2">
					<button className="inline-flex border-0 bg-transparent p-0" type="button" aria-label="검색">
						<Search aria-hidden="true" size={18} />
					</button>
					<NavLink className="inline-flex" to="/mypage" aria-label="마이페이지">
						<UserRound aria-hidden="true" size={18} />
					</NavLink>
					<NavLink className="inline-flex" to="/cart" aria-label="장바구니">
						<ShoppingCart aria-hidden="true" size={18} />
					</NavLink>
				</div>
			</div>

			<Navigation />
		</header>
	)
}

export default Header