import { SchoolUsersPage } from "@/features/school-users/components/school-users-page";

export default async function GuardiansPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;
    return <SchoolUsersPage role="GUARDIAN" addHref="/guardians/add" search={search} />;
}
