import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographyP({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn("text-md", className)}>
            {children}
        </p>
    )
}
