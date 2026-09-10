import HeroSection from '../features/home/components/HeroSection'
import ProductSection from '../features/home/components/ProductSection'

function HomePage() {
    return (
        <div className="pb-18 max-[700px]:pb-10">
            <HeroSection />
            <ProductSection />
        </div>
    )
}

export default HomePage;