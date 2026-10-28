import { BANK_ACCOUNT, ORDER_PHONE } from '@/shared/constants/contact'

function MobileContactBar() {
	return (
		<div className="hidden border-y border-brand-ocean-deep/15 bg-surface-muted max-[700px]:flex">
			<div className="page-container flex items-center justify-between gap-3 py-2 text-[10px] text-text-primary">
				<p className="whitespace-nowrap">
					<span className="text-flash-sun font-bold text-brand-ocean">{BANK_ACCOUNT.bank}</span> {BANK_ACCOUNT.number}{' '}
					(예금주: {BANK_ACCOUNT.holder})
				</p>
				<p className="whitespace-nowrap">
					<span className="text-flash-sun font-bold text-brand-crab">산지직송</span> {ORDER_PHONE}
				</p>
			</div>
		</div>
	)
}

export default MobileContactBar
