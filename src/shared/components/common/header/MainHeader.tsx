import { NavLink } from 'react-router'

import BankAccountBadge from '@/shared/components/common/header/BankAccountBadge'
import DirectOrderBadge from '@/shared/components/common/header/DirectOrderBadge'

function MainHeader() {
	return (
		<div className="page-container relative flex h-23.5 items-center bg-white shadow-[inset_0_-1px_0_#edf2f4] max-[700px]:h-16 max-[700px]:border-0">
			{/* 모바일에서는 MobileContactBar가 대신 보여 주므로 숨긴다 */}
			<BankAccountBadge className="max-[700px]:hidden" />

			<NavLink
				className="absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5"
				to="/"
				aria-label="대정유통 홈"
			>
				<svg
					className="h-10 w-15 text-brand-crab max-[700px]:h-8 max-[700px]:w-12"
					viewBox="0 0 64 40"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M19 19C19 13 24 10 32 10C40 10 45 13 45 19V25C45 30 40 33 32 33C24 33 19 30 19 25V19Z"
						fill="currentColor"
					/>
					<path
						d="M20 18L14 14L10 10L7 11L10 14L7 16M44 18L50 14L54 10L57 11L54 14L57 16"
						stroke="currentColor"
						strokeWidth="4.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M20 22L13 21L9 23M20 25L13 27L10 30M25 31L21 35M44 22L51 21L55 23M44 25L51 27L54 30M39 31L43 35"
						stroke="currentColor"
						strokeWidth="4.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path d="M28 11V8M36 11V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
				</svg>
				<span>
					<span className="block text-[10px] font-bold text-text-secondary max-[700px]:text-[8px]">
						후포리 홍게 전문
					</span>
					<span className="block text-[28px] font-black leading-none tracking-[-2px] text-text-primary max-[700px]:text-xl">
						대정유통
					</span>
				</span>
			</NavLink>

			<DirectOrderBadge className="ml-auto max-[700px]:hidden" />
		</div>
	)
}

export default MainHeader
