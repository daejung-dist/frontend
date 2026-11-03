import { useQuery } from '@tanstack/react-query'

import { getSupportComments } from '@/features/support/api/support'
import { supportQueryKeys } from '@/features/support/hooks/supportQueryKeys'

export function useSupportComments(postId: number) {
	return useQuery({
		queryKey: supportQueryKeys.comments(postId),
		queryFn: () => getSupportComments(postId),
		enabled: Number.isInteger(postId),
	})
}
