import { BANK_ACCOUNT } from '@/shared/constants/contact'

type BankAccountBadgeProps = {
	className?: string
}

function BankAccountBadge({ className = '' }: BankAccountBadgeProps) {
	return (
		<div
			className={`w-39 border border-brand-ocean-deep bg-[#fafafa] py-1.5 text-center text-[11px] leading-[1.35] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ${className}`}
		>
			<p className="text-flash-sun font-bold text-brand-ocean">{BANK_ACCOUNT.bank}</p>
			<p className="font-semibold text-black">
				{BANK_ACCOUNT.bank} {BANK_ACCOUNT.number}
			</p>
			<p className="text-[10px] text-[#333]">(예금주: {BANK_ACCOUNT.holder})</p>
		</div>
	)
}

export default BankAccountBadge
