import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { createSupportComment, deleteSupportComment } from '@/features/support/api/support'
import { supportQueryKeys } from '@/features/support/hooks/supportQueryKeys'
import { useSupportComments } from '@/features/support/hooks/useSupportComments'
import { formatDateTime, getErrorMessage } from '@/features/support/utils'

const COMMENT_MAX_LENGTH = 1000

interface SupportCommentsProps {
	postId: number
}

function SupportComments({ postId }: SupportCommentsProps) {
	const queryClient = useQueryClient()
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const user = useAuthStore((state) => state.user)
	const [comment, setComment] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const commentsQuery = useSupportComments(postId)
	const comments = commentsQuery.data ?? []

	const refreshComments = () => queryClient.invalidateQueries({ queryKey: supportQueryKeys.comments(postId) })

	const createMutation = useMutation({
		mutationFn: (content: string) => createSupportComment(postId, { content }),
		onSuccess: async () => {
			setComment('')
			await refreshComments()
		},
	})

	const deleteMutation = useMutation({
		mutationFn: (commentId: number) => deleteSupportComment(postId, commentId),
		onSuccess: refreshComments,
	})

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const content = comment.trim()
		if (!content || createMutation.isPending) return

		setErrorMessage('')
		try {
			await createMutation.mutateAsync(content)
		} catch (error) {
			setErrorMessage(getErrorMessage(error, '댓글을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.'))
		}
	}

	const handleDelete = async (commentId: number) => {
		if (!window.confirm('댓글을 삭제하시겠습니까?')) return

		setErrorMessage('')
		try {
			await deleteMutation.mutateAsync(commentId)
		} catch (error) {
			setErrorMessage(getErrorMessage(error, '댓글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.'))
		}
	}

	return (
		<section className="mt-10" aria-labelledby="support-comment-title">
			<h2 className="text-lg font-black text-black" id="support-comment-title">
				댓글 {comments.length}
			</h2>

			{commentsQuery.isError && (
				<p className="mt-4 text-sm text-[#606b70]">댓글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
			)}

			{comments.length > 0 && (
				<ul className="mt-4 border-t border-[#d5dfe3]">
					{comments.map((item) => {
						const canDelete = user !== null && (user.id === item.authorId || user.role === 'ADMIN')
						return (
							<li key={item.id} className="border-b border-[#d5dfe3] px-6 py-4 max-[700px]:px-4">
								<div className="flex items-center gap-x-3 text-sm text-[#606b70]">
									<strong className="font-bold text-black">{item.author}</strong>
									<time dateTime={item.createdAt}>{formatDateTime(item.createdAt)}</time>
									{canDelete && (
										<button
											className="ml-auto text-xs text-[#606b70] hover:text-black hover:underline disabled:opacity-50"
											type="button"
											disabled={deleteMutation.isPending}
											onClick={() => handleDelete(item.id)}
										>
											삭제
										</button>
									)}
								</div>
								<p className="mt-2 text-sm leading-6 whitespace-pre-line text-black">{item.content}</p>
							</li>
						)
					})}
				</ul>
			)}

			<form className="mt-4 border border-[#9aa2a9]" onSubmit={handleSubmit}>
				<div className="p-6 max-[700px]:p-4">
					<label className="sr-only" htmlFor="support-comment">
						댓글
					</label>
					<textarea
						className="block h-20 w-full resize-y border border-[#d5dfe3] px-4 py-3 text-sm text-black outline-none focus:border-[#49545a] disabled:bg-white"
						id="support-comment"
						maxLength={COMMENT_MAX_LENGTH}
						placeholder={isAuthenticated ? '댓글을 입력해 주세요.' : '로그인 후 작성하실 수 있습니다.'}
						disabled={!isAuthenticated || createMutation.isPending}
						value={comment}
						onChange={(event) => setComment(event.target.value)}
					/>
				</div>
				<div className="flex items-center justify-end border-t border-[#d5dfe3]">
					<span className="px-5 text-sm text-[#49545a]">
						{comment.length} / {COMMENT_MAX_LENGTH}
					</span>
					<button
						className="h-11 w-24 bg-[#222] text-sm font-bold text-white hover:bg-black disabled:bg-[#9aa2a9]"
						type="submit"
						disabled={!isAuthenticated || !comment.trim() || createMutation.isPending}
					>
						등록
					</button>
				</div>
			</form>
			{errorMessage && (
				<p className="mt-2 text-sm text-brand-crab" role="alert">
					{errorMessage}
				</p>
			)}
		</section>
	)
}

export default SupportComments
