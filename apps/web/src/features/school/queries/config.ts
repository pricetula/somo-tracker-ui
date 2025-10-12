import { getSchools } from "../services/get-school";
import { schoolsKeys } from "./keys";

export const schoolsQuery = {
    queryKey: schoolsKeys.all,
    queryFn: getSchools,
};