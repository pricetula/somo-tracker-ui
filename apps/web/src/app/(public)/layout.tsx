import { Nav } from "@/shared/components/layout/nav/Nav";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto px-4">
            <Nav />
            {children}
        </main>
    )
}