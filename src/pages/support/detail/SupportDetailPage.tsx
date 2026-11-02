import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { supportPosts } from '@/features/support/sampleSupportPosts'

const COMMENT_MAX_LENGTH = 1000

const listButtonClassName =
	'inline-flex h-10 items-center border border-[#c8d3d7] bg-white px-6 text-sm font-bold text-[#49545a] hover:border-[#49545a] hover:text-black'

function SupportDetailPage() {
	const { id } = useParams()
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const [comment, setComment] = useState('')
	const post = supportPosts.find((item) => item.id === Number(id))

	// TODO: 댓글 API가 나오면 등록 요청으로 교체한다
	const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		window.alert('지금은 댓글을 등록할 수 없습니다.')
	}

	if (!post) {
		return (
			<section className="p-6 text-center max-[700px]:p-4">
				<p className="py-16 text-sm text-[#606b70]">게시글을 찾을 수 없습니다.</p>
				<Link className={listButtonClassName} to="/support">
					목록
				</Link>
			</section>
		)
	}

	return (
		<section className="p-6 max-[700px]:p-4" aria-labelledby="support-detail-title">
			<div className="border-t-2 border-[#49545a]">
				<h1
					className="border-b border-[#d5dfe3] bg-[#f8f8f6] px-6 py-5 text-xl font-bold text-black max-[700px]:px-4 max-[700px]:text-lg"
					id="support-detail-title"
				>
					{post.title}
				</h1>
				<p className="flex flex-wrap items-center gap-x-3 px-6 py-4 text-sm text-[#606b70] max-[700px]:px-4">
					<span>조회수 {post.views}</span>
					<span className="h-3 w-px bg-[#c8d3d7]" aria-hidden="true" />
					<span>{post.author}</span>
					<span className="h-3 w-px bg-[#c8d3d7]" aria-hidden="true" />
					<time dateTime={post.createdAt}>{post.createdAt.replaceAll('-', '.')}</time>
				</p>
			</div>

			<div className="min-h-60 border-y border-[#d5dfe3] px-6 py-8 text-[15px] leading-8 whitespace-pre-line text-black max-[700px]:px-4">
				{post.content}
			</div>

			<div className="mt-6 flex justify-end">
				<Link className={listButtonClassName} to="/support">
					목록
				</Link>
			</div>

			<section className="mt-10" aria-labelledby="support-comment-title">
				<h2 className="text-lg font-black text-black" id="support-comment-title">
					댓글 0
				</h2>
				<form className="mt-4 border border-[#9aa2a9]" onSubmit={handleCommentSubmit}>
					<div className="p-6 max-[700px]:p-4">
						<label className="sr-only" htmlFor="support-comment">
							댓글
						</label>
						<textarea
							className="block h-20 w-full resize-y border border-[#d5dfe3] px-4 py-3 text-sm text-black outline-none focus:border-[#49545a] disabled:bg-white"
							id="support-comment"
							maxLength={COMMENT_MAX_LENGTH}
							placeholder={isAuthenticated ? '댓글을 입력해 주세요.' : '로그인 후 작성하실 수 있습니다.'}
							disabled={!isAuthenticated}
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
							disabled={!isAuthenticated || !comment.trim()}
						>
							등록
						</button>
					</div>
				</form>
			</section>
		</section>
	)
}

export default SupportDetailPage
