const benefits = [
	{
		title: '풍부한 단백질과 필수 아미노산',
		description: '담백한 살에 단백질과 필수 아미노산이 풍부해 맛과 영양을 함께 즐길 수 있습니다.',
	},
	{
		title: '진한 감칠맛과 부드러운 식감',
		description: '깊은 바다에서 자란 홍게는 짭조름한 감칠맛과 촉촉하고 부드러운 살이 특징입니다.',
	},
	{
		title: '대게 못지않은 풍미, 합리적인 가격',
		description: '진한 게 향과 고소한 내장을 부담을 덜어낸 가격으로 푸짐하게 맛볼 수 있습니다.',
	},
]

function InfoSection() {
	return (
		<section className="bg-[#fffefa] px-12 py-10 max-[700px]:px-6 max-[700px]:py-7">
			<p className="text-sm font-black tracking-[0.12em] text-brand-crab max-[700px]:text-xs">깊은 바다의 붉은 보물</p>
			<h2 className="mt-1 font-serif text-[30px] font-bold tracking-[-1px] text-[#332b27] max-[700px]:text-[23px]">
				홍게가 사랑받는 이유
			</h2>
			<p className="mt-2 text-xs font-bold text-[#6d5c50] max-[700px]:text-[11px]">
				대게 못지않은 깊은 풍미를 더 넉넉하고 합리적으로
			</p>

			<div className="mt-7 max-w-[570px] space-y-4 max-[700px]:mt-5 max-[700px]:space-y-3">
				{benefits.map((benefit) => (
					<div key={benefit.title}>
						<h3 className="text-sm font-black text-[#463930] max-[700px]:text-xs">{benefit.title}</h3>
						<p className="mt-0.5 text-[11px] leading-[1.65] text-[#6f655e] max-[700px]:text-[10px]">
							{benefit.description}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default InfoSection
