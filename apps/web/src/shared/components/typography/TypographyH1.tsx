import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographyH1({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h1 className={cn("scroll-m-20 text-center text-xl md:text-3xl font-extrabold tracking-tight text-balance", className)}>
            {children}
        </h1>
    )
}
