import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, TouchEvent } from 'react'

import heroCrabMarket960 from '@/shared/assets/images/banners/hero-crab-market-960.webp'
import heroCrabMarket from '@/shared/assets/images/banners/hero-crab-market.webp'
import heroCrabSorting960 from '@/shared/assets/images/banners/hero-crab-sorting-960.webp'
import heroCrabSorting from '@/shared/assets/images/banners/hero-crab-sorting.webp'
import heroCrab960 from '@/shared/assets/images/banners/hero-crab-960.webp'
import heroCrab from '@/shared/assets/images/banners/hero-crab.webp'

const HERO_IMAGES = [
	{
		src: heroCrabMarket,
		srcSet: `${heroCrabMarket960} 960w, ${heroCrabMarket} 1280w`,
		alt: '위판장에 가득 펼쳐진 갓 잡은 홍게',
	},
	{
		src: heroCrabSorting,
		srcSet: `${heroCrabSorting960} 960w, ${heroCrabSorting} 1280w`,
		alt: '위판장에서 홍게를 손으로 하나씩 선별하는 모습',
	},
	{ src: heroCrab, srcSet: `${heroCrab960} 960w, ${heroCrab} 1280w`, alt: '위판장 바닥에 줄지어 놓인 자연산 홍게' },
]
// 모바일 배너는 330px 높이를 4:3 사진으로 채우므로(object-cover) 화면 너비보다 넓은 약 440px로 그려진다
const HERO_IMAGE_SIZES = '(max-width: 700px) 440px, 960px'
const AUTO_SLIDE_DELAY = 5000
const SWIPE_THRESHOLD = 50

const getIndexAfter = (index: number, offset: number) => (index + offset + HERO_IMAGES.length) % HERO_IMAGES.length

const controlButtonClassName =
	'flex size-8 items-center justify-center rounded-full bg-black/40 text-lg leading-none text-white hover:bg-black/60 max-[700px]:size-7'

function HeroSection() {
	const [activeImageIndex, setActiveImageIndex] = useState(0)
	const [isPausedByUser, setIsPausedByUser] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const touchStartRef = useRef<{ x: number; y: number } | null>(null)
	const isPaused = isPausedByUser || isHovered

	// 수동으로 넘겼을 때 바로 다시 넘어가지 않도록 인덱스가 바뀔 때마다 타이머를 새로 건다
	useEffect(() => {
		if (isPaused) return

		const timeoutId = window.setTimeout(() => {
			setActiveImageIndex((currentIndex) => getIndexAfter(currentIndex, 1))
		}, AUTO_SLIDE_DELAY)

		return () => window.clearTimeout(timeoutId)
	}, [activeImageIndex, isPaused])

	// 처음 넘어갈 때 빈 화면이 보이지 않도록 나머지 배너를 미리 받아 둔다.
	// 화면의 <img>와 같은 srcSet·sizes를 줘야 브라우저가 같은 크기의 파일을 고른다.
	useEffect(() => {
		HERO_IMAGES.slice(1).forEach(({ src, srcSet }) => {
			const image = new Image()
			image.sizes = HERO_IMAGE_SIZES
			image.srcset = srcSet
			image.src = src
		})
	}, [])

	// 터치 기기는 탭할 때 enter만 발생하고 leave가 오지 않아 멈춘 채로 남으므로 마우스일 때만 처리한다
	const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
		if (event.pointerType === 'mouse') setIsHovered(true)
	}

	const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
		if (event.pointerType === 'mouse') setIsHovered(false)
	}

	const showPrevImage = () => {
		setActiveImageIndex((currentIndex) => getIndexAfter(currentIndex, -1))
	}

	const showNextImage = () => {
		setActiveImageIndex((currentIndex) => getIndexAfter(currentIndex, 1))
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
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
		>
			<img
				className="block h-[432px] w-full border border-[#8e999d] object-cover max-[700px]:h-[330px] max-[700px]:border-0"
				src={HERO_IMAGES[activeImageIndex].src}
				srcSet={HERO_IMAGES[activeImageIndex].srcSet}
				sizes={HERO_IMAGE_SIZES}
				alt={HERO_IMAGES[activeImageIndex].alt}
				// 첫 화면에서 가장 큰 요소라 첫 배너만 다른 리소스보다 먼저 받게 한다
				fetchPriority={activeImageIndex === 0 ? 'high' : 'auto'}
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
				<button
					className={controlButtonClassName}
					type="button"
					aria-label={isPausedByUser ? '배너 자동 넘김 재생' : '배너 자동 넘김 멈춤'}
					onClick={() => setIsPausedByUser((paused) => !paused)}
				>
					<span className="text-[10px]">{isPausedByUser ? '▶' : '❚❚'}</span>
				</button>
			</div>
		</section>
	)
}

export default HeroSection
