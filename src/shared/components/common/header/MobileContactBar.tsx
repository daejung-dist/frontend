import { BANK_ACCOUNT, ORDER_PHONE } from '@/shared/constants/contact'

function MobileContactBar() {
	return (
		<div className="hidden border-y border-brand-ocean-deep/15 bg-surface-muted max-[700px]:block">
			{/* 아주 좁은 화면에서는 가로 스크롤 대신 전화번호를 다음 줄로 내린다 */}
			<div className="page-container flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2 text-[10px] text-text-primary">
				<p className="whitespace-nowrap">
					<span className="text-flash-sun font-bold text-brand-ocean">{BANK_ACCOUNT.bank}</span> {BANK_ACCOUNT.number}{' '}
					(예금주: {BANK_ACCOUNT.holder})
				</p>
				<a className="whitespace-nowrap" href={`tel:${ORDER_PHONE}`}>
					<span className="text-flash-sun font-bold text-brand-crab">산지직송</span> {ORDER_PHONE}
				</a>
			</div>
		</div>
	)
}

export default MobileContactBar
