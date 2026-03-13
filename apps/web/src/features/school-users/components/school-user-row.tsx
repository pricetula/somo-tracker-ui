"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SchoolUserSearchResult } from "@/features/school-users/types";

interface SchoolUserRowProps {
    user: SchoolUserSearchResult;
    style?: React.CSSProperties;
    selected: boolean;
    onToggleSelect: (userId: string) => void;
    onDelete: (userId: string) => void;
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

export function SchoolUserRow({
    user,
    style,
    selected,
    onToggleSelect,
    onDelete,
}: SchoolUserRowProps) {
    const router = useRouter();
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "—";
    const href = user.role ? ROLE_HREF[user.role]?.(user.user_id || "") : undefined;
    const userId = user.user_id || "";

    return (
        <div
            style={style}
            className="flex items-center gap-3 px-4 border-b border-border/50 hover:bg-muted/40 transition-colors"
        >
            <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggleSelect(userId)}
                className="size-4 shrink-0 rounded border-border accent-primary cursor-pointer"
                aria-label={`Select ${fullName}`}
            />
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="shrink-0 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="User actions"
                    >
                        <EllipsisVertical className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(userId)}
                    >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
