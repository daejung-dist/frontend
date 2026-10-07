import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'

import PurchasePanel from '@/pages/product-detail/components/PurchasePanel'
import { useHongge } from '@/features/hongge/hooks/useHongge'

function ProductDetailPage() {
	const { id } = useParams()
	const { data: hongge, isPending, isError } = useHongge(Number(id))

	return (
		<section className="mx-auto w-240 px-3 py-8 max-[700px]:w-full max-[700px]:px-4 max-[700px]:py-6">
			<Link className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-brand-ocean-deep hover:underline" to="/">
				<ArrowLeft aria-hidden="true" size={16} />
				홈으로
			</Link>

			{isPending && <p className="py-16 text-center text-sm">상품을 불러오는 중입니다.</p>}
			{isError && <p className="py-16 text-center text-sm">상품을 불러오지 못했습니다.</p>}

			{hongge && (
				<div className="grid grid-cols-2 gap-6 border-2 border-[#b8c2c6] bg-[#f8f8f6] p-4 shadow-[inset_0_0_0_1px_white] max-[700px]:grid-cols-1 max-[700px]:p-3">
					<img
						className="block aspect-4/3 w-full border border-[#9da9ad] object-cover"
						src={hongge.thumbnailUrl}
						alt={hongge.name}
					/>
					<div className="flex flex-col">
						<h1 className="text-2xl font-black text-black max-[700px]:text-xl">{hongge.name}</h1>
						<strong className="mt-3 text-3xl font-black text-brand-crab max-[700px]:text-2xl">{hongge.price.toLocaleString()}원</strong>
						<dl className="mt-5 border-y border-[#c3cbce] py-3 text-sm">
							<div className="flex gap-4">
								<dt className="w-16 font-bold text-[#606b70]">재고</dt>
								<dd className="text-black">{hongge.quantity > 0 ? `${hongge.quantity}개` : '품절'}</dd>
							</div>
						</dl>
						<p className="mt-5 text-sm leading-6 text-black">{hongge.description}</p>
						<PurchasePanel key={hongge.id} hongge={hongge} />
					</div>
				</div>
			)}
		</section>
	)
}

export default ProductDetailPage
