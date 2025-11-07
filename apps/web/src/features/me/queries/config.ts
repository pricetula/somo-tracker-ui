import { getMe } from "../services/get-me";
import { getMeAPI } from "../services/get-me-api";
import { meKeys } from "./keys";

export const meQuery = {
    queryKey: meKeys.me,
    queryFn: getMe,
};

export const meAPIQuery = {
    queryKey: meKeys.me,
    queryFn: getMeAPI,
};