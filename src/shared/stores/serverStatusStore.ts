import { create } from 'zustand'

interface ServerStatusState {
	isServerDown: boolean
	markServerDown: () => void
}

export const useServerStatusStore = create<ServerStatusState>((set) => ({
	isServerDown: false,
	markServerDown: () => set({ isServerDown: true }),
}))
