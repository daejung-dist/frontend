import BrandBar from '@/shared/components/common/header/BrandBar'
import MobileContactBar from '@/shared/components/common/header/MobileContactBar'
import UtilityBar from '@/shared/components/common/header/UtilityBar'

function Header() {
	return (
		<header>
			<UtilityBar />
			<BrandBar />
			<MobileContactBar />
		</header>
	)
}

export default Header
