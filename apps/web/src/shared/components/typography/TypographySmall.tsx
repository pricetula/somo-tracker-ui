import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographySmall({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <small className={cn("text-sm leading-none font-medium", className)}>{children}</small>
    )
}
