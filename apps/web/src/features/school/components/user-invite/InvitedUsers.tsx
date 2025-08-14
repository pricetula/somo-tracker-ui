import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react"
import { Trash2 } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { RoleSelector } from "@/shared/components/role-selector"
import { Role } from "@/shared/types/user"
import { ExtractEmailsFromFile } from "./ExtractEmailsFromFile"
import { createInvitation } from "@/features/invitations/services/create-invitation"

interface InvitedUsersProps {
    role: Role
}

export const InvitedUsers = forwardRef(({ role }: InvitedUsersProps, ref) => {
    const [selectedRows, setSelectedRows] = useState(new Set())
    const [extractedEmails, setExtractedEmails] = useState(new Map())

    const extractedEmailsList = useMemo(() => {
        const keys = Array.from(extractedEmails.keys()).reverse()
        return keys.map(key => {
            const v = extractedEmails.get(key)
            return ({
                id: key,
                ...v
            })
        })
    }, [extractedEmails])

    const isAllSelected = useMemo(() => {
        return extractedEmailsList.length > 0 && selectedRows.size === extractedEmailsList.length
    }, [extractedEmailsList.length, selectedRows.size])

    const handleDeleteSingle = useCallback((id: string) => {
        setExtractedEmails(prev => {
            const newMap = new Map(prev)
            newMap.delete(id)
            return newMap
        })
        setSelectedRows(prev => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
        })
    }, [])

    const handleSelectRow = useCallback((id: string, checked: boolean) => {
        setSelectedRows(prev => {
            const newSet = new Set(prev)
            if (checked) {
                newSet.add(id)
            } else {
                newSet.delete(id)
            }
            return newSet
        })
    }, [])

    const handleSelectAll = useCallback((checked: boolean) => {
        if (checked) {
            setSelectedRows(new Set(extractedEmailsList.map(email => email)))
        } else {
            setSelectedRows(new Set())
        }
    }, [extractedEmailsList])

    const handleAddRow = useCallback(() => {
        setExtractedEmails(prev => {
            const newMap = new Map(prev)
            newMap.set(crypto.randomUUID(), { email: "", role: role })
            return newMap
        })
    }, [role])

    // Allow calling handle submit from ref
    useImperativeHandle(ref, () => ({
        handleSubmit
    }))

    function getInitials(email: string) {
        // Check if email has been set
        if (!email?.length) return ""

        // Split emails at @ char
        const splitEmail = email.split("@")

        // If split email length is less than 2 then return first char of email
        if (splitEmail.length < 2 && email[0]) return email[0].toUpperCase()

        // If split email length is 2 then return first char of first or last name
        const firstName = splitEmail[0]
        const lastName = splitEmail[1]
        if (!firstName || !lastName) return (firstName || lastName)

        // Return first char of both first and last names
        return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
    }

    function onExtractedEmails(emails: string[]) {
        setExtractedEmails(
            (prev) => {
                const newMap = new Map(prev)
                emails
                    .filter((email: string) => !!email)
                    .forEach((email: string) => {
                        const id = crypto.randomUUID()
                        newMap.set(id, { email, role })
                    })
                return newMap
            }
        )
    }

    function handleChange(v: any, id: string) {
        setExtractedEmails(prev => {
            const newMap = new Map(prev)
            newMap.set(id, v)
            return newMap
        })
    }

    function handleSubmit() {
        createInvitation({
            invitations: extractedEmailsList.map((i) => ({
                email: i.email,
                role: i.role
            }))
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <ExtractEmailsFromFile
                    onExtractedEmails={onExtractedEmails}
                />
                <Button onClick={handleAddRow} variant="ghost" size="sm">Add Row</Button>
            </div>
            <Table wrapperClassName="relative h-[320px]">
                <TableHeader className="sticky top-[-1px] z-10 bg-background">
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox
                                checked={isAllSelected}
                                onCheckedChange={handleSelectAll}
                                aria-label="Select all"
                            />
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="w-12">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {extractedEmailsList.map((v) => (
                        <TableRow key={v.id}>
                            <TableCell>
                                <Checkbox
                                    id={v.id}
                                    name={v.email}
                                    checked={selectedRows.has(v.id)}
                                    onCheckedChange={(checked) => handleSelectRow(v.id, checked as boolean)}
                                    aria-label={`Select ${v.email}`}
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs">
                                            {getInitials(v.email)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Input
                                        value={v.email}
                                        onChange={(e) => handleChange({
                                            ...v,
                                            email: e?.target?.value,
                                        }, v.id)}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <RoleSelector
                                    id={v.id}
                                    value={v.role}
                                    disabled={role === "GUARDIAN"}
                                    filterOutRoles={role === "FACULTY" ? ["GUARDIAN", "STUDENT"] : []}
                                    onSetValue={(role) => {
                                        handleChange({
                                            ...v,
                                            role,
                                        }, v.id)
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteSingle(v.id)}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
})