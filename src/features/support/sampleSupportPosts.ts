import type { SupportPost } from '@/features/support/types'

const titles = [
	'홍게 주문 후 배송은 언제 받을 수 있나요?',
	'선물용으로 다른 주소로 보낼 수 있나요?',
	'입금 확인 부탁드립니다.',
	'홍게 크기 선택이 가능한가요?',
	'받은 홍게 보관 방법이 궁금합니다.',
	'주문 수량 변경 문의드립니다.',
	'제주도도 배송되나요?',
	'현금영수증 발급 문의',
]
const authors = ['김*수', '이*영', '박*준', '최*희', '정*민']

// 게시판 API가 나오기 전까지 개발 서버에서만 화면 확인용으로 쓴다
export const sampleSupportPosts: SupportPost[] = [
	{
		id: 100,
		title: '홍게 조업 일정에 따른 배송 안내',
		author: '대정유통',
		createdAt: '2026-10-30',
		views: 128,
		isNotice: true,
	},
	...Array.from({ length: 27 }, (_, index) => ({
		id: 99 - index,
		title: titles[index % titles.length],
		author: authors[index % authors.length],
		createdAt: `2026-10-${String(29 - index).padStart(2, '0')}`,
		views: 40 - index,
		isNotice: false,
	})),
]
