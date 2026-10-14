import { isAxiosError } from 'axios'
import { UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { signup } from '@/features/auth/api/auth'
import { useAuthStore } from '@/features/auth/stores/authStore'
import type { Gender } from '@/features/auth/types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_NUMBER_PATTERN = /^[0-9\-+() ]{8,20}$/

interface SignupForm {
	email: string
	password: string
	name: string
	phoneNumber: string
	defaultShippingAddress: string
	birthDate: string
	gender: Gender | ''
}

const INITIAL_FORM: SignupForm = {
	email: '',
	password: '',
	name: '',
	phoneNumber: '',
	defaultShippingAddress: '',
	birthDate: '',
	gender: '',
}

function SignupPage() {
	const navigate = useNavigate()
	const setAuth = useAuthStore((state) => state.setAuth)

	const [form, setForm] = useState<SignupForm>(INITIAL_FORM)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const onChange = <Field extends keyof SignupForm>(field: Field, value: SignupForm[Field]) => {
		setForm((prev) => ({ ...prev, [field]: value }))
		setErrorMessage('')
		setSuccessMessage('')
	}

	const validate = () => {
		if (!form.email.trim()) return '이메일은 필수입니다.'
		if (!EMAIL_PATTERN.test(form.email.trim())) return '이메일 형식이 올바르지 않습니다.'
		if (!form.password) return '비밀번호는 필수입니다.'
		if (form.password.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.'
		if (!form.name.trim()) return '이름은 필수입니다.'
		if (!form.phoneNumber.trim()) return '휴대폰 번호는 필수입니다.'
		if (!PHONE_NUMBER_PATTERN.test(form.phoneNumber.trim())) return '휴대폰 번호 형식이 올바르지 않습니다.'
		if (!form.defaultShippingAddress.trim()) return '기본 배송지 주소는 필수입니다.'
		if (!form.birthDate) return '생년월일은 필수입니다.'
		const birthDate = new Date(`${form.birthDate}T00:00:00`)
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		if (Number.isNaN(birthDate.getTime()) || birthDate >= today) return '생년월일은 과거 날짜여야 합니다.'
		if (!form.gender) return '성별은 필수입니다.'
		return ''
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const validationMessage = validate()
		if (validationMessage) {
			setErrorMessage(validationMessage)
			return
		}

		setIsSubmitting(true)
		setErrorMessage('')
		setSuccessMessage('')

		try {
			const response = await signup({
				email: form.email.trim(),
				password: form.password,
				name: form.name.trim(),
				phoneNumber: form.phoneNumber.trim(),
				defaultShippingAddress: form.defaultShippingAddress.trim(),
				birthDate: form.birthDate,
				gender: form.gender as Gender,
			})

			const { accessToken, ...user } = response
			setAuth(accessToken, user)
			setSuccessMessage(`${user.name}님, 회원가입이 완료되었습니다.`)
			setForm(INITIAL_FORM)
			setTimeout(() => navigate('/', { replace: true }), 800)
		} catch (error) {
			if (isAxiosError(error)) {
				const message = (error.response?.data as { message?: string } | undefined)?.message
				setErrorMessage(message ?? '회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.')
				return
			}
			setErrorMessage('회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className="mx-auto flex w-240 items-center justify-center px-3 py-12 max-[700px]:w-full max-[700px]:px-4 max-[700px]:py-8" aria-labelledby="signup-title">
			<div className="w-full max-w-[500px] border-2 border-[#aeb9bd] bg-white p-1 shadow-[inset_0_0_0_1px_white,0_1px_3px_rgba(0,0,0,0.2)]">
				<div className="border border-[#8e999d] bg-[#f8f8f6] px-7 py-8 shadow-[inset_0_1px_0_white] max-[700px]:px-4 max-[700px]:py-6">
					<div className="text-center">
						<div className="mx-auto mb-4 flex size-12 items-center justify-center border-2 border-brand-ocean bg-brand-sky text-brand-ocean-deep shadow-[inset_0_0_0_1px_white]">
							<UserRoundPlus aria-hidden="true" size={24} strokeWidth={2.5} />
						</div>
						<p className="mx-auto w-fit bg-brand-crab px-3 py-1 text-xs font-black text-white">신규 회원</p>
						<h1 className="mt-3 text-2xl font-black tracking-[-1px] text-black max-[700px]:text-xl" id="signup-title">회원가입</h1>
						<p className="mt-2 text-xs leading-5 text-[#606b70]">아래 정보를 입력해 회원가입을 완료해 주세요.</p>
						<div className="mx-auto mt-4 h-1 w-24 bg-brand-sun" />
					</div>

					<form className="mt-6" noValidate onSubmit={handleSubmit}>
						<div className="flex flex-col gap-1">
							<label className="text-xs font-bold text-[#49545a]" htmlFor="signup-email">이메일</label>
							<input
								className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
								id="signup-email"
								type="email"
								autoComplete="email"
								placeholder="daejung@example.com"
								value={form.email}
								disabled={isSubmitting}
								onChange={(event) => onChange('email', event.target.value)}
							/>
						</div>

						<div className="mt-3 flex flex-col gap-1">
							<label className="text-xs font-bold text-[#49545a]" htmlFor="signup-password">비밀번호</label>
							<input
								className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
								id="signup-password"
								type="password"
								autoComplete="new-password"
								placeholder="최소 8자 이상"
								value={form.password}
								disabled={isSubmitting}
								onChange={(event) => onChange('password', event.target.value)}
							/>
						</div>

						<div className="mt-3 flex flex-col gap-1">
							<label className="text-xs font-bold text-[#49545a]" htmlFor="signup-name">이름</label>
							<input
								className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
								id="signup-name"
								type="text"
								autoComplete="name"
								placeholder="홍길동"
								value={form.name}
								disabled={isSubmitting}
								onChange={(event) => onChange('name', event.target.value)}
							/>
						</div>

						<div className="mt-3 flex flex-col gap-1">
							<label className="text-xs font-bold text-[#49545a]" htmlFor="signup-phone-number">휴대폰 번호</label>
							<input
								className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
								id="signup-phone-number"
								type="tel"
								autoComplete="tel"
								inputMode="tel"
								placeholder="010-1234-5678"
								value={form.phoneNumber}
								disabled={isSubmitting}
								onChange={(event) => onChange('phoneNumber', event.target.value)}
							/>
						</div>

						<div className="mt-3 flex flex-col gap-1">
							<label className="text-xs font-bold text-[#49545a]" htmlFor="signup-address">기본 배송지 주소</label>
							<input
								className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
								id="signup-address"
								type="text"
								autoComplete="street-address"
								placeholder="주소를 입력해 주세요"
								value={form.defaultShippingAddress}
								disabled={isSubmitting}
								onChange={(event) => onChange('defaultShippingAddress', event.target.value)}
							/>
						</div>

						<div className="mt-3 grid grid-cols-2 gap-3 max-[460px]:grid-cols-1">
							<div className="flex flex-col gap-1">
								<label className="text-xs font-bold text-[#49545a]" htmlFor="signup-birth-date">생년월일</label>
								<input
									className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
									id="signup-birth-date"
									type="date"
									autoComplete="bday"
									value={form.birthDate}
									disabled={isSubmitting}
									onChange={(event) => onChange('birthDate', event.target.value)}
								/>
							</div>

							<div className="flex flex-col gap-1">
								<label className="text-xs font-bold text-[#49545a]" htmlFor="signup-gender">성별</label>
								<select
									className="h-10 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]"
									id="signup-gender"
									value={form.gender}
									disabled={isSubmitting}
									onChange={(event) => onChange('gender', event.target.value as SignupForm['gender'])}
								>
									<option value="">선택해 주세요</option>
									<option value="MALE">남성</option>
									<option value="FEMALE">여성</option>
									<option value="OTHER">기타</option>
								</select>
							</div>
						</div>

						{errorMessage && (
							<p className="mt-3 border border-brand-crab bg-[#fdf0ef] px-3 py-2 text-xs font-bold text-brand-crab" role="alert">
								{errorMessage}
							</p>
						)}
						{successMessage && (
							<p className="mt-3 border border-brand-fresh bg-[#edf8ef] px-3 py-2 text-xs font-bold text-state-success" role="status">
								{successMessage}
							</p>
						)}

						<button
							className="mt-5 w-full border-2 border-brand-crab bg-brand-crab py-3 text-sm font-bold text-white shadow-[1px_1px_0_white] hover:bg-brand-crab-dark disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? '회원가입 중...' : '회원가입'}
						</button>
					</form>

					<div className="mt-5 border-t border-[#d5dfe3] pt-4 text-center text-xs text-[#606b70]">
						이미 계정이 있으신가요?
						<Link className="ml-1.5 font-bold text-brand-ocean-deep underline hover:text-brand-crab" to="/login">로그인</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SignupPage
