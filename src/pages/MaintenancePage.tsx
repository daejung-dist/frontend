import { ORDER_PHONE } from '@/shared/constants/contact'

const buttonClassName = 'inline-flex border-2 border-brand-crab px-5 py-2.5 text-sm font-bold shadow-[1px_1px_0_white]'

function MaintenancePage() {
	return (
		<section className="flex justify-center px-4 py-12" aria-labelledby="maintenance-title">
			<div className="w-full bg-[#f8f8f6] px-6 py-10 text-center max-[700px]:px-4 max-[700px]:py-8">
				<h1
					className="mt-3 text-[40px] font-black leading-none tracking-[-2px] text-black max-[700px]:text-[30px]"
					id="maintenance-title"
				>
					서버 점검 중입니다
				</h1>
				<p className="mt-4 text-sm leading-6 text-[#606b70]">
					이용에 불편을 드려 죄송합니다.
					<br className="max-[700px]:hidden" /> 점검 중에도 전화로 주문하실 수 있습니다.
				</p>
				<div className="mx-auto mt-5 h-1 w-32 bg-brand-sun" />
				<div className="mt-6 flex flex-wrap justify-center gap-2">
					{/* 점검 페이지는 라우터 밖에서 그려지므로 새로고침으로 서버 연결을 다시 확인한다 */}
					<button
						className={`${buttonClassName} bg-white text-brand-crab hover:bg-[#fdf1f0]`}
						type="button"
						onClick={() => window.location.reload()}
					>
						다시 시도
					</button>
					<a
						className={`${buttonClassName} bg-brand-crab text-white hover:bg-brand-crab-dark`}
						href={`tel:${ORDER_PHONE}`}
					>
						전화 주문 {ORDER_PHONE}
					</a>
				</div>
			</div>
		</section>
	)
}

export default MaintenancePage
