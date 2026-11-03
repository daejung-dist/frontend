import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router'

import { useSupportNotices } from '@/features/support/hooks/useSupportNotices'
import { useSupportPosts } from '@/features/support/hooks/useSupportPosts'
import type { SupportSearchField } from '@/features/support/types'
import { formatShortDate, isNewPost } from '@/features/support/utils'
import Pagination from '@/shared/components/ui/Pagination'

const PAGE_SIZE = 10

const searchFields: { value: SupportSearchField; label: string }[] = [
	{ value: 'all', label: '전체' },
	{ value: 'title', label: '제목' },
	{ value: 'author', label: '작성자' },
]

const toSearchField = (value: string | null): SupportSearchField =>
	searchFields.find((field) => field.value === value)?.value ?? 'all'

const toPage = (value: string | null) => {
	const page = Number(value)
	return Number.isInteger(page) && page > 0 ? page : 1
}

function SupportPage() {
	// 상세에서 뒤로 왔을 때 보던 페이지와 검색 조건이 유지되도록 주소에 담는다
	const [searchParams, setSearchParams] = useSearchParams()
	const currentPage = toPage(searchParams.get('page'))
	const field = toSearchField(searchParams.get('field'))
	const keyword = searchParams.get('keyword') ?? ''

	const [searchField, setSearchField] = useState<SupportSearchField>(field)
	const [keywordInput, setKeywordInput] = useState(keyword)

	const noticesQuery = useSupportNotices()
	const postsQuery = useSupportPosts({ page: currentPage, size: PAGE_SIZE, field, keyword })
	const notices = noticesQuery.data ?? []
	const posts = postsQuery.data?.posts ?? []
	const totalPages = Math.max(1, postsQuery.data?.totalPages ?? 1)

	const updateParams = (next: { page: number; field: SupportSearchField; keyword: string }) => {
		const params = new URLSearchParams()
		if (next.page > 1) params.set('page', String(next.page))
		if (next.keyword) {
			params.set('field', next.field)
			params.set('keyword', next.keyword)
		}
		setSearchParams(params)
	}

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		updateParams({ page: 1, field: searchField, keyword: keywordInput.trim() })
	}

	const emptyMessage = (() => {
		if (postsQuery.isPending) return '게시글을 불러오는 중입니다.'
		if (postsQuery.isError) return '게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
		return keyword ? '검색 결과가 없습니다.' : '등록된 게시글이 없습니다.'
	})()

	return (
		<section className="p-6 max-[700px]:p-4" aria-labelledby="support-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="support-title">
				고객문의
			</h1>

			<table className="mt-6 w-full table-fixed border-t-2 border-[#49545a] text-sm">
				<colgroup>
					<col className="w-20 max-[700px]:w-14" />
					<col />
					<col className="w-28 max-[700px]:hidden" />
					<col className="w-24 max-[700px]:w-20" />
					<col className="w-16 max-[700px]:hidden" />
				</colgroup>
				<thead>
					<tr className="border-b border-[#d5dfe3] text-[#49545a]">
						<th className="py-3 font-normal" scope="col">
							번호
						</th>
						<th className="py-3 font-normal" scope="col">
							제목
						</th>
						<th className="py-3 font-normal max-[700px]:hidden" scope="col">
							작성자
						</th>
						<th className="py-3 font-normal" scope="col">
							작성일
						</th>
						<th className="py-3 font-normal max-[700px]:hidden" scope="col">
							조회
						</th>
					</tr>
				</thead>
				<tbody>
					{/* 공지는 검색·페이지와 상관없이 항상 맨 위에 둔다 */}
					{[...notices, ...posts].map((post) => (
						<tr key={post.id} className="border-b border-[#d5dfe3] text-center text-[#49545a]">
							<td className={`py-4 ${post.isNotice ? 'font-black text-black' : ''}`}>
								{post.isNotice ? '공지' : post.id}
							</td>
							<td className="truncate py-4 pr-2 pl-4 text-left max-[700px]:pl-2">
								<Link
									className={`hover:underline ${post.isNotice ? 'font-bold text-black' : 'text-black'}`}
									to={`/support/${post.id}`}
								>
									{post.title}
								</Link>
								{isNewPost(post.createdAt) && <span className="ml-1.5 text-xs font-bold text-brand-crab">NEW</span>}
							</td>
							<td className="py-4 max-[700px]:hidden">{post.author}</td>
							<td className="py-4">{formatShortDate(post.createdAt)}</td>
							<td className="py-4 max-[700px]:hidden">{post.views}</td>
						</tr>
					))}
					{posts.length === 0 && (
						<tr className="border-b border-[#d5dfe3]">
							<td className="py-16 text-center text-[#606b70]" colSpan={5}>
								{emptyMessage}
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<div className="mt-4 flex justify-end">
				<Link
					className="inline-flex h-10 items-center bg-[#222] px-6 text-sm font-bold text-white hover:bg-black"
					to="/support/write"
				>
					글쓰기
				</Link>
			</div>

			<form className="mt-6 flex gap-2 max-[520px]:flex-wrap" role="search" onSubmit={handleSearch}>
				<label className="sr-only" htmlFor="support-search-field">
					검색 범위
				</label>
				<select
					className="h-12 w-40 border border-[#c8d3d7] bg-white px-4 text-sm text-black outline-none focus:border-[#49545a] max-[520px]:w-full"
					id="support-search-field"
					value={searchField}
					onChange={(event) => setSearchField(event.target.value as SupportSearchField)}
				>
					{searchFields.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<label className="sr-only" htmlFor="support-search-keyword">
					검색어
				</label>
				<input
					className="h-12 min-w-0 flex-1 border border-[#c8d3d7] bg-white px-4 text-sm text-black outline-none focus:border-[#49545a]"
					id="support-search-keyword"
					type="search"
					placeholder="검색어를 입력해 주세요"
					value={keywordInput}
					onChange={(event) => setKeywordInput(event.target.value)}
				/>
				<button className="h-12 w-28 shrink-0 bg-[#222] text-sm font-bold text-white hover:bg-black" type="submit">
					검색
				</button>
			</form>

			<div className="mt-8">
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onChange={(page) => updateParams({ page, field, keyword })}
				/>
			</div>
		</section>
	)
}

export default SupportPage
