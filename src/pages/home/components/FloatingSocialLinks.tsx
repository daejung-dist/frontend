import KakaoTalkIcon from '@/shared/assets/icons/kakao_talk_icon/medium/SVG/kakaotalk_sharing_btn_medium.svg'
import NaverBandIcon from '@/shared/assets/icons/naver_band_icon/BAND_96.png'

const SOCIAL_LINKS = [
	{
		name: '카카오톡',
		href: 'https://open.kakao.com/o/sQpf3SQc',
		icon: KakaoTalkIcon,
		hoverClassName: 'hover:border-[#e0c900]',
	},
	{
		name: '네이버밴드',
		href: 'https://band.us/n/a4a1bbqe80j73',
		icon: NaverBandIcon,
		hoverClassName: 'hover:border-[#03a94c]',
	},
] as const

function FloatingSocialLinks() {
	return (
		<aside
			className="fixed top-1/2 right-4 z-40 flex -translate-y-1/2 flex-col gap-2 max-[700px]:right-2"
			aria-label="대정유통 커뮤니티 바로가기"
		>
			{SOCIAL_LINKS.map(({ name, href, icon, hoverClassName }) => (
				<a
					className={`group flex w-20 flex-col items-center border border-[#c8d3d7] bg-white px-2 py-3 text-center shadow-[0_2px_7px_rgba(0,0,0,0.16)] transition-transform hover:-translate-y-0.5 ${hoverClassName} max-[700px]:w-16 max-[700px]:px-1.5 max-[700px]:py-2`}
					key={name}
					href={href}
					target="_blank"
					rel="noreferrer"
					aria-label={`${name} 새 창에서 열기`}
				>
					<img
						className="size-12 object-contain max-[700px]:size-10"
						src={icon}
						alt=""
						aria-hidden="true"
					/>
					<span className="mt-2 text-[11px] font-black leading-4 text-[#273848] max-[700px]:mt-1.5 max-[700px]:text-[9px]">
						{name}
					</span>
				</a>
			))}
		</aside>
	)
}

export default FloatingSocialLinks
