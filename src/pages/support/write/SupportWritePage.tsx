import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'

const TITLE_MAX_LENGTH = 100
const CONTENT_MAX_LENGTH = 3000

const inputClassName = 'w-full border border-[#d5dfe3] px-4 text-sm text-black outline-none focus:border-[#49545a]'

function SupportWritePage() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const canSubmit = title.trim() !== '' && content.trim() !== ''

	// TODO: 게시글 등록 API가 나오면 요청 후 상세 페이지로 이동하도록 교체한다
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		window.alert('지금은 글을 등록할 수 없습니다.')
	}

	return (
		<section className="p-6 max-[700px]:p-4" aria-labelledby="support-write-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="support-write-title">
				고객문의 글쓰기
			</h1>

			<form className="mt-6" onSubmit={handleSubmit}>
				<div className="border-t-2 border-[#49545a]">
					<div className="grid grid-cols-[120px_1fr] border-b border-[#d5dfe3] max-[520px]:grid-cols-[80px_1fr]">
						<label
							className="flex items-center bg-[#f8f8f6] px-4 text-sm font-bold text-[#49545a] max-[520px]:px-3"
							htmlFor="support-write-subject"
						>
							제목
						</label>
						<div className="px-5 py-3 max-[520px]:px-3">
							<input
								className={`${inputClassName} h-10`}
								id="support-write-subject"
								maxLength={TITLE_MAX_LENGTH}
								placeholder="제목을 입력해 주세요"
								value={title}
								onChange={(event) => setTitle(event.target.value)}
							/>
						</div>
					</div>
					<div className="grid grid-cols-[120px_1fr] border-b border-[#d5dfe3] max-[520px]:grid-cols-[80px_1fr]">
						<label
							className="flex items-start bg-[#f8f8f6] px-4 pt-6 text-sm font-bold text-[#49545a] max-[520px]:px-3"
							htmlFor="support-write-content"
						>
							내용
						</label>
						<div className="px-5 py-3 max-[520px]:px-3">
							<textarea
								className={`${inputClassName} block h-72 resize-y py-3 leading-6`}
								id="support-write-content"
								maxLength={CONTENT_MAX_LENGTH}
								placeholder="문의하실 내용을 입력해 주세요"
								value={content}
								onChange={(event) => setContent(event.target.value)}
							/>
							<p className="mt-1 text-right text-xs text-[#9aa2a9]">
								{content.length} / {CONTENT_MAX_LENGTH}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-6 flex justify-center gap-2">
					<Link
						className="inline-flex h-11 w-28 items-center justify-center border border-[#c8d3d7] bg-white text-sm font-bold text-[#49545a] hover:border-[#49545a] hover:text-black"
						to="/support"
					>
						취소
					</Link>
					<button
						className="h-11 w-28 bg-[#222] text-sm font-bold text-white hover:bg-black disabled:bg-[#9aa2a9]"
						type="submit"
						disabled={!canSubmit}
					>
						등록
					</button>
				</div>
			</form>
		</section>
	)
}

export default SupportWritePage
