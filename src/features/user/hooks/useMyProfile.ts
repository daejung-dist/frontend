import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { getMyProfile } from '@/features/user/api/user'

export function getMyProfileQueryKey(userId: number | undefined) {
	return ['my-profile', userId]
}

// 개인정보 수정과 배송지 관리 페이지가 같은 캐시를 보도록 조회를 한곳에 둔다
export function useMyProfile() {
	const userId = useAuthStore((state) => state.user?.id)
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const updateUser = useAuthStore((state) => state.updateUser)

	return useQuery({
		queryKey: getMyProfileQueryKey(userId),
		queryFn: async () => {
			const profile = await getMyProfile()
			updateUser(profile)
			return profile
		},
		enabled: isAuthenticated,
		gcTime: 0,
		retry: false,
		refetchOnWindowFocus: false,
	})
}
