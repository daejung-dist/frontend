import { useEffect, useState } from 'react'

import heroCalamari from '@/shared/assets/images/banners/hero-calamari.jpg'
import heroCrab from '@/shared/assets/images/banners/hero-crab.jpg'

function HeroSection() {
	const [activeImageIndex, setActiveImageIndex] = useState(0)
	const heroImages = [heroCrab, heroCalamari]

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setActiveImageIndex((currentIndex) => (currentIndex + 1) % heroImages.length)
		}, 3000)

		return () => window.clearInterval(intervalId)
	}, [heroImages.length])

	return (
		<section className="relative mx-auto min-h-[440px] w-240 overflow-hidden border-2 border-[#aeb9bd] bg-[#f1f1ee] p-1 shadow-[inset_0_0_0_1px_white,0_1px_3px_rgba(0,0,0,0.2)] max-[700px]:min-h-[330px] max-[700px]:w-full max-[700px]:border-x-0 max-[700px]:p-0" aria-label="대정유통 대표 상품">
			<img
				key={heroImages[activeImageIndex]}
				className="block h-[432px] w-full animate-in border border-[#8e999d] fade-in duration-500 object-cover max-[700px]:h-[330px] max-[700px]:border-0"
				src={heroImages[activeImageIndex]}
				alt="대정유통 배너 이미지"
			/>
			<div className="absolute top-1/2 left-8 -translate-y-1/2 max-[700px]:left-4">
				<h2 className="mt-2 text-[42px] font-black leading-[1.2] tracking-[-2px] text-brand-crab [-webkit-text-stroke:4px_white] [paint-order:stroke_fill] max-[700px]:text-[28px]">후포 수협 69번 중매인이 선별한<br />산지직송 당일배송</h2>
				<p className="mt-2 text-2xl font-black tracking-[-1px] text-black [-webkit-text-stroke:4px_white] [paint-order:stroke_fill] max-[700px]:text-lg">100% 품질보장 자연산 홍게</p>
			</div>
		</section>
	)
}

export default HeroSection