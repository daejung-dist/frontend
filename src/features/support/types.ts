export interface SupportPost {
	id: number
	title: string
	author: string
	createdAt: string
	views: number
	isNotice: boolean
	content: string
}

export type SupportSearchField = 'all' | 'title' | 'author'
