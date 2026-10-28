function Footer() {
	return (
		<footer className="border-t border-[#e5e9ec] bg-[#f4f6f7] text-xs text-[#6d7780]">
			<div className="page-container flex justify-between gap-8 py-[34px] pb-[26px] max-[700px]:block max-[700px]:py-[26px] max-[700px]:pb-5">
				<div>
					<strong className="text-base text-[#273848]">대정유통</strong>
					<p className="mt-2.5">좋은 상품과 정직한 마음을 전합니다.</p>
				</div>
			</div>
			{/* 구분선이 여백까지 뻗지 않도록 컨테이너 안쪽에 둔다 */}
			<div className="page-container">
				<div className="border-t border-[#e2e6e9] py-3.5 pb-6 text-[11px] text-[#9aa2a9]">
					© Daejung Distribution. All rights reserved.
				</div>
			</div>
		</footer>
	)
}

export default Footer
