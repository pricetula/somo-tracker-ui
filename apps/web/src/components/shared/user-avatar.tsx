import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nameToColor } from "@/lib/utils/name-to-color";

interface UserAvatarProps {
    firstName: string;
    lastName: string;
    photoUrl: string;
}

export function UserAvatar({ photoUrl, firstName, lastName }: UserAvatarProps) {
    const initials = [firstName, lastName]
        .filter(Boolean)
        .map((n) => n![0].toUpperCase())
        .join("");

    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";

    const color = nameToColor(fullName);

    return (
        <Avatar className="size-8 shrink-0">
            <AvatarImage src={photoUrl} alt={fullName} />
            {fullName?.length && (
                <AvatarFallback className="text-xs text-white" style={{ backgroundColor: color }}>
                    {initials || "?"}
                </AvatarFallback>
            )}
        </Avatar>
    );
}
