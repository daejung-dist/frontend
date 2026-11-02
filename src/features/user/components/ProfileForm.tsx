import { isAxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useState, type FormEvent, type ReactNode } from 'react'

import type { Gender } from '@/features/auth/types'
import { updateMyProfile } from '@/features/user/api/user'
import type { UpdateUserProfileRequest, UserProfile } from '@/features/user/types'

interface ProfileFormValues {
	name: string
	phoneNumber: string
	defaultShippingAddress: string
	birthDate: string
	gender: Gender | ''
}

interface ProfileFormProps {
	profile: UserProfile
	onSaved: (payload: UpdateUserProfileRequest) => Promise<void>
}

const INPUT_CLASS =
	'h-10 w-full min-w-0 border border-[#9da9ad] bg-white px-3 text-sm text-black outline-none focus:border-brand-ocean disabled:bg-[#edf2f4]'
// 왼쪽 칸은 마이페이지 메뉴와 같은 회색을 써서 표 형태로 보이게 한다
function ProfileRow({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode }) {
	return (
		<div className="grid grid-cols-[140px_1fr] border-b border-[#d5dfe3] max-[520px]:grid-cols-[96px_1fr]">
			<div className="flex items-center border-r border-[#d5dfe3] bg-[#f8f8f6] px-4 py-4 font-bold text-[#49545a] max-[520px]:px-3">
				{htmlFor ? <label htmlFor={htmlFor}>{label}</label> : label}
			</div>
			<div className="flex min-w-0 items-center px-5 py-3 max-[520px]:px-3">{children}</div>
		</div>
	)
}

const PHONE_NUMBER_PATTERN = /^[0-9\-+() ]{8,20}$/

function ProfileForm({ profile, onSaved }: ProfileFormProps) {
	const [draft, setDraft] = useState<ProfileFormValues | null>(null)
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const mutation = useMutation({
		mutationFn: updateMyProfile,
		onSuccess: async (_, payload) => {
			await onSaved(payload)
			setDraft(null)
			setSuccessMessage('회원 정보가 수정되었습니다.')
		},
	})
	const form = draft ?? {
		name: profile.name,
		phoneNumber: profile.phoneNumber ?? '',
		defaultShippingAddress: profile.defaultShippingAddress ?? '',
		birthDate: profile.birthDate ?? '',
		gender: profile.gender ?? '',
	}

	const onChange = <Field extends keyof ProfileFormValues>(field: Field, value: ProfileFormValues[Field]) => {
		setDraft({ ...form, [field]: value })
		setErrorMessage('')
		setSuccessMessage('')
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (mutation.isPending) return

		setErrorMessage('')
		setSuccessMessage('')
		const payload: UpdateUserProfileRequest = {}
		if (form.name.trim() !== profile.name) payload.name = form.name.trim()
		if (form.phoneNumber.trim() !== (profile.phoneNumber ?? '')) payload.phoneNumber = form.phoneNumber.trim()
		if (form.defaultShippingAddress.trim() !== (profile.defaultShippingAddress ?? '')) {
			payload.defaultShippingAddress = form.defaultShippingAddress.trim()
		}
		if (form.birthDate !== (profile.birthDate ?? '')) payload.birthDate = form.birthDate
		if (form.gender && form.gender !== profile.gender) payload.gender = form.gender

		if (payload.name !== undefined && !payload.name) {
			setErrorMessage('이름을 입력해 주세요.')
			return
		}
		if (payload.phoneNumber !== undefined && !PHONE_NUMBER_PATTERN.test(payload.phoneNumber)) {
			setErrorMessage('휴대폰 번호 형식이 올바르지 않습니다.')
			return
		}
		if (payload.birthDate !== undefined) {
			const birthDate = new Date(`${payload.birthDate}T00:00:00`)
			const today = new Date()
			today.setHours(0, 0, 0, 0)
			if (Number.isNaN(birthDate.getTime()) || birthDate >= today) {
				setErrorMessage('생년월일은 과거 날짜여야 합니다.')
				return
			}
		}
		if (Object.keys(payload).length === 0) {
			setSuccessMessage('변경된 정보가 없습니다.')
			return
		}

		try {
			await mutation.mutateAsync(payload)
		} catch (error) {
			const message = isAxiosError<{ message?: string }>(error) ? error.response?.data?.message : undefined
			setErrorMessage(message ?? '회원 정보 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.')
		}
	}

	return (
		<form className="mt-6" noValidate onSubmit={handleSubmit}>
			<fieldset className="min-w-0 border-t border-[#d5dfe3] text-sm" disabled={mutation.isPending}>
				<legend className="sr-only">회원 정보 수정</legend>
				<ProfileRow label="아이디(이메일)">
					<p className="break-all font-bold text-black">{profile.email}</p>
				</ProfileRow>
				<ProfileRow label="이름" htmlFor="mypage-name">
					<input
						className={`${INPUT_CLASS} max-w-[320px]`}
						id="mypage-name"
						autoComplete="name"
						value={form.name}
						onChange={(event) => onChange('name', event.target.value)}
					/>
				</ProfileRow>
				<ProfileRow label="휴대폰 번호" htmlFor="mypage-phone">
					<input
						className={`${INPUT_CLASS} max-w-[320px]`}
						id="mypage-phone"
						type="tel"
						autoComplete="tel"
						placeholder="010-1234-5678"
						value={form.phoneNumber}
						onChange={(event) => onChange('phoneNumber', event.target.value)}
					/>
				</ProfileRow>
				<ProfileRow label="생년월일" htmlFor="mypage-birth-date">
					<input
						className={`${INPUT_CLASS} max-w-[320px]`}
						id="mypage-birth-date"
						type="date"
						autoComplete="bday"
						value={form.birthDate}
						onChange={(event) => onChange('birthDate', event.target.value)}
					/>
				</ProfileRow>
				<ProfileRow label="성별" htmlFor="mypage-gender">
					<select
						className={`${INPUT_CLASS} max-w-[320px]`}
						id="mypage-gender"
						value={form.gender}
						onChange={(event) => {
							const value = event.target.value
							if (value === 'MALE' || value === 'FEMALE' || value === 'OTHER') onChange('gender', value)
						}}
					>
						<option value="" disabled>
							선택해 주세요
						</option>
						<option value="MALE">남성</option>
						<option value="FEMALE">여성</option>
						<option value="OTHER">기타</option>
					</select>
				</ProfileRow>
				<ProfileRow label="기본 배송지" htmlFor="mypage-address">
					<input
						className={INPUT_CLASS}
						id="mypage-address"
						autoComplete="street-address"
						value={form.defaultShippingAddress}
						onChange={(event) => onChange('defaultShippingAddress', event.target.value)}
					/>
				</ProfileRow>
			</fieldset>
			{errorMessage && (
				<p className="mt-3 text-sm font-bold text-brand-crab" role="alert">
					{errorMessage}
				</p>
			)}
			{successMessage && (
				<p className="mt-3 text-sm font-bold text-state-success" role="status">
					{successMessage}
				</p>
			)}
			<button
				className="mt-5 border-2 border-brand-crab bg-brand-crab px-6 py-3 text-sm font-bold text-white hover:bg-brand-crab-dark disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]"
				type="submit"
				disabled={mutation.isPending}
			>
				{mutation.isPending ? '저장 중...' : '회원 정보 저장'}
			</button>
		</form>
	)
}

export default ProfileForm
