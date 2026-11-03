import type {
	CreateSupportCommentRequest,
	CreateSupportPostRequest,
	SupportComment,
	SupportPostDetail,
	SupportPostListParams,
	SupportPostPage,
	SupportPostSummary,
	UpdateSupportPostRequest,
} from '@/features/support/types'
import { api } from '@/shared/lib/axios'

export async function getSupportNotices() {
	const { data } = await api.get<SupportPostSummary[]>('/api/v1/supports/notices')
	return data
}

export async function getSupportPosts({ page, size, field, keyword }: SupportPostListParams) {
	const { data } = await api.get<SupportPostPage>('/api/v1/supports', {
		params: { page, size, field, keyword: keyword || undefined },
	})
	return data
}

export async function getSupportPost(id: number) {
	const { data } = await api.get<SupportPostDetail>(`/api/v1/supports/${id}`)
	return data
}

export async function createSupportPost(payload: CreateSupportPostRequest) {
	const { data } = await api.post<SupportPostDetail>('/api/v1/supports', payload)
	return data
}

export async function createSupportNotice(payload: CreateSupportPostRequest) {
	const { data } = await api.post<SupportPostDetail>('/api/v1/admin/supports/notices', payload)
	return data
}

export async function updateSupportPost(id: number, payload: UpdateSupportPostRequest) {
	const { data } = await api.patch<SupportPostDetail>(`/api/v1/supports/${id}`, payload)
	return data
}

export async function deleteSupportPost(id: number) {
	await api.delete(`/api/v1/supports/${id}`)
}

export async function getSupportComments(postId: number) {
	const { data } = await api.get<SupportComment[]>(`/api/v1/supports/${postId}/comments`)
	return data
}

export async function createSupportComment(postId: number, payload: CreateSupportCommentRequest) {
	const { data } = await api.post<SupportComment>(`/api/v1/supports/${postId}/comments`, payload)
	return data
}

export async function deleteSupportComment(postId: number, commentId: number) {
	await api.delete(`/api/v1/supports/${postId}/comments/${commentId}`)
}
