import premiumCrab from '@/shared/assets/images/product/premium_crab.jpg'

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
		<section className="border-x border-[#d5dfe3] bg-white px-3 pt-8 pb-12 max-[700px]:border-0 max-[700px]:px-0 max-[700px]:pt-6">
			<div className="relative overflow-hidden border border-[#dedbd4] bg-[#fffefa] shadow-[0_4px_14px_rgba(67,54,37,0.16)]">
				<div className="relative z-10 min-h-[330px] px-12 pt-10 pb-16 max-[700px]:min-h-0 max-[700px]:px-6 max-[700px]:pt-7 max-[700px]:pb-14">
					<div className="pr-28 max-[700px]:pr-16">
						<p className="text-sm font-black tracking-[0.12em] text-brand-crab max-[700px]:text-xs">
							깊은 바다의 붉은 보물
						</p>
						<h2 className="mt-1 font-serif text-[30px] font-bold tracking-[-1px] text-[#332b27] max-[700px]:text-[23px]">
							홍게가 사랑받는 이유
						</h2>
						<p className="mt-2 text-xs font-bold text-[#6d5c50] max-[700px]:text-[11px]">
							대게 못지않은 깊은 풍미를 더 넉넉하고 합리적으로
						</p>
					</div>

					<ul className="mt-7 max-w-[570px] space-y-4 max-[700px]:mt-5 max-[700px]:space-y-3">
						{benefits.map((benefit) => (
							<li key={benefit.title} className="relative pl-5">
								<span className="absolute top-0 left-0 text-sm text-brand-crab" aria-hidden="true">
									♥
								</span>
								<h3 className="text-sm font-black text-[#463930] max-[700px]:text-xs">{benefit.title}</h3>
								<p className="mt-0.5 text-[11px] leading-[1.65] text-[#6f655e] max-[700px]:text-[10px]">
									{benefit.description}
								</p>
							</li>
						))}
					</ul>
				</div>

				<div className="relative h-[330px] max-[700px]:h-[250px]">
					<div
						className="absolute -top-14 -left-[5%] z-10 h-24 w-[110%] rounded-[50%] bg-[#fffefa]"
						aria-hidden="true"
					/>
					<img
						className="h-full w-full object-cover object-center"
						src={premiumCrab}
						alt="선명한 붉은빛을 띤 신선한 홍게"
					/>
					<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-6 pt-16 pb-5 text-center">
						<p className="text-lg font-black tracking-[-0.5px] text-white max-[700px]:text-base">
							후포 앞바다에서 만난 자연산 홍게
						</p>
						<p className="mt-1 text-[11px] text-white/90">산지의 신선함과 깊은 바다의 풍미를 그대로 전합니다.</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default InfoSection
