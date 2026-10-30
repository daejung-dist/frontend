import ProductGrid from '@/features/hongge/components/ProductGrid'
import { useHongges } from '@/features/hongge/hooks/useHongges'

function ProductListPage() {
	const { data: hongges, isPending, isError } = useHongges()

	return (
		<section aria-labelledby="product-list-title">
			<div className="flex items-end justify-between px-3 py-2">
				<h1 className="text-xl font-black tracking-[-1px] text-black max-[700px]:text-lg" id="product-list-title">
					상품목록
				</h1>
				{hongges && <span className="text-xs text-[#606b70]">총 {hongges.length}개</span>}
			</div>

			<ProductGrid products={hongges} isPending={isPending} isError={isError} />
		</section>
	)
}

export default ProductListPage
