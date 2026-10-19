import type { AuthUser, Gender } from '@/features/auth/types'

export interface UserProfile extends AuthUser {
	phoneNumber: string | null
	defaultShippingAddress: string | null
	birthDate: string | null
	gender: Gender | null
}

export interface UpdateUserProfileRequest {
	name?: string
	phoneNumber?: string
	defaultShippingAddress?: string
	birthDate?: string
	gender?: Gender
}
