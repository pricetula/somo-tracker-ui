import { Nav } from "@/shared/components/layout/nav/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto px-4 h-screen">
            <Nav />
            {children}
        </main>
    )
}