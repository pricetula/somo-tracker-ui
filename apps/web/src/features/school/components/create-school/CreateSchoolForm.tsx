"use client"

import React from "react"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
} from "@/shared/components/ui/form"
import { Button } from "@/shared/components/ui/button"
import { useCreateSchool } from "../../hooks/create-school"
import { CreateSchoolFields } from "./CreateSchoolFields"
import {
    createSchoolSchema,
    type CreateSchoolSchema,
} from "./form-schema"

export function CreateSchoolForm() {
    const { create, isLoading } = useCreateSchool()

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
        create(i)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                <CreateSchoolFields form={form} />
                <Button type="submit" id="submit-create-school" disabled={isLoading} className="min-w-[130px]">
                    {
                        isLoading
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