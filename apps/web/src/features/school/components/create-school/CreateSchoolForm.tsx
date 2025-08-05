"use client"

import React from "react"
import { toast } from "sonner"
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
import { ActionResponse } from "@/shared/types/actions"
import { EducationSystemComboBox } from "@/features/education-system/components/education-system-combo-box"
import { School } from "../../types"
import {
    createSchoolSchema,
    type CreateSchoolSchema,
} from "./form-schema"

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
                <FormField
                    control={form.control}
                    name="education_system_id"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel htmlFor="education_system_id">Website</FormLabel>
                            <FormControl>
                                <EducationSystemComboBox
                                    id="education_system_id"
                                    initValue={field.value}
                                    onSetValue={(educationSystem) => {
                                        form.setValue("education_system_id", educationSystem.id)
                                    }}
                                />
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