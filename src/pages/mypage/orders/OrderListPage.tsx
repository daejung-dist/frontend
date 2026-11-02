function OrderListPage() {
	return (
		<section aria-labelledby="order-list-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="order-list-title">
				주문목록/배송조회
			</h1>
			<div className="mt-6 border border-[#c8d3d7] bg-white px-5 py-8 text-center">
				<p className="text-sm text-[#606b70]">주문 내역 API 연결 후 표시됩니다.</p>
			</div>
		</section>
	)
}

export default OrderListPage
