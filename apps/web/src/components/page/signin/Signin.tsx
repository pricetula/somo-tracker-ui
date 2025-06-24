"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

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

export function Signin({ verifyOtpCode, sendOtpCodeToEmail }: SigninProps) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const form = useForm<SigninSchema>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            code: "",
            emailSent: false,
        },
    })
    // In your signin success handler
    const searchParams = useSearchParams()
    const router = useRouter()
    const emailSent = form.watch("emailSent")


    async function submitFunc({ email, code, emailSent }: SigninSchema) {
        setIsSubmitting(true)
        if (emailSent && code) {
            const resp = await verifyOtpCode({ code, email })
            if (!resp.success) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: resp.error,
                })
                setIsSubmitting(false)
                return
            }
            toast({
                variant: "default",
                title: "Success",
                description: "You are now logged in.",
            })
            const redirect = searchParams.get('redirect');

            // After successful signin
            if (redirect) {
                router.push(redirect);
            } else {
                router.push('/');
            }
            form.reset()
            return
        }
        const resp = await sendOtpCodeToEmail(email)
        if (!resp.success) {
            toast({
                variant: "destructive",
                title: "Error",
                description: resp.error,
            })
            setIsSubmitting(false)
            return
        }
        form.setValue("emailSent", true)
        setIsSubmitting(false)
        toast({
            variant: "default",
            title: "Link sent",
            description: "Check your email to sign-in.",
        })
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
                    <Button type="submit" disabled={isSubmitting}>{`Send${isSubmitting ? 'ing' : ''}`}</Button>
                </form>
            </Form>
        </div>
    )
}
