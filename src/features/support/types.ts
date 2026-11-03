export type SupportSearchField = 'all' | 'title' | 'author'

export interface SupportPostSummary {
	id: number
	title: string
	author: string
	createdAt: string
	views: number
	isNotice: boolean
}

export interface SupportPostDetail extends SupportPostSummary {
	content: string
	authorId: number
	updatedAt: string
	commentCount: number
}

export interface SupportPostPage {
	posts: SupportPostSummary[]
	page: number
	size: number
	totalElements: number
	totalPages: number
}

export interface SupportPostListParams {
	page: number
	size: number
	field: SupportSearchField
	keyword: string
}

export interface CreateSupportPostRequest {
	title: string
	content: string
}

export type UpdateSupportPostRequest = Partial<CreateSupportPostRequest>

export interface SupportComment {
	id: number
	content: string
	authorId: number
	author: string
	createdAt: string
}

export interface CreateSupportCommentRequest {
	content: string
}
