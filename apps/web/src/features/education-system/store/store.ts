import { create } from "zustand"
import { EducationSystem } from "../types"

interface EducationSystemsState {
    educationSystems: EducationSystem[]
    addEducationSystem: (educationSystem: EducationSystem) => void
    setEducationSystems: (educationSystems: EducationSystem[]) => void
    clearEducationSystems: () => void
}

export const useEducationSystemsStore = create<EducationSystemsState>((set) => ({
    educationSystems: [],
    addEducationSystem: (educationSystem) => set((state) => ({ educationSystems: [...state.educationSystems, educationSystem] })),
    setEducationSystems: (educationSystems) => set({ educationSystems }),
    clearEducationSystems: () => set({ educationSystems: [] })
}))
