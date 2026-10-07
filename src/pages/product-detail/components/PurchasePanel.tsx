import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import type { Hongge } from '@/features/hongge/types'

interface PurchasePanelProps {
	hongge: Hongge
}

function PurchasePanel({ hongge }: PurchasePanelProps) {
	const [count, setCount] = useState(1)
	const soldOut = hongge.quantity <= 0

	const changeCount = (next: number) => {
		setCount(Math.min(Math.max(next, 1), hongge.quantity))
	}

	return (
		<div className="mt-auto pt-6">
			<div className="flex items-center justify-between border-y border-[#c3cbce] py-3">
				<span className="text-sm font-bold text-[#606b70]">수량</span>
				<div className="flex items-center border border-[#9da9ad] bg-white">
					<button
						className="flex size-8 items-center justify-center disabled:opacity-40"
						type="button"
						aria-label="수량 감소"
						disabled={soldOut || count <= 1}
						onClick={() => changeCount(count - 1)}
					>
						<Minus aria-hidden="true" size={14} />
					</button>
					<span className="w-10 text-center text-sm font-bold" aria-live="polite">{soldOut ? 0 : count}</span>
					<button
						className="flex size-8 items-center justify-center disabled:opacity-40"
						type="button"
						aria-label="수량 증가"
						disabled={soldOut || count >= hongge.quantity}
						onClick={() => changeCount(count + 1)}
					>
						<Plus aria-hidden="true" size={14} />
					</button>
				</div>
			</div>

			<div className="flex items-center justify-between py-4">
				<span className="text-sm font-bold text-[#606b70]">총 상품금액</span>
				<strong className="text-2xl font-black text-brand-crab">{(hongge.price * (soldOut ? 0 : count)).toLocaleString()}원</strong>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<button
					className="border-2 border-brand-ocean-deep bg-white px-4 py-3 text-sm font-bold text-brand-ocean-deep disabled:border-[#b8c2c6] disabled:text-[#9da9ad]"
					type="button"
					disabled={soldOut}
				>
					장바구니
				</button>
				<button
					className="border-2 border-brand-crab bg-brand-crab px-4 py-3 text-sm font-bold text-white hover:bg-brand-crab-dark disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]"
					type="button"
					disabled={soldOut}
				>
					{soldOut ? '품절' : '구매하기'}
				</button>
			</div>
		</div>
	)
}

export default PurchasePanel
