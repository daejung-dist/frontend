import { isAxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'

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

const INPUT_CLASS = 'h-10 w-full min-w-0 border border-[#9da9ad] bg-white px-3 text-sm text-black outline-none focus:border-brand-ocean disabled:bg-[#edf2f4]'
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
		<form className="mt-6 border-t-2 border-brand-ocean-deep pt-5" noValidate onSubmit={handleSubmit}>
			<h2 className="text-base font-black text-black">회원 정보</h2>
			<dl className="mt-3 grid grid-cols-[100px_1fr] text-sm">
				<dt className="border-b border-[#d5dfe3] bg-[#edf2f4] px-4 py-3 font-bold text-[#49545a]">이메일</dt>
				<dd className="break-all border-b border-[#d5dfe3] px-4 py-3 text-black">{profile.email}</dd>
				<dt className="border-b border-[#d5dfe3] bg-[#edf2f4] px-4 py-3 font-bold text-[#49545a]">회원 권한</dt>
				<dd className="border-b border-[#d5dfe3] px-4 py-3 text-black">{profile.role}</dd>
			</dl>
			<fieldset className="mt-4 grid min-w-0 grid-cols-2 gap-4 max-[520px]:grid-cols-1" disabled={mutation.isPending}>
				<legend className="sr-only">회원 정보 수정</legend>
				<div className="flex min-w-0 flex-col gap-1">
					<label className="text-xs font-bold text-[#49545a]" htmlFor="mypage-name">이름</label>
					<input className={INPUT_CLASS} id="mypage-name" autoComplete="name" value={form.name} onChange={(event) => onChange('name', event.target.value)} />
				</div>
				<div className="flex min-w-0 flex-col gap-1">
					<label className="text-xs font-bold text-[#49545a]" htmlFor="mypage-phone">휴대폰 번호</label>
					<input className={INPUT_CLASS} id="mypage-phone" type="tel" autoComplete="tel" placeholder="010-1234-5678" value={form.phoneNumber} onChange={(event) => onChange('phoneNumber', event.target.value)} />
				</div>
				<div className="col-span-full flex min-w-0 flex-col gap-1">
					<label className="text-xs font-bold text-[#49545a]" htmlFor="mypage-address">기본 배송지 주소</label>
					<input className={INPUT_CLASS} id="mypage-address" autoComplete="street-address" value={form.defaultShippingAddress} onChange={(event) => onChange('defaultShippingAddress', event.target.value)} />
				</div>
				<div className="flex min-w-0 flex-col gap-1">
					<label className="text-xs font-bold text-[#49545a]" htmlFor="mypage-birth-date">생년월일</label>
					<input className={INPUT_CLASS} id="mypage-birth-date" type="date" autoComplete="bday" value={form.birthDate} onChange={(event) => onChange('birthDate', event.target.value)} />
				</div>
				<div className="flex min-w-0 flex-col gap-1">
					<label className="text-xs font-bold text-[#49545a]" htmlFor="mypage-gender">성별</label>
					<select className={INPUT_CLASS} id="mypage-gender" value={form.gender} onChange={(event) => {
						const value = event.target.value
						if (value === 'MALE' || value === 'FEMALE' || value === 'OTHER') onChange('gender', value)
					}}>
						<option value="" disabled>선택해 주세요</option>
						<option value="MALE">남성</option>
						<option value="FEMALE">여성</option>
						<option value="OTHER">기타</option>
					</select>
				</div>
			</fieldset>
			{errorMessage && <p className="mt-3 text-sm font-bold text-brand-crab" role="alert">{errorMessage}</p>}
			{successMessage && <p className="mt-3 text-sm font-bold text-state-success" role="status">{successMessage}</p>}
			<button className="mt-5 border-2 border-brand-crab bg-brand-crab px-6 py-3 text-sm font-bold text-white hover:bg-brand-crab-dark disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]" type="submit" disabled={mutation.isPending}>
				{mutation.isPending ? '저장 중...' : '회원 정보 저장'}
			</button>
		</form>
	)
}

export default ProfileForm
