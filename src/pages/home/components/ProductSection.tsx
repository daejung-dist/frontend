import ProductGrid from '@/features/hongge/components/ProductGrid'
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

			<ProductGrid products={hongges} isPending={isPending} isError={isError} />
		</section>
	)
}

export default ProductSection
