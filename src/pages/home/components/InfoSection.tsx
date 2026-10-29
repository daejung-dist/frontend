const stories = [
	{
		title: '동해 깊은 바다에서 자란 붉은대게',
		description:
			'홍게의 정식 이름은 붉은대게입니다. 수심 수백 미터에서 1,000m가 넘는 동해의 차갑고 깊은 바다에 살아, 어선이 먼바다까지 나가 통발로 끌어올립니다. 얕은 암초 지대에 사는 대게와 달리 심해에서 자라 껍데기가 붉고, 쪄도 배 쪽까지 붉은빛이 그대로 남는 것이 특징입니다.',
	},
	{
		title: '찬바람이 불면 살이 차오르는 제철',
		description:
			'붉은대게는 자원을 지키기 위해 여름철 금어기 동안 조업을 쉽니다. 금어기가 끝나고 바닷물이 차가워지는 가을부터 겨울까지 살이 단단하게 차올라, 다리살은 달고 짭조름하며 게 향이 진합니다.',
	},
	{
		title: '후포 위판장 아침 경매에서 고른 홍게',
		description:
			"울진 후포항은 대게와 붉은대게가 모이는 동해안 대표 산지로, 매년 후포항 일원에서 '울진대게와 붉은대게축제'가 열립니다. 이른 아침 후포 수협 위판장에서 경매가 열리면 후포 수협 69번 중매인이 상태 좋은 홍게를 직접 보고 골라 산지에서 바로 보내 드립니다.",
	},
	{
		title: '대게 못지않은 풍미, 합리적인 가격',
		description:
			'담백하고 단백질이 풍부한 살과 고소한 내장까지 대게 못지않은 맛을 지녔지만 가격은 훨씬 부담이 적습니다. 쪄서 그대로 즐기거나 게딱지에 밥을 비벼 먹고, 탕이나 라면에 넣어도 좋습니다.',
	},
]

function InfoSection() {
	return (
		<section className="bg-[#fffefa] px-12 py-10 max-[700px]:px-6 max-[700px]:py-7">
			<p className="text-sm font-black tracking-[0.12em] text-brand-crab max-[700px]:text-xs">깊은 바다의 붉은 보물</p>
			<h2 className="mt-1 font-serif text-[30px] font-bold tracking-[-1px] text-[#332b27] max-[700px]:text-[23px]">
				울진 홍게가 특별한 이유
			</h2>
			<p className="mt-2 text-xs font-bold text-[#6d5c50] max-[700px]:text-[11px]">
				동해 심해에서 자라 후포항 위판장을 거쳐 식탁까지
			</p>

			<div className="mt-7 max-w-[570px] space-y-4 max-[700px]:mt-5 max-[700px]:space-y-3">
				{stories.map((story) => (
					<div key={story.title}>
						<h3 className="text-sm font-black text-[#463930] max-[700px]:text-xs">{story.title}</h3>
						<p className="mt-0.5 text-[11px] leading-[1.65] text-[#6f655e] max-[700px]:text-[10px]">
							{story.description}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default InfoSection
