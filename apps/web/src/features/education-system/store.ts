import { create } from "zustand"
import { EducationSystem } from "./types"

interface EducationSystemsState {
    schools: EducationSystem[]
    addEducationSystem: (school: EducationSystem) => void
    setEducationSystems: (schools: EducationSystem[]) => void
    clearEducationSystems: () => void
}

export const useEducationSystemsStore = create<EducationSystemsState>((set) => ({
    schools: [],
    addEducationSystem: (school) => set((state) => ({ schools: [...state.schools, school] })),
    setEducationSystems: (schools) => set({ schools }),
    clearEducationSystems: () => set({ schools: [] })
}))
