import { isAxiosError } from 'axios'
import { LockKeyhole } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'

import { login } from '@/features/auth/api/auth'
import { useAuthStore } from '@/features/auth/stores/authStore'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginPage() {
	const navigate = useNavigate()
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const setAuth = useAuthStore((state) => state.setAuth)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/', { replace: true })
		}
	}, [isAuthenticated, navigate])

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!email.trim()) {
			setErrorMessage('이메일은 필수입니다.')
			return
		}
		if (!EMAIL_PATTERN.test(email.trim())) {
			setErrorMessage('이메일 형식이 올바르지 않습니다.')
			return
		}
		if (!password.trim()) {
			setErrorMessage('비밀번호는 필수입니다.')
			return
		}

		setIsSubmitting(true)
		setErrorMessage('')

		try {
			const response = await login({
				email: email.trim(),
				password,
			})

			const { accessToken, ...user } = response
			setAuth(accessToken, user)
			navigate('/', { replace: true })
		} catch (error) {
			if (isAxiosError(error)) {
				const message = (error.response?.data as { message?: string } | undefined)?.message
				setErrorMessage(message ?? '이메일 또는 비밀번호가 올바르지 않습니다.')
				return
			}
			setErrorMessage('로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className="mx-auto flex w-240 items-center justify-center px-3 py-12 max-[700px]:w-full max-[700px]:px-4 max-[700px]:py-8" aria-labelledby="login-title">
			<div className="w-full max-w-[460px] border-2 border-[#aeb9bd] bg-white p-1 shadow-[inset_0_0_0_1px_white,0_1px_3px_rgba(0,0,0,0.2)]">
				<div className="border border-[#8e999d] bg-[#f8f8f6] px-7 py-8 shadow-[inset_0_1px_0_white] max-[700px]:px-4 max-[700px]:py-6">
					<div className="text-center">
						<h1 className="mt-3 text-2xl font-black tracking-[-1px] text-black max-[700px]:text-xl" id="login-title">로그인</h1>
						<p className="mt-2 text-xs leading-5 text-[#606b70]">대정유통 회원이시면 로그인 후 이용해 주세요.</p>
						<div className="mx-auto mt-4 h-1 w-24 bg-brand-sun" />
					</div>

					<form className="mt-6" noValidate onSubmit={handleSubmit}>
						<div className="flex flex-col gap-1">
							<label className="text-xs font-bold text-[#49545a]" htmlFor="login-email">이메일</label>
							<input
								id="login-email"
								type="email"
								autoComplete="email"
								placeholder="daejung@example.com"
								value={email}
								disabled={isSubmitting}
								onChange={(event) => setEmail(event.target.value)}
								className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
							/>
						</div>

						<div className="mt-3 flex flex-col gap-1">
							<label className="text-xs font-bold text-[#49545a]" htmlFor="login-password">비밀번호</label>
							<input
								id="login-password"
								type="password"
								autoComplete="current-password"
								placeholder="비밀번호를 입력하세요"
								value={password}
								disabled={isSubmitting}
								onChange={(event) => setPassword(event.target.value)}
								className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
							/>
						</div>

						{errorMessage && (
							<p className="mt-3 border border-brand-crab bg-[#fdf0ef] px-3 py-2 text-xs font-bold text-brand-crab" role="alert">
								{errorMessage}
							</p>
						)}

						<button
							className="mt-5 w-full border-2 border-brand-crab bg-brand-crab py-3 text-sm font-bold text-white shadow-[1px_1px_0_white] hover:bg-brand-crab-dark disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? '로그인 중...' : '로그인'}
						</button>
					</form>

					<div className="mt-5 border-t border-[#d5dfe3] pt-4 text-center text-xs text-[#606b70]">
						아직 회원이 아니신가요?
						<Link className="ml-1.5 font-bold text-brand-ocean-deep underline hover:text-brand-crab" to="/signup">회원가입</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LoginPage
