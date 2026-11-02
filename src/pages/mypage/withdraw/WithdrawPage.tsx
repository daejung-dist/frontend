import { useState } from 'react'

import { ORDER_PHONE } from '@/shared/constants/contact'

const notices = [
	'거래 정보가 있는 경우, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 계약 또는 청약철회, 대금 결제 및 재화 공급에 관한 기록은 5년 동안 보존됩니다.',
	'이미 결제가 완료된 주문은 회원 탈퇴로 취소되지 않습니다. 배송 중인 주문이 있다면 상품을 받으신 뒤 탈퇴해 주세요.',
	'회원 탈퇴 후에는 회원 정보와 기본 배송지가 삭제되며 다시 복구할 수 없습니다.',
	'탈퇴 후 같은 이메일로 다시 가입하더라도 이전 회원 정보와 주문 내역은 이어지지 않습니다.',
]

function WithdrawPage() {
	const [isAgreed, setIsAgreed] = useState(false)

	// TODO: 회원 탈퇴 API가 나오면 요청 후 로그아웃·홈 이동으로 교체한다
	const handleWithdraw = () => {
		window.alert('지금은 회원 탈퇴를 할 수 없습니다.')
	}

	return (
		<section aria-labelledby="withdraw-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="withdraw-title">
				회원 탈퇴
			</h1>

			<h2 className="mt-8 text-lg font-black tracking-[-0.5px] text-black">
				대정유통을 이용하시는데 불편함이 있으셨나요?
			</h2>
			<div className="mt-3 text-sm leading-7 text-[#49545a]">
				<p>1) 회원 정보 변경은 &apos;마이페이지 &gt; 개인정보확인/수정&apos;에서 하실 수 있습니다.</p>
				<p>2) 이용 불편 및 각종 문의 사항은 전화로 문의 주시면 성심성의껏 답변 드리겠습니다.</p>
				<p>
					- 전화 문의 :{' '}
					<a className="font-bold text-brand-ocean-deep hover:underline" href={`tel:${ORDER_PHONE}`}>
						{ORDER_PHONE}
					</a>
				</p>
			</div>

			<h2 className="mt-10 text-lg font-black tracking-[-0.5px] text-black">회원 탈퇴 시 유의사항을 확인해주세요</h2>
			<div className="mt-4 border border-[#d5dfe3]">
				<ul className="list-disc bg-[#f8f8f6] py-6 pr-6 pl-10 text-sm leading-7 text-[#49545a] max-[520px]:py-5 max-[520px]:pr-4 max-[520px]:pl-8">
					<li className="font-bold text-black">
						회원 탈퇴 시 주문, 장바구니, 마이페이지 등 대정유통 회원 전용 서비스를 이용할 수 없습니다.
					</li>
					{notices.map((notice) => (
						<li key={notice}>{notice}</li>
					))}
				</ul>
				<label className="flex cursor-pointer items-center gap-3 border-t border-[#d5dfe3] px-6 py-5 text-sm font-bold text-black max-[520px]:px-4">
					<input
						className="size-5 shrink-0 accent-brand-ocean"
						type="checkbox"
						checked={isAgreed}
						onChange={(event) => setIsAgreed(event.target.checked)}
					/>
					상기 회원 탈퇴 시 처리사항 안내를 확인하였음에 동의합니다.
				</label>
			</div>

			<div className="mt-6 flex justify-center">
				<button
					className="border-2 border-brand-crab bg-brand-crab px-10 py-3 text-sm font-bold text-white hover:bg-brand-crab-dark disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]"
					type="button"
					disabled={!isAgreed}
					onClick={handleWithdraw}
				>
					탈퇴하기
				</button>
			</div>
		</section>
	)
}

export default WithdrawPage
