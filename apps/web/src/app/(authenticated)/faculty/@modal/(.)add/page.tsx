"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { UserCreatorModal } from "@/components/shared/user-creator/user-creator-modal";
import { bulkAddFaculty } from "@/features/faculty/api/actions";
import { fetchCohorts } from "@/features/cohorts/api/fetch-cohorts";
import { cohortsQueryKey } from "@/features/cohorts/api/use-cohorts";
import { USER_CREATOR_CONFIG } from "../../configs";

export default function AddFacultyModal() {
    const router = useRouter();
    const { data: cohortsResult } = useQuery({
        queryKey: cohortsQueryKey,
        queryFn: fetchCohorts,
    });
    const cohorts = cohortsResult?.success ? cohortsResult.data : [];

    async function handleImport(...args: Parameters<typeof bulkAddFaculty>) {
        const result = await bulkAddFaculty(...args);
        if (result.success) router.refresh();
        return result;
    }

    return (
        <UserCreatorModal
            title="Add faculty"
            description="Upload a CSV file to import faculty members into your school."
            onImport={handleImport}
            onClose={() => router.back()}
            config={USER_CREATOR_CONFIG}
            cohorts={cohorts}
        />
    );
}
