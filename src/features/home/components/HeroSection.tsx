import { useEffect, useState } from 'react'

import heroCalamari from '@/assets/images/banners/hero-calamari.jpg'
import heroCrab from '@/assets/images/banners/hero-crab.jpg'

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
				<p className="w-fit border border-[#8d1713] bg-brand-crab px-2 py-1 text-lg font-black text-white shadow-[1px_1px_0_#fff] max-[700px]:text-sm">후포 수협 69번 중매인이 선별한</p>
				<p className="mt-1 w-fit border border-[#b28b00] bg-brand-sun px-2 py-1 text-xl font-black text-black shadow-[1px_1px_0_#fff] max-[700px]:text-base">산지직송 당일배송</p>
				<h2 className="mt-2 text-[42px] font-black leading-[1.2] tracking-[-2px] text-black [text-shadow:1px_1px_0_#fff,2px_2px_3px_rgba(0,0,0,0.3)] max-[700px]:text-[28px]">불필요한 유통과정 없이<br />품질은 높였습니다!</h2>
				<p className="mt-2 text-2xl font-black tracking-[-1px] text-black [text-shadow:1px_1px_0_#fff,2px_2px_3px_rgba(0,0,0,0.3)] max-[700px]:text-lg">100% 품질보장 자연산 홍게</p>
			</div>
		</section>
	)
}

export default HeroSection