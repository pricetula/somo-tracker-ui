import { SchoolUsersPage } from "@/features/school-users/components/school-users-page";

export default async function StudentsPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;
    return <SchoolUsersPage role="STUDENT" addHref="/students/add" search={search} />;
}
