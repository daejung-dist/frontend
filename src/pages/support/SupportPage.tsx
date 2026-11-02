import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'

import { supportPosts as posts } from '@/features/support/sampleSupportPosts'
import type { SupportPost, SupportSearchField } from '@/features/support/types'
import Pagination from '@/shared/components/ui/Pagination'

const PAGE_SIZE = 10
const NEW_POST_DAYS = 3

const searchFields: { value: SupportSearchField; label: string }[] = [
	{ value: 'all', label: '전체' },
	{ value: 'title', label: '제목' },
	{ value: 'author', label: '작성자' },
]

const formatDate = (date: string) => date.slice(2).replaceAll('-', '.')

const isNewPost = (date: string) => {
	const elapsedDays = (Date.now() - new Date(`${date}T00:00:00`).getTime()) / (1000 * 60 * 60 * 24)
	return elapsedDays < NEW_POST_DAYS
}

const matchesKeyword = (post: SupportPost, field: SupportSearchField, keyword: string) => {
	if (field === 'title') return post.title.includes(keyword)
	if (field === 'author') return post.author.includes(keyword)
	return post.title.includes(keyword) || post.author.includes(keyword)
}

function SupportPage() {
	const [searchField, setSearchField] = useState<SupportSearchField>('all')
	const [keywordInput, setKeywordInput] = useState('')
	const [search, setSearch] = useState({ field: 'all' as SupportSearchField, keyword: '' })
	const [currentPage, setCurrentPage] = useState(1)

	// 공지는 검색·페이지와 상관없이 항상 맨 위에 둔다
	const notices = posts.filter((post) => post.isNotice)
	const filteredPosts = posts.filter(
		(post) => !post.isNotice && (!search.keyword || matchesKeyword(post, search.field, search.keyword)),
	)
	const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
	const pagePosts = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setSearch({ field: searchField, keyword: keywordInput.trim() })
		setCurrentPage(1)
	}

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
					{[...notices, ...pagePosts].map((post) => (
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
							<td className="py-4">{formatDate(post.createdAt)}</td>
							<td className="py-4 max-[700px]:hidden">{post.views}</td>
						</tr>
					))}
					{pagePosts.length === 0 && (
						<tr className="border-b border-[#d5dfe3]">
							<td className="py-16 text-center text-[#606b70]" colSpan={5}>
								{search.keyword ? '검색 결과가 없습니다.' : '등록된 게시글이 없습니다.'}
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
					{searchFields.map((field) => (
						<option key={field.value} value={field.value}>
							{field.label}
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
				<Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
			</div>
		</section>
	)
}

export default SupportPage
