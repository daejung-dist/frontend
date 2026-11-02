import { useState } from 'react'

import type { Hongge } from '@/features/hongge/types'
import { BUSINESS_INFO, ORDER_PHONE } from '@/shared/constants/contact'

interface ProductInfoTabsProps {
	hongge: Hongge
}

const tabs = [
	{ id: 'detail', label: '상품상세' },
	{ id: 'delivery', label: '배송/교환/반품 안내' },
] as const

type TabId = (typeof tabs)[number]['id']

const deliveryNotices = [
	{ label: '배송비', value: '전상품 무료배송' },
	{ label: '배송 방법', value: '산지직송 (택배)' },
	{ label: '교환/반품', value: '신선식품 특성상 단순 변심에 의한 교환·반품은 어렵습니다.' },
	{
		label: '상품 이상 시',
		value: `받으신 상품에 이상이 있으면 사진과 함께 ${ORDER_PHONE}으로 연락 주세요. 확인 후 교환 또는 환불해 드립니다.`,
	},
]

function InfoTable({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
	return (
		<>
			<h2 className="text-base font-black text-black">{title}</h2>
			<dl className="mt-3 border-t border-[#d5dfe3] text-sm">
				{rows.map((row) => (
					<div
						key={row.label}
						className="grid grid-cols-[160px_1fr] border-b border-[#d5dfe3] max-[520px]:grid-cols-[100px_1fr]"
					>
						<dt className="bg-[#f8f8f6] px-4 py-3 font-bold text-[#49545a] max-[520px]:px-3">{row.label}</dt>
						<dd className="min-w-0 break-all px-4 py-3 text-black max-[520px]:px-3">{row.value}</dd>
					</div>
				))}
			</dl>
		</>
	)
}

function ProductInfoTabs({ hongge }: ProductInfoTabsProps) {
	const [activeTab, setActiveTab] = useState<TabId>('detail')

	return (
		<section className="mt-10" aria-label="상품 정보">
			<div className="grid grid-cols-2" role="tablist">
				{tabs.map((tab) => {
					const isActive = tab.id === activeTab
					return (
						<button
							key={tab.id}
							className={`border-b py-3.5 text-sm font-bold max-[520px]:text-xs ${
								isActive
									? 'border-x border-[#d5dfe3] border-b-transparent bg-white text-black first:border-l-0 last:border-r-0'
									: 'border-[#d5dfe3] bg-[#f8f8f6] text-[#606b70] hover:text-black'
							}`}
							type="button"
							role="tab"
							id={`product-tab-${tab.id}`}
							aria-selected={isActive}
							aria-controls={`product-panel-${tab.id}`}
							onClick={() => setActiveTab(tab.id)}
						>
							{tab.label}
						</button>
					)
				})}
			</div>

			<div
				className="pt-8"
				role="tabpanel"
				id={`product-panel-${activeTab}`}
				aria-labelledby={`product-tab-${activeTab}`}
			>
				{activeTab === 'detail' ? (
					<>
						<InfoTable
							title="필수 표기 정보"
							rows={[
								{ label: '품명', value: hongge.name },
								{ label: '원산지', value: '국내산 (경북 울진 후포)' },
								{ label: '판매자', value: BUSINESS_INFO.name },
								{ label: '소비자상담 전화번호', value: ORDER_PHONE },
							]}
						/>
						{/* TODO: 상품 API에 설명 이미지가 추가되면 이 자리를 실제 <img>로 교체한다 */}
						<div
							className="mx-auto mt-10 flex aspect-3/4 w-full max-w-[760px] items-center justify-center bg-[#f8f8f6] text-sm font-bold text-[#9aa2a9]"
							role="img"
							aria-label="상품 설명 이미지 준비 중"
						>
							상품 설명 이미지 준비 중
						</div>
					</>
				) : (
					<InfoTable title="배송/교환/반품 안내" rows={deliveryNotices} />
				)}
			</div>
		</section>
	)
}

export default ProductInfoTabs
