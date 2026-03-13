"use client";

import { facultyProfileQueryKey, useFacultyProfile } from "@/features/school-users/api/use-school-user-profile";
import { UserProfileCard } from "./user-profile-card";

export function FacultyProfileDetail({ userId }: { userId: string }) {
    const { data } = useFacultyProfile(userId);
    const profile = data?.success ? data.data : null;

    if (!profile) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground text-sm">Faculty member not found.</p>
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
            userId={profile.id}
            profileQueryKey={facultyProfileQueryKey(userId)}
        />
    );
}
