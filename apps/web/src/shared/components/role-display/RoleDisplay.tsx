import { cn } from "@/shared/lib/utils";
import { mappedRoles } from "@/shared/utils/constants";

export interface RoleDisplayProps {
    role: string;
}

export function RoleDisplay({ role }: RoleDisplayProps) {
    const mappedRole = mappedRoles.get(role)
    return (
        <span className={cn("p-.5 px-2 rounded-md", mappedRole?.bgColor)}>{mappedRole?.label}</span>
    )
}