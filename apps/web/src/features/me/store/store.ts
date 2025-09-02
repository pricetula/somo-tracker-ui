import { create } from "zustand"
import { User } from "@/shared/types/user"

interface MeState {
    me: User | null
    setMe: (me: User) => void
    clearMe: () => void
}

export const useMeStore = create<MeState>((set) => ({
    me: null,
    setMe: (me) => set({ me }),
    clearMe: () => set({ me: null }),
}))
