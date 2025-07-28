export const mappedRoles = new Map([
    [
        "Admin",
        {
            value: "ADMIN",
            label: "Admin",
            bgColor: "bg-purple-200",
        },
    ],
    [
        "Faculty",
        {
            value: "FACULTY",
            label: "Faculty",
            bgColor: "bg-yellow-200",
        },
    ],
    [
        "Student",
        {
            value: "STUDENT",
            label: "Student",
            bgColor: "bg-teal-200",
        },
    ],
    [
        "Guardian",
        {
            value: "GUARDIAN",
            label: "Guardian",
            bgColor: "bg-slate-200",
        },
    ],
])

export const roleOptions = Array.from(mappedRoles.values())