import { useEffect, useRef, useState } from 'react'
import type { TouchEvent } from 'react'

import heroCrabMarket from '@/shared/assets/images/banners/hero-crab-market.webp'
import heroCrabSorting from '@/shared/assets/images/banners/hero-crab-sorting.webp'
import heroCrab from '@/shared/assets/images/banners/hero-crab.webp'

const HERO_IMAGES = [
	{ src: heroCrab, alt: '위판장 바닥에 줄지어 놓인 자연산 홍게' },
	{ src: heroCrabSorting, alt: '위판장에서 홍게를 손으로 하나씩 선별하는 모습' },
	{ src: heroCrabMarket, alt: '위판장에 가득 펼쳐진 갓 잡은 홍게' },
]
const AUTO_SLIDE_DELAY = 5000
const SWIPE_THRESHOLD = 50

const controlButtonClassName =
	'flex size-8 items-center justify-center rounded-full bg-black/40 text-lg leading-none text-white hover:bg-black/60 max-[700px]:size-7'

function HeroSection() {
	const [activeImageIndex, setActiveImageIndex] = useState(0)
	const touchStartRef = useRef<{ x: number; y: number } | null>(null)

	// 수동으로 넘겼을 때 바로 다시 넘어가지 않도록 인덱스가 바뀔 때마다 타이머를 새로 건다
	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setActiveImageIndex((currentIndex) => (currentIndex + 1) % HERO_IMAGES.length)
		}, AUTO_SLIDE_DELAY)

		return () => window.clearTimeout(timeoutId)
	}, [activeImageIndex])

	const showPrevImage = () => {
		setActiveImageIndex((currentIndex) => (currentIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
	}

	const showNextImage = () => {
		setActiveImageIndex((currentIndex) => (currentIndex + 1) % HERO_IMAGES.length)
	}

	const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
		const touch = event.touches[0]
		touchStartRef.current = { x: touch.clientX, y: touch.clientY }
	}

	const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
		const touchStart = touchStartRef.current
		touchStartRef.current = null
		if (!touchStart) return

		const touch = event.changedTouches[0]
		const deltaX = touch.clientX - touchStart.x
		const deltaY = touch.clientY - touchStart.y

		// 세로 스크롤하다 살짝 옆으로 밀린 경우는 넘기지 않는다
		if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return

		if (deltaX < 0) {
			showNextImage()
		} else {
			showPrevImage()
		}
	}

	return (
		<section
			className="relative min-h-[440px] overflow-hidden border-2 border-[#aeb9bd] bg-[#f1f1ee] p-1 shadow-[inset_0_0_0_1px_white,0_1px_3px_rgba(0,0,0,0.2)] max-[700px]:min-h-[330px] max-[700px]:p-0 touch-pan-y"
			aria-label="대정유통 대표 상품"
			aria-roledescription="carousel"
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<img
				className="block h-[432px] w-full border border-[#8e999d] object-cover max-[700px]:h-[330px] max-[700px]:border-0"
				src={HERO_IMAGES[activeImageIndex].src}
				alt={HERO_IMAGES[activeImageIndex].alt}
			/>
			<div className="absolute inset-y-1 left-1 flex w-[45%] flex-col items-start justify-center pl-10 text-left max-[700px]:inset-y-0 max-[700px]:left-0 max-[700px]:w-[70%] max-[700px]:pl-5">
				<p className="rounded-md bg-brand-crab px-4 py-1 text-xl font-black tracking-[-1px] text-white max-[700px]:px-2.5 max-[700px]:text-sm">
					산지직송 당일배송
				</p>
				<p className="mt-3 rounded-md bg-brand-crab px-4 py-1 text-xl font-black tracking-[-1px] text-white max-[700px]:mt-2 max-[700px]:px-2 max-[700px]:text-[11px]">
					후포 수협 69번 중매인이 선별한
				</p>
				<h1 className="mt-4 text-[46px] font-black leading-tight tracking-[-2px] text-black [-webkit-text-stroke:6px_white] [paint-order:stroke_fill] max-[700px]:mt-2.5 max-[700px]:text-2xl max-[700px]:[-webkit-text-stroke:4px_white]">
					100% 품질보장
					<br />
					자연산 홍게
				</h1>
			</div>

			{/* 문구와 겹치지 않도록 컨트롤은 하단 중앙에 모은다 */}
			<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 max-[700px]:bottom-3">
				<button className={controlButtonClassName} type="button" aria-label="이전 배너" onClick={showPrevImage}>
					‹
				</button>
				<div className="flex items-center gap-2">
					{HERO_IMAGES.map((image, index) => (
						<button
							key={image.src}
							className={`size-2.5 rounded-full border border-white transition-colors ${
								index === activeImageIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
							}`}
							type="button"
							aria-label={`${index + 1}번째 배너 보기`}
							aria-current={index === activeImageIndex}
							onClick={() => setActiveImageIndex(index)}
						/>
					))}
				</div>
				<button className={controlButtonClassName} type="button" aria-label="다음 배너" onClick={showNextImage}>
					›
				</button>
			</div>
		</section>
	)
}

export default HeroSection
