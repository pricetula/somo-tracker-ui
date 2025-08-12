import { create } from "zustand"
import { School } from "../types"

interface SchoolsUIState {
    inviteUsersDialogOpen: boolean
    addStudentsDialogOpen: boolean
    toggleInviteUsersDialog: () => void
    toggleAddStudentsDialog: () => void
    setInviteUsersDialog: (v: boolean) => void
    setAddStudentsDialog: (v: boolean) => void
}

export const useSchoolsUIStore = create<SchoolsUIState>((set) => ({
    inviteUsersDialogOpen: false,
    addStudentsDialogOpen: false,
    toggleInviteUsersDialog: () => set((state) => {
        const inviteUsersDialogOpen = !state.inviteUsersDialogOpen
        let addStudentsDialogOpen = state.addStudentsDialogOpen
        if (addStudentsDialogOpen) {
            addStudentsDialogOpen = false
        }
        return { inviteUsersDialogOpen, addStudentsDialogOpen }
    }),
    toggleAddStudentsDialog: () => set((state) => {
        const addStudentsDialogOpen = !state.addStudentsDialogOpen
        let inviteUsersDialogOpen = state.inviteUsersDialogOpen
        if (inviteUsersDialogOpen) {
            inviteUsersDialogOpen = false
        }
        return { inviteUsersDialogOpen, addStudentsDialogOpen }
    }),
    setInviteUsersDialog: (v) => set({ inviteUsersDialogOpen: v }),
    setAddStudentsDialog: (v) => set({ addStudentsDialogOpen: v })
}))
