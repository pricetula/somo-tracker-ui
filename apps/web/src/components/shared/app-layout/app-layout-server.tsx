import { AppLayout } from "@/components/shared/app-layout/layout";

export async function AppLayoutServer({ children }: { children: React.ReactNode }) {
    return <AppLayout>{children}</AppLayout>;
}
