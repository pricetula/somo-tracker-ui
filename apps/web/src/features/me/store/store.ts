import { create } from "zustand"
import { InstituteUser } from "./types"

interface MeState {
    me: InstituteUser | null
    setMe: (me: InstituteUser) => void
    clearMe: () => void
}

export const useMeStore = create<MeState>((set) => ({
    me: null,
    setMe: (me) => set({ me }),
    clearMe: () => set({ me: null }),
}))
