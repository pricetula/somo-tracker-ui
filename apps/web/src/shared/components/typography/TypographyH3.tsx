import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographyH3({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h3 className={cn("scroll-m-20 text-lg md:text-xl font-semibold tracking-tight", className)}>
            {children}
        </h3>
    )
}
