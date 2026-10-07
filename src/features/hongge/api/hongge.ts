import { api } from '@/shared/lib/axios'
import type { Hongge } from '@/features/hongge/types'

export async function getHongges() {
	const { data } = await api.get<Hongge[]>('/api/v1/hongges')
	return data
}
