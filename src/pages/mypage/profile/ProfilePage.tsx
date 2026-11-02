import { useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { getMyProfile } from '@/features/user/api/user'
import ProfileForm from '@/features/user/components/ProfileForm'
import type { UpdateUserProfileRequest, UserProfile } from '@/features/user/types'

function ProfilePage() {
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
		<section aria-labelledby="profile-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="profile-title">
				개인정보확인/수정
			</h1>
			{profileQuery.isPending && (
				<p className="mt-6 text-sm text-[#606b70]" role="status">
					회원 정보를 불러오는 중입니다.
				</p>
			)}
			{profileQuery.isError && (
				<div className="mt-6">
					<p className="text-sm font-bold text-brand-crab" role="alert">
						{errorMessage ?? '회원 정보를 불러오지 못했습니다. 다시 시도해 주세요.'}
					</p>
					<button
						className="mt-2 text-sm font-bold text-brand-ocean-deep underline disabled:opacity-50"
						type="button"
						disabled={profileQuery.isFetching}
						onClick={() => void profileQuery.refetch()}
					>
						{profileQuery.isFetching ? '불러오는 중...' : '다시 시도'}
					</button>
				</div>
			)}
			{profileQuery.data && <ProfileForm profile={profileQuery.data} onSaved={handleSaved} />}
		</section>
	)
}

export default ProfilePage
