import crabMarket from '@/shared/assets/images/231277CA-2CF2-414A-BFFF-A49218EDE585.jpg'
import crabPack from '@/shared/assets/images/270DEFEF-DC65-4A7A-BCAC-3C723A1746CD.jpg'
import heroCrab from '@/shared/assets/images/banners/hero-crab.jpg'

const promises = [
	{
		number: '1',
		title: '선주 직배송',
		description: '산지 직송으로 더욱 신선하게!',
		image: heroCrab,
		alt: '바다에서 조업 중인 배',
	},
	{
		number: '2',
		title: '철저한 품질 관리',
		description: '꼼꼼한 검수로 최고 품질만!',
		image: crabPack,
		alt: '포장된 홍게 상품',
	},
	{
		number: '3',
		title: '신속 안전 배송',
		description: '신선도를 지켜 안전하게 배송!',
		image: crabMarket,
		alt: '수산물 산지 작업 현장',
	},
]

function AboutPage() {
	return (
		<section className="mx-auto w-240 border-x border-[#d5dfe3] bg-white shadow-[inset_0_1px_0_white] max-[700px]:w-full max-[700px]:border-0" aria-labelledby="about-title">
			<div className="border-b-2 border-brand-ocean-deep bg-brand-ocean px-4 py-2 text-center text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] max-[700px]:text-xs">
				대정유통 · 동해의 신선함을 식탁까지, 정직과 신뢰의 해산물 전문 기업
			</div>

			<div className="px-5 py-7 max-[700px]:px-4 max-[700px]:py-5">
				<div className="border-2 border-[#aeb9bd] bg-[#f2f2ed] p-1 shadow-[inset_0_0_0_1px_white,0_1px_3px_rgba(0,0,0,0.18)]">
					<div className="border border-[#8e999d] bg-white px-7 py-7 shadow-[inset_0_1px_0_white] max-[700px]:px-4 max-[700px]:py-5">
						<h1 className="text-center text-[30px] font-black tracking-[-2px] text-black max-[700px]:text-[24px]" id="about-title">
							바다의 신선함을 온전히 담아냅니다
						</h1>
						<div className="mt-5 grid grid-cols-[1.05fr_0.95fr] items-center gap-7 max-[700px]:grid-cols-1 max-[700px]:gap-4">
							<img className="h-52 w-full border border-[#9da9ad] object-cover max-[700px]:h-44" src={heroCrab} alt="푸른 바다와 홍게" />
							<div className="text-center max-[700px]:text-left">
								<p className="text-sm font-bold leading-6 text-text-primary">
									대정유통은 수산물 유통 전문 기업으로,
									<br className="max-[700px]:hidden" />
									중매인 직배송 시스템을 통해
									<br className="max-[700px]:hidden" />
									가장 신선한 자연의 맛을 고객님의 식탁까지
									<br className="max-[700px]:hidden" />
									안전하게 배달합니다.
								</p>
								<p className="mt-5 text-xl font-black tracking-[-1px] text-brand-crab max-[700px]:mt-3 max-[700px]:text-lg">
									100% 품질 보장, 정직한 먹거리
								</p>
							</div>
						</div>
					</div>
				</div>

				<section className="mt-7" aria-labelledby="promise-title">
					<h2 className="text-center text-2xl font-black tracking-[-1px] text-black max-[700px]:text-xl" id="promise-title">대정유통의 약속</h2>
					<div className="mx-auto mt-2 h-1 w-20 bg-brand-sun" />
					<div className="mt-4 grid grid-cols-3 gap-4 max-[700px]:grid-cols-1 max-[700px]:gap-3">
						{promises.map((promise) => (
							<article key={promise.number} className="text-center">
								<div className="flex items-baseline justify-center gap-2">
									<strong className="text-3xl font-black text-brand-ocean-deep">{promise.number}</strong>
									<h3 className="text-sm font-black text-black">{promise.title}</h3>
								</div>
								<p className="mt-0.5 text-[11px] text-[#606b70]">{promise.description}</p>
								<img className="mt-2 h-28 w-full border border-[#aeb9bd] object-cover max-[700px]:h-40" src={promise.image} alt={promise.alt} />
							</article>
						))}
					</div>
				</section>

				<div className="mt-7 flex items-center justify-center gap-4 border-2 border-brand-crab bg-brand-crab px-4 py-3 text-center text-lg font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] max-[700px]:gap-2 max-[700px]:px-2 max-[700px]:text-sm">
					<span>고객님의 신뢰를 최고의 신선함으로 보답하겠습니다!</span>
				</div>

				<div className="mt-5 border border-[#c3cbce] bg-[#f7f8f6] px-5 py-4 text-center text-xs leading-5 text-[#606b70] max-[700px]:px-3">
					<p className="font-black text-text-primary">대정유통 · 후포리 홍게 전문</p>
					<p className="mt-1">전화 주문 010-3536-6261 · 수협 654-61-021772 (예금주: 안덕준)</p>
				</div>
			</div>
		</section>
	)
}

export default AboutPage
