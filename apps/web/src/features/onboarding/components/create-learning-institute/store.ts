import { create } from "zustand"
import { persist } from "zustand/middleware"
import { OnboardLearningInstituteInput } from "../../type"
import { LocalStorageStateKey } from "./utils"

type OnboardLearningInstituteSchoolInput = Pick<OnboardLearningInstituteInput, "school_address" | "school_description" | "school_education_system_id" | "school_name" | "school_website">

type OnboardLearningInstituteUserInput = Pick<OnboardLearningInstituteInput, "user_email" | "user_first_name" | "user_last_name" | "user_phone" | "user_photo_url">

interface OnboardLearningInstituteState {
    onboardLearningInstitute: OnboardLearningInstituteInput
    stage: (state: OnboardLearningInstituteState) => 1 | 2 | 3
    setInstituteName: (i: string) => void
    setSchoolDetail: (s: OnboardLearningInstituteSchoolInput) => void
    setUserDetail: (u: OnboardLearningInstituteUserInput) => void
}

const storeCore = (set: any): OnboardLearningInstituteState => ({
    onboardLearningInstitute: {
        institute_name: "",
        school_education_system_id: "",
        school_name: "",
        school_description: "",
        school_address: "",
        school_website: "",
        user_email: "",
        user_phone: "",
        user_first_name: "",
        user_last_name: "",
        user_photo_url: "",
    },
    stage: (state: OnboardLearningInstituteState) => {
        if (!state.onboardLearningInstitute.institute_name) return 1
        if (!(
            state.onboardLearningInstitute.school_education_system_id &&
            state.onboardLearningInstitute.school_name &&
            state.onboardLearningInstitute.school_address
        )) return 2
        return 3
    },
    setInstituteName: (i: string) => set(
        (state: OnboardLearningInstituteState) => ({
            onboardLearningInstitute: {
                ...state.onboardLearningInstitute,
                institute_name: i,
            }
        })
    ),
    setSchoolDetail: (s: OnboardLearningInstituteSchoolInput) => set(
        (state: OnboardLearningInstituteState) => ({
            onboardLearningInstitute: {
                ...state.onboardLearningInstitute,
                ...s,
            }
        })
    ),
    setUserDetail: (u: OnboardLearningInstituteUserInput) => set(
        (state: OnboardLearningInstituteState) => ({
            onboardLearningInstitute: {
                ...state.onboardLearningInstitute,
                ...u,
            }
        })
    ),
})

export const useMeStore = create<OnboardLearningInstituteState>()(
    persist(
        storeCore,
        {
            name: LocalStorageStateKey,
        }
    )
)