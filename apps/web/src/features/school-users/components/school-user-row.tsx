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

export function SchoolUserRow({ user, style }: SchoolUserRowProps) {
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "—";

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
                <p className="text-sm font-medium truncate">{fullName}</p>
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
