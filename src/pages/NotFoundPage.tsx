import { Link, useNavigate } from 'react-router'

const buttonClassName = 'inline-flex border-2 border-brand-crab px-5 py-2.5 text-sm font-bold shadow-[1px_1px_0_white]'

function NotFoundPage() {
	const navigate = useNavigate()

	// 주소를 직접 입력해 들어온 경우 뒤로 갈 이전 페이지가 없으므로 홈으로 보낸다
	const goBack = () => {
		if (window.history.state?.idx > 0) {
			navigate(-1)
		} else {
			navigate('/')
		}
	}

	return (
		<section className="flex justify-center px-4 py-12" aria-labelledby="not-found-title">
			<div className="w-full bg-[#f8f8f6] px-6 py-10 text-center max-[700px]:px-4 max-[700px]:py-8">
				<h1
					className="mt-3 text-[82px] font-black leading-none tracking-[-4px] text-black max-[700px]:text-[64px]"
					id="not-found-title"
				>
					404
				</h1>
				<p className="mt-3 text-xl font-black text-brand-ocean-deep max-[700px]:text-lg">페이지를 찾을 수 없습니다.</p>
				<p className="mt-2 text-sm leading-6 text-[#606b70]">
					주소가 잘못 입력되었거나
					<br className="max-[700px]:hidden" /> 페이지가 이동되었을 수 있습니다.
				</p>
				<div className="mx-auto mt-5 h-1 w-32 bg-brand-sun" />
				<div className="mt-6 flex flex-wrap justify-center gap-2">
					<button
						className={`${buttonClassName} bg-white text-brand-crab hover:bg-[#fdf1f0]`}
						type="button"
						onClick={goBack}
					>
						이전 페이지로
					</button>
					<Link className={`${buttonClassName} bg-brand-crab text-white hover:bg-brand-crab-dark`} to="/">
						홈으로 돌아가기
					</Link>
				</div>
			</div>
		</section>
	)
}

export default NotFoundPage
