// hooks/useApiRequest.ts
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createSchool } from "@/features/school/services/create-school"
import { useMeStore } from "@/features/me/store"
import { CreateSchoolSchema } from "../components/create-school/form-schema"
import { useSchoolsStore } from "../store"

// useCreateSchool hook used to create a school
export function useCreateSchool() {
    // Use next router
    const router = useRouter()

    // State for is loading when a new school is being created
    const [isLoading, setIsLoading] = useState(false)

    const create = async (i: CreateSchoolSchema) => {
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

            window.location.href = "/"
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