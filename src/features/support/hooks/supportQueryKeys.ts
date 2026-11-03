import type { SupportPostListParams } from '@/features/support/types'

// 글을 쓰거나 지운 뒤 목록 전체를 한 번에 무효화할 수 있도록 키를 계층으로 둔다
export const supportQueryKeys = {
	all: ['supports'] as const,
	notices: () => [...supportQueryKeys.all, 'notices'] as const,
	lists: () => [...supportQueryKeys.all, 'list'] as const,
	list: (params: SupportPostListParams) => [...supportQueryKeys.lists(), params] as const,
	detail: (id: number) => [...supportQueryKeys.all, 'detail', id] as const,
	comments: (postId: number) => [...supportQueryKeys.all, 'comments', postId] as const,
}
