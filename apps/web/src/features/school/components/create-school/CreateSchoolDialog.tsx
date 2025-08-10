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
import { useApiRequest } from "@/shared/hooks/use-api-request"
import { useSchoolsStore } from "../../store"

export function CreateSchoolDialog() {
    const router = useRouter()

    const addSchool = useSchoolsStore((s) => s.addSchool)

    const apiRequest = useApiRequest()

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
        apiRequest.execute(
            () => fetch('/api/school', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(i)
            }),
            {
                onSuccess: (data) => {
                    addSchool(data)
                    setActiveSchool(data.id)
                },
                onError: () => {
                    form.reset()
                }
            }
        )
    }

    function setActiveSchool(active_school_id: string) {
        apiRequest.execute(
            () => fetch('/api/me/active-school', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ active_school_id })
            }),
            {
                onSuccess: (data) => {
                    router.refresh()
                },
                onError: () => {
                    form.reset()
                }
            }
        )
    }

    function handleOnOpenChange(open: boolean) {
        if (!open) {
            router.back()
        }
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={handleOnOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create School</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new school
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                        <CreateSchoolFields form={form} />
                        <Button type="submit" id="submit-create-school" disabled={apiRequest.isLoading} className="min-w-[130px]">
                            {
                                apiRequest.isLoading
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