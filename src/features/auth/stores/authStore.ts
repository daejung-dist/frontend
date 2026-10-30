import { create } from 'zustand'

import type { AuthUser } from '@/features/auth/types'

interface AuthState {
	accessToken: string | null
	user: AuthUser | null
	isAuthenticated: boolean
	isBootstrapping: boolean
	setAuth: (accessToken: string, user: AuthUser) => void
	updateUser: (user: AuthUser) => void
	clearAuth: () => void
	finishBootstrap: () => void
}

// accessToken은 XSS 노출을 줄이기 위해 메모리에만 보관하고,
// 새로고침 시에는 HttpOnly refresh 쿠키로 재발급받는다.
export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	user: null,
	isAuthenticated: false,
	isBootstrapping: true,
	setAuth: (accessToken, user) => set({ accessToken, user, isAuthenticated: true }),
	updateUser: (user) => set((state) => (state.isAuthenticated && state.user?.id === user.id ? { user } : {})),
	clearAuth: () => set({ accessToken: null, user: null, isAuthenticated: false }),
	finishBootstrap: () => set({ isBootstrapping: false }),
}))
