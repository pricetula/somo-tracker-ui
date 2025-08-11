"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp"
import { Button } from "@/shared/components/ui/button"
import { sendOtpCodeToEmail } from "../../services/send-otp-code-to-email"
import { verifyOtpCode } from "../../services/verify-otp-code"
import { signinSchema, type SigninSchema } from "./form-schema"

export function SigninForm() {
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
    async function submitFunc({ email, code, emailSent }: SigninSchema) {
        // Set isSubmitting to true to disable the submit button and show the loader
        setIsSubmitting(true)

        // If email has been sent and code is provided, verify the code
        if (emailSent && code) {
            // Verify the code using the verifyOtpCode action
            const resp = await verifyOtpCode({ code, email })

            // If verification fails, show error message and return
            if (!resp.success) {
                toast.error(resp.error)
                if (resp.error.includes("verification code has expired")) {
                    form.reset()
                    form.setValue("emailSent", false)
                }
                setIsSubmitting(false)
                return
            }

            // If verification succeeds, show success message and redirect to the redirect URL
            toast("You are now logged in.")

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
            toast.error(resp.error)
            setIsSubmitting(false)
            return
        }

        // If sending email succeeds, show success message and set emailSent to true
        form.setValue("emailSent", true)
        setIsSubmitting(false)
        toast("Check your email to sign-in.")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[300px] h-full flex items-center justify-center">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input id="email" placeholder="Email for OTP Sign-in" {...field} />
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
                                    <FormLabel htmlFor="code">Verify code</FormLabel>
                                    <FormControl>
                                        <InputOTP id="code" maxLength={6} {...field}>
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

                <Button type="submit" id="submit-signin" disabled={isSubmitting} className="min-w-[130px]">
                    {
                        isSubmitting
                            ? (
                                <span className="flex items-center gap-1">
                                    <Loader2Icon className="animate-spin" />
                                    <span>{emailSent ? "Verifying" : "Signing in"}</span>
                                </span>
                            )
                            : <span>{emailSent ? "Verify" : "Sign in"}</span>
                    }
                </Button>
            </form>
        </Form>
    )
}