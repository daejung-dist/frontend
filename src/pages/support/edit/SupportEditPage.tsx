import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { updateSupportPost } from '@/features/support/api/support'
import SupportPostForm, { type SupportPostFormValues } from '@/features/support/components/SupportPostForm'
import { supportQueryKeys } from '@/features/support/hooks/supportQueryKeys'
import { useSupportPost } from '@/features/support/hooks/useSupportPost'
import { getErrorMessage } from '@/features/support/utils'

const listButtonClassName =
	'inline-flex h-10 items-center border border-[#c8d3d7] bg-white px-6 text-sm font-bold text-[#49545a] hover:border-[#49545a] hover:text-black'

function SupportEditPage() {
	const { id } = useParams()
	const postId = Number(id)
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const user = useAuthStore((state) => state.user)
	const [errorMessage, setErrorMessage] = useState('')
	// 상세에서 넘어오면 이미 받아 둔 글을 쓰고, 조회수가 또 오르지 않도록 다시 부르지 않는다
	const { data: post, isPending } = useSupportPost(postId, { staleTime: Infinity })

	const mutation = useMutation({
		mutationFn: ({ title, content }: SupportPostFormValues) => updateSupportPost(postId, { title, content }),
		onSuccess: async (updated) => {
			queryClient.setQueryData(supportQueryKeys.detail(postId), updated)
			await queryClient.invalidateQueries({ queryKey: supportQueryKeys.lists() })
			await queryClient.invalidateQueries({ queryKey: supportQueryKeys.notices() })
			navigate(`/support/${postId}`, { replace: true })
		},
	})

	const handleSubmit = async (values: SupportPostFormValues) => {
		setErrorMessage('')
		try {
			await mutation.mutateAsync(values)
		} catch (error) {
			setErrorMessage(getErrorMessage(error, '글을 수정하지 못했습니다. 잠시 후 다시 시도해 주세요.'))
		}
	}

	const canManage = post !== undefined && user !== null && (user.id === post.authorId || user.role === 'ADMIN')

	if (!post || !canManage) {
		const message = (() => {
			if (isPending && Number.isInteger(postId)) return '게시글을 불러오는 중입니다.'
			if (!post) return '게시글을 찾을 수 없습니다.'
			return '이 글을 수정할 권한이 없습니다.'
		})()

		return (
			<section className="p-6 text-center max-[700px]:p-4">
				<p className="py-16 text-sm text-[#606b70]">{message}</p>
				<Link className={listButtonClassName} to="/support">
					목록
				</Link>
			</section>
		)
	}

	return (
		<section className="p-6 max-[700px]:p-4" aria-labelledby="support-edit-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="support-edit-title">
				고객문의 글 수정
			</h1>
			<SupportPostForm
				initialValues={{ title: post.title, content: post.content }}
				cancelTo={`/support/${postId}`}
				submitLabel="수정"
				isSubmitting={mutation.isPending}
				errorMessage={errorMessage}
				onSubmit={handleSubmit}
			/>
		</section>
	)
}

export default SupportEditPage
