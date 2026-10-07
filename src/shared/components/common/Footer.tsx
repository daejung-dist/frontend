function Footer() {
	return (
		<footer className="border-t border-[#e5e9ec] bg-[#f4f6f7] text-xs text-[#6d7780]">
			<div className="mx-auto flex w-[calc(100%-48px)] max-w-[1180px] justify-between gap-8 px-0 py-[34px] pb-[26px] max-[700px]:block max-[700px]:w-[calc(100%-28px)] max-[700px]:py-[26px] max-[700px]:pb-5">
				<div>
					<strong className="text-base text-[#273848]">대정유통</strong>
					<p className="mt-2.5">좋은 상품과 정직한 마음을 전합니다.</p>
				</div>
				<div className="flex max-w-[560px] flex-wrap justify-end gap-x-5 gap-y-2 max-[700px]:mt-[22px] max-[700px]:justify-start">
					<span>사업자등록번호 000-00-00000</span>
					<span>고객센터 0000-0000</span>
					<span>평일 09:00 - 18:00</span>
				</div>
			</div>
			<div className="mx-auto w-[calc(100%-48px)] max-w-[1180px] border-t border-[#e2e6e9] py-3.5 pb-6 text-[11px] text-[#9aa2a9] max-[700px]:w-[calc(100%-28px)]">
				© Daejung Distribution. All rights reserved.
			</div>
		</footer>
	)
}

export default Footer