// hooks/useApiRequest.ts
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createSchool } from "@/features/school/services/create-school"
import { setActiveSchool } from "@/features/me/services/set-active-school"
import { useMeStore } from "@/features/me/store"
import { CreateSchoolSchema } from "../components/create-school/form-schema"
import { useSchoolsStore } from "../store"

// useCreateSchool hook used to create a school
export function useCreateSchool() {
    // Use next router
    const router = useRouter()

    // Get set me method from me store to replace me state
    const setMe = useMeStore((s) => s.setMe)

    // Get add school method from store to add newly created school
    const addSchool = useSchoolsStore((s) => s.addSchool)

    // State for is loading when a new school is being created
    const [isLoading, setIsLoading] = useState(false)

    const create = async (i: CreateSchoolSchema, isModalVersion: boolean = false) => {
        try {
            // Set the isLoading to true since the action to create school is started
            setIsLoading(true)

            // Create school and obtain response whether returned object or error
            const createdSchool = await createSchool(i)

            // If error is obtained show the error message
            if (createdSchool.error) {
                toast.error(createdSchool.error)
                return
            }

            // If no data object is returned then show error
            if (!createdSchool?.data?.id) {
                toast.error("Created school object not part of response")
                return
            }

            // Add school object to the store
            addSchool(createdSchool.data)

            // // Set as active school
            const updatedUser = await setActiveSchool(createdSchool.data.id)

            // If error is obtained then show error
            if (updatedUser.error) {
                toast.error(updatedUser.error)
                return
            }

            // If no data object is returned then show error
            if (!updatedUser?.data) {
                toast.error("Updated user object not part of response")
                return
            }

            // Update me state of user
            setMe(updatedUser.data)

            // If the hook is used on a modal then return back to previous route
            if (isModalVersion) {
                router.back()
            }
        } catch (err: any) {
            const errorMessage = err.message || "Network error occurred"
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const routerBack = () => {
        router.back()
    }

    return { create, isLoading, routerBack }
}