import type { UpdateUserProfileRequest, UserProfile } from '@/features/user/types'
import { api } from '@/shared/lib/axios'

export async function getMyProfile() {
	const { data } = await api.get<UserProfile>('/api/v1/users/me')
	return data
}

export async function updateMyProfile(payload: UpdateUserProfileRequest) {
	await api.patch('/api/v1/users/me', payload)
}
