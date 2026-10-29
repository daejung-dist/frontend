import FloatingSocialLinks from '@/pages/home/components/FloatingSocialLinks'
import HeroSection from '@/pages/home/components/HeroSection'
import InfoSection from '@/pages/home/components/InfoSection'
import ProductSection from '@/pages/home/components/ProductSection'

function HomePage() {
	return (
		<div>
			<HeroSection />
			<InfoSection />
			<ProductSection />
			<FloatingSocialLinks />
		</div>
	)
}

export default HomePage
