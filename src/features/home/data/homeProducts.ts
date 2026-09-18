import economicCrab from '@/assets/images/product/economic_crab.jpg'
import premiumCrab from '@/assets/images/product/premium_crab.jpg'

export interface HomeProduct {
	name: string
	image: string
	price: string
}

export const homeProducts: HomeProduct[] = [
	{
		name: '대정 특급 홍게 3kg',
		image: premiumCrab,
		price: '75,000원',
	},
	{
		name: '대정 실속형 홍게 5kg',
		image: economicCrab,
		price: '55,000원',
	},
]