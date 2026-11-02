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

const sampleSupportPosts: SupportPost[] = [
	{
		id: 100,
		title: '홍게 조업 일정에 따른 배송 안내',
		author: '대정유통',
		createdAt: '2026-10-30',
		views: 128,
		isNotice: true,
		content: `홍게는 날씨와 조업 일정에 따라 입고가 달라집니다.
풍랑주의보 등으로 조업이 쉬는 날에는 배송이 하루 이틀 늦어질 수 있습니다.

배송이 늦어지는 주문은 개별로 연락드리겠습니다.
궁금하신 점은 전화로 문의해 주세요.`,
	},
	...Array.from({ length: 27 }, (_, index) => ({
		id: 99 - index,
		title: titles[index % titles.length],
		author: authors[index % authors.length],
		createdAt: `2026-10-${String(29 - index).padStart(2, '0')}`,
		views: 40 - index,
		isNotice: false,
		content: `${titles[index % titles.length]}\n답변 부탁드립니다.`,
	})),
]

// TODO: 게시판 API가 나오면 조회 훅으로 교체한다. 운영 화면에 예시 글이 보이지 않도록 개발 서버에서만 쓴다
export const supportPosts: SupportPost[] = import.meta.env.DEV ? sampleSupportPosts : []
