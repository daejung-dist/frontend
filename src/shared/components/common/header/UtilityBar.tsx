import { isAxiosError } from 'axios'
import { useState } from 'react'
import { NavLink } from 'react-router'

import { logout } from '@/features/auth/api/auth'
import { useAuthStore } from '@/features/auth/stores/authStore'

function UtilityBar() {
	const user = useAuthStore((state) => state.user)
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const isBootstrapping = useAuthStore((state) => state.isBootstrapping)
	const clearAuth = useAuthStore((state) => state.clearAuth)

	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const [logoutError, setLogoutError] = useState('')

	const handleLogout = async () => {
		setIsLoggingOut(true)
		setLogoutError('')

		try {
			await logout()
			clearAuth()
		} catch (error) {
			const message = isAxiosError(error)
				? (error.response?.data as { message?: string } | undefined)?.message
				: undefined
			setLogoutError(message ?? '로그아웃에 실패했습니다.')
		} finally {
			setIsLoggingOut(false)
		}
	}

	return (
		<div className="h-7 border-y border-brand-ocean-deep bg-brand-ocean text-[11px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] max-[700px]:h-auto">
			<div className="page-container flex h-full items-center justify-between max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-1 max-[700px]:py-1.5">
				<span className="font-bold max-[700px]:text-[10px]">
					[대정유통] 후포리 명품 홍게 - 산지의 맛을 전합니다. <span className="text-brand-sun">전상품 무료배송!</span>
				</span>
				<div className="flex items-center gap-1.5 text-[10px]">
					{isBootstrapping ? (
						<span className="text-white/70">로그인 확인 중...</span>
					) : isAuthenticated && user ? (
						<>
							<span className="font-bold text-brand-sun">{user.name}님</span>
							<span className="text-white/50">|</span>
							<button
								className="hover:text-brand-sun disabled:cursor-wait disabled:text-white/60"
								type="button"
								disabled={isLoggingOut}
								onClick={handleLogout}
							>
								{isLoggingOut ? '로그아웃 중...' : '로그아웃'}
							</button>
						</>
					) : (
						<>
							<NavLink className="hover:text-brand-sun" to="/login">
								로그인
							</NavLink>
							<span className="text-white/50">|</span>
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
					<span className="text-white/50">|</span>
					<NavLink className="hover:text-brand-sun" to="/mypage">
						마이페이지
					</NavLink>
					<span className="text-white/50">|</span>
					<NavLink className="hover:text-brand-sun" to="/cart">
						장바구니
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default UtilityBar
