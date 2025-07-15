"use client"

import React from "react"
import { useRouter } from "next/navigation"
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
import { useMeStore } from "@/features/me/store"
import { ActionResponse } from "@/shared/types/actions"
import { School } from "../types"
import {
    createSchoolSchema,
    type CreateSchoolSchema,
} from "./form-schema"
import { useSchoolsStore } from "../store"
import { EducationSystemComboBox } from "@/features/education-system/education-system-combo-box"

interface CreateSchoolProps {
    onSubmit(School: CreateSchoolSchema): Promise<ActionResponse<School | null>>
}

export function CreateSchoolForm({ onSubmit }: CreateSchoolProps) {
    // Get the router instance to navigate after form submission
    const router = useRouter()

    // Get the function to add a school to the store
    const addSchool = useSchoolsStore((s) => s.addSchool)

    // State to be set to true when email is being sent or verifying code
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Get the current institute user from the store
    const { me } = useMeStore()

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

    React.useEffect(() => {
        if (me?.institute?.id) {
            // If the user is logged in and has an institute, set the institute_id
            form.setValue("name", me.institute.name)
            form.setValue("description", me.institute.description)
            form.setValue("address", me.institute.address)
            form.setValue("website", me.institute.website)
        }
    }, [me])

    async function submitFunc(i: CreateSchoolSchema) {
        // Set isSubmitting to true to disable the submit button and show the loader
        setIsSubmitting(true)
        const school = await onSubmit({
            name: i.name,
            description: i.description,
            address: i.address,
            website: i?.website || '',
            education_system_id: i.education_system_id,
        })
        setIsSubmitting(false)
        if (school.data) {
            addSchool(school.data)
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