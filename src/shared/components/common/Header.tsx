import MainHeader from '@/shared/components/common/header/MainHeader'
import MobileContactBar from '@/shared/components/common/header/MobileContactBar'
import TopBar from '@/shared/components/common/header/TopBar'

function Header() {
	return (
		<header className="bg-white">
			<TopBar />
			<MainHeader />
			<MobileContactBar />
		</header>
	)
}

export default Header
