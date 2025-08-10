// hooks/useApiRequest.ts
import { useState } from 'react'
import { toast } from 'sonner'

interface ApiRequestOptions {
    successMessage?: string
    onSuccess?: (data: any) => void
    onError?: (error: string) => void
}

export function useApiRequest() {
    const [isLoading, setIsLoading] = useState(false)

    const execute = async (
        request: () => Promise<Response>,
        options: ApiRequestOptions = {}
    ) => {
        try {
            setIsLoading(true)

            const response = await request()

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                const errorMessage = errorData.error ||
                    errorData.message ||
                    `Request failed with status ${response.status}`

                toast.error(errorMessage)
                options.onError?.(errorMessage)
                return { success: false, error: errorMessage }
            }

            const data = await response.json()

            if (options.successMessage) {
                toast.success(options.successMessage)
            }

            options.onSuccess?.(data)
            return { success: true, data }

        } catch (err: any) {
            const errorMessage = err.message || 'Network error occurred'
            toast.error(errorMessage)
            options.onError?.(errorMessage)
            return { success: false, error: errorMessage }

        } finally {
            setIsLoading(false)
        }
    }

    return { execute, isLoading }
}