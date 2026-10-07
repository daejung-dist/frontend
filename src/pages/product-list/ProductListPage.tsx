import ProductCard from '@/features/hongge/components/ProductCard'
import { useHongges } from '@/features/hongge/hooks/useHongges'

function ProductListPage() {
	const { data: hongges, isPending, isError } = useHongges()

	return (
		<section className="mx-auto w-240 border-x border-[#d5dfe3] bg-white px-3 pt-8 pb-12 shadow-[inset_0_1px_0_white] max-[700px]:w-[calc(100%-28px)] max-[700px]:border-0 max-[700px]:px-0 max-[700px]:pt-6" aria-labelledby="product-list-title">
			<div className="mb-3 flex items-end justify-between border-b-2 border-brand-ocean bg-[#f3f6f7] px-3 py-2 shadow-[inset_0_1px_0_white]">
				<h1 className="mt-0.5 text-xl font-black tracking-[-1px] text-black max-[700px]:text-lg" id="product-list-title">상품목록</h1>
				{hongges && <span className="text-xs text-[#606b70]">총 {hongges.length}개</span>}
			</div>

			<div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1 max-[700px]:gap-2">
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
