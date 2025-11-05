import { getCohorts } from "../services/get-cohorts";
import { getCohortsAPI } from "../services/get-cohorts-api";
import { Cohort } from "../types";
import { cohortKeys } from "./keys";

export const cohortsListQuery = {
    queryKey: cohortKeys.list,
    queryFn: getCohorts,
    select: (cohortsArray: Cohort[]) => {
        return cohortsArray.reduce((acc, cohort) => {
            acc[cohort.id] = cohort;
            return acc;
        }, {} as { [key: string]: Cohort });
    },
}

export const cohortsListAPIQuery = {
    ...cohortsListQuery,
    queryFn: getCohortsAPI,
}