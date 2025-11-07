"use client"

import { z } from "zod"
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
    createLearningInstituteSchema,
} from "../../form-schema"
import { useOnboardLearningInstituteStore } from "../../store"
import { EducationSystemComboBox } from "@/features/education-system/components/education-system-combo-box"
import { TypographyH1 } from "@/shared/components/typography"

const createSchoolSchema = createLearningInstituteSchema.pick({
    school_education_system_id: true,
    school_name: true,
    school_description: true,
    school_address: true,
});

export type CreateSchoolSchema = z.infer<typeof createSchoolSchema>

export function CreateSchoolForm() {
    // Get school name from store
    const onboardLearningInstitute = useOnboardLearningInstituteStore((store) => store.onboardLearningInstitute)
    // Set school name in store
    const setSchoolDetail = useOnboardLearningInstituteStore((store) => store.setSchoolDetail)
    // Initialize the form with the resolver and default values
    const form = useForm<CreateSchoolSchema>({
        resolver: zodResolver(createSchoolSchema),
        defaultValues: {
            school_education_system_id: onboardLearningInstitute.school_education_system_id,
            school_name: onboardLearningInstitute.school_name,
            school_description: onboardLearningInstitute.school_description,
            school_address: onboardLearningInstitute.school_address,
        },
    })

    // Submit function
    function submitFunc(i: CreateSchoolSchema) {
        setSchoolDetail(i as any)
    }

    return (
        <div className="w-1/2">
            <TypographyH1 className="mb-12 text-left">School detail</TypographyH1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                    <FormField
                        control={form.control}
                        name="school_name"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="school_name">Name</FormLabel>
                                <FormControl>
                                    <Input id="school_name" placeholder="Add name of your learning school" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="school_description"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="school_description">Description</FormLabel>
                                <FormControl>
                                    <Input id="school_description" placeholder="Add a short description of your school" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="school_education_system_id"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="school_education_system_id">Education System</FormLabel>
                                <FormControl>
                                    <EducationSystemComboBox
                                        id="school_education_system_id"
                                        initValue={field.value}
                                        onSetValue={(educationSystem) => {
                                            form.setValue("school_education_system_id", educationSystem.id)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="school_address"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="school_address">Address</FormLabel>
                                <FormControl>
                                    <Input id="school_address" placeholder="Add physical address of the school" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" id="submit-create-school" className="min-w-[130px]">
                        Next
                    </Button>
                </form>
            </Form>
        </div>
    )
}