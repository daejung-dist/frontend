function CheckoutPage() {
	return (
		<section className="py-10" aria-labelledby="checkout-title">
			<div className="border-2 border-[#aeb9bd] bg-white p-1">
				<div className="border border-[#8e999d] bg-[#f8f8f6] p-6 max-[700px]:p-4">
					<p className="w-fit bg-brand-crab px-3 py-1 text-xs font-black text-white">ORDER / PAYMENT</p>
					<h1 className="mt-3 text-2xl font-black tracking-[-1px] text-black" id="checkout-title">
						구매·결제
					</h1>
					<p className="mt-2 text-sm text-[#606b70]">주문 상품과 배송지, 결제 정보를 확인해 주세요.</p>

					<div className="mt-6 space-y-4">
						<section className="border border-[#c8d3d7] bg-white p-5" aria-labelledby="checkout-products-title">
							<h2
								className="border-b border-[#d5dfe3] pb-3 text-base font-black text-black"
								id="checkout-products-title"
							>
								주문 상품
							</h2>
							<p className="py-8 text-center text-sm text-[#606b70]">주문 상품 API 연결 후 표시됩니다.</p>
						</section>

						<section className="border border-[#c8d3d7] bg-white p-5" aria-labelledby="checkout-shipping-title">
							<h2
								className="border-b border-[#d5dfe3] pb-3 text-base font-black text-black"
								id="checkout-shipping-title"
							>
								배송지 정보
							</h2>
							<p className="py-8 text-center text-sm text-[#606b70]">배송지 API 연결 후 표시됩니다.</p>
						</section>

						<section className="border border-[#c8d3d7] bg-white p-5" aria-labelledby="checkout-payment-title">
							<h2
								className="border-b border-[#d5dfe3] pb-3 text-base font-black text-black"
								id="checkout-payment-title"
							>
								결제 정보
							</h2>
							<p className="py-8 text-center text-sm text-[#606b70]">결제 API 연결 후 표시됩니다.</p>
						</section>
					</div>

					<button
						className="mt-6 w-full border-2 border-[#b8c2c6] bg-[#b8c2c6] py-3 text-sm font-bold text-white"
						type="button"
						disabled
					>
						결제 준비 중
					</button>
				</div>
			</div>
		</section>
	)
}

export default CheckoutPage
