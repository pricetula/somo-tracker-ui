"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
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
import Image from "next/image"

interface SigninProps {
    signInWithEmail: (email: string) => Promise<void>
}

export function Signin({ signInWithEmail }: SigninProps) {
    const { toast } = useToast()
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
        toast({
            variant: "default",
            title: "Link sent",
            description: "Check your email to sign-in.",
        })
        form.reset()
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
                                    <Input placeholder="Where we will send your magic link to sign-in" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>{`Send${isSubmitting ? 'ing' : ''}`}</Button>
                </form>
            </Form>
        </div>
    )
}
