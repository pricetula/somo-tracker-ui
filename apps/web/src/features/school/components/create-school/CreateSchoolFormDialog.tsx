"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
} from "@/shared/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { createSchoolSchema, CreateSchoolSchema } from "@/features/school/components/create-school/form-schema"
import { Button } from "@/shared/components/ui/button"
import { CreateSchoolFields } from "@/features/school/components/create-school/CreateSchoolFields"
import { useCreateSchoolMutation } from "../../hooks/use-create-school-mutation"

export function CreateSchoolFormDialog() {
    // Use next router
    const router = useRouter()
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
        const instituteToCreate = {
            name: i.name,
            description: i.description,
            address: i.address,
            website: i.website as string,
            education_system_id: i.education_system_id,
            school_type: "LEARNING_INSTITUTE",
        }
        mutate(instituteToCreate)
        router.back()
    }

    function handleOnOpenChange(open: boolean) {
        if (!open) {
            router.back()
        }
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={handleOnOpenChange}>
            <DialogContent className="p-8">
                <DialogHeader className="mb-8">
                    <DialogTitle>Create School</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new school
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitFunc)} className="space-y-6">
                        <CreateSchoolFields form={form} />
                        <Button type="submit" id="submit-create-school" disabled={isPending} className="mt-6 min-w-[130px]">
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
            </DialogContent>
        </Dialog>
    )
}