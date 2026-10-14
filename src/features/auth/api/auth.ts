import { api } from '@/shared/lib/axios'

import type { SignupRequest, SignupResponse } from '@/features/auth/types'

export async function signup(payload: SignupRequest) {
	const { data } = await api.post<SignupResponse>('/api/v1/auth/signup', payload)
	return data
}
