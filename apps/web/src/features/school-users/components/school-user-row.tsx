"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import type { SchoolUserSearchResult } from "@/features/school-users/types";

interface SchoolUserRowProps {
    user: SchoolUserSearchResult;
    style?: React.CSSProperties;
}

const ROLE_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
    ADMIN: "default",
    FACULTY: "secondary",
    STUDENT: "outline",
    GUARDIAN: "outline",
};

const ROLE_HREF: Record<string, (id: string) => string> = {
    STUDENT: (id: string) => `/students/${id}`,
    FACULTY: (id: string) => `/faculty/${id}`,
    ADMIN: (id: string) => `/admins/${id}`,
    GUARDIAN: (id: string) => `/guardians/${id}`,
};

export function SchoolUserRow({ user, style }: SchoolUserRowProps) {
    const router = useRouter();
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "—";
    const href = user.role ? ROLE_HREF[user.role]?.(user.user_id || '') : undefined;

    return (
        <div
            style={style}
            className="flex items-center gap-3 px-4 border-b border-border/50 hover:bg-muted/40 transition-colors"
        >
            <UserAvatar
                firstName={user.first_name || ""}
                lastName={user.last_name || ""}
                photoUrl={user.photo_url || ""}
            />
            <div className="flex-1 min-w-0">
                {href ? (
                    <Link
                        href={href}
                        prefetch={false}
                        onMouseEnter={() => router.prefetch(href)}
                        className="text-sm font-medium truncate hover:underline"
                    >
                        {fullName}
                    </Link>
                ) : (
                    <p className="text-sm font-medium truncate">{fullName}</p>
                )}
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            {user.registration_number && (
                <p className="text-xs text-muted-foreground shrink-0">{user.registration_number}</p>
            )}
            {user.role && (
                <Badge variant={ROLE_VARIANT[user.role] ?? "outline"} className="shrink-0 text-xs">
                    {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                </Badge>
            )}
        </div>
    );
}
