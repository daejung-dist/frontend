import { isAxiosError } from 'axios'

const NEW_POST_DAYS = 3
const DAY_MS = 1000 * 60 * 60 * 24

// 서버 시간은 시간대 없이 오므로 소수점 아래를 떼고 브라우저 로컬 시간(KST)으로 읽는다
const parseServerDate = (date: string) => new Date(date.slice(0, 19))

export const formatShortDate = (date: string) => date.slice(2, 10).replaceAll('-', '.')

export const formatDateTime = (date: string) => `${date.slice(0, 10).replaceAll('-', '.')} ${date.slice(11, 16)}`

export const isNewPost = (date: string) => (Date.now() - parseServerDate(date).getTime()) / DAY_MS < NEW_POST_DAYS

export const getErrorMessage = (error: unknown, fallback: string) => {
	const message = isAxiosError<{ message?: string }>(error) ? error.response?.data?.message : undefined
	return message || fallback
}
