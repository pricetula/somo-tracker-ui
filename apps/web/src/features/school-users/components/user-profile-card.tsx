import { UserAvatar } from "@/components/shared/user-avatar";

interface UserProfileCardProps {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    photoUrl?: string;
    role?: string;
    registrationNumber?: string;
}

export function UserProfileCard({
    firstName,
    lastName,
    email,
    phone,
    photoUrl,
    role,
    registrationNumber,
}: UserProfileCardProps) {
    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";

    return (
        <div className="flex items-start gap-4 mt-4">
            <UserAvatar
                firstName={firstName || ""}
                lastName={lastName || ""}
                photoUrl={photoUrl || ""}

            />
            <div className="space-y-1">
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
            </div>
        </div>
    );
}
