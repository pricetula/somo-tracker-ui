import { Role } from "../types/user"

interface RoleOption {
    value: Role
    label: string
    bgColor: string
}

export const mappedRoles = new Map<Role, RoleOption>([
    [
        "ADMIN",
        {
            value: "ADMIN",
            label: "Admin",
            bgColor: "bg-purple-200 dark:bg-purple-700",
        },
    ],
    [
        "FACULTY",
        {
            value: "FACULTY",
            label: "Faculty",
            bgColor: "bg-yellow-200 dark:bg-yellow-700",
        },
    ],
    [
        "STUDENT",
        {
            value: "STUDENT",
            label: "Student",
            bgColor: "bg-teal-200 dark:bg-teal-700",
        },
    ],
    [
        "GUARDIAN",
        {
            value: "GUARDIAN",
            label: "Guardian",
            bgColor: "bg-slate-200 dark:bg-slate-700",
        },
    ],
])

export const roleOptions = Array.from(mappedRoles.values())