
import { ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router'

function NotFoundPage() {
    return (
		<section className="mx-auto flex min-h-[520px] w-240 items-center justify-center px-3 py-12 max-[700px]:min-h-[430px] max-[700px]:w-full max-[700px]:px-4" aria-labelledby="not-found-title">
			<div className="w-full max-w-[620px] border-2 border-[#aeb9bd] bg-white p-1 shadow-[inset_0_0_0_1px_white,0_1px_3px_rgba(0,0,0,0.2)]">
				<div className="border border-[#8e999d] bg-[#f8f8f6] px-6 py-10 text-center shadow-[inset_0_1px_0_white] max-[700px]:px-4 max-[700px]:py-8">
					<div className="mx-auto mb-5 flex size-14 items-center justify-center border-2 border-brand-ocean bg-brand-sky text-brand-ocean-deep shadow-[inset_0_0_0_1px_white]">
						<Home aria-hidden="true" size={27} strokeWidth={2.5} />
					</div>
					<p className="mx-auto w-fit bg-brand-crab px-3 py-1 text-xs font-black text-white">페이지 안내</p>
					<h1 className="mt-3 text-[82px] font-black leading-none tracking-[-4px] text-black max-[700px]:text-[64px]" id="not-found-title">404</h1>
					<p className="mt-3 text-xl font-black text-brand-ocean-deep max-[700px]:text-lg">페이지를 찾을 수 없습니다.</p>
					<p className="mt-2 text-sm leading-6 text-[#606b70]">주소가 잘못 입력되었거나<br className="max-[700px]:hidden" /> 페이지가 이동되었을 수 있습니다.</p>
					<div className="mx-auto mt-5 h-1 w-32 bg-brand-sun" />
					<Link className="mt-6 inline-flex items-center gap-2 border-2 border-brand-crab bg-brand-crab px-5 py-2.5 text-sm font-bold text-white shadow-[1px_1px_0_white] hover:bg-brand-crab-dark" to="/">
						<ArrowLeft aria-hidden="true" size={16} />
						홈으로 돌아가기
					</Link>
				</div>
			</div>
		</section>
    )
}

export default NotFoundPage;