import { useAuthStore } from '@/features/auth/stores/authStore'

function MyPage() {
	const user = useAuthStore((state) => state.user)

	return (
		<section className="mx-auto w-240 px-3 py-10 max-[700px]:w-full max-[700px]:px-4" aria-labelledby="mypage-title">
			<div className="border-2 border-[#aeb9bd] bg-white p-1">
				<div className="border border-[#8e999d] bg-[#f8f8f6] p-6 max-[700px]:p-4">
					<p className="w-fit bg-brand-ocean px-3 py-1 text-xs font-black text-white">MY PAGE</p>
					<h1 className="mt-3 text-2xl font-black tracking-[-1px] text-black" id="mypage-title">마이페이지</h1>
					<p className="mt-2 text-sm text-[#606b70]">회원 정보와 주문 내역을 확인하는 공간입니다.</p>

					<div className="mt-6 border-t-2 border-brand-ocean-deep">
						<dl className="grid grid-cols-[140px_1fr] text-sm max-[520px]:grid-cols-[100px_1fr]">
							<dt className="border-b border-[#d5dfe3] bg-[#edf2f4] px-4 py-3 font-bold text-[#49545a]">이름</dt>
							<dd className="border-b border-[#d5dfe3] px-4 py-3 text-black">{user?.name ?? '회원 정보 없음'}</dd>
							<dt className="border-b border-[#d5dfe3] bg-[#edf2f4] px-4 py-3 font-bold text-[#49545a]">이메일</dt>
							<dd className="border-b border-[#d5dfe3] px-4 py-3 text-black">{user?.email ?? '회원 정보 없음'}</dd>
							<dt className="border-b border-[#d5dfe3] bg-[#edf2f4] px-4 py-3 font-bold text-[#49545a]">회원 권한</dt>
							<dd className="border-b border-[#d5dfe3] px-4 py-3 text-black">{user?.role ?? '회원 정보 없음'}</dd>
						</dl>
					</div>

					<div className="mt-6 border border-[#c8d3d7] bg-white px-5 py-8 text-center">
						<h2 className="text-base font-black text-black">주문 내역</h2>
						<p className="mt-2 text-sm text-[#606b70]">주문 내역 API 연결 후 표시됩니다.</p>
					</div>

					<div className="mt-4 border border-[#c8d3d7] bg-white px-5 py-8 text-center">
						<h2 className="text-base font-black text-black">배송지 관리</h2>
						<p className="mt-2 text-sm text-[#606b70]">배송지 API 연결 후 표시됩니다.</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MyPage
