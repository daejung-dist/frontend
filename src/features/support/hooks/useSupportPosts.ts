import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getSupportPosts } from '@/features/support/api/support'
import { supportQueryKeys } from '@/features/support/hooks/supportQueryKeys'
import type { SupportPostListParams } from '@/features/support/types'

export function useSupportPosts(params: SupportPostListParams) {
	return useQuery({
		queryKey: supportQueryKeys.list(params),
		queryFn: () => getSupportPosts(params),
		// 페이지를 넘길 때 표가 비었다가 다시 채워지며 깜빡이지 않도록 이전 결과를 유지한다
		placeholderData: keepPreviousData,
	})
}
