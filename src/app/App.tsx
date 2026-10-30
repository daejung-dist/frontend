import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'

import router from '@/app/router'
import { useAuthBootstrap } from '@/features/auth/hooks/useAuthBootstrap'

const queryClient = new QueryClient()

function App() {
	useAuthBootstrap()

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
