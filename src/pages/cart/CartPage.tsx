function CartPage() {
	return (
		<section className="p-6 max-[700px]:p-4" aria-labelledby="cart-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="cart-title">
				장바구니
			</h1>
			<p className="mt-2 text-sm text-[#606b70]">구매할 상품을 확인해 주세요.</p>

			<div className="mt-6 border-y-2 border-brand-ocean-deep bg-white px-5 py-16 text-center">
				<h2 className="text-base font-black text-black">장바구니 상품</h2>
				<p className="mt-2 text-sm text-[#606b70]">장바구니에 담긴 상품이 없습니다.</p>
			</div>
		</section>
	)
}

export default CartPage
