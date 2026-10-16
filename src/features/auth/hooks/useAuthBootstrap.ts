import { useEffect } from 'react'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { bootstrapAuth } from '@/shared/lib/axios'

// accessToken을 메모리에만 두므로 새로고침 직후 refresh 쿠키로 세션을 복구한다.
export function useAuthBootstrap() {
	const isBootstrapping = useAuthStore((state) => state.isBootstrapping)

	useEffect(() => {
		void bootstrapAuth()
	}, [])

	return { isBootstrapping }
}
