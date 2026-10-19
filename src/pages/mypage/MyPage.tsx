import { useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { getMyProfile } from '@/features/user/api/user'
import ProfileForm from '@/features/user/components/ProfileForm'
import type { UpdateUserProfileRequest, UserProfile } from '@/features/user/types'

function MyPage() {
	const user = useAuthStore((state) => state.user)
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const updateUser = useAuthStore((state) => state.updateUser)
	const queryClient = useQueryClient()
	const queryKey = ['my-profile', user?.id]
	const profileQuery = useQuery({
		queryKey,
		queryFn: async () => {
			const profile = await getMyProfile()
			updateUser(profile)
			return profile
		},
		enabled: isAuthenticated,
		gcTime: 0,
		retry: false,
		refetchOnWindowFocus: false,
	})
	const handleSaved = async (payload: UpdateUserProfileRequest) => {
		if (profileQuery.data) {
			const profile = { ...profileQuery.data, ...payload }
			queryClient.setQueryData<UserProfile>(queryKey, profile)
			updateUser(profile)
		}
		await queryClient.invalidateQueries({ queryKey })
	}
	const errorMessage = isAxiosError<{ message?: string }>(profileQuery.error)
		? profileQuery.error.response?.data?.message
		: undefined

	return (
		<section className="mx-auto w-240 px-3 py-10 max-[700px]:w-full max-[700px]:px-4" aria-labelledby="mypage-title">
			<div className="border-2 border-[#aeb9bd] bg-white p-1">
				<div className="border border-[#8e999d] bg-[#f8f8f6] p-6 max-[700px]:p-4">
					<p className="w-fit bg-brand-ocean px-3 py-1 text-xs font-black text-white">MY PAGE</p>
					<h1 className="mt-3 text-2xl font-black tracking-[-1px] text-black" id="mypage-title">마이페이지</h1>
					<p className="mt-2 text-sm text-[#606b70]">회원 정보와 주문 내역을 확인하는 공간입니다.</p>

					{profileQuery.isPending && <p className="mt-6 text-sm text-[#606b70]" role="status">회원 정보를 불러오는 중입니다.</p>}
					{profileQuery.isError && (
						<div className="mt-6">
							<p className="text-sm font-bold text-brand-crab" role="alert">
								{errorMessage ?? '회원 정보를 불러오지 못했습니다. 다시 시도해 주세요.'}
							</p>
							<button className="mt-2 text-sm font-bold text-brand-ocean-deep underline disabled:opacity-50" type="button" disabled={profileQuery.isFetching} onClick={() => void profileQuery.refetch()}>
								{profileQuery.isFetching ? '불러오는 중...' : '다시 시도'}
							</button>
						</div>
					)}
					{profileQuery.data && <ProfileForm profile={profileQuery.data} onSaved={handleSaved} />}

					<div className="mt-6 border border-[#c8d3d7] bg-white px-5 py-8 text-center">
						<h2 className="text-base font-black text-black">주문 내역</h2>
						<p className="mt-2 text-sm text-[#606b70]">주문 내역 API 연결 후 표시됩니다.</p>
					</div>

					<div className="mt-4 border border-[#c8d3d7] bg-white px-5 py-8 text-center">
						<h2 className="text-base font-black text-black">배송지 관리</h2>
						<p className="mt-2 text-sm text-[#606b70]">배송지 API 연결 후 표시됩니다.</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MyPage
