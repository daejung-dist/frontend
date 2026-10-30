import { useLocation } from 'react-router'

import { SITE_URL } from '@/shared/constants/site'

// SPA라 모든 페이지가 같은 index.html을 쓰므로, 페이지마다 대표 주소를 따로 알려준다.
// React 19는 컴포넌트에서 렌더링한 <link>를 <head>로 옮겨 준다.
function CanonicalLink() {
	const { pathname } = useLocation()

	return <link rel="canonical" href={`${SITE_URL}${pathname}`} />
}

export default CanonicalLink
