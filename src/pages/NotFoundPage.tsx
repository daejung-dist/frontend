
import { ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router'

function NotFoundPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f6f7f8] px-5 py-16">
            <section className="w-full max-w-[480px] text-center">
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#203548] text-white">
                    <Home aria-hidden="true" size={28} strokeWidth={1.8} />
                </div>
                <p className="mb-2 text-xs font-extrabold tracking-[2px] text-[#d24e3e]">PAGE NOT FOUND</p>
                <h1 className="m-0 text-[clamp(72px,16vw,120px)] font-black leading-none tracking-[-5px] text-[#203548]">404</h1>
                <p className="mt-6 text-lg font-bold text-[#273848]">페이지를 찾을 수 없습니다.</p>
                <p className="mt-2 text-sm leading-6 text-[#6d7780]">
                    주소가 잘못 입력되었거나 페이지가 이동되었을 수 있습니다.
                </p>
                <Link
                    className="mt-8 inline-flex items-center gap-2 bg-[#203548] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d24e3e]"
                    to="/"
                >
                    <ArrowLeft aria-hidden="true" size={16} />
                    홈으로 돌아가기
                </Link>
            </section>
        </main>
    )
}

export default NotFoundPage;