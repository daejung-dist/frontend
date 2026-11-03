import { isAxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { deleteSupportPost } from '@/features/support/api/support'
import SupportComments from '@/features/support/components/SupportComments'
import { supportQueryKeys } from '@/features/support/hooks/supportQueryKeys'
import { useSupportPost } from '@/features/support/hooks/useSupportPost'
import { formatDateTime, getErrorMessage } from '@/features/support/utils'

const listButtonClassName =
	'inline-flex h-10 items-center border border-[#c8d3d7] bg-white px-6 text-sm font-bold text-[#49545a] hover:border-[#49545a] hover:text-black'

function SupportDetailPage() {
	const { id } = useParams()
	const postId = Number(id)
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const user = useAuthStore((state) => state.user)
	const [errorMessage, setErrorMessage] = useState('')
	const { data: post, isPending, isError, error } = useSupportPost(postId)

	const deleteMutation = useMutation({
		mutationFn: () => deleteSupportPost(postId),
		onSuccess: async () => {
			queryClient.removeQueries({ queryKey: supportQueryKeys.detail(postId) })
			queryClient.removeQueries({ queryKey: supportQueryKeys.comments(postId) })
			await queryClient.invalidateQueries({ queryKey: supportQueryKeys.all })
			navigate('/support', { replace: true })
		},
	})

	const handleDelete = async () => {
		if (!window.confirm('게시글을 삭제하시겠습니까?')) return

		setErrorMessage('')
		try {
			await deleteMutation.mutateAsync()
		} catch (deleteError) {
			setErrorMessage(getErrorMessage(deleteError, '게시글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.'))
		}
	}

	if (isPending || isError || !post) {
		const isNotFound = !Number.isInteger(postId) || (isAxiosError(error) && error.response?.status === 404)
		const message = (() => {
			if (isNotFound) return '게시글을 찾을 수 없습니다.'
			if (isError) return '게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
			return '게시글을 불러오는 중입니다.'
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

	const canManage = user !== null && (user.id === post.authorId || user.role === 'ADMIN')

	return (
		<section className="p-6 max-[700px]:p-4" aria-labelledby="support-detail-title">
			<div className="border-t-2 border-[#49545a]">
				<h1
					className="border-b border-[#d5dfe3] bg-[#f8f8f6] px-6 py-5 text-xl font-bold text-black max-[700px]:px-4 max-[700px]:text-lg"
					id="support-detail-title"
				>
					{post.isNotice && <span className="mr-2 text-brand-crab">[공지]</span>}
					{post.title}
				</h1>
				<p className="flex flex-wrap items-center gap-x-3 px-6 py-4 text-sm text-[#606b70] max-[700px]:px-4">
					<span>조회수 {post.views}</span>
					<span className="h-3 w-px bg-[#c8d3d7]" aria-hidden="true" />
					<span>{post.author}</span>
					<span className="h-3 w-px bg-[#c8d3d7]" aria-hidden="true" />
					<time dateTime={post.createdAt}>{formatDateTime(post.createdAt)}</time>
				</p>
			</div>

			<div className="min-h-60 border-y border-[#d5dfe3] px-6 py-8 text-[15px] leading-8 whitespace-pre-line text-black max-[700px]:px-4">
				{post.content}
			</div>

			<div className="mt-6 flex justify-end gap-2">
				{canManage && (
					<>
						<Link className={listButtonClassName} to={`/support/${post.id}/edit`}>
							수정
						</Link>
						<button
							className={`${listButtonClassName} disabled:opacity-50`}
							type="button"
							disabled={deleteMutation.isPending}
							onClick={handleDelete}
						>
							삭제
						</button>
					</>
				)}
				<Link className={listButtonClassName} to="/support">
					목록
				</Link>
			</div>
			{errorMessage && (
				<p className="mt-2 text-right text-sm text-brand-crab" role="alert">
					{errorMessage}
				</p>
			)}

			<SupportComments postId={post.id} />
		</section>
	)
}

export default SupportDetailPage
