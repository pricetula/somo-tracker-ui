import { apiClient } from "@/lib/api-client";
import { UserProfileCard } from "@/features/school-users/components/user-profile-card";
import type { AdminProfile } from "@/features/school-users/types";

export default async function AdminDetailPage({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;

    const res = await apiClient(`/admins/${userId}`);
    const profile: AdminProfile | null = res.ok ? await res.json() : null;

    if (!profile) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground text-sm">Admin not found.</p>
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
        />
    );
}
