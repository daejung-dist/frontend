export interface AuthUser {
	id: number
	email: string
	name: string
	role: string
}

export interface AuthResponse extends AuthUser {
	accessToken: string
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export interface SignupRequest {
	email: string
	password: string
	name: string
	phoneNumber: string
	defaultShippingAddress: string
	birthDate: string
	gender: Gender
}

export interface LoginRequest {
	email: string
	password: string
}

export type SignupResponse = AuthResponse
export type LoginResponse = AuthResponse
