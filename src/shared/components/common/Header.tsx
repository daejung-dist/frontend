import { NavLink } from 'react-router'

import Navigation from '@/shared/components/common/Navigation'

function Header() {
	return (
		<header className="border-b-2 border-[#7faabd] bg-white">
			<div className="h-7 border-y border-brand-ocean-deep bg-brand-ocean text-[11px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] max-[700px]:h-auto">
				<div className="mx-auto flex h-full w-240 items-center justify-between max-[700px]:w-[calc(100%-32px)] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-1 max-[700px]:py-1.5">
					<span className="font-bold max-[700px]:text-[10px]">[대정유통] 후포리 명품 홍게 - 산지의 맛을 전합니다. <span className="text-brand-sun">전상품 무료배송!</span></span>
					<div className="flex items-center gap-1.5 text-[10px]">
						<NavLink className="hover:text-brand-sun" to="/login">로그인</NavLink>
						<span className="text-white/50">|</span>
						<NavLink className="hover:text-brand-sun" to="/signup">회원가입</NavLink>
						<span className="text-white/50">|</span>
						<NavLink className="hover:text-brand-sun" to="/mypage">마이페이지</NavLink>
						<span className="text-white/50">|</span>
						<NavLink className="hover:text-brand-sun" to="/cart">장바구니</NavLink>
						<span className="text-white/50">|</span>
						<NavLink className="hover:text-brand-sun" to="/support">고객센터</NavLink>
					</div>
				</div>
			</div>

			<div className="relative mx-auto flex h-23.5 w-240 items-center border-x border-[#d5dfe3] bg-white px-2 shadow-[inset_0_-1px_0_#edf2f4] max-[700px]:h-16 max-[700px]:w-[calc(100%-32px)] max-[700px]:border-0 max-[700px]:px-0">
				<div className="w-39 border-2 border-[#bfc7ca] bg-[#fafafa] py-1.5 text-center text-[11px] leading-[1.35] shadow-[inset_0_0_0_1px_white] max-[700px]:hidden">
					<p className="text-flash-sun font-bold text-brand-ocean">수협</p>
					<p className="font-semibold text-black">수협 654-61-021772</p>
					<p className="text-[10px] text-[#333]">(예금주: 안덕준)</p>
				</div>

				<NavLink className="absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5" to="/" aria-label="대정유통 홈">
					<svg className="h-10 w-15 text-brand-crab max-[700px]:h-8 max-[700px]:w-12" viewBox="0 0 64 40" fill="none" aria-hidden="true">
						<path d="M19 19C19 13 24 10 32 10C40 10 45 13 45 19V25C45 30 40 33 32 33C24 33 19 30 19 25V19Z" fill="currentColor" />
						<path d="M20 18L14 14L10 10L7 11L10 14L7 16M44 18L50 14L54 10L57 11L54 14L57 16" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M20 22L13 21L9 23M20 25L13 27L10 30M25 31L21 35M44 22L51 21L55 23M44 25L51 27L54 30M39 31L43 35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M28 11V8M36 11V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
					</svg>
					<span>
						<span className="block text-[10px] font-bold text-text-secondary max-[700px]:text-[8px]">후포리 홍게 전문</span>
						<span className="block text-[28px] font-black leading-none tracking-[-2px] text-text-primary max-[700px]:text-xl">대정유통</span>
					</span>
				</NavLink>

				<div className="ml-auto flex items-center border border-[#c7c7c7] bg-[#fafafa] px-1 py-1 max-[700px]:hidden" aria-label="전화 주문 안내">
					<span className="text-flash-sun rounded-md bg-brand-crab px-2 py-1.5 text-center text-sm font-black leading-4 text-white">산지<br />직송</span>
					<div className="pl-2">
						<p className="font-black leading-5 tracking-[-1px] text-text-primary">010-3536-6261</p>
						<p className="mt-0.5 bg-black px-2 py-px text-center text-[11px] font-bold text-white"><span className="text-brand-sun">문자</span>를 남겨주세요!</p>
					</div>
				</div>
			</div>

			<div className="hidden border-y border-brand-ocean-deep/15 bg-surface-muted max-[700px]:flex">
				<div className="flex w-full items-center justify-between gap-3 px-4 py-2 text-[10px] text-text-primary">
					<p className="whitespace-nowrap"><span className="text-flash-sun font-bold text-brand-ocean">수협</span> 654-61-021772 (예금주: 안덕준)</p>
					<p className="whitespace-nowrap"><span className="text-flash-sun font-bold text-brand-crab">산지직송</span> 010-3536-6261</p>
				</div>
			</div>

			<Navigation />
		</header>
	)
}

export default Header