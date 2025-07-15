import { create } from "zustand"
import { School } from "./types"

interface SchoolsState {
    schools: School[]
    addSchool: (school: School) => void
    setSchools: (schools: School[]) => void
    clearSchools: () => void
}

export const useSchoolsStore = create<SchoolsState>((set) => ({
    schools: [],
    addSchool: (school) => set((state) => ({ schools: [...state.schools, school] })),
    setSchools: (schools) => set({ schools }),
    clearSchools: () => set({ schools: [] })
}))
