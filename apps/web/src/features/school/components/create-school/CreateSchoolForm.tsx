"use client"

import React from "react"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
} from "@/shared/components/ui/form"
import { Button } from "@/shared/components/ui/button"
import { ActionResponse } from "@/shared/types/actions"
import { School } from "../../types"
import {
    createSchoolSchema,
    type CreateSchoolSchema,
} from "./form-schema"
import { CreateSchoolFields } from "./CreateSchoolFields"

interface CreateSchoolProps {
    createSchool(School: CreateSchoolSchema): Promise<ActionResponse<School | null>>
}

export function CreateSchoolForm({ createSchool }: CreateSchoolProps) {
    // State to be set to true when email is being sent or verifying code
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Initialize the form with the resolver and default values
    const form = useForm<CreateSchoolSchema>({
        resolver: zodResolver(createSchoolSchema),
        defaultValues: {
            name: "",
            description: "",
            address: "",
            website: "",
            education_system_id: "",
        },
    })

    async function submitFunc(i: CreateSchoolSchema) {
        // Set isSubmitting to true to disable the submit button and show the loader
        setIsSubmitting(true)

        // Run create school action to create school
        const { error } = await createSchool({
            name: i.name,
            description: i.description,
            address: i.address,
            website: i?.website || '',
            education_system_id: i.education_system_id,
        })

        // Check if an error occurs then display as toast
        if (error) {
            // Set isSubmitting to false after getting error
            setIsSubmitting(false)

            // Reset form fields
            form.reset()

            // Show error message on a toast
            toast(error)
            return
        }

        // If creation was successfull then redirect to dashboard page
        window.location.href = "/"
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                <CreateSchoolFields form={form} />
                <Button type="submit" id="submit-create-school" disabled={isSubmitting} className="min-w-[130px]">
                    {
                        isSubmitting
                            ? (
                                <span className="flex items-center gap-1">
                                    <Loader2Icon className="animate-spin" />
                                    <span>Creating</span>
                                </span>
                            )
                            : "Create"
                    }
                </Button>
            </form>
        </Form>
    )
}