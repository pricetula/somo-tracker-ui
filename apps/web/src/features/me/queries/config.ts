import { getMe } from "../services/get-me";
import { meKeys } from "./keys";

export const meQuery = {
    queryKey: meKeys.me,
    queryFn: getMe,
};