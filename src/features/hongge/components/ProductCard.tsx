import { Link } from 'react-router'

import type { Hongge } from '@/features/hongge/types'

interface ProductCardProps {
	product: Hongge
}

function ProductCard({ product }: ProductCardProps) {
	return (
		<Link
			className="block overflow-hidden border border-brand-ocean-deep bg-[#f8f8f6] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
			to={`/products/${product.id}`}
		>
			<img
				className="block aspect-560/360 w-full border border-[#9da9ad] object-cover"
				src={product.thumbnailUrl}
				alt={product.name}
				loading="lazy"
			/>
			<div className="border-t border-[#c3cbce] px-3 py-2.5 max-[700px]:px-2 max-[700px]:py-2">
				<h3 className="m-0 text-sm font-bold text-black max-[700px]:text-[13px]">{product.name}</h3>
				<div className="mt-2 flex items-center justify-between gap-3">
					<strong className="text-flash-sun text-base font-black text-brand-crab">
						{product.price.toLocaleString()}원
					</strong>
					{/* 카드 전체가 링크라 링크 안에 버튼을 넣을 수 없으므로 버튼 모양만 낸다 */}
					<span className="shrink-0 border border-brand-crab bg-brand-crab px-3 py-1 text-[11px] font-bold text-white shadow-[1px_1px_0_#fff]">
						상품 보기
					</span>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
