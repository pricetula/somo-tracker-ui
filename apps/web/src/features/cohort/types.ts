export interface Cohort {
    id: string;
    school_id: string;
    year_group_id: string;
    name: string;
    description: string;
}

export type CohortInput = Omit<Cohort, "id">