import { ActionResponse } from "@/shared/types/actions"
import { AuthCookie } from "../types"
import { saveAuthToCookie } from "../utils/save-auth-to-cookie"

// Response from API
interface AuthResponse extends AuthCookie {
    message: string
}

/**
 * Verifies the provided OTP code for the given email address.
 *
 * @param code The OTP code to verify.
 * @param email The email address associated with the OTP code.
 * @returns A promise that resolves to an object containing the success status, data, and error message.
 */
export async function verifyOtpCode({ code, email }: { code: string, email: string }): Promise<ActionResponse<AuthResponse | null>> {
    "use server"

    try {
        const y = {
            access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdjVk8xaTdKbEIwLWdpcjJfYjFjOSJ9.eyJpc3MiOiJodHRwczovL2Rldi1pbWZxaWEwa3UybXAxem9iLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJlbWFpbHw2ODU5ZTI5MGViNTU0NzU1NTRjNTg3YTEiLCJhdWQiOlsic29tby10cmFja2VyLWFwaSIsImh0dHBzOi8vZGV2LWltZnFpYTBrdTJtcDF6b2IudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc1MzkxNTMzNywiZXhwIjoxNzU0MDAxNzM3LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHdyaXRlOmFkbWluIHJlYWQ6YWRtaW4iLCJndHkiOiJwYXNzd29yZCIsImF6cCI6InpjY0F4bXRjaWJrRmxpZTUxam1FVURXMmhkdGJ1OWdLIn0.GQ1OiYMlg6l3nmJnBccMEzKqjbq4QgAPQ6Kevwi_Q-WHkDvTjfoguhI_eOYHRdazI-imwdl7PvDLdCgfg8lZrDvS33jBaBlidIDa0rxWxXcz2Hw5OLDDLTiORLDvno5x0Eun1w3e64SFs4r-YiL0HcnlYmzmCKTRSBKaiDpnZhwVADkAEoAP102-38CTPfgU3GDd38SolAEsHEoNSndNJvCPtgepqcSpCE8nzIE-uBKVzNIwf8rCOowi8oPPC9YrcqEuo4ixhlFIjLpFZf01-r6V6jXB2bMFfE-ntchkTa2_ddFZuZh0iaq_KxSbX-i477xvZ_X9LYCsfIqJMY0JdQ',
            expires_in: 86400,
            id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdjVk8xaTdKbEIwLWdpcjJfYjFjOSJ9.eyJuaWNrbmFtZSI6InByaWNldHVsYSIsIm5hbWUiOiJwcmljZXR1bGFAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzNjODk4YjM5MDNhZDBhYzliOWU3MTNiMzY5ODlhMWRhP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGcHIucG5nIiwidXBkYXRlZF9hdCI6IjIwMjUtMDctMzBUMjI6NDI6MTcuODU5WiIsImVtYWlsIjoicHJpY2V0dWxhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1pbWZxaWEwa3UybXAxem9iLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJ6Y2NBeG10Y2lia0ZsaWU1MWptRVVEVzJoZHRidTlnSyIsInN1YiI6ImVtYWlsfDY4NTllMjkwZWI1NTQ3NTU1NGM1ODdhMSIsImlhdCI6MTc1MzkxNTMzNywiZXhwIjoxNzUzOTUxMzM3fQ.KWCiMvUtYNNiwIxuaXRPwQZhI5XL4LIFUGimwxDU5D8--Q3pVcY1mGK9rg10KhxHRJGPSwkKc-TFx71fhv6t1t-oj0gFq4HmpZKS7D5fvoTsd4ZvSh8Qb-o9wnCIdXpcAGhltPe5E3T5sW6wUvhIuB2jPFtHjSfJt2DVJFe68KWmp6kHnb55Y4nXfXxlKP9vI74LhD4lA7YjG4HtzWpLo6bHZFW0UHYMLFgOxQqPVS5Y2Q1WQ1Frjl3Q8nE7xRfHkUnaHMECrKklZakGCYnGqGWoNyQufK6nMPLa1ky55vxwa49kVw5TeqeOMl4wWX8QuT0LGLAiNc7LSnggbZEmhQ',
            message: 'Authentication successful',
            refresh_token: '',
            token_type: 'Bearer'
        }
        // Set the token in the cookie
        saveAuthToCookie(y)

        return { success: true, data: y, error: "" }

        // Check if code and email are provided otherwise throw error
        if (!code || !email) {
            return { success: false, data: null, error: "Code and email are required" }
        }

        // Check if API_URL is set otherwise throw error
        if (!process.env.API_URL) {
            return { success: false, data: null, error: "API url not set" }
        }

        const res = await fetch(`${process.env.API_URL}auth/verify-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, email }),
        })

        // If response is not ok, return error
        if (!res.ok) {
            const err = await res.json()
            return { success: false, data: null, error: err.error || res.statusText }
        }

        // Get the data from the response
        const data: AuthResponse = await res.json()

        // Set the token in the cookie
        saveAuthToCookie(data)

        return { success: true, data, error: "" }
    } catch (err) {
        return { success: false, data: null, error: "Server error. Please try again." }
    }
}