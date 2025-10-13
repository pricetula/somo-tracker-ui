"use client"

import React from "react"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
} from "@/shared/components/ui/form"
import { Button } from "@/shared/components/ui/button"
import { useMeQuery } from "@/features/me/hooks/useMeQuery"
import { useCreateSchoolMutation } from "../../hooks/use-create-school-mutation"
import { CreateSchoolFields } from "./CreateSchoolFields"
import {
    createSchoolSchema,
    type CreateSchoolSchema,
} from "./form-schema"

export function CreateSchoolForm() {
    const { data: me } = useMeQuery()
    const { mutate, isPending } = useCreateSchoolMutation()

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
        if (!me?.user?.institute_id) return
        const instituteToCreate = {
            name: i.name,
            description: i.description,
            address: i.address,
            website: i.website as string,
            education_system_id: i.education_system_id,
            school_type: "LEARNING_INSTITUTE",
            institute_id: me.user.institute_id
        }
        mutate(instituteToCreate)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="p-4 w-[90%] max-w-[500px] space-y-6">
                <CreateSchoolFields form={form} />
                <Button type="submit" id="submit-create-school" disabled={isPending} className="min-w-[130px]">
                    {
                        isPending
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