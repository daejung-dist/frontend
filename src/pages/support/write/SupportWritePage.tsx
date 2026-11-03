import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { createSupportNotice, createSupportPost } from '@/features/support/api/support'
import SupportPostForm, { type SupportPostFormValues } from '@/features/support/components/SupportPostForm'
import { supportQueryKeys } from '@/features/support/hooks/supportQueryKeys'
import { getErrorMessage } from '@/features/support/utils'

function SupportWritePage() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const isAdmin = useAuthStore((state) => state.user?.role === 'ADMIN')
	const [errorMessage, setErrorMessage] = useState('')

	const mutation = useMutation({
		mutationFn: ({ isNotice, ...payload }: SupportPostFormValues) =>
			isNotice ? createSupportNotice(payload) : createSupportPost(payload),
		onSuccess: async (post) => {
			await queryClient.invalidateQueries({ queryKey: supportQueryKeys.all })
			navigate(`/support/${post.id}`, { replace: true })
		},
	})

	const handleSubmit = async (values: SupportPostFormValues) => {
		setErrorMessage('')
		try {
			await mutation.mutateAsync(values)
		} catch (error) {
			setErrorMessage(getErrorMessage(error, '글을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.'))
		}
	}

	return (
		<section className="p-6 max-[700px]:p-4" aria-labelledby="support-write-title">
			<h1 className="text-2xl font-black tracking-[-1px] text-black" id="support-write-title">
				고객문의 글쓰기
			</h1>
			<SupportPostForm
				cancelTo="/support"
				submitLabel="등록"
				canSelectNotice={isAdmin}
				isSubmitting={mutation.isPending}
				errorMessage={errorMessage}
				onSubmit={handleSubmit}
			/>
		</section>
	)
}

export default SupportWritePage
