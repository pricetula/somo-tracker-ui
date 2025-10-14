import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographyLead({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn("text-muted-foreground text-xl", className)}>
            {children}
        </p>
    )
}
