"use client";

import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useUpdateProfile } from "@/features/school-users/api/use-school-user-profile";
import { Input } from "@/components/ui/input";

interface UserProfileCardProps {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    photoUrl?: string;
    role?: string;
    registrationNumber?: string;
    userId?: string;
    profileQueryKey?: readonly unknown[];
}

export function UserProfileCard({
    firstName,
    lastName,
    email,
    phone,
    photoUrl,
    role,
    registrationNumber,
    userId,
    profileQueryKey,
}: UserProfileCardProps) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState({
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        phone: phone ?? "",
        registrationNumber: registrationNumber ?? "",
    });

    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const editable = !!userId && !!profileQueryKey;

    function handleEdit() {
        setDraft({
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            phone: phone ?? "",
            registrationNumber: registrationNumber ?? "",
        });
        setEditing(true);
    }

    function handleCancel() {
        setEditing(false);
    }

    function handleConfirm() {
        if (!editable) return;
        updateProfile(
            {
                userId,
                userFields: {
                    first_name: draft.firstName,
                    last_name: draft.lastName,
                    phone: draft.phone,
                    ...(registrationNumber !== undefined
                        ? { registration_number: draft.registrationNumber }
                        : {}),
                },
                queryKey: profileQueryKey,
            },
            { onSuccess: () => setEditing(false) }
        );
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";

    return (
        <div className="flex items-start gap-4 mt-4 group relative">
            <UserAvatar
                firstName={firstName || ""}
                lastName={lastName || ""}
                photoUrl={photoUrl || ""}
            />
            <div className="space-y-1 flex-1">
                {editing ? (
                    <>
                        <div className="flex gap-2">
                            <Input
                                className="h-7 text-sm font-semibold"
                                value={draft.firstName}
                                onChange={(e) =>
                                    setDraft((d) => ({ ...d, firstName: e.target.value }))
                                }
                                placeholder="First name"
                            />
                            <Input
                                className="h-7 text-sm font-semibold"
                                value={draft.lastName}
                                onChange={(e) =>
                                    setDraft((d) => ({ ...d, lastName: e.target.value }))
                                }
                                placeholder="Last name"
                            />
                        </div>
                        {role && (
                            <p className="text-sm text-muted-foreground capitalize">
                                {role.charAt(0) + role.slice(1).toLowerCase()}
                            </p>
                        )}
                        {email && <p className="text-sm">{email}</p>}
                        <Input
                            className="h-7 text-sm"
                            value={draft.phone}
                            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                            placeholder="Phone"
                        />
                        {registrationNumber !== undefined && (
                            <Input
                                className="h-7 text-xs"
                                value={draft.registrationNumber}
                                onChange={(e) =>
                                    setDraft((d) => ({ ...d, registrationNumber: e.target.value }))
                                }
                                placeholder="Registration number"
                            />
                        )}
                    </>
                ) : (
                    <>
                        <h1 className="text-xl font-semibold">{fullName}</h1>
                        {role && (
                            <p className="text-sm text-muted-foreground capitalize">
                                {role.charAt(0) + role.slice(1).toLowerCase()}
                            </p>
                        )}
                        {email && <p className="text-sm">{email}</p>}
                        {phone && <p className="text-sm text-muted-foreground">{phone}</p>}
                        {registrationNumber && (
                            <p className="text-xs text-muted-foreground">#{registrationNumber}</p>
                        )}
                    </>
                )}
            </div>
            {editable && (
                <div className="flex gap-1">
                    {editing ? (
                        <>
                            <button
                                onClick={handleConfirm}
                                disabled={isPending}
                                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50"
                                aria-label="Save"
                            >
                                <Check className="size-4" />
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isPending}
                                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50"
                                aria-label="Cancel"
                            >
                                <X className="size-4" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Edit"
                        >
                            <Pencil className="size-4" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
