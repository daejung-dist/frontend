import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { withdraw } from '@/features/user/api/user'

export function useWithdraw() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const clearAuth = useAuthStore((state) => state.clearAuth)

	return useMutation({
		mutationFn: withdraw,
		onSuccess: () => {
			// 인증을 먼저 지우면 보호 라우트가 로그인 페이지로 보내므로 홈 이동을 먼저 한다
			navigate('/', { replace: true })
			clearAuth()
			queryClient.clear()
		},
	})
}
