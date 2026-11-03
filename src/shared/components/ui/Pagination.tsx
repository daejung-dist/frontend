const PAGE_BLOCK_SIZE = 10

interface PaginationProps {
	currentPage: number
	totalPages: number
	onChange: (page: number) => void
}

const buttonClassName =
	'flex size-9 items-center justify-center border border-[#c8d3d7] bg-white text-sm text-[#606b70] hover:border-[#49545a] hover:text-black max-[520px]:size-8'

// 페이지 번호를 10개씩 묶어 보여 주고, 화살표로 이전·다음 묶음과 처음·끝으로 이동한다
function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
	if (totalPages <= 1) return null

	const blockStart = Math.floor((currentPage - 1) / PAGE_BLOCK_SIZE) * PAGE_BLOCK_SIZE + 1
	const blockEnd = Math.min(blockStart + PAGE_BLOCK_SIZE - 1, totalPages)
	const pages = Array.from({ length: blockEnd - blockStart + 1 }, (_, index) => blockStart + index)

	return (
		<nav className="flex flex-wrap justify-center gap-1.5" aria-label="페이지 이동">
			{blockStart > 1 && (
				<>
					<button className={buttonClassName} type="button" aria-label="첫 페이지" onClick={() => onChange(1)}>
						«
					</button>
					<button
						className={buttonClassName}
						type="button"
						aria-label="이전 페이지 묶음"
						onClick={() => onChange(blockStart - 1)}
					>
						‹
					</button>
				</>
			)}
			{pages.map((page) =>
				page === currentPage ? (
					<span
						key={page}
						className="flex size-9 items-center justify-center bg-[#9aa2a9] text-sm text-white max-[520px]:size-8"
						aria-current="page"
					>
						{page}
					</span>
				) : (
					<button key={page} className={buttonClassName} type="button" onClick={() => onChange(page)}>
						{page}
					</button>
				),
			)}
			{blockEnd < totalPages && (
				<>
					<button
						className={buttonClassName}
						type="button"
						aria-label="다음 페이지 묶음"
						onClick={() => onChange(blockEnd + 1)}
					>
						›
					</button>
					<button
						className={buttonClassName}
						type="button"
						aria-label="마지막 페이지"
						onClick={() => onChange(totalPages)}
					>
						»
					</button>
				</>
			)}
		</nav>
	)
}

export default Pagination
