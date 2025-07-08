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
    contactUserSchema,
    type ContactUserSchema,
} from "./form-schema"

interface CreateContactUserProps {
    onSubmitContactUser: (contactUser: ContactUserSchema) => void
}

export function CreateContactUserForm({ onSubmitContactUser }: CreateContactUserProps) {
    // Initialize the form with the resolver and default values
    const form = useForm<ContactUserSchema>({
        resolver: zodResolver(contactUserSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
            phone: "",
            photo_url: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitContactUser)} className="w-[90%] max-w-[500px] space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input id="email" placeholder="Email for OTP Sign-in" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-4 mb-4">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
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
                            <FormItem className="w-1/2">
                                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                                <FormControl>
                                    <Input id="last_name" placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-4">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel htmlFor="phone">Phone</FormLabel>
                                <FormControl>
                                    <Input id="phone" placeholder="Phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="photo_url"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel htmlFor="photo_url">Photo URL</FormLabel>
                                <FormControl>
                                    <Input id="photo_url" placeholder="Photo URL" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" id="submit-contact-user" className="min-w-[130px]">
                    Submit
                </Button>
            </form>
        </Form>
    )
}