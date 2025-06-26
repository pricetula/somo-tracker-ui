"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useToast } from "@/shared/hooks/use-toast"
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp"
import { Button } from "@/shared/components/ui/button"
import { signinSchema, type SigninSchema } from "./form-schema"

interface SigninProps {
    sendOtpCodeToEmail: (email: string) => Promise<{
        success: boolean;
        data: any;
        error: string;
    }>
    verifyOtpCode: (p: { code: string, email: string }) => Promise<{
        success: boolean;
        data: any;
        error: string;
    }>
}

export function SigninForm({ verifyOtpCode, sendOtpCodeToEmail }: SigninProps) {
    // State to be set to true when email is being sent or verifying code
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Initialize the form with the resolver and default values
    const form = useForm<SigninSchema>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            code: "",
            emailSent: false,
        },
    })
    // Get the redirect URL from the search params
    const searchParams = useSearchParams()
    // Get the router
    const router = useRouter()
    // Watch for changes to emailSent which when true, we show the code input
    const emailSent = form.watch("emailSent")
    // Use toast to show success and error messages
    const { toast } = useToast()

    async function submitFunc({ email, code, emailSent }: SigninSchema) {
        // Set isSubmitting to true to disable the submit button and show the loader
        setIsSubmitting(true)

        // If email has been sent and code is provided, verify the code
        if (emailSent && code) {
            // Verify the code using the verifyOtpCode action
            const resp = await verifyOtpCode({ code, email })

            // If verification fails, show error message and return
            if (!resp.success) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: resp.error,
                })
                setIsSubmitting(false)
                return
            }

            // If verification succeeds, show success message and redirect to the redirect URL
            toast({
                variant: "default",
                title: "Success",
                description: "You are now logged in.",
            })

            // Get the redirect URL from the search params if it exists
            const redirect = searchParams.get('redirect');

            // If redirect URL exists, redirect to it, otherwise redirect to dashboard page
            if (redirect) {
                router.push(redirect);
            } else {
                router.push('/');
            }

            // Reset the form and return from function
            form.reset()
            return
        }

        // If email has not been sent, send the OTP code to the email
        const resp = await sendOtpCodeToEmail(email)

        // If sending email fails, show error message and return
        if (!resp.success) {
            toast({
                variant: "destructive",
                title: "Error",
                description: resp.error,
            })
            setIsSubmitting(false)
            return
        }

        // If sending email succeeds, show success message and set emailSent to true
        form.setValue("emailSent", true)
        setIsSubmitting(false)
        toast({
            variant: "default",
            title: "Link sent",
            description: "Check your email to sign-in.",
        })
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

                {
                    emailSent && (
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verify code</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                }

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