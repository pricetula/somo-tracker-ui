"use client";

import { useStudentProfile } from "@/features/school-users/api/use-school-user-profile";
import { UserProfileCard } from "./user-profile-card";

export function StudentProfileDetail({ userId }: { userId: string }) {
    const { data } = useStudentProfile(userId);
    const profile = data?.success ? data.data : null;

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
