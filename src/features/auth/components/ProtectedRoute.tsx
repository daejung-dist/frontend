import { Navigate, Outlet, useLocation } from 'react-router'

import { useAuthStore } from '@/features/auth/stores/authStore'

function ProtectedRoute() {
	const location = useLocation()
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const isBootstrapping = useAuthStore((state) => state.isBootstrapping)

	if (isBootstrapping) {
		return (
			<section className="mx-auto w-240 px-3 py-16 text-center max-[700px]:w-full max-[700px]:px-4">
				<p className="text-sm font-bold text-[#606b70]" role="status">
					로그인 상태를 확인하고 있습니다.
				</p>
			</section>
		)
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />
	}

	return <Outlet />
}

export default ProtectedRoute
