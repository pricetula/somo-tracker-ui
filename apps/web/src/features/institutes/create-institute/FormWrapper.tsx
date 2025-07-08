"use client"

import React from "react"
import { useToast } from "@/shared/hooks/use-toast"
import { CreateContactUserForm } from "./CreateContactUserForm"
import { CreateInstituteForm } from "./CreateInstituteForm"
import { ContactUserSchema, CreateInstituteSchema } from "./form-schema"
import { Institute } from "@/features/institutes/types"

interface FormWrapperProps {
    createInstitute(i: Institute): Promise<{
        success: boolean;
        data: any;
        error: string;
    }>
}

export function FormWrapper({ createInstitute }: FormWrapperProps) {
    // State to be set to true when email is being sent or verifying code
    const [contactUser, setContactUser] = React.useState<ContactUserSchema | null>(null)
    // Use toast to show success and error messages
    const { toast } = useToast()

    async function submitInstitute(institute: CreateInstituteSchema): Promise<void> {
        const resp = await createInstitute({
            ...institute,
            contact_user: contactUser,
        } as Institute)
        if (!resp.success) {
            toast({
                variant: "destructive",
                title: "Error",
                description: resp.error,
            })
            return
        }
        toast({
            variant: "default",
            title: "Success",
            description: "Institute created.",
        })
    }

    return (
        !contactUser
            ? (
                <CreateContactUserForm
                    onSubmitContactUser={setContactUser}
                />
            )
            : (
                <CreateInstituteForm
                    onSubmitInstitute={submitInstitute}
                />
            )
    )
}