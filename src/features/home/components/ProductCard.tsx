import type { HomeProduct } from '../data/homeProducts'

interface ProductCardProps {
	product: HomeProduct
}

function ProductCard({ product }: ProductCardProps) {
	return (
		<article className="overflow-hidden border border-[#e5e9ec] bg-white">
			<img
				className="block aspect-[560/360] w-full object-cover"
				src={product.image}
				alt={`${product.name} 플레이스홀더`}
				loading="lazy"
			/>
			<div className="flex items-center justify-between gap-4 px-5 py-[18px] max-[700px]:p-3.5">
				<h3 className="m-0 text-base text-[#203548] max-[700px]:text-sm">{product.name}</h3>
				<button className="shrink-0 border border-[#203548] bg-white px-3 py-2 text-[11px] text-[#203548]" type="button">상품 준비 중</button>
			</div>
		</article>
	)
}

export default ProductCard