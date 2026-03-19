import { redirect } from "next/navigation";
import { VerifyMagicLink } from "@/features/auth/components/verify-magic-link";

interface VerifyPageProps {
    searchParams: Promise<{ token?: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
    const { token } = await searchParams;

    if (!token) {
        redirect("/login");
    }

    return <VerifyMagicLink token={token} />;
}
