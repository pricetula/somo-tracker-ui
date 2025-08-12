import { ReactNode } from "react";

interface PageNavProps {
    children: ReactNode;
}

export function PageNav({ children }: PageNavProps) {
    return (
        <nav className="mb-4">{children}</nav>
    )
}