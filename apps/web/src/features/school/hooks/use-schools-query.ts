import { useQuery } from "@tanstack/react-query";
import { schoolsAPIQuery } from "../queries/config";

interface SchoolsQueryProps {
    enabled: boolean;
}

export function useSchoolsQuery({ enabled }: SchoolsQueryProps = { enabled: false }) {
    return useQuery({ ...schoolsAPIQuery, enabled });
}