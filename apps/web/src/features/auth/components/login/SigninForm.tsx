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
import { signinSchema, type SigninSchema } from "./form-schema"

export function SigninForm() {
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<SigninSchema>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
        },
    })

    async function submitFunc({ email }: SigninSchema) {
        setIsSubmitting(true)
        await fetch(`/api/news?keywords=${encodeURIComponent(email)}`);
        setIsSubmitting(false)
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email which we will send OTP code to sign in" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting} className="min-w-[130px]">
                    {
                        isSubmitting
                            ? (
                                <span className="flex items-center gap-1">
                                    <Loader2Icon className="animate-spin" />
                                    <span>Signing in</span>
                                </span>
                            )
                            : <span>Sign in</span>
                    }
                </Button>
            </form>
        </Form>
    )
}