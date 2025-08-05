import { Logo } from "../logo"

export function Nav() {
    return (
        <nav className="flex min-h-[60px] items-center justify-between">
            <Logo />
        </nav>
    )
}