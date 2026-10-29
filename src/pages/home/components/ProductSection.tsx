import ProductCard from '@/features/hongge/components/ProductCard'
import { useHongges } from '@/features/hongge/hooks/useHongges'

function ProductSection() {
	const { data: hongges, isPending, isError } = useHongges()

	return (
		<section aria-labelledby="home-products-title">
			<div className="px-3 py-2">
				<h2 className="text-xl font-black tracking-[-1px] text-black max-[700px]:text-lg" id="home-products-title">
					추천상품
				</h2>
			</div>

			<div className="grid grid-cols-2 gap-3 max-[700px]:gap-2">
				{hongges?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{isPending && <p className="py-8 text-center text-sm">상품을 불러오는 중입니다.</p>}
			{isError && <p className="py-8 text-center text-sm">상품을 불러오지 못했습니다.</p>}
			{hongges?.length === 0 && <p className="py-8 text-center text-sm">준비 중인 상품이 없습니다.</p>}
		</section>
	)
}

export default ProductSection
