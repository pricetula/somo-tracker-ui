"use client"

import { z } from "zod"
import React, { useEffect } from "react"
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
import { TypographyH1 } from "@/shared/components/typography"
import { Spinner } from "@/shared/components/ui/spinner"
import { useCreateOnboardLearningInstituteMutation } from "@/features/onboarding/hooks/use-create-onboard-learning-institute-muatation"
import {
    createLearningInstituteSchema,
} from "../../form-schema"
import { useOnboardLearningInstituteStore } from "../../store"

const createAdminSchema = createLearningInstituteSchema.pick({
    user_email: true,
    user_phone: true,
    user_first_name: true,
    user_last_name: true,
    user_photo_url: true,
});

export type CreateAdminSchema = z.infer<typeof createAdminSchema>

export function CreateAdminForm() {
    const router = useRouter()
    const { mutate, isPending, isSuccess } = useCreateOnboardLearningInstituteMutation()
    // Get school name from store
    const onboardLearningInstitute = useOnboardLearningInstituteStore((store) => store.onboardLearningInstitute)
    // Set clear state
    const clear = useOnboardLearningInstituteStore((store) => store.clear)
    // Initialize the form with the resolver and default values
    const form = useForm<CreateAdminSchema>({
        resolver: zodResolver(createAdminSchema),
        defaultValues: {
            user_email: onboardLearningInstitute.user_email,
            user_phone: onboardLearningInstitute.user_phone,
            user_first_name: onboardLearningInstitute.user_first_name,
            user_last_name: onboardLearningInstitute.user_last_name,
            user_photo_url: onboardLearningInstitute.user_photo_url,
        },
    })

    useEffect(() => {
        if (isSuccess) {
            router.push("/")
            clear()
        }
    }, [isSuccess])

    // Submit function
    function submitFunc(i: CreateAdminSchema) {
        mutate({
            ...onboardLearningInstitute,
            ...i
        })
    }

    return (
        <div className="w-1/2">
            <TypographyH1 className="mb-12 text-left">Admin details</TypographyH1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                    <FormField
                        control={form.control}
                        name="user_email"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="user_email">Email</FormLabel>
                                <FormControl>
                                    <Input id="user_email" type="email" placeholder="Add your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="user_phone"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="user_phone">Phone</FormLabel>
                                <FormControl>
                                    <Input id="user_phone" placeholder="Add your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="user_first_name"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="user_first_name">First name</FormLabel>
                                <FormControl>
                                    <Input id="user_first_name" placeholder="Add your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="user_last_name"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor="user_last_name">Last name</FormLabel>
                                <FormControl>
                                    <Input id="user_last_name" placeholder="Add your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" id="submit-create-school" className="min-w-[130px]" disabled={isPending}>
                        {
                            isPending
                                ? (
                                    <>
                                        <Spinner />
                                        <span className="">Creating...</span>
                                    </>
                                )
                                :
                                (
                                    <span>Create</span>
                                )
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}