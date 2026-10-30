import { useCallback, useEffect, useRef, useState } from 'react'

const POSTCODE_SCRIPT_ID = 'daum-postcode-script'
const POSTCODE_SCRIPT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

export interface DaumPostcodeData {
	zonecode: string
	roadAddress: string
	jibunAddress: string
	userSelectedType: 'R' | 'J'
}

interface DaumPostcodeApi {
	Postcode: new (options: { oncomplete: (data: DaumPostcodeData) => void }) => {
		open: () => void
	}
}

declare global {
	interface Window {
		daum?: DaumPostcodeApi
	}
}

let postcodeApiPromise: Promise<DaumPostcodeApi> | null = null

function loadPostcodeApi() {
	if (window.daum?.Postcode) {
		return Promise.resolve(window.daum)
	}

	if (postcodeApiPromise) {
		return postcodeApiPromise
	}

	postcodeApiPromise = new Promise<DaumPostcodeApi>((resolve, reject) => {
		let script = document.getElementById(POSTCODE_SCRIPT_ID) as HTMLScriptElement | null

		const cleanup = () => {
			window.clearTimeout(timeoutId)
			script?.removeEventListener('load', handleLoad)
			script?.removeEventListener('error', handleError)
		}

		const fail = (message: string) => {
			cleanup()
			postcodeApiPromise = null
			script?.remove()
			reject(new Error(message))
		}

		function handleLoad() {
			if (window.daum?.Postcode) {
				cleanup()
				resolve(window.daum)
				return
			}

			fail('주소 검색 서비스를 초기화하지 못했습니다.')
		}

		function handleError() {
			fail('주소 검색 서비스를 불러오지 못했습니다.')
		}

		const timeoutId = window.setTimeout(() => {
			fail('주소 검색 서비스 응답이 지연되고 있습니다. 다시 시도해 주세요.')
		}, 10_000)

		if (!script) {
			script = document.createElement('script')
			script.id = POSTCODE_SCRIPT_ID
			script.src = POSTCODE_SCRIPT_URL
			script.async = true
			script.addEventListener('load', handleLoad, { once: true })
			script.addEventListener('error', handleError, { once: true })
			document.head.appendChild(script)
			return
		}

		script.addEventListener('load', handleLoad, { once: true })
		script.addEventListener('error', handleError, { once: true })
	})

	return postcodeApiPromise
}

export function useDaumPostcode() {
	const isMountedRef = useRef(true)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		let isActive = true
		isMountedRef.current = true

		void loadPostcodeApi()
			.then(() => {
				if (isActive) {
					setIsLoading(false)
				}
			})
			.catch((error: unknown) => {
				if (isActive) {
					setErrorMessage(error instanceof Error ? error.message : '주소 검색 서비스를 불러오지 못했습니다.')
					setIsLoading(false)
				}
			})

		return () => {
			isActive = false
			isMountedRef.current = false
		}
	}, [])

	const openPostcode = useCallback((onComplete: (data: DaumPostcodeData) => void) => {
		setErrorMessage('')

		if (!window.daum?.Postcode) {
			setErrorMessage('주소 검색 서비스가 준비되지 않았습니다. 잠시 후 다시 시도해 주세요.')
			return
		}

		new window.daum.Postcode({
			oncomplete: (data) => {
				if (isMountedRef.current) {
					onComplete(data)
				}
			},
		}).open()
	}, [])

	return {
		openPostcode,
		isLoading,
		errorMessage,
	}
}
