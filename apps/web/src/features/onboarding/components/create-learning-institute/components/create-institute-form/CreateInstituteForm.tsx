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
import { TypographyH1 } from "@/shared/components/typography"

const createInstituteSchema = createLearningInstituteSchema.pick({
    institute_name: true,
});

export type CreateInstituteSchema = z.infer<typeof createInstituteSchema>

export function CreateInstituteForm() {
    // Get institute name from store
    const storeInstituteName = useOnboardLearningInstituteStore((store) => store.onboardLearningInstitute.institute_name)
    // Set institute name in store
    const setInstituteName = useOnboardLearningInstituteStore((store) => store.setInstituteName)
    // Initialize the form with the resolver and default values
    const form = useForm<CreateInstituteSchema>({
        resolver: zodResolver(createInstituteSchema),
        defaultValues: {
            institute_name: storeInstituteName,
        },
    })

    // Submit function
    function submitFunc(i: CreateInstituteSchema) {
        setInstituteName(i.institute_name)
    }

    return (
        <div className="w-1/2">
            <TypographyH1 className="mb-12 text-left">Institute detail</TypographyH1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                    <FormField
                        control={form.control}
                        name="institute_name"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="institute_name">Name</FormLabel>
                                <FormControl>
                                    <Input id="institute_name" placeholder="Add name of your learning institute" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" id="submit-create-institute" className="min-w-[130px]">
                        Next
                    </Button>
                </form>
            </Form>
        </div>
    )
}