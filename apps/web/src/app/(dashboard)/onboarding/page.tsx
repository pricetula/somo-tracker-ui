import { CreateInstitute } from "@/features/institutes/create-institute";
import { Nav } from "@/shared/components/layout/nav/Nav";

export default function Page() {
    return (
        <main className="container mx-auto px-4 h-screen">
            <Nav />
            <CreateInstitute />
        </main>
    );
}