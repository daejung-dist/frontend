import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { NavLink } from 'react-router'

import { useLogout } from '@/features/auth/hooks/useLogout'
import { useAuthStore } from '@/features/auth/stores/authStore'

const LOGOUT_ERROR_DURATION = 3000

function Divider() {
	return <span className="text-white/50">|</span>
}

function UtilityBar() {
	// clearAuth가 user를 함께 비우므로 isAuthenticated 없이 user만으로 로그인 여부를 판단한다.
	const user = useAuthStore((state) => state.user)
	const isBootstrapping = useAuthStore((state) => state.isBootstrapping)
	const logoutMutation = useLogout()
	const { isError, reset } = logoutMutation

	// 실패 문구가 계속 남지 않도록 잠시 보여준 뒤 지운다.
	useEffect(() => {
		if (!isError) return
		const timer = setTimeout(reset, LOGOUT_ERROR_DURATION)
		return () => clearTimeout(timer)
	}, [isError, reset])

	const logoutError = isError
		? (isAxiosError<{ message?: string }>(logoutMutation.error) && logoutMutation.error.response?.data?.message) ||
			'로그아웃에 실패했습니다.'
		: ''

	return (
		<div className="h-7 border-y border-brand-ocean-deep bg-brand-ocean text-[11px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] max-[700px]:h-auto">
			<div className="page-container flex h-full items-center justify-between max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-1 max-[700px]:py-1.5">
				<span className="font-bold max-[700px]:text-[10px]">
					[대정유통] 후포리 명품 홍게 - 산지의 맛을 전합니다. <span className="text-brand-sun">전상품 무료배송!</span>
				</span>
				<div className="flex items-center gap-1.5 text-[10px]">
					{isBootstrapping ? (
						<span className="text-white/70">로그인 확인 중...</span>
					) : user ? (
						<>
							<span className="font-bold text-brand-sun">{user.name}님</span>
							<Divider />
							<button
								className="hover:text-brand-sun disabled:cursor-wait disabled:text-white/60"
								type="button"
								disabled={logoutMutation.isPending}
								onClick={() => logoutMutation.mutate()}
							>
								{logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
							</button>
						</>
					) : (
						<>
							<NavLink className="hover:text-brand-sun" to="/login">
								로그인
							</NavLink>
							<Divider />
							<NavLink className="hover:text-brand-sun" to="/signup">
								회원가입
							</NavLink>
						</>
					)}
					{logoutError && (
						<span className="font-bold text-brand-sun" role="alert">
							{logoutError}
						</span>
					)}
					<Divider />
					<NavLink className="hover:text-brand-sun" to="/mypage">
						마이페이지
					</NavLink>
					<Divider />
					<NavLink className="hover:text-brand-sun" to="/cart">
						장바구니
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default UtilityBar
