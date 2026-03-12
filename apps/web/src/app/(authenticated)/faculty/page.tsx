import { SchoolUsersPage } from "@/features/school-users/components/school-users-page";

export default async function FacultyPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;
    return <SchoolUsersPage role="ADMIN,FACULTY" addHref="/faculty/add" search={search} />;
}
