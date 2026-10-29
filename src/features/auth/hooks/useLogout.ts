import { useMutation, useQueryClient } from '@tanstack/react-query'

import { logout } from '@/features/auth/api/auth'
import { useAuthStore } from '@/features/auth/stores/authStore'

export function useLogout() {
	const queryClient = useQueryClient()
	const clearAuth = useAuthStore((state) => state.clearAuth)

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			clearAuth()
			// 다음에 로그인한 사용자에게 이전 사용자의 캐시된 정보가 보이지 않도록 비운다.
			queryClient.clear()
		},
	})
}
