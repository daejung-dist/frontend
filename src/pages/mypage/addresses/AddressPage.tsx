import { useMyProfile } from '@/features/user/hooks/useMyProfile'

function AddressPage() {
	const { data: profile, isPending, isError } = useMyProfile()

	return (
		<section aria-labelledby="address-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="address-title">
				배송지 관리
			</h1>

			{isPending && (
				<p className="mt-6 text-sm text-[#606b70]" role="status">
					배송지를 불러오는 중입니다.
				</p>
			)}
			{isError && (
				<p className="mt-6 text-sm font-bold text-brand-crab" role="alert">
					배송지를 불러오지 못했습니다. 다시 시도해 주세요.
				</p>
			)}
			{profile &&
				(profile.defaultShippingAddress ? (
					<dl className="mt-6 grid grid-cols-[140px_1fr] border-y border-[#d5dfe3] text-sm max-[520px]:grid-cols-[96px_1fr]">
						<dt className="flex items-center border-r border-[#d5dfe3] bg-[#f8f8f6] px-4 py-4 font-bold text-[#49545a] max-[520px]:px-3">
							기본 배송지
						</dt>
						<dd className="flex min-w-0 items-center break-all px-5 py-4 text-black max-[520px]:px-3">
							{profile.defaultShippingAddress}
						</dd>
					</dl>
				) : (
					<div className="mt-6 border border-[#c8d3d7] bg-white px-5 py-8 text-center">
						<p className="text-sm text-[#606b70]">배송지가 없습니다.</p>
					</div>
				))}
		</section>
	)
}

export default AddressPage
