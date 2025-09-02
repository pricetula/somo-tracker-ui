"use client"

import React from "react"
import { X, Plus, Loader2Icon } from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form"
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
import { Separator } from "@/shared/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { CreateInvitation } from "../../types"
import { CreateInvitationResponse } from "../../services/create-invitation"
import {
    invitationsSchema,
    type InvitationsSchema,
} from "./form-schema"

interface CreateInvitationFormProps {
    createInvitation(d: CreateInvitation): Promise<CreateInvitationResponse>
}

export function CreateInvitationForm({ createInvitation }: CreateInvitationFormProps) {
    // Initialize the form with the resolver and default values
    // Default to at least one email field
    const form = useForm<InvitationsSchema>({
        resolver: zodResolver(invitationsSchema),
        // Initialize with one empty email field
        defaultValues: {
            emails: [{ value: "" }],
        },
        // Validate on change for better user experience
        mode: "onChange",
    })

    // useFieldArray to manage dynamic email fields
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "emails",
    })

    // Get form state to check for submission status
    const { isSubmitting } = form.formState

    const numberOfEmailsToInvite = (form.getValues("emails") || []).length

    async function submitFunc(data: InvitationsSchema) {
        // Extract only the email values from the submitted data
        const email_addresses = data.emails.map(emailField => emailField.value)
        // Pass the extracted email values to your onSubmit handler
        // await createInvitation({ email_addresses })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-2">
                {fields.map((field, index) => (
                    <FormField
                        key={field.id}
                        control={form.control}
                        name={`emails.${index}.value`}
                        render={({ field: emailField }) => (
                            <FormItem className="mb-4">
                                <FormLabel htmlFor={`email-${index}`}>User Email</FormLabel>
                                <FormControl>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id={`email-${index}`}
                                            type="email"
                                            placeholder={`Email ${index + 1}`}
                                            {...emailField}
                                            className="flex-grow"
                                        />
                                        {fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="destructive"
                                                onClick={() => remove(index)}
                                                className="shrink-0"
                                            >
                                                <X />
                                            </Button>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            size="icon"
                            onClick={() => append({ value: "" })}
                            variant="ghost"
                        >
                            <Plus />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add new user to invite</p>
                    </TooltipContent>
                </Tooltip>

                <Separator />
                <Button type="submit" id="submit-signin" disabled={isSubmitting} className="min-w-[130px]">
                    {isSubmitting && (<Loader2Icon className="animate-spin" />)}
                    {
                        numberOfEmailsToInvite === 1
                            ? `Invit${isSubmitting ? "ing" : "e"} User`
                            : `Invit${isSubmitting ? "ing" : "e"} ${numberOfEmailsToInvite} Users`
                    }
                </Button>
            </form>
        </Form>
    )
}