import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographyMuted({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
    )
}
