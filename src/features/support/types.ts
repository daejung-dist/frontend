export interface SupportPost {
	id: number
	title: string
	author: string
	createdAt: string
	views: number
	isNotice: boolean
}

export type SupportSearchField = 'all' | 'title' | 'author'
