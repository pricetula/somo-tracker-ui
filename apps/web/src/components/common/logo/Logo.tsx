import React from "react"

export function Logo() {
    return (
        <div className="flex items-center gap-1">
            <div className="flex flex-col gap-0.5">
                <div className="ml-1 h-2 w-5 rounded-lg bg-blue-500"></div>
                <div className="h-2 w-5 rounded-lg bg-blue-500"></div>
            </div>
            <strong className="text-xl">SomoTracker</strong>
        </div>
    )
}