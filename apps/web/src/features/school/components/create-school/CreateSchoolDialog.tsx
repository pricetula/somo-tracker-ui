"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
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

export function CreateSchoolDialog() {
    // State to be set to true when email is being sent or verifying code
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const router = useRouter()

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

        const response = await fetch('/api/school', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(i)
        })

        setIsSubmitting(false)

        if (!response.ok) {
            const error = await response.text()
            toast.error(error || response.status)
            return
        }

        const data = await response.json()
        console.log("School created", data)
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
            </DialogContent>
        </Dialog>
    )
}