import { isAxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'

import { confirmEmailVerification, requestEmailVerification } from '@/features/auth/api/auth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CODE_PATTERN = /^[0-9]{6}$/
// 서버와 같은 시간이어야 화면에서 된다고 보여 준 요청이 서버에서 거절되지 않는다
const RESEND_COOLDOWN_MS = 60 * 1000
const CODE_TTL_MS = 5 * 60 * 1000

const INPUT_CLASS =
	'h-10 min-w-0 flex-1 border border-[#9da9ad] bg-white px-3 text-sm shadow-[inset_1px_1px_0_#e4e9eb] outline-none read-only:bg-[#f1f3f4] read-only:text-[#49545a] focus:border-brand-ocean focus:shadow-[inset_0_0_0_1px_var(--brand-sky)]'
const PRIMARY_BUTTON_CLASS =
	'w-28 shrink-0 border border-brand-ocean bg-brand-ocean text-xs font-bold text-white hover:bg-brand-ocean-deep disabled:border-[#b8c2c6] disabled:bg-[#b8c2c6]'
const SECONDARY_BUTTON_CLASS =
	'w-28 shrink-0 border border-brand-ocean bg-white text-xs font-bold text-brand-ocean-deep hover:bg-[#eef6f9] disabled:border-[#b8c2c6] disabled:text-[#b8c2c6]'

type VerificationStatus = 'idle' | 'sent' | 'verified'

interface EmailVerificationFieldProps {
	email: string
	disabled?: boolean
	onEmailChange: (email: string) => void
	onVerifiedChange: (verificationToken: string | null) => void
}

function getErrorStatus(error: unknown) {
	return isAxiosError(error) ? error.response?.status : undefined
}

// 백엔드가 오류 본문에 메시지를 주지 않아서 응답 코드로 안내 문구를 고른다
function getSendErrorMessage(error: unknown) {
	switch (getErrorStatus(error)) {
		case 400:
			return '이메일 형식이 올바르지 않습니다.'
		case 409:
			return '이미 가입된 이메일입니다.'
		case 429:
			return '인증번호 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.'
		default:
			return '인증 메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.'
	}
}

function getConfirmErrorMessage(error: unknown) {
	switch (getErrorStatus(error)) {
		case 400:
			return '인증번호가 올바르지 않거나 만료되었습니다.'
		case 429:
			return '입력 횟수를 초과했습니다. 인증번호를 다시 받아 주세요.'
		default:
			return '인증번호를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'
	}
}

function formatRemaining(ms: number) {
	const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = String(totalSeconds % 60).padStart(2, '0')
	return `${minutes}:${seconds}`
}

function EmailVerificationField({
	email,
	disabled = false,
	onEmailChange,
	onVerifiedChange,
}: EmailVerificationFieldProps) {
	const emailInputRef = useRef<HTMLInputElement>(null)
	const codeInputRef = useRef<HTMLInputElement>(null)

	const [status, setStatus] = useState<VerificationStatus>('idle')
	const [code, setCode] = useState('')
	const [isSending, setIsSending] = useState(false)
	const [isConfirming, setIsConfirming] = useState(false)
	// 남은 시간을 1초씩 빼지 않고 마감 시각과의 차이로 구해야 탭을 오래 비워 둬도 어긋나지 않는다
	const [now, setNow] = useState(0)
	const [resendAvailableAt, setResendAvailableAt] = useState(0)
	const [codeExpiresAt, setCodeExpiresAt] = useState(0)
	const [errorMessage, setErrorMessage] = useState('')
	const [infoMessage, setInfoMessage] = useState('')

	const resendRemainingMs = resendAvailableAt - now
	const codeRemainingMs = codeExpiresAt - now
	const isCodeExpired = status === 'sent' && codeRemainingMs <= 0
	const isTicking = resendRemainingMs > 0 || (status === 'sent' && codeRemainingMs > 0)

	useEffect(() => {
		if (!isTicking) return
		const timer = window.setInterval(() => setNow(Date.now()), 1000)
		return () => window.clearInterval(timer)
	}, [isTicking])

	const clearMessages = () => {
		setErrorMessage('')
		setInfoMessage('')
	}

	const handleEmailChange = (value: string) => {
		onEmailChange(value)
		clearMessages()
		// 번호를 받은 뒤 주소를 고치면 그 번호는 이전 주소의 것이라 다시 받게 한다
		if (status === 'sent') {
			setStatus('idle')
			setCode('')
		}
		// 재발송 대기는 주소마다 따로라서, 오타를 고친 주소로는 바로 받을 수 있게 한다
		setResendAvailableAt(0)
	}

	const handleSend = async () => {
		const trimmedEmail = email.trim()
		if (!EMAIL_PATTERN.test(trimmedEmail)) {
			setErrorMessage('이메일 형식이 올바르지 않습니다.')
			return
		}

		setIsSending(true)
		clearMessages()

		try {
			await requestEmailVerification(trimmedEmail)
			const sentAt = Date.now()
			setNow(sentAt)
			setResendAvailableAt(sentAt + RESEND_COOLDOWN_MS)
			setCodeExpiresAt(sentAt + CODE_TTL_MS)
			setStatus('sent')
			setCode('')
			setInfoMessage('인증번호를 보냈습니다. 메일이 보이지 않으면 스팸함도 확인해 주세요.')
			requestAnimationFrame(() => codeInputRef.current?.focus())
		} catch (error) {
			setErrorMessage(getSendErrorMessage(error))
		} finally {
			setIsSending(false)
		}
	}

	const handleConfirm = async () => {
		if (isConfirming || isCodeExpired) return
		if (!CODE_PATTERN.test(code)) {
			setErrorMessage('인증번호 6자리를 입력해 주세요.')
			return
		}

		setIsConfirming(true)
		clearMessages()

		try {
			const { verificationToken } = await confirmEmailVerification({ email: email.trim(), code })
			setStatus('verified')
			setCode('')
			setInfoMessage('이메일 인증이 완료되었습니다.')
			onVerifiedChange(verificationToken)
		} catch (error) {
			// 입력 횟수를 다 쓰면 서버가 번호를 지우므로 입력칸을 닫고 다시 받게 한다
			if (getErrorStatus(error) === 429) {
				setStatus('idle')
				setCode('')
			}
			setErrorMessage(getConfirmErrorMessage(error))
		} finally {
			setIsConfirming(false)
		}
	}

	const handleChangeEmail = () => {
		setStatus('idle')
		setResendAvailableAt(0)
		clearMessages()
		onVerifiedChange(null)
		requestAnimationFrame(() => emailInputRef.current?.focus())
	}

	const handleCodeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		// 번호 입력 중 Enter가 회원가입 제출로 이어지지 않게 막는다
		if (event.key === 'Enter') {
			event.preventDefault()
			void handleConfirm()
		}
	}

	const getSendButtonLabel = () => {
		if (isSending) return '보내는 중...'
		if (resendRemainingMs > 0) return `다시 받기 (${Math.ceil(resendRemainingMs / 1000)}초)`
		return status === 'sent' ? '다시 받기' : '인증번호 받기'
	}

	return (
		<div className="flex flex-col gap-1">
			<label className="text-xs font-bold text-[#49545a]" htmlFor="email-verification-email">
				이메일
			</label>
			<div className="flex gap-2">
				<input
					className={INPUT_CLASS}
					id="email-verification-email"
					ref={emailInputRef}
					type="email"
					autoComplete="email"
					placeholder="daejung@example.com"
					value={email}
					readOnly={status === 'verified' || isSending}
					disabled={disabled}
					onChange={(event) => handleEmailChange(event.target.value)}
				/>
				{status === 'verified' ? (
					<button className={SECONDARY_BUTTON_CLASS} type="button" disabled={disabled} onClick={handleChangeEmail}>
						이메일 변경
					</button>
				) : (
					<button
						className={PRIMARY_BUTTON_CLASS}
						type="button"
						disabled={disabled || isSending || resendRemainingMs > 0}
						onClick={() => void handleSend()}
					>
						{getSendButtonLabel()}
					</button>
				)}
			</div>

			{status === 'sent' && (
				<div className="mt-1 flex gap-2">
					<label className="sr-only" htmlFor="email-verification-code">
						인증번호
					</label>
					<div className="relative flex min-w-0 flex-1">
						<input
							className={`${INPUT_CLASS} pr-14`}
							id="email-verification-code"
							ref={codeInputRef}
							type="text"
							inputMode="numeric"
							autoComplete="one-time-code"
							maxLength={6}
							placeholder="인증번호 6자리"
							value={code}
							disabled={disabled || isCodeExpired}
							onChange={(event) => {
								setCode(event.target.value.replace(/\D/g, '').slice(0, 6))
								setErrorMessage('')
							}}
							onKeyDown={handleCodeKeyDown}
						/>
						<span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold text-brand-crab">
							{formatRemaining(codeRemainingMs)}
						</span>
					</div>
					<button
						className={PRIMARY_BUTTON_CLASS}
						type="button"
						disabled={disabled || isConfirming || isCodeExpired}
						onClick={() => void handleConfirm()}
					>
						{isConfirming ? '확인 중...' : '확인'}
					</button>
				</div>
			)}

			{isCodeExpired && (
				<p className="mt-1 text-xs font-bold text-brand-crab" role="alert">
					인증번호가 만료되었습니다. 다시 받아 주세요.
				</p>
			)}
			{errorMessage && (
				<p className="mt-1 text-xs font-bold text-brand-crab" role="alert">
					{errorMessage}
				</p>
			)}
			{!errorMessage && !isCodeExpired && infoMessage && (
				<p
					className={`mt-1 text-xs font-bold ${status === 'verified' ? 'text-state-success' : 'text-[#606b70]'}`}
					role="status"
				>
					{infoMessage}
				</p>
			)}
		</div>
	)
}

export default EmailVerificationField
