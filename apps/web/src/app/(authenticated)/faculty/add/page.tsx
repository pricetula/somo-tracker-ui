"use client";

import { useQuery } from "@tanstack/react-query";
import { UserCreator } from "@/components/shared/user-creator/user-creator";
import { bulkAddFaculty } from "@/features/faculty/api/actions";
import { fetchCohorts } from "@/features/cohorts/api/fetch-cohorts";
import { cohortsQueryKey } from "@/features/cohorts/api/use-cohorts";
import { USER_CREATOR_CONFIG } from "../configs";

export default function AddFacultyPage() {
    const { data: cohortsResult } = useQuery({
        queryKey: cohortsQueryKey,
        queryFn: fetchCohorts,
    });
    const cohorts = cohortsResult?.success ? cohortsResult.data : [];

    return (
        <div className="flex flex-col gap-4">
            <UserCreator onImport={bulkAddFaculty} config={USER_CREATOR_CONFIG} cohorts={cohorts} />
        </div>
    );
}
