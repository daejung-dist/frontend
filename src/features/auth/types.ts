export interface AuthUser {
	id: number
	email: string
	name: string
	role: string
}

export interface AuthResponse extends AuthUser {
	accessToken: string
}

export interface SignupRequest {
	email: string
	password: string
	name: string
}

export type SignupResponse = AuthResponse
