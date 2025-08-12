import { ReactNode } from "react";

interface PageNavProps {
    children: ReactNode;
}

export function PageNav({ children }: PageNavProps) {
    return (
        <nav className="pb-4 mb-4 border-b">{children}</nav>
    )
}