"use client"

import React from "react"
import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { EducationSystemComboBox } from "@/features/education-system/components/education-system-combo-box"
import {
    type CreateSchoolSchema,
} from "./form-schema"

type CreateSchoolFormProps = UseFormReturn<CreateSchoolSchema>

interface CreateSchoolProps {
    form: CreateSchoolFormProps
}

export function CreateSchoolFields({ form }: CreateSchoolProps) {
    return (
        <>
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
        </>
    )
}