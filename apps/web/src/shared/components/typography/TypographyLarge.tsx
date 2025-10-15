import { cn } from "@/shared/lib/utils";
import React from "react"

export function TypographyLarge({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-lg font-semibold", className)}>{children}</p>
}
