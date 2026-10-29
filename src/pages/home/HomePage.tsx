import FloatingSocialLinks from '@/pages/home/components/FloatingSocialLinks'
import HeroSection from '@/pages/home/components/HeroSection'
import InfoSection from '@/pages/home/components/InfoSection'
import ProductSection from '@/pages/home/components/ProductSection'

function HomePage() {
	return (
		// UtilityBar 외곽선을 좌우로 이어 붙인다. 안쪽 밝은 선은 섹션 배경에 가려지지 않도록 위에 겹친다.
		<div className="relative border-x border-brand-ocean-deep after:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_1px_0_0_rgba(255,255,255,0.35)]">
			<HeroSection />
			<InfoSection />
			<ProductSection />
			<FloatingSocialLinks />
		</div>
	)
}

export default HomePage
