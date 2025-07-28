export const mappedRoles = new Map([
    [
        "ADMIN",
        {
            value: "ADMIN",
            label: "Admin",
            bgColor: "bg-purple-200",
        },
    ],
    [
        "FACULTY",
        {
            value: "FACULTY",
            label: "Faculty",
            bgColor: "bg-yellow-200",
        },
    ],
    [
        "STUDENT",
        {
            value: "STUDENT",
            label: "Student",
            bgColor: "bg-teal-200",
        },
    ],
    [
        "GUARDIAN",
        {
            value: "GUARDIAN",
            label: "Guardian",
            bgColor: "bg-slate-200",
        },
    ],
])

export const roleOptions = Array.from(mappedRoles.values())