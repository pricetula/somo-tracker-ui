import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographyH4({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h4 className={cn("scroll-m-20 text-md md:text-xl font-semibold tracking-tight", className)}>
            {children}
        </h4>
    )
}
