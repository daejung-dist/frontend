import { useQuery } from '@tanstack/react-query'

import { getSupportNotices } from '@/features/support/api/support'
import { supportQueryKeys } from '@/features/support/hooks/supportQueryKeys'

export function useSupportNotices() {
	return useQuery({ queryKey: supportQueryKeys.notices(), queryFn: getSupportNotices })
}
