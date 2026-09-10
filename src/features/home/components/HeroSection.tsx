function HeroSection() {
	return (
		<section className="relative min-h-[440px] w-full overflow-hidden bg-[#eaf1f3] max-[700px]:min-h-[330px]" aria-label="대정유통 대표 상품">
			<img
				className="block h-[440px] w-full object-cover max-[700px]:h-[330px]"
				src="https://placehold.co/1200x440/eaf1f3/203548?text=Hero+Image01"
				alt="대정유통 대표 상품 플레이스홀더"
			/>
			<div className="absolute left-8 top-1/2 -translate-y-1/2 text-[#203548] max-[700px]:bottom-7 max-[700px]:left-5 max-[700px]:top-auto max-[700px]:translate-y-0">
				<p className="mb-2.5 text-xs font-extrabold tracking-[1.5px] text-[#d96754]">대정유통 추천 상품</p>
				<h2 className="m-0 text-[clamp(30px,4vw,52px)] font-black leading-[1.18] tracking-[-2px] max-[700px]:text-[30px]">정직한 산지직송,<br />신선한 홍게</h2>
				<p className="mt-[18px] text-sm max-[700px]:mt-2.5 max-[700px]:text-xs">좋은 상품을 산지의 마음 그대로 전해드립니다.</p>
			</div>
		</section>
	)
}

export default HeroSection