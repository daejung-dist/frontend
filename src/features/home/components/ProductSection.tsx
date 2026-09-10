import ProductCard from './ProductCard'
import { homeProducts } from '../data/homeProducts'

function ProductSection() {
	return (
		<section className="mx-auto w-[calc(100%-48px)] max-w-[1180px] pt-16 max-[700px]:w-[calc(100%-28px)] max-[700px]:pt-10" aria-labelledby="home-products-title">
			<div className="mb-6 text-center">
				<p className="mb-2.5 text-xs font-extrabold tracking-[1.5px] text-[#d96754]">DAEJUNG PICK</p>
				<h2 className="m-0 text-[26px] tracking-[-1px] text-[#203548] max-[700px]:text-[22px]" id="home-products-title">지금 가장 신선한 상품</h2>
			</div>

			<div className="grid grid-cols-2 gap-6 max-[700px]:grid-cols-1 max-[700px]:gap-4">
				{homeProducts.map((product) => (
					<ProductCard key={product.name} product={product} />
				))}
			</div>
		</section>
	)
}

export default ProductSection