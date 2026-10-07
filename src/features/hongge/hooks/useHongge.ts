import { useQuery } from '@tanstack/react-query'

import { getHongge } from '@/features/hongge/api/hongge'

export function useHongge(id: number) {
	return useQuery({
		queryKey: ['hongges', id],
		queryFn: () => getHongge(id),
		enabled: Number.isInteger(id),
	})
}
