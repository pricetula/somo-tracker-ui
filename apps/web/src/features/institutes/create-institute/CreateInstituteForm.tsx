"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import {
    createInstituteSchema,
    type CreateInstituteSchema,
} from "./form-schema"
import { ActionResponse } from "@/shared/types/actions"
import { Institute } from "../types"

interface CreateInstituteProps {
    onSubmit(institute: CreateInstituteSchema): Promise<ActionResponse<Institute | null>>
}

export function CreateInstituteForm({ onSubmit }: CreateInstituteProps) {
    const router = useRouter()

    // State to be set to true when email is being sent or verifying code
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Initialize the form with the resolver and default values
    const form = useForm<CreateInstituteSchema>({
        resolver: zodResolver(createInstituteSchema),
        defaultValues: {
            name: "",
            description: "",
            website: "",
        },
    })


    async function submitFunc(i: CreateInstituteSchema) {
        // Set isSubmitting to true to disable the submit button and show the loader
        setIsSubmitting(true)
        const { error } = await onSubmit(i)
        setIsSubmitting(false)
        if (error) {
            console.error("Error creating institute:", error)
            return
        }
        router.push("/")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="name">Institute Name</FormLabel>
                            <FormControl>
                                <Input id="name" placeholder="Institute Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <FormControl>
                                <Input id="description" placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="website">Website</FormLabel>
                            <FormControl>
                                <Input id="website" placeholder="Website" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" id="submit-signin" disabled={isSubmitting} className="min-w-[130px]">
                    Submit
                </Button>
            </form>
        </Form>
    )
}