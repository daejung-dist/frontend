import ProductCard from '@/features/hongge/components/ProductCard'
import type { Hongge } from '@/features/hongge/types'

interface ProductGridProps {
	products: Hongge[] | undefined
	isPending: boolean
	isError: boolean
}

// 홈 추천상품과 상품목록 페이지가 같은 목록 모양과 상태 문구를 쓰도록 묶는다
function ProductGrid({ products, isPending, isError }: ProductGridProps) {
	return (
		<>
			<div className="grid grid-cols-2 gap-3 max-[700px]:gap-2">
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{isPending && <p className="py-8 text-center text-sm">상품을 불러오는 중입니다.</p>}
			{isError && <p className="py-8 text-center text-sm">상품을 불러오지 못했습니다.</p>}
			{products?.length === 0 && <p className="py-8 text-center text-sm">준비 중인 상품이 없습니다.</p>}
		</>
	)
}

export default ProductGrid
