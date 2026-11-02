import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'

import router from '@/app/router'
import { useAuthBootstrap } from '@/features/auth/hooks/useAuthBootstrap'
import MaintenancePage from '@/pages/MaintenancePage'
import { useServerStatusStore } from '@/shared/stores/serverStatusStore'

const queryClient = new QueryClient()

function App() {
	useAuthBootstrap()
	const isServerDown = useServerStatusStore((state) => state.isServerDown)

	if (isServerDown) {
		return <MaintenancePage />
	}

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
