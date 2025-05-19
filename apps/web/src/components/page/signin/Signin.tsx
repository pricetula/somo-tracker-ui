"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SigninSchema, signinSchema } from "@/lib/schemas/signin"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface SigninProps {
    signInWithEmail: (email: string) => Promise<void>
}

export function Signin({ signInWithEmail }: SigninProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<SigninSchema>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
        },
    })

    async function submitFunc({ email }: SigninSchema) {
        setIsSubmitting(true)
        await signInWithEmail(email)
        setIsSubmitting(false)
        router.push("/institute")
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>Submit</Button>
                </form>
            </Form>
        </div>
    )
}
