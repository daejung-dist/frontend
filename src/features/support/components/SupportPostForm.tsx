import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'

import type { CreateSupportPostRequest } from '@/features/support/types'

const TITLE_MAX_LENGTH = 100
const CONTENT_MAX_LENGTH = 3000

const inputClassName = 'w-full border border-[#d5dfe3] px-4 text-sm text-black outline-none focus:border-[#49545a]'

export interface SupportPostFormValues extends CreateSupportPostRequest {
	isNotice: boolean
}

interface SupportPostFormProps {
	initialValues?: CreateSupportPostRequest
	cancelTo: string
	submitLabel: string
	// 관리자가 새 글을 쓸 때만 공지 등록을 고를 수 있다
	canSelectNotice?: boolean
	isSubmitting: boolean
	errorMessage: string
	onSubmit: (values: SupportPostFormValues) => void
}

function SupportPostForm({
	initialValues,
	cancelTo,
	submitLabel,
	canSelectNotice = false,
	isSubmitting,
	errorMessage,
	onSubmit,
}: SupportPostFormProps) {
	const [title, setTitle] = useState(initialValues?.title ?? '')
	const [content, setContent] = useState(initialValues?.content ?? '')
	const [isNotice, setIsNotice] = useState(false)
	const canSubmit = title.trim() !== '' && content.trim() !== '' && !isSubmitting

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!canSubmit) return
		onSubmit({ title: title.trim(), content: content.trim(), isNotice })
	}

	return (
		<form className="mt-6" onSubmit={handleSubmit}>
			<fieldset className="min-w-0 border-t-2 border-[#49545a]" disabled={isSubmitting}>
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
						{canSelectNotice && (
							<label className="mt-2 inline-flex items-center gap-2 text-sm text-[#49545a]">
								<input type="checkbox" checked={isNotice} onChange={(event) => setIsNotice(event.target.checked)} />
								공지로 등록
							</label>
						)}
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
			</fieldset>

			{errorMessage && (
				<p className="mt-4 text-center text-sm text-brand-crab" role="alert">
					{errorMessage}
				</p>
			)}

			<div className="mt-6 flex justify-center gap-2">
				<Link
					className="inline-flex h-11 w-28 items-center justify-center border border-[#c8d3d7] bg-white text-sm font-bold text-[#49545a] hover:border-[#49545a] hover:text-black"
					to={cancelTo}
				>
					취소
				</Link>
				<button
					className="h-11 w-28 bg-[#222] text-sm font-bold text-white hover:bg-black disabled:bg-[#9aa2a9]"
					type="submit"
					disabled={!canSubmit}
				>
					{submitLabel}
				</button>
			</div>
		</form>
	)
}

export default SupportPostForm
