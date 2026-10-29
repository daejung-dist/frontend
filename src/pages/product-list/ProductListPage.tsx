import ProductCard from '@/features/hongge/components/ProductCard'
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

			<div className="grid grid-cols-2 gap-3 max-[700px]:gap-2">
				{hongges?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{isPending && <p className="py-8 text-center text-sm">상품을 불러오는 중입니다.</p>}
			{isError && <p className="py-8 text-center text-sm">상품을 불러오지 못했습니다.</p>}
			{hongges?.length === 0 && <p className="py-8 text-center text-sm">등록된 상품이 없습니다.</p>}
		</section>
	)
}

export default ProductListPage
