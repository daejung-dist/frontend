import { Link } from 'react-router'

function CartPage() {
	return (
		<section className="py-10" aria-labelledby="cart-title">
			<div className="border-2 border-[#aeb9bd] bg-white p-1">
				<div className="border border-[#8e999d] bg-[#f8f8f6] p-6 max-[700px]:p-4">
					<p className="w-fit bg-brand-ocean px-3 py-1 text-xs font-black text-white">SHOPPING CART</p>
					<h1 className="mt-3 text-2xl font-black tracking-[-1px] text-black" id="cart-title">
						장바구니
					</h1>
					<p className="mt-2 text-sm text-[#606b70]">구매할 상품을 확인해 주세요.</p>

					<div className="mt-6 border-y-2 border-brand-ocean-deep bg-white px-5 py-16 text-center">
						<h2 className="text-base font-black text-black">장바구니 상품</h2>
						<p className="mt-2 text-sm text-[#606b70]">장바구니 API 연결 후 상품이 표시됩니다.</p>
						<Link
							className="mt-6 inline-block border-2 border-brand-ocean bg-brand-ocean px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-ocean-deep"
							to="/products"
						>
							상품 보러 가기
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CartPage
