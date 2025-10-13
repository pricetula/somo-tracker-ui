import { getSchools } from "../services/get-school";
import { getSchoolsAPI } from "../services/get-schools-api";
import { createSchool } from "../services/create-school"
import { schoolsKeys } from "./keys";

export const schoolsQuery = {
    queryKey: schoolsKeys.all,
    queryFn: getSchools,
};

export const schoolsAPIQuery = {
    queryKey: schoolsKeys.all,
    queryFn: getSchoolsAPI,
};

export const createSchoolMutation = {
    mutationFn: createSchool
}