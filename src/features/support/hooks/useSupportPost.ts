import { isAxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

import { getSupportPost } from '@/features/support/api/support'
import { supportQueryKeys } from '@/features/support/hooks/supportQueryKeys'

interface UseSupportPostOptions {
	staleTime?: number
}

// 상세 조회는 서버에서 조회수를 올리므로 창 포커스나 실패 재시도로 다시 부르지 않는다
export function useSupportPost(id: number, { staleTime = 0 }: UseSupportPostOptions = {}) {
	return useQuery({
		queryKey: supportQueryKeys.detail(id),
		queryFn: () => getSupportPost(id),
		enabled: Number.isInteger(id),
		staleTime,
		refetchOnWindowFocus: false,
		retry: (failureCount, error) => !(isAxiosError(error) && error.response?.status === 404) && failureCount < 2,
	})
}
