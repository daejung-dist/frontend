import { isAxiosError } from 'axios'
import { useState, type FormEvent } from 'react'

import { useWithdraw } from '@/features/user/hooks/useWithdraw'
import { ORDER_PHONE } from '@/shared/constants/contact'

const notices = [
	'거래 정보가 있는 경우, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 계약 또는 청약철회, 대금 결제 및 재화 공급에 관한 기록은 5년 동안 보존됩니다.',
	'이미 결제가 완료된 주문은 회원 탈퇴로 취소되지 않습니다. 배송 중인 주문이 있다면 상품을 받으신 뒤 탈퇴해 주세요.',
	'회원 탈퇴 후에는 회원 정보와 기본 배송지가 삭제되며 다시 복구할 수 없습니다.',
	'작성하신 고객문의 게시글과 댓글, 그 게시글에 달린 답변도 함께 삭제됩니다.',
	'탈퇴 후 같은 이메일로 다시 가입하더라도 이전 회원 정보와 주문 내역은 이어지지 않습니다.',
]

function WithdrawPage() {
	const [isAgreed, setIsAgreed] = useState(false)
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const withdrawMutation = useWithdraw()
	const isSubmitting = withdrawMutation.isPending

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!isAgreed) {
			setErrorMessage('회원 탈퇴 유의사항에 동의해 주세요.')
			return
		}
		if (!password) {
			setErrorMessage('비밀번호를 입력해 주세요.')
			return
		}
		// 되돌릴 수 없는 작업이라 마지막으로 한 번 더 확인한다
		if (!window.confirm('정말 탈퇴하시겠습니까? 탈퇴 후에는 복구할 수 없습니다.')) {
			return
		}

		setErrorMessage('')
		withdrawMutation.mutate(password, {
			onError: (error) => {
				// 서버는 비밀번호가 틀리면 401이 아닌 400을 준다(401은 토큰 재발급 신호라서)
				if (isAxiosError(error) && error.response?.status === 400) {
					setErrorMessage('비밀번호가 올바르지 않습니다.')
					return
				}
				setErrorMessage('회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해 주세요.')
			},
		})
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

			<form className="mx-auto mt-8 max-w-sm" noValidate onSubmit={handleSubmit}>
				<div className="flex flex-col gap-1">
					<label className="text-xs font-bold text-[#49545a]" htmlFor="withdraw-password">
						비밀번호 확인
					</label>
					<input
						id="withdraw-password"
						type="password"
						autoComplete="current-password"
						placeholder="현재 비밀번호를 입력해 주세요"
						value={password}
						disabled={isSubmitting}
						onChange={(event) => setPassword(event.target.value)}
						className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
					/>
				</div>

				{errorMessage && (
					<p
						className="mt-3 border border-brand-crab bg-[#fdf0ef] px-3 py-2 text-xs font-bold text-brand-crab"
						role="alert"
					>
						{errorMessage}
					</p>
				)}

				<div className="mt-6 flex justify-center">
					<button
						className="border-2 border-brand-crab bg-brand-crab px-10 py-3 text-sm font-bold text-white hover:bg-brand-crab-dark disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]"
						type="submit"
						disabled={!isAgreed || !password || isSubmitting}
					>
						{isSubmitting ? '탈퇴 처리 중...' : '탈퇴하기'}
					</button>
				</div>
			</form>
		</section>
	)
}

export default WithdrawPage
