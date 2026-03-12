import { apiClient } from "@/lib/api-client";
import { UserProfileCard } from "@/features/school-users/components/user-profile-card";
import type { StudentProfile } from "@/features/school-users/types";

export default async function StudentDetailPage({
    params,
}: {
    params: Promise<{ studentId: string }>;
}) {
    const { studentId } = await params;

    const res = await apiClient(`/students/${studentId}`);
    const profile: StudentProfile | null = res.ok ? await res.json() : null;

    if (!profile) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground text-sm">Student not found.</p>
            </div>
        );
    }

    return (
        <UserProfileCard
            firstName={profile.first_name}
            lastName={profile.last_name}
            email={profile.email}
            phone={profile.phone}
            photoUrl={profile.photo_url}
            role={profile.role}
            registrationNumber={profile.registration_number}
        />
    );
}
