import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { InstituteUsers } from "../types"

interface InstituteUsersStore {
    userIds: Set<string>
    idsGroupedByRole: Map<string, Set<string>>
    entitiesMappedByUserId: Map<string, InstituteUsers>
}

export const useInstituteUsersStore = create<InstituteUsersStore>()(
    devtools<InstituteUsersStore>(
        (set) => ({
            userIds: new Set(),
            idsGroupedByRole: new Map(),
            entitiesMappedByUserId: new Map(),
        }),
    )
)