import type { ReactNode } from 'react'

import { useMyProfile } from '@/features/user/hooks/useMyProfile'
import { BANK_ACCOUNT } from '@/shared/constants/contact'

const agreements = ['구매조건 확인 및 결제대행 서비스 약관 동의', '개인정보 수집 및 이용 안내']

// 회색 머리말과 흰 본문으로 나뉜 카드를 결제 화면 여러 곳에서 쓴다
function CheckoutCard({ title, titleId, children }: { title: ReactNode; titleId: string; children: ReactNode }) {
	return (
		<section className="border border-border-strong bg-white" aria-labelledby={titleId}>
			<h2
				className="border-b border-border-strong bg-[#f8f8f6] px-5 py-3 text-base font-black tracking-[-0.5px] text-black max-[520px]:px-4"
				id={titleId}
			>
				{title}
			</h2>
			<div className="px-5 py-4 text-sm text-[#49545a] max-[520px]:px-4">{children}</div>
		</section>
	)
}

function CheckoutPage() {
	const { data: profile } = useMyProfile()

	return (
		<section className="p-6 max-[700px]:p-4" aria-labelledby="checkout-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="checkout-title">
				구매·결제
			</h1>

			<div className="mt-6 flex items-start gap-6 max-[860px]:flex-col">
				<div className="flex min-w-0 flex-1 flex-col gap-4 max-[860px]:w-full">
					<CheckoutCard
						title={
							<>
								배송지
								{profile && <span className="ml-2 border-l border-[#c8d3d7] pl-2">{profile.name}</span>}
							</>
						}
						titleId="checkout-shipping-title"
					>
						<span className="inline-block bg-[#49545a] px-2 py-0.5 text-[11px] font-black text-white">기본배송지</span>
						<p className="mt-2 break-all text-base text-black">
							{profile?.defaultShippingAddress ?? '등록된 배송지가 없습니다.'}
						</p>
						<p className="mt-1">휴대폰 : {profile?.phoneNumber ?? '-'}</p>
					</CheckoutCard>

					<CheckoutCard title="배송 요청사항" titleId="checkout-request-title">
						<p>요청사항이 없습니다.</p>
					</CheckoutCard>

					<CheckoutCard title="주문 상품" titleId="checkout-products-title">
						<p className="py-4 text-center text-[#606b70]">주문할 상품이 없습니다.</p>
					</CheckoutCard>

					<CheckoutCard title="결제수단" titleId="checkout-payment-title">
						<fieldset className="flex flex-col gap-4">
							<legend className="sr-only">결제수단 선택</legend>
							<label className="flex items-start gap-3">
								<input className="mt-0.5 size-5 accent-[#49545a]" type="radio" name="payment" defaultChecked />
								<span>
									<span className="font-bold text-black">무통장입금</span>
									<span className="mt-1 block">
										{BANK_ACCOUNT.bank} {BANK_ACCOUNT.number} (예금주: {BANK_ACCOUNT.holder})
									</span>
								</span>
							</label>
							<label className="flex items-center gap-3 text-[#9aa2a9]">
								<input className="size-5" type="radio" name="payment" disabled />
								<span className="font-bold">신용/체크카드 (준비 중)</span>
							</label>
						</fieldset>
					</CheckoutCard>
				</div>

				<aside
					className="sticky top-4 w-[300px] shrink-0 border border-border-strong bg-white p-5 max-[860px]:static max-[860px]:w-full"
					aria-labelledby="checkout-summary-title"
				>
					<h2 className="text-lg font-black tracking-[-0.5px] text-black" id="checkout-summary-title">
						최종 결제 금액
					</h2>
					<dl className="mt-3 text-sm text-[#49545a]">
						<div className="flex justify-between py-2">
							<dt>총 상품 가격</dt>
							<dd>0원</dd>
						</div>
						<div className="flex justify-between bg-[#f8f8f6] px-3 py-2.5">
							<dt>배송비</dt>
							<dd className="font-bold text-black">무료배송</dd>
						</div>
					</dl>
					<div className="mt-4 flex items-baseline justify-between border-t border-border-strong pt-4">
						<span className="text-sm font-black text-black">총 결제 금액</span>
						<span className="text-2xl font-black text-black">
							0<span className="ml-0.5 text-base">원</span>
						</span>
					</div>
					<ul className="mt-4 flex flex-col gap-2 border-y border-border-strong py-4 text-xs text-[#49545a]">
						{agreements.map((agreement) => (
							<li key={agreement}>{agreement}</li>
						))}
					</ul>
					<p className="mt-4 text-center text-xs leading-5 text-[#606b70]">
						위 주문 내용을 확인하였으며, 회원 본인은 개인정보 이용 및 제공 및 결제에 동의합니다.
					</p>
					<button
						className="mt-4 w-full border-2 border-brand-crab bg-brand-crab py-3.5 text-base font-bold text-white hover:bg-brand-crab-dark disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]"
						type="button"
						disabled
					>
						결제하기
					</button>
				</aside>
			</div>
		</section>
	)
}

export default CheckoutPage
