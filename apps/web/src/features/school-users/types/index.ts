import type { components } from "@/types/api";

export type SchoolUser = components["schemas"]["somo-tracker-api_internal_schooluser.SchoolUser"];
export type SchoolUserSearchResult =
    components["schemas"]["somo-tracker-api_internal_schooluser.SearchResult"];
export type SchoolUserSearchResponse =
    components["schemas"]["somo-tracker-api_internal_schooluser.SearchResponse"];
export type CohortInfo = components["schemas"]["somo-tracker-api_internal_schooluser.CohortInfo"];
export type AddSchoolUserRequest =
    components["schemas"]["internal_schooluser_delivery_http.addSchoolUserRequest"];
export type UpdateSchoolUserRequest =
    components["schemas"]["internal_schooluser_delivery_http.updateRequest"];
export type StudentProfile =
    components["schemas"]["somo-tracker-api_internal_schooluser.StudentProfile"];
export type FacultyProfile =
    components["schemas"]["somo-tracker-api_internal_schooluser.FacultyProfile"];
export type GuardianProfile =
    components["schemas"]["somo-tracker-api_internal_schooluser.GuardianProfile"];
export type AdminProfile =
    components["schemas"]["somo-tracker-api_internal_schooluser.AdminProfile"];
