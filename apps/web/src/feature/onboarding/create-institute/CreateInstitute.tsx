"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { type CreateInstituteSchema, createInstituteSchema } from "@/lib/schemas/create-institute"
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
import { Separator } from "@/components/ui/separator"
import { Institute } from "@/types/institute"

interface Props {
    createInstitute(i: Institute): Promise<any>;
    tokenPayload: {
        email: string;
        picture: string;
    }
}

export function CreateInstitute({ createInstitute, tokenPayload }: Props) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const form = useForm<CreateInstituteSchema>({
        resolver: zodResolver(createInstituteSchema),
        defaultValues: {
            name: "",
            description: "",
            address: "",
            website: "",
            contactUserEmail: tokenPayload.email,
            contactUserPhone: "",
            contactUserFirstName: "",
            contactUserLastName: "",
            contactUserPhotoUrl: tokenPayload.picture,
        },
    })

    async function submitFunc(data: CreateInstituteSchema) {
        setIsSubmitting(true)
        const resp = await createInstitute({
            name: data.name,
            description: data.description,
            address: data.address,
            website: data.website || '',
            contact_user: {
                email: data.contactUserEmail,
                phone: data.contactUserPhone,
                first_name: data.contactUserFirstName,
                last_name: data.contactUserLastName,
                photo_url: data.contactUserPhotoUrl,
            }
        })
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
            description: "Institute created.",
        })
        setIsSubmitting(false)
        form.reset()
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-4">
                    <section className="flex flex-col gap-2">
                        <header>
                            <h2 className="text-lg font-bold">Contact</h2>
                        </header>
                        <Separator className="mb-2" />
                        <FormField
                            control={form.control}
                            name="contactUserEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email of the contact user" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactUserPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone of the contact user" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="contactUserFirstName"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First name of the contact user" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactUserLastName"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last name of the contact user" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </section>
                    <section className="flex flex-col gap-2 mb-2">
                        <header>
                            <h2 className="text-lg font-bold">Institute</h2>
                        </header>
                        <Separator className="mb-2" />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name of the institute" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Description of the institute" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address of the institute" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Website of the institute" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {`Create${isSubmitting ? 'ing' : ''}`}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
