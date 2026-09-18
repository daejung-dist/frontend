import { Link } from 'react-router'

import type { HomeProduct } from '@/features/home/data/homeProducts'

interface ProductCardProps {
	product: HomeProduct
}

function ProductCard({ product }: ProductCardProps) {
	return (
		<Link className="block overflow-hidden border-2 border-[#b8c2c6] bg-[#f8f8f6] p-1 shadow-[inset_0_0_0_1px_white]" to="/products/detail">
			<img
				className="block aspect-560/360 w-full border border-[#9da9ad] object-cover"
				src={product.image}
				alt={product.name}
				loading="lazy"
			/>
			<div className="border-t border-[#c3cbce] px-3 py-2.5 max-[700px]:px-2 max-[700px]:py-2">
				<h3 className="m-0 text-sm font-bold text-black max-[700px]:text-[13px]">{product.name}</h3>
				<div className="mt-2 flex items-center justify-between gap-3">
					<strong className="text-flash-sun text-base font-black text-brand-crab">{product.price}</strong>
					<button className="shrink-0 border border-brand-crab bg-brand-crab px-3 py-1 text-[11px] font-bold text-white shadow-[1px_1px_0_#fff]" type="button">상품 보기</button>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard