import { api } from '@/shared/lib/axios'

import type {
	ConfirmEmailVerificationRequest,
	EmailVerificationTokenResponse,
	LoginRequest,
	LoginResponse,
	SignupRequest,
	SignupResponse,
} from '@/features/auth/types'

export async function signup(payload: SignupRequest) {
	const { data } = await api.post<SignupResponse>('/api/v1/auth/signup', payload)
	return data
}

export async function login(payload: LoginRequest) {
	const { data } = await api.post<LoginResponse>('/api/v1/auth/login', payload)
	return data
}

export async function logout() {
	await api.post('/api/v1/auth/logout')
}

export async function requestEmailVerification(email: string) {
	await api.post('/api/v1/auth/email-verifications', { email })
}

export async function confirmEmailVerification(payload: ConfirmEmailVerificationRequest) {
	const { data } = await api.post<EmailVerificationTokenResponse>('/api/v1/auth/email-verifications/confirm', payload)
	return data
}
