import ProductCard from '@/features/home/components/ProductCard'
import { homeProducts } from '@/features/home/data/homeProducts'

function ProductSection() {
	return (
		<section className="mx-auto w-240 border-x border-[#d5dfe3] bg-white px-3 pt-8 pb-12 shadow-[inset_0_1px_0_white] max-[700px]:w-[calc(100%-28px)] max-[700px]:border-0 max-[700px]:px-0 max-[700px]:pt-6" aria-labelledby="home-products-title">
			<div className="mb-3 border-b-2 border-brand-ocean bg-[#f3f6f7] px-3 py-2 text-left shadow-[inset_0_1px_0_white]">
				<h2 className="mt-0.5 text-xl font-black tracking-[-1px] text-black max-[700px]:text-lg" id="home-products-title">추천상품</h2>
			</div>

			<div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1 max-[700px]:gap-2">
				{homeProducts.map((product) => (
					<ProductCard key={product.name} product={product} />
				))}
			</div>
			
		</section>
	)
}

export default ProductSection