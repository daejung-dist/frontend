import { ORDER_PHONE } from '@/shared/constants/contact'

type DirectOrderBadgeProps = {
	className?: string
}

function DirectOrderBadge({ className = '' }: DirectOrderBadgeProps) {
	return (
		<div
			className={`flex items-center border border-[#c7c7c7] bg-[#fafafa] px-1 py-1 ${className}`}
			aria-label="전화 주문 안내"
		>
			<span className="text-flash-sun rounded-md bg-brand-crab px-2 py-1.5 text-center text-sm font-black leading-4 text-white">
				산지
				<br />
				직송
			</span>
			<div className="pl-2">
				<p className="font-black leading-5 tracking-[-1px] text-text-primary">{ORDER_PHONE}</p>
				<p className="mt-0.5 bg-black px-2 py-px text-center text-[11px] font-bold text-white">
					<span className="text-brand-sun">문자</span>를 남겨주세요!
				</p>
			</div>
		</div>
	)
}

export default DirectOrderBadge
