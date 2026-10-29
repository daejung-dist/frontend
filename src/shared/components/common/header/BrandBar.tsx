import { NavLink } from 'react-router'

import CrabIcon from '@/shared/assets/icons/crab_icon.svg'
import BankAccountBadge from '@/shared/components/common/header/BankAccountBadge'
import DirectOrderBadge from '@/shared/components/common/header/DirectOrderBadge'

function BrandBar() {
	return (
		<div className="page-container relative flex h-23.5 items-center shadow-[inset_0_-1px_0_#edf2f4] max-[700px]:h-16">
			{/* 모바일에서는 MobileContactBar가 대신 보여 주므로 숨긴다 */}
			<BankAccountBadge className="max-[700px]:hidden" />

			<NavLink
				className="absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5"
				to="/"
				aria-label="대정유통 홈"
			>
				<img className="h-10 w-15 max-[700px]:h-8 max-[700px]:w-12" src={CrabIcon} alt="" />
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

export default BrandBar
