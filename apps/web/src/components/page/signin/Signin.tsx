"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
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
import { ServerResponse } from "@/lib/types"

interface SigninProps {
    onSubmit(values: SigninSchema): Promise<ServerResponse>
}

export function Signin({ onSubmit }: SigninProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<SigninSchema>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function submitFunc(values: SigninSchema) {
        setIsSubmitting(true)
        const resp = await onSubmit(values)
        setIsSubmitting(false)
        if (resp.errorCode && resp.message) {
            setError(resp.message)
            return
        }
        router.push("/institute")
    }

    function setError(description: string) {
        toast({
            description,
            variant: "destructive",
            title: "Failed to sign in",
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="space-y-8">
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </form>
        </Form>
    )
}
