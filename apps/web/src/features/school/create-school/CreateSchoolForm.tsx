"use client"

import React from "react"
import { Loader2Icon } from "lucide-react"
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
import { School } from "../types"
import {
    createSchoolSchema,
    type CreateSchoolSchema,
} from "./form-schema"

interface CreateSchoolProps {
    onSubmitSchool(School: School): Promise<any>
}

export function CreateSchoolForm({ onSubmitSchool }: CreateSchoolProps) {
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
            institute_id: "",
            education_system_id: "",
            contact_user_id: "",
        },
    })


    async function submitFunc(i: CreateSchoolSchema) {
        // Set isSubmitting to true to disable the submit button and show the loader
        setIsSubmitting(true)
        const school = await onSubmitSchool({
            name: i.name,
            description: i.description,
            address: i.address,
            website: i.website || "",
            institute_id: i.institute_id,
            education_system_id: i.education_system_id,
            contact_user_id: i.contact_user_id,
        })
        console.log('school--------', school)
        setIsSubmitting(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="name">School Name</FormLabel>
                            <FormControl>
                                <Input id="name" placeholder="School Name" {...field} />
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
                    name="address"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <FormControl>
                                <Input id="address" placeholder="Address" {...field} />
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