import React from "react"
import { Card } from "@/shared/components/ui/card"

interface BulkActionsProps {
    open: boolean
    children: React.ReactNode
}


export function BulkActions({ open, children }: BulkActionsProps) {
    return (
        <div
            className={`fixed bottom-0 left-0 right-0 mx-auto h-20 w-max transform transition-all duration-200 ease-in-out ${open ? 'visible -translate-y-16' : 'invisible translate-y-16'}`}
        >
            <Card className="flex h-16 items-center justify-center bg-background p-5 rounded-lg shadow-md">
                {children}
            </Card>
        </div>
    )
}