"use client"

import React from "react"
import { useForm } from "react-hook-form"
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
    createAdminSchema,
    type CreateAdminSchema,
} from "./form-schema"
import { ActionResponse } from "@/shared/types/actions"
import { User } from "@/shared/types/user"

interface CreateAdminProps {
    onSubmit(i: CreateAdminSchema): Promise<ActionResponse<User | null>>
    onSuccess(): void
}

export function CreateAdminForm({ onSubmit, onSuccess }: CreateAdminProps) {
    // State to be set to true when email is being sent or verifying code
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Initialize the form with the resolver and default values
    const form = useForm<CreateAdminSchema>({
        resolver: zodResolver(createAdminSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
            phone: "",
            photo_url: "",
            external_auth_id: "",
        },
    })


    async function submitFunc(i: CreateAdminSchema) {
        // Set isSubmitting to true to disable the submit button and show the loader
        setIsSubmitting(true)
        await onSubmit(i)
        setIsSubmitting(false)
        onSuccess()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input id="email" placeholder="Your institute Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="first_name">First Name</FormLabel>
                            <FormControl>
                                <Input id="first_name" placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="last_name">Last Name</FormLabel>
                            <FormControl>
                                <Input id="last_name" placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="phone">Phone</FormLabel>
                            <FormControl>
                                <Input id="phone" placeholder="Phone (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="photo_url"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="photo_url">Photo URL</FormLabel>
                            <FormControl>
                                <Input id="photo_url" placeholder="Photo URL (optional)" {...field} />
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