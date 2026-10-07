import { useQuery } from '@tanstack/react-query'

import { getHongges } from '@/features/hongge/api/hongge'

export function useHongges() {
	return useQuery({ queryKey: ['hongges'], queryFn: getHongges })
}
