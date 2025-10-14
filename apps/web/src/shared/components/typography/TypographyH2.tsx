import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographyH2({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h2 className={cn("scroll-m-20 text-lg md:text-2xl font-semibold tracking-tight first:mt-0", className)}>
            {children}
        </h2>
    )
}
