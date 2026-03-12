"use client";

import { UserCreator } from "@/components/shared/user-creator/user-creator";
import { bulkAddStudents } from "@/features/students/api/actions";
import { fetchCohorts } from "@/features/cohorts/api/fetch-cohorts";
import { cohortsQueryKey } from "@/features/cohorts/api/use-cohorts";
import { USER_CREATOR_CONFIG } from "../configs";
import { useQuery } from "@tanstack/react-query";

export default function AddStudentsPage() {
    const { data: cohortsResult } = useQuery({
        queryKey: cohortsQueryKey,
        queryFn: fetchCohorts,
    });
    const cohorts = cohortsResult?.success ? cohortsResult.data : [];

    return (
        <div className="flex flex-col gap-4">
            <UserCreator
                onImport={bulkAddStudents}
                config={USER_CREATOR_CONFIG}
                cohorts={cohorts}
            />
        </div>
    );
}
